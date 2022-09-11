module.exports = {
    name: "messageCreate",
    run: (message, client) => {
	    console.log("messageCreate start");
    	if (message.author.bot) return;
	    console.log(client.config.bot.prefix.toLowerCase() + " if statement " + message.content.toLowerCase().startsWith(client.config.bot.prefix.toLowerCase()) + " message content " + message.content)
    	if (!message.content.toLowerCase().startsWith(client.config.bot.prefix.toLowerCase())) return;

	    console.log("messageCreate mid");
    
    	const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g);
    	const command = args.shift().toLowerCase();
    	const cmd = client.commands.get(command);
    	const alias = client.aliases.get(command);
    
    	if (cmd) {
    	    try { 
    	        cmd.run(client, message, args, command); 
    	    } catch(err) { 
    	        console.error(err); msg.reply(err);
    	    }
    	} else if(alias) {
    	    try {
    	        alias.run(client, message, args, command);
    	    } catch(err) {
    	        console.error(err); msg.reply(err);
    	    }
    	}
    }
};
