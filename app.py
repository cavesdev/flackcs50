import os

from flask import Flask, render_template, jsonify, request

from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret!'
socketio = SocketIO(app)

channels = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/channel/<string:name>')
def channel(name):
    print(name)
    return render_template('index.html')


@socketio.on('create channel')
def create(data):
    channels.append(data['name'])
    print(channels)
    emit('new channel', { 'name': data['name']}, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
