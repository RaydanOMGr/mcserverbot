const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "start",
    description: "Запустить сервер",
    category: "utility",
    aliases: ["запуск"],
    run: async(client, msg, args) => {
        const res = await axios({
            url: client.config.pterodactyl.panel + '/api/client/servers/' + client.config.pterodactyl.serverID + '/resources',
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + client.config.pterodactyl.apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'DBH'
            }
        });

        if(res.data.attributes.current_state === "running") {
            return msg.channel.send("Сервер уже запущен!");
        }
        
        await axios({
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
                signal: "start"
            }
        });
        msg.reply("Запускаю сервер...\n**Если сервер не запустился, возможно у сервера технические неполадки.**");
    }
}