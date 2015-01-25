from flask import Flask, render_template, jsonify, request, redirect
import file_handler
app = Flask(__name__)


@app.route('/get_data', methods=['GET', 'POST'])
def get_data():
    a = 2
    return jsonify(temp_ctrl=file_handler.get_ctrl_temp(),
                   temp_curr=file_handler.get_curr_temp(),
                   hvac_stat=file_handler.get_hvac_status(),
                   hvac_mode=file_handler.get_hvac_mode())

@app.route('/send_data', methods=['GET', 'POST'])
def send_data():
    a = 1
    ctrl_temp = request.args.get('ctrl_temp_set', -1, type=int)
    hvac_mode = request.args.get('hvac_mode_set', "error", type=str)
    if(ctrl_temp == -1 or hvac_mode == "error"):
        return jsonify()
    file_handler.set_ctrl_temp(str(ctrl_temp))
    file_handler.set_hvac_mode(hvac_mode)
    return redirect('/')

@app.route('/graphs')
def graphs():
    return render_template('graphs.html')


@app.route('/control', methods=['GET'])
def control():
    return render_template('control.html')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # def beThermostat():
    #         for readings in range(1):
    #             curr_temp = thermostat.get_curr_temp()
    #             ctrl_temp = thermostat.get_ctrl_temp()
    #
    #             if curr_temp < ctrl_temp and heating is False:
    #                 heating = True
    #                 thermostat.ctrl_furnace(True)
    #             elif curr_temp > ctrl_temp and heating is True:
    #                 heating = False
    #                 thermostat.ctrl_furnace(False)

    app.run(debug=True)
    # app.run(host='192.168.1.98')
