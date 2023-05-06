const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
  slash: true,                                
  cooldown: 5,                              

    data: new SlashCommandBuilder()         
      .setName('duyuru-kaldır')
      .setDescription('AloneDark Uptime | Sahip Özel Komut')
      .setDMPermission(false)
      .addStringOption(option =>
        option
          .setName('duyuru')
          .setDescription('Kaldırılacak duyuruyu belirtin.')
          .setRequired(true)),
      
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
        .setDescription(`**<a:iptal:1101538157192806450> Bu komutu kullanabilmek için \`Bot sahibi\` olmalısın.**`)
        .setColor('Red')
        .setTitle("Olamaz Yetkin Yok")
      
      if(interaction.user.id !== "896668078904074250"){
      return interaction.reply({embeds: [YetkiYok]})
      }
      
      const duyuru = interaction.options.getString('duyuru')
        
      const Duyurular = db.fetch(`Duyurular`, [])
      if(!Duyurular.includes(duyuru)) {
      
      const DuyuruYok = new EmbedBuilder()
        .setDescription(`**<a:iptal:1101538157192806450> Sistemde \`${duyuru}\` adında bir duyuru bulunmuyor.**`)
        .setColor('Red')
        .setTitle("Duyuru yok")
      interaction.reply({embeds: [DuyuruYok]})
       
      } else {
      
      const Embed = new EmbedBuilder()
        .setTitle(`Duyuru Kaldırıldı`)
        .setDescription(`**<a:onay1:1101538190315225110> \`${duyuru}\` adlı duyuru sistemden kaldırıldı.**`)
        .setColor("Green")
      interaction.reply({embeds: [Embed]})
       
      db.unpush(`Duyurular`, `${duyuru}`)
   
    }
  }
}