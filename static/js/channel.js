document.addEventListener('DOMContentLoaded', () => {

    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const user = localStorage.getItem('username')

    //add user name to nav bar
    document.querySelector('#navbar-user').innerHTML += user;

    //add real time message functionality
    document.querySelector('#message-form').onsubmit = () => {
        const message = document.querySelector('#message');

        if (message.value.length < 1) {
            alert('Message cannot be empty.');
            return false;
        }
        socket.emit('send message', {'channel': channelName,'author': user, 'message': message.value});
        message.value = '';
        return false;
    };

    socket.on('new message', data => {
        createMessage(data)
    })
});

function createMessage(message) {
    const messages = document.querySelector('#messages');

    const noMessagesText = document.querySelector('#no-messages');

    if (noMessagesText) {
        noMessagesText.remove();
    }

    const newMessage = document.createElement('li');
    newMessage.innerHTML = `${message.message} == <b> by ${message.author} on ${message.timestamp}</b>`;
    messages.append(newMessage)

    if (messageCounter < 100) {
        messageCounter++
    } else {
        messages.removeChild(messages.firstElementChild)
    }
}