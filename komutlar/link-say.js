const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-say')
    .setDescription('AloneDark Uptime | Sistemdeki Linklerin Sayısını Gösterir')
    .setDMPermission(false),
  
    async execute(client, interaction) {  
      
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      const Linkler = db.fetch(`UptimeLink`) || []
      const KişiLinkleri = db.fetch(`UptimeLink_${interaction.user.id}`) || []

      if(!Uptime.length <= 0) {
        
      const SayYok = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("AloneDark Uptime • Proje sayıları")
         .addFields({name: ` **Sistemdeki toplam projeler**`, value: `${Linkler.length}`})
         .addFields({name: ` **Senin toplam projelerin**`, value: `Hiç link eklememişsin.`})
         .addFields({name: ` **Toplam premium üyeler**`, value: `${db.fetch(`PremiumSayı`) || 0}`})
         .addFields({name: ` **Link ekleme hakkın**`, value: `${Limit}`})
        
      interaction.reply({embeds: [SayYok]})
      
      } else {
      
      const Say = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("AloneDark Uptime • Proje sayıları")
         .addFields({name: ` **Sistemdeki toplam projeler**`, value: `${Linkler.length}`})
         .addFields({name: ` **Senin toplam projelerin**`, value: `${KişiLinkleri.length}`})
         .addFields({name: ` **Toplam premium üyeler**`, value: `${db.fetch(`PremiumSayı`) || 0}`})
         .addFields({name: ` **Link ekleme hakkın**`, value: `${Limit}`})
        
      interaction.reply({embeds: [Say]})
        
        }
    }
}
