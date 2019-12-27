import os
from datetime import datetime

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret!'
socketio = SocketIO(app)

channels = []


@app.route('/')
def index():
    return render_template('index.html', channels=channels)


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/channel/<string:name>')
def channel(name):
    for channel in channels:
        if channel['name'] == name:
            return render_template('channel.html', channel=channel, counter=len(channel['messages']))

    return render_template('index.html')


@socketio.on('create channel')
def create(data):
    channels.append({'name': data['name'], 'author': data['author'], 'messages': []})
    emit('new channel', {'name': data['name']}, broadcast=True)


@socketio.on('send message')
def message(data):
    new_message = {'author': data['author'],
                   'timestamp': datetime.now().strftime('%H:%M'),
                   'message': data['message']}

    for channel in channels:
        if channel['name'] == data['channel']:
            messages = channel['messages']
            message_number = len(messages)

            messages.append(new_message)

            if message_number > 100:
                messages.pop(0)

    emit('new message', new_message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
