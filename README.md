**Home Server**

This project's goal is to make a centralized home network in line with the Internet of Things ideology. There is no specific 'end result' I am looking for with this project. Instead I want to creat a central server and a mesh of networked sensors, devices, and services to bring the home into the modern day. 

**Proposed Modules:**
* Smart thermostat
* Wireless lights and outlets
* Local backup and multimedia server
* Automated blinds, HVAC vents, showers
* Remotely accessible todo and grocery lists
* And much, much more

**Current Status:**
    Server:
        Very much under developement. Will run on a Linux box, hosting an InfluxDB time-series database for sensor logging.
        Probably will be an Express Node.js server.
    Thermostat:
        The thermostat is being run by an Arduino Uno and Raspberry Pi currently. The Arduino was chosen due to its reliability.
        It interfaces with a Raspberry Pi via USB serial to connect to the local area network.
        The Raspberry Pi runs a simple web server to allow the central server to query it and control it.
        More info can be found under the thermostat folder.
