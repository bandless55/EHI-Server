import random
__author__ = 'Stevan'


def get_curr_temp():
    return random.randint(20, 30)


def get_ctrl_temp():
    with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/ctrl_temp.txt''', 'r') as f:
        return f.readline()
def set_ctrl_temp(val):
    with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/ctrl_temp.txt''', 'w') as f:
        f.write(val)


def get_hvac_mode():
        with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/hvac_mode.txt''', 'r') as f:
            return f.readline()
def set_hvac_mode(val):
    with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/hvac_mode.txt''', 'w') as f:
        f.write(val)


def get_hvac_status():
        with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/hvac_status.txt''', 'r') as f:
            return f.readline()
def set_hvac_status(val):
    with open('''C:/Users/Laptop/Documents/Projects/thermostat website/data/hvac_status.txt''', 'w') as f:
        f.write(val)
