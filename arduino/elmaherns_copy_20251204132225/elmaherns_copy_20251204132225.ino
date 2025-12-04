#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// DS18B20 setup
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// LCD setup (address 0x27, 16x2)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Buzzer setup
#define BUZZER_PIN 8
#define TEMP_THRESHOLD 30

// Water level sensor pin
#define WATER_SENSOR_PIN A0

bool buzzerOn = false; // track buzzer state

void setup() {
  Serial.begin(9600);

  // Initialize DS18B20
  sensors.begin();

  // Initialize LCD
  lcd.init();
  lcd.backlight();

  // Initialize buzzer
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  // Water sensor pin
  pinMode(WATER_SENSOR_PIN, INPUT);
}

void loop() {
  // Read temperature
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  // Read water level (0–1023)
  int waterValue = analogRead(WATER_SENSOR_PIN);

  // Show readings in Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.print(" °C  | Water Level: ");
  Serial.println(waterValue);

  // ---- LCD DISPLAY ----

  // First row: Temperature + Water Level
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperatureC);
  lcd.print("C ");

  lcd.setCursor(9, 0);    // adjust to fit LCD
  lcd.print("W:");
  lcd.print(waterValue);

  // Second row: Status (Hot / Normal)
  lcd.setCursor(0, 1);
  if (temperatureC >= TEMP_THRESHOLD) {
    lcd.print("Status: Hot   ");
    if (!buzzerOn) {
      tone(BUZZER_PIN, 1000); // buzzer ON
      buzzerOn = true;
    }
  } else {
    lcd.print("Status: Normal");
    if (buzzerOn) {
      noTone(BUZZER_PIN); // buzzer OFF
      buzzerOn = false;
    }
  }

  delay(1000);
}
