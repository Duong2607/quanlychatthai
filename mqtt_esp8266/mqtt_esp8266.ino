

#include <ESP8266WiFi.h>
#include <PubSubClient.h>



const char* ssid = "....";         // Ten wifi
const char* password = "....";     // Mat khau wifi
const char* mqtt_server = "....";  // ip local broker

const int trigPin = D7;
const int echoPin = D8;

long duration;
int distance;
int lastDistance;  // bien luu tru khoang cach truoc do

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
char ip[20];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
    WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);  // Turn the LED on (Note that LOW is the voltage level
    Serial.println("LED ON");
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
    Serial.println("LED OFF");
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      //truyen tin len kenh topic dulieu
      client.publish("dulieu", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(trigPin, OUTPUT);      // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);       // Sets the echoPin as an Input
  pinMode(BUILTIN_LED, OUTPUT);  // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {


  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration * 0.034 / 2;
  // Prints the distance on the Serial Monitor
  // IPAddress ip = WiFi.localIP();
  //luu ip vao bien ip de dinh danh cho esp
  sprintf(ip, "%d.%d.%d.%d", WiFi.localIP()[0], WiFi.localIP()[1], WiFi.localIP()[2], WiFi.localIP()[3]);

  //kiem tra trang thai thay doi khong neu khoang cach thanh doi giua 20cm thi gui tin nhan len topic

  if (lastDistance < 20) {
    if (distance > 20) {
      snprintf(msg, MSG_BUFFER_SIZE, "%s#%ld", ip, distance);
      client.publish("dulieu", msg);
    }
  }
  if (lastDistance > 20) {
    if (distance < 20) {
      snprintf(msg, MSG_BUFFER_SIZE, "%s#%ld", ip, distance);
      client.publish("dulieu", msg);
    }
  }



  Serial.print("Distance: ");
  Serial.println(distance);

  Serial.println("IP address: ");
  lastDistance = distance;
  delay(2000);
}
