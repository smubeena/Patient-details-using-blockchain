import time
import Adafruit_ADS1x15
from flask import Flask, jsonify
from threading import Thread
from temperature import read_temp
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


# Initialize ADC
adc = Adafruit_ADS1x15.ADS1015()
GAIN = 2/3
thresh = 525 
P = 512
T = 512
stateChanged = 0
sampleCounter = 0
lastBeatTime = 0
firstBeat = True
secondBeat = False
Pulse = False
IBI = 600
rate = [0]*10
amp = 100
lastTime = int(time.time()*1000)
thresh = 525
BPM = 0

# Endpoint to get pulse rate
@app.route('/get-data')
def get_pulse_rate():
    cel,faren = read_temp()
    # f'{a:.2f}' 
    return jsonify({"pulse_rate": round(BPM,2), "celsius" : round(cel,2 ), "farenheit" : round(faren, 2)})

def calculate_pulse_rate():
    global lastTime, sampleCounter, lastBeatTime, firstBeat, secondBeat, Pulse, IBI, rate, BPM, thresh, P, T
    while True:
        Signal = adc.read_adc(0, gain=GAIN)
        curTime = int(time.time()*1000)
        sampleCounter += curTime - lastTime  
        lastTime = curTime
        N = sampleCounter - lastBeatTime

        if Signal < thresh and N > (IBI/5.0)*3.0:
            if Signal < T:
                T = Signal

        if Signal > thresh and Signal > P:
            P = Signal

        if N > 250:
            if (Signal > thresh) and (Pulse == False) and (N > (IBI/5.0)*3.0):
                Pulse = True
                IBI = sampleCounter - lastBeatTime
                lastBeatTime = sampleCounter

                if secondBeat:
                    secondBeat = False
                    for i in range(0, 10):
                        rate[i] = IBI

                if firstBeat:
                    firstBeat = False
                    secondBeat = True
                    continue

                runningTotal = 0

                for i in range(0, 9):
                    rate[i] = rate[i+1]
                    runningTotal += rate[i]

                rate[9] = IBI
                runningTotal += rate[9]
                runningTotal /= 10
                BPM = 60000/runningTotal

        if Signal < thresh and Pulse == True:
            Pulse = False
            amp = P - T
            thresh = amp/2 + T
            P = thresh
            T = thresh

        if N > 2500:
            thresh = 512
            P = 512
            T = 512
            lastBeatTime = sampleCounter
            firstBeat = True
            secondBeat = False
            # print("no beats found")

        time.sleep(0.005)

if __name__ == '__main__':
    pulse_rate_thread = Thread(target=calculate_pulse_rate)
    pulse_rate_thread.start()    
    app.run(host='0.0.0.0', port=5000)
