const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('sil')
    .setDescription('AloneDark Uptime | Sahip Özel Komut')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
    }
}