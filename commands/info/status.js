const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "status",
    description: "Информация об онлайне сервера",
    category: "info",
    aliases: ["stat","статус"],
    run: async(client, msg, args) => {
	axios({
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
	}).then((resPteroResource) => {
		//console.log(resPteroResource);
	axios({
                url: client.config.pterodactyl.panel + '/api/client/servers/' + client.config.pterodactyl.serverID,
                method: 'GET',
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                        'Authorization': 'Bearer ' + client.config.pterodactyl.apiKey,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
			'User-Agent': 'DBH'
                }
        }).then((resPteroServer) => {
		//console.log(resPteroResource.data);
		//console.log(resPteroServer.data.attributes.relationships.allocations.data);
	axios({
		url: "https://api.mcsrvstat.us/2/" + client.config.server.ip /*resPteroServer.data.attributes.relationships.allocations.data[0].ip_alias*/ + ":" + /*resPteroServer.data.attributes.relationships.allocations.data[0].port*/ client.config.server.port,
		method: "GET"
	}).then((resSrv) => {
		//console.log(resSrv.data);
		
	let pteroServer;

	if(resPteroResource.data.attributes.current_state === "running") {
		pteroServer = "Запущен 🟢";
	} else if(resPteroResource.data.attributes.current_state === "starting") {
		pteroServer = "Запускается 🟠";
	} else if(resPteroResource.data.attributes.current_state === "stopping") {
		pteroServer = "Выключается 🟠";
	} else if(resPteroResource.data.attributes.current_state === "stopped") {
		pteroServer = "Выключен🔴";
	}

	let mcServer;

	if(resSrv.data.online) {
		mcServer = "Запущен 🟢"
	} else {
		mcServer = "Выключен 🔴";
	}

	const embed = new Discord.EmbedBuilder()
		.setTitle("Статус сервера")
		.setDescription(`Внешний сервер: ${pteroServer}\nСервер майнкрафт: ${mcServer}\nКоличество игроков: ${resSrv.data.players.online}/${resSrv.data.players.max}\nИгроки: ${resSrv.data.players?.list ? resSrv.data.players.list : "Отсутствуют"}`)
		.setTimestamp();

	msg.reply({ embeds: [embed] });

	});
	});
	});
    }
}
