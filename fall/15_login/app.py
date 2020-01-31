# Team Sandwich - Sophie Nichol and Kevin Cai
# SoftDev1 pd9
# K15 -- Do I know you?
# 2019-10-02

from flask import Flask, session, redirect
from flask import render_template
from flask import current_app
from flask import request
import os
import csv
import random

app = Flask(__name__)
app.secret_key = os.urandom(24)
hardcoded_usr = 'Hello'
hardcoded_psswd = 'World'


def getSession():
    if not 'login' in session:
        session['login'] = 'false'
    return session['login']


def endSession():
    session['login'] = 'false'
    session.pop('Username', None)
    session.pop('Password', None)
    session.pop('Messages', None)
#######  HOME PAGE #################################
@app.route("/")
def home_dir():
    # IF USER ALREADY LOGGED IN,REDIRECT. OTHERWISE GO TO LOGIN
    if getSession() == 'false':
        return redirect("/login")
    else:
        return redirect("/welcome")


@app.route("/login")
def login():
    # IF USER ALREADY LOGGED IN,REDIRECT
    if getSession() == 'true':
        return redirect("/welcome")
    return render_template("login.html",
                           usr=hardcoded_usr,
                           psswd=hardcoded_psswd)


@app.route("/logout")
def logout():
    # REMOVE ALL SESSION COOKIES
    endSession()
    return redirect("/login")


@app.route("/login_check")
def login_check():
    # BUILD ERROR MESSAGE
    session['Messages'] = 'Your '
    session['Username'] = request.args['Username']
    session['Password'] = request.args['Password']
    if session['Username'] == hardcoded_usr:
        if session['Password'] == hardcoded_psswd:
            session['login'] = 'true'
            return redirect("/welcome")
        else:
            session['Messages'] += 'password'
    else:
        session['Messages'] += 'username'
        if session['Password'] != hardcoded_psswd:
            session['Messages'] += ' AND password'
    return redirect("/error")


@app.route("/welcome")
def welcome():
    # IF USER ALREADY LOGGED IN,REDIRECT
    if getSession() == 'true':
        return render_template("welcome.html")
    session['Messages'] = 'You cannot acess this page without signing in.'
    return redirect("/error")


@app.route("/error")
def error():
    # IF USER ALREADY LOGGED IN,REDIRECT
    if getSession() == 'true':
        return redirect("/welcome")
    return render_template("error.html", message=session['Messages'])


if __name__ == "__main__":  # RUNS THE APP AT THE END
    app.debug = True
    app.run()
