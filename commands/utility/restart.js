const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "restart",
    description: "Перезапусть сервер",
    category: "utility",
    aliases: ["перезапуск"],
    run: async(client, msg, args) => {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return; 
        
        const output = await axios({
            url: client.config.pterodactyl.panel + '/api/client/servers/' + client.config.pterodactyl.serverID + '/power',
            method: 'POST',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + client.config.pterodactyl.apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'DBH'
            },
            data: {
                signal: "restart"
            }
        });

        msg.reply("Перезапускаю сервер...\n**Если сервер не перезапустился, возможно у сервера технические неполадки.**");
    }
}