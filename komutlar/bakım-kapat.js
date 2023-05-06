const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { botid } = require('../ayarlar.json')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('bakım-kapat')
    .setDescription('AloneDark Uptime | Sahip Özel Komut')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(` Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
      
    if(interaction.user.id !== "896668078904074250"){
    return interaction.reply({embeds: [YetkiYok]});
}
      
      const Bakım = db.fetch(`Bakım`)
      const Sebep = db.fetch(`BakımSebep`)
      
      if(!Bakım) {
        
      const BakımKapalı = new EmbedBuilder()
      .setDescription(`<a:iptal:1101538157192806450> **Bot zaten bakımda bulunmuyor.**`)
      .setColor('Red')
      .setTitle("Hata")
      interaction.reply({embeds: [BakımKapalı]})
        
      } else {
        
      db.delete(`Bakım`)
      db.delete(`BakımSebep`)
        
      const BakımKapatıldı = new EmbedBuilder()
      .setDescription(`<a:onay1:1101538190315225110> **Bot bakımdan çıkartıldı.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      interaction.reply({embeds: [BakımKapatıldı]})
      
        }
     }
  }