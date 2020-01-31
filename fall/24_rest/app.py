# Kevin Cai
# SoftDev1 pd9
# K24 -- A RESTful Journey Skyward
# 2019-11-12
from flask import Flask, render_template
import urllib3, json
app = Flask(__name__)
http = urllib3.PoolManager()
numPics = 3
@app.route("/")
def root():
    output  = []
    #Get data on astronomy picture of the day (apod)
    data = getImage('https://api.nasa.gov/planetary/apod','&count='+str(numPics))
    for i in range(numPics):
        #get individual picture
        tmp = data[i]
        #put resulting data in dict.
        output.append((tmp['title'],tmp['url'],tmp['explanation']))
    #render page
    return render_template("index.html", images = output)
def getData(data,extra):
    return http.request('GET',data+"?api_key=eC4rOBcm6DZDVaMUX8bKtJaCNni1RO8Qnc9pM8yt"+extra)
def loadJSON(data):
    return json.loads(data.data.decode('utf-8'))
def getImage(data,extra):
    u = getData(data,extra)
    return loadJSON(u)
if __name__ == "__main__":
    app.debug = True
    app.run()
