// Minimal SignalR chat client
(() => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl('/chathub')
        .withAutomaticReconnect()
        .build();

    const messagesList = document.getElementById('messagesList');
    const userInput = document.getElementById('userInput');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    function appendMessage(user, message) {
        const el = document.createElement('div');
        el.innerHTML = `<strong>${escapeHtml(user)}:</strong> ${escapeHtml(message)}`;
        messagesList.appendChild(el);
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe.replace(/[&<"'`=\/]/g, function (s) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '=': '&#x3D;',
                '`': '&#x60;'
            })[s];
        });
    }

    connection.on('ReceiveMessage', (user, message) => {
        appendMessage(user, message);
    });

    connection.start().catch(err => console.error(err.toString()));

    sendButton.addEventListener('click', (e) => {
        const user = userInput.value || 'Anonymous';
        const message = messageInput.value;
        if (!message) return;
        connection.invoke('SendMessage', user, message).catch(err => console.error(err.toString()));
        messageInput.value = '';
        messageInput.focus();
    });

    messageInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
})();
