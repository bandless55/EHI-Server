from flask import Flask, request
import serial

app = Flask(__name__)
ser = serial.Serial(3)

@app.route('/')
def hello_world():
    temp = request.args.get('temp')
    mode = request.args.get('mode')
    if temp is None or mode is None:
        ser.write(chr(0))
    else:
        ser.write(''.join([chr(int(temp)), chr(int(mode))]))
    return ', '.join([str(ord(val)) for val in list(ser.read(4))])

if __name__ == '__main__':
    app.run(host='192.168.1.50')    #RasPi IP