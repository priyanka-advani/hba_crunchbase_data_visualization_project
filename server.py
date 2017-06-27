from flask import Flask

app = Flask(__name__)

if __name__ == "__main__":

    connect_to_db(app)

    app.run()
