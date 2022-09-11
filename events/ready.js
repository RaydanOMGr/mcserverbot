const fs = require("fs");
module.exports = { 
    name: "ready",
    once: true,
    run: async(client) => {
        console.clear();
        client.user.setActivity({ name: "Minecraft" });
        //client.user.setUsername(guild.name);
        //client.user.setAvatar(guild.iconURL());
    
        console.log("Logged in as " + client.user.tag);
         
    	/*console.log("Starting suggestions check...")
    	const suggestionChannel = guild.channels.cache.find(c => c.id === client.config.suggestionChannel);
    	await suggestionChannel.messages.fetch();
    	const lastTime = client.config.latestMessage;
    	suggestionChannel.messages.cache.forEach((m) => {
    	    if(lastTime < m.createdTimestamp) return;
    	    checker.checkForSuggestions(client, m);
    	});
    	console.log("Check ended.");*/
    }
}
