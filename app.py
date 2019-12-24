import os

from flask import Flask, render_template, jsonify, request

# from flask_socketio import SocketIO, emit

app = Flask(__name__)
"""
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
"""

channels = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/create', methods=['POST'])
def create():
    new_channel = request.form.get('channel-name')
    channels.append(new_channel)
    return render_template('index.html')
