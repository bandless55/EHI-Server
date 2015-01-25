#include <DHT.h>
#include <EEPROM.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);      //temp sensor init

const int relayFan   = 7;
const int relayHeat  = 6;
const int relayCool  = 5;
const int relayPower = 4;
int mode, state, temp, control, timer;


void setup(){
  pinMode(relayFan,        OUTPUT);
  pinMode(relayHeat,       OUTPUT);
  pinMode(relayCool,       OUTPUT);
  pinMode(relayPower,      OUTPUT); 
  digitalWrite(relayFan,   HIGH);
  digitalWrite(relayHeat,  HIGH);
  digitalWrite(relayCool,  HIGH);
  digitalWrite(relayPower, HIGH);

  Serial.begin(9600);
  dht.begin();
  
  timer = 200;
  mode    = int(EEPROM.read(0));    //get last mode, heat or cool
  if(mode == 0)                     //set default temp, dependant on mode
    control = 70;
  else
    control = 80;
  
  delay(30000);                     //wait for raspi boot
}


void loop(){
  temp = int(.5+dht.readTemperature(true));
  
  if(Serial.available() > 0){
    int readTemp = int(Serial.read());
    if(readTemp != 0){
      control = readTemp;
      int newMode = int(Serial.read());
      if((newMode == 0 || newMode == 1) && newMode != mode){
        EEPROM.write(0, byte(newMode));                      //write mode if changed to heat or cool
      }                                                      //in case of power outage
      mode = newMode;
      timer = 200;
      digitalWrite(relayFan,   HIGH);
      digitalWrite(relayHeat,  HIGH);
      digitalWrite(relayCool,  HIGH);
      digitalWrite(relayPower, HIGH);
    }
    if(timer>150){                                           //change temp every 5 min, minimum
      beThermostat();
      timer = 0;
    }
    sendData();
  }
  else{
    if(timer>150){
      beThermostat();
      timer = 0;
    }
  }
  timer++;
  delay(2000);
}


void beThermostat(){

  if(mode == 0){                       //heat
    if(temp<control){                 
      digitalWrite(relayHeat,  LOW);
      state = 1;
    }
    else if(temp>control){           
      digitalWrite(relayHeat,  HIGH);
      state = 0;
    }
    digitalWrite(relayPower, LOW);
  }

  else if(mode == 1){                 //cool
    if(temp>control){
      digitalWrite(relayCool,  LOW);
      digitalWrite(relayFan,   LOW);
      state = 1;
    }
    else if(temp<control){
      digitalWrite(relayCool,  HIGH);
      digitalWrite(relayFan,   HIGH);
      state = 0;
    }
    digitalWrite(relayPower, LOW);
  }

  else if(mode == 2){                 //fan
    digitalWrite(relayFan,     LOW); 
    state = 1;
    digitalWrite(relayPower, LOW);
  }

  else if(mode==3){                   //off
    state = 0;  
  }
}


void sendData(){
  byte data[4];
  data[0] = byte(temp);
  data[1] = byte(control);
  data[2] = byte(mode);
  data[3] = byte(state);
  Serial.write(data, 4);
}

