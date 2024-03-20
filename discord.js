// Import the discord.js module
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// Prefix for commands
const prefix = '!';

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Bot is ready!');
});

// Event listener for incoming messages
client.on('message', async message => {
    // Ignore messages from other bots and non-command messages
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Parse the command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Command to create a new ticket
    if (command === 'ticket') {
        // Check if the command was sent in a guild (server)
        if (!message.guild) return message.reply('This command can only be used in a server.');

        // Create a new text channel for the ticket
        const channel = await message.guild.channels.create(`ticket-${message.author.username}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
                },
            ],
        });

        // Send a welcome message
        channel.send(`Welcome ${message.author}! Please describe your issue here.`);
    }
});

// Log in to Discord with your app's token
client.login('MTIxOTgxMzA2NjI5NzA1MzMyNQ.GURDbw.D-rOkbEy1YIqb12B_DdmSzwvC66PwhCSRIEPbg');
