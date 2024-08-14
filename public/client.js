const socket = io();
        const messageInput = document.getElementById("message");
        const sendButton = document.getElementById("send");
        const messagesContainer = document.getElementById('messages');

        // Listen for messages from the server
        socket.on('recieveMessage', message => {
            const item = document.createElement('div');
            item.classList.add('message', 'received');
            item.innerText = message;
            messagesContainer.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Send message to the server
        sendButton.addEventListener('click', () => {
            const message = messageInput.value;
            const item = document.createElement('div');
            item.classList.add('message', 'sent');
            item.innerText = message;
            messagesContainer.appendChild(item);
            socket.emit('sendMessage', message);
            messageInput.value = ''; // Clear the input after sending
            window.scrollTo(0, document.body.scrollHeight);
        });

        socket.on('connect', () => {
            console.log('Connected to server with ID:', socket.id);
        });