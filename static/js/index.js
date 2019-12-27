// check if user is logged in
const user = localStorage.getItem('username')
if (!user) {
    window.location.href = '/login'
}

document.addEventListener('DOMContentLoaded', () => {

    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    //add user name to nav bar
    document.querySelector('#navbar-user').innerHTML += user;

    // add logout functionality to button
    document.querySelector('#logout').onclick = () => {
        localStorage.removeItem('username');
        window.location.replace('/');
    };

    // create new channel div
    document.querySelector('#channel-form').onsubmit = () => {
        const channelName = document.querySelector('#channel-name');

        if (channelName.value.length < 1) {
            alert('Please enter a name for the new channel.');
            return false;
        }

        socket.emit('create channel', { 'name': channelName.value, 'author': user});
        channelName.value = '';

        return false;
    }

    // add new channels in real time.
    socket.on('new channel', data => {
        createChannel(data.name);
    });
});

function createChannel(name) {

    const noChannelsMessage = document.querySelector('#no-channels');

    if (noChannelsMessage) {
        noChannelsMessage.remove();

    }
    const channel = document.createElement('div');
    channel.className = 'channel';
    channel.innerHTML = `<a href="/channel/${name}">Channel: <b>${name}</b> by <b>${user}</b></a>`;

    const channelList = document.querySelector('#channel-list');
    channelList.insertBefore(channel, channelList.firstChild);
}