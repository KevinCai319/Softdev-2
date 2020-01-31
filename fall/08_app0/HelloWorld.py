from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello_world():
    print(__name__)
    print("This prints in terminal")
    return "<h2>Hello World</h2>"
@app.route("/test")
def test():
    return "HI"
@app.route("/nice")
def nice():
    return "<h1> Nice, you found this webpage</h1>"
if __name__ == "__main__":
    app.debug = True;
    app.run()
    hello_world();
