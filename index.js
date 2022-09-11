const Discord = require("discord.js");
const fs = require("fs")
const config = require("./config.json");

let client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent],
    partials: [Discord.Partials.Channel, Discord.Partials.Message, Discord.Partials.User]
});

client.config = config;
client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args, client));
	} else {
        client.on(event.name, (...args) => event.run(...args, client));
	}
}

const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
    const files = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of files) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
	console.log("Registered command " + command.name);
        if (command.aliases) {
            for (const alias of command.aliases) {
                client.aliases.set(alias, command);
		console.log("Registered alias " + command.name);
            }
        }
    }
}

client.login(config.bot.token);
