#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Arduino_JSON.h>
#include <HTTPClient.h>

class Medicion {
public:
  int posX, posY, posZ, time;
};

// WiFi Network Credentials
const char *ssid = "LABREDES";       // Nombre de tu red WiFi
const char *password = "F0rmul4-1";  // Contraseña de tu red WiFi

// MQTT Network
const char *mqttServer = "broker.emqx.io";
const char *ID = "Device-00";
const String nameDevice = "Device-00";
const String TOPIC = "medition/" + nameDevice;
const char *STATE_TOPIC = "room/light/state";
const int MEASUREMENT_DELAY = 20;
int idMedition;
const char *SERVER_ADDRESS = "http://192.168.130.68:8080/device";
String statusRed="not";
String statusSensor="not";
String statusMqtt="not";
String message[2];

WiFiClient wclient;
PubSubClient client(wclient);  // Configurar cliente MQTT

// Sensor MPU6050
Adafruit_MPU6050 mpu;

const long measurementDuration = 5000;   // Duración de la medición en milisegundos (5 segundos)
unsigned long measurementStartTime = 0;  // Tiempo de inicio de la medición
const int numMeasurements = 250;         // Ajustado para tener más mediciones en 5 segundos
Medicion mediciones[numMeasurements];    // Array para almacenar las mediciones
int measurementIndex = 0;                // Índice actual de la medición

bool takingMeasurements = false;  // Variable para indicar si se están tomando mediciones

// Handle mensajes entrantes del broker MQTT
void callback(char *topic, byte *payload, unsigned int length) {
  String response;

  for (int i = 0; i < length; i++) {
    response += (char)payload[i];
  }
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("] ");
  Serial.println(response);
  int delimiterIndex = response.indexOf('/');
    if (delimiterIndex != -1) {
    message[0] = response.substring(0, delimiterIndex);
    message[1] = response.substring(delimiterIndex + 1);
  }
  if (message[0] == "on") {             // Comenzar la medición al recibir "on"
    idMedition=message[1].toInt();
    takingMeasurements = true;        // Iniciar la toma de mediciones
    measurementStartTime = millis();  // Guardar el tiempo actual
    measurementIndex = 0;             // Reiniciar el índice de la medición
  } else if (message[0] == "off") {
    takingMeasurements = false;  // Detener la toma de mediciones
  }
}

// Conectar a la red WiFi
void setup_wifi() {
  Serial.print("\nConectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);  // Conectar a la red

  while (WiFi.status() != WL_CONNECTED) {  // Esperar conexión
    delay(500);
    Serial.print(".");
  }
  statusRed="ok";
  Serial.println();
  Serial.println("WiFi conectado");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

// Reconectar al cliente MQTT
void reconnect() {
  statusMqtt="not";
  // Repetir hasta que estemos conectados
  while (!client.connected()) {
    
    Serial.print("Intentando conexión MQTT...");
    // Intentar conectar
    if (client.connect(ID)) {
      statusMqtt="ok";
      client.subscribe(TOPIC.c_str());
      Serial.println("conectado");
      Serial.print("Suscrito a: ");
      Serial.println(TOPIC);
      Serial.println('\n');
    } else {
      Serial.println(" intentar de nuevo en 5 segundos");

      delay(5000);
    }
  }
}

void performMeasurement() {
  unsigned long startTime = millis();
  while (measurementIndex < numMeasurements && millis() - startTime < measurementDuration) {
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
    int ax = a.acceleration.x;
    int ay = a.acceleration.y;
    int az = a.acceleration.z;

    Serial.print("Acceleration X: ");
    Serial.print(a.acceleration.x);
    Serial.print(", Y: ");
    Serial.print(a.acceleration.y);
    Serial.print(", Z: ");
    Serial.print(a.acceleration.z);
    Serial.println(" m/s^2");

    Medicion medicion;
    medicion.posX = ax;
    medicion.posY = ay;
    medicion.posZ = az;
    medicion.time = millis() - startTime;

    mediciones[measurementIndex] = medicion;

    measurementIndex++;
    delay(MEASUREMENT_DELAY);
  }

  if (measurementIndex >= numMeasurements || millis() - startTime >= measurementDuration) {

    HTTPClient http;
    String url = String(SERVER_ADDRESS) + "/" + String(idMedition) + "/measure";

    Serial.println(url);
    http.begin(url.c_str());
    http.addHeader("Content-Type", "application/json");

    JSONVar measurementsArray;

    for (int i = 0; i < measurementIndex; i++) {
      JSONVar singleMeasurement;
      singleMeasurement["posX"] = mediciones[i].posX;
      singleMeasurement["posY"] = mediciones[i].posY;
      singleMeasurement["posZ"] = mediciones[i].posZ;
      singleMeasurement["time"] = mediciones[i].time;
      measurementsArray[i] = singleMeasurement;
    }

    String jsonString = JSON.stringify(measurementsArray);
    Serial.println(jsonString);

    int httpResponseCode = http.POST(jsonString);
    if (httpResponseCode > 0) {
      Serial.print("Measurement sent. Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending measurement. HTTP error code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
    measurementStartTime = millis();
    measurementIndex = 0;
    takingMeasurements = false;
  }
}

void setup() {
  Serial.begin(115200);
  delay(100);
  setup_wifi();
  client.setServer(mqttServer, 1883);
  client.setCallback(callback);

  // Inicializar el sensor MPU6050
  if (!mpu.begin()) {
   statusSensor="not";
    Serial.println("MPU6050 connection failed");
    while (1)
      ;
  }
  statusSensor="ok";
  Serial.println("MPU6050 connection successful");
}

void status(){

}

void loop() {
  if (!client.connected()) {  // Reconectar si se pierde la conexión
    reconnect();
  }
  client.loop();

  if (takingMeasurements) {
    performMeasurement();
  }
}
