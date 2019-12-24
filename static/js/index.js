// check if user is logged in
if (!localStorage.getItem('username')) {
    window.location.href = '/login'
}

document.addEventListener('DOMContentLoaded', () => {

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

        const channel = document.createElement('div');
        channel.className = 'channel';
        channel.innerHTML = channelName.value;
        channelName.value = '';

        const noChannelsMessage = document.querySelector('#no-channels');

        if (noChannelsMessage) {
            noChannelsMessage.remove();
        }

        const channelList = document.querySelector('#channel-list');
        channelList.insertBefore(channel, channelList.firstChild);


        return false;
    }

});