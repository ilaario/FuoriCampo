const { v4: uuidv4 } = require('uuid');

/**
 * Initializes the socket.io server and sets up event listeners for various socket events.
 *
 * @param {Object} io - The socket.io server instance.
 */
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        /**
         * Event listener for 'generate id'.
         * - Generates a unique user ID using the UUID library.
         * - Associates the generated user ID with the current socket.
         * - Emits the 'user id' event with the generated user ID.
         */
        socket.on('generate id', () => {
            // Generate a unique user ID
            const userId = uuidv4().slice(0, 8);

            // Associate the user ID with the socket
            socket.userId = userId;

            // Emit the 'user id' event with the user ID
            socket.emit('user id', userId);
        });

        /**
         * Event listener for 'chat message'.
         * - Broadcasts the received chat message to all clients in the specified room.
         *
         * @param {string} room - The room to broadcast the message to.
         * @param {string} msg - The chat message content.
         * @param {string} name - The username of the message sender.
         */
        socket.on('chat message', (room, msg, name) => {
            io.to(room).emit('chat message', msg, name); // Broadcast the message to all connected clients
        });

        /**
         * Event listener for 'create or join conversation'.
         * - Joins the specified room.
         * - Broadcasts the 'create or join conversation' event to all clients in the room.
         *
         * @param {string} room - The room to join or create.
         * @param {string} name - The username of the participant.
         */
        socket.on('create or join conversation', (room, name) => {
            socket.join(room);
            io.to(room).emit('create or join conversation', name); // Broadcast the message to all connected clients
        });

        /**
         * Event listener for 'disconnect'.
         * - Logs a message indicating that a user has disconnected.
         */
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
