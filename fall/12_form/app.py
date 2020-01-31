#Kevin Cai -- Team Chezy Pofs
#SoftDev1 pd9
#K10 -- Jinja Tuning
#2019-09-21

from flask import Flask
from flask import render_template
from flask import current_app
from flask import request
import csv
import random

app = Flask(__name__)

#######  HOME PAGE #################################
@app.route("/")
def home_dir():
    return current_app.send_static_file('main.html') #LOADS MAIN.HTML

######## AUTH PAGE #################################

#Used to output dictionaries a bit nmore nicely.
def printDict(d):
    #iterate through keys and print key:value pairs
    for k in d:
        print("Key: "+k+" Value: "+d[k])
    print("\n")

@app.route("/auth")

def authenticate():
    print("App Object: \n")
    print(app);
    print("\nRequest: \n")
    print(request);
    print("\nRequest Arguments:")
    printDict(request.args)
    # Take out data from args dictionary(which is part of request) and pass it through to Jinja
    return render_template(
    'auth.html',
    username = request.args["username"],
    request_method = request.method
    )

#RANDOM DEBUG STATEMENTS
'''
def authenticate():
    print("\n\n\n")
    print("***DIAG: this Flask obj ***")
    print(app)
    print("***DIAG: request obj ***")
    print(request)
    print("***DIAG: request.args ***")
    print(request.args)
    #print("***DIAG: request.args['username'] ***")
    #print(request.args(['username']))
    #print("***DIAG: request.headers ***")
    #print(request.hdeaders)
    return "Waaaaa hooo HAAH"
'''

if __name__ == "__main__": #RUNS THE APP AT THE END
  app.debug = True
  app.run()
