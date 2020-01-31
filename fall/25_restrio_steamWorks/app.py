# Team steamWorks Kevin Cai and Winston Peng
# SoftDev1 pd9
# K25 -- restrio
# 2019-11-13
from flask import Flask, render_template
import urllib.request
import json
import time
import random
app = Flask(__name__)
numPics = 3
@app.route("/")
def root():
    output  = []
    data = getOut('https://api.darksky.net/forecast/75d477dd16502454e2d2d194739ce4b8/40.7128,74.0060')
    impData =data['currently']
    output.append("Currently, it's "+
                   time.strftime('(%Y-%m-%d %H:%M:%S)', time.localtime(impData['time']))+
                   " in NYC, and the sky seems ["+
                   impData['summary']+"]");
    data = getOut('https://api.nytimes.com/svc/topstories/v2/science.json?api-key=ntWrhhlPAfImr3yeiG848AQAu95YNZg1')
    impData = data['results'][0]
    output.append("Trending Science articles on the new york times:\n"+impData['title']+" "+impData['byline']+" : "+ impData['url']+"")
    data = getOut('https://api.jikan.moe/v3/anime/20/news')
    impData = random.choice(data['articles'])
    print(impData)
    output.append("Random News about Naruto:\n"+impData['title']+":" + impData['intro']
    +"| Posted on:" + impData['date']+"|")
    #render page
    return render_template("index.html", images = output)
def getData(data):
    req = urllib.request.Request(data)
    return urllib.request.urlopen(req)
def loadJSON(data):
    return json.loads(data.read())
def getOut(data):
    u = getData(data)
    return loadJSON(u)
if __name__ == "__main__":
    app.debug = True
    app.run()
