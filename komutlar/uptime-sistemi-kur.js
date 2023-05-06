const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('AloneDark Uptime | Sunucuya Ait Uptime Sistemi Kurarsınız')
    .setDMPermission(false)
    .addChannelOption(option =>
        option
            .setName('kanal')
            .setDescription('Uptime sisteminin kurulacağı kanalı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        
      const kanal = interaction.options.getChannel('kanal');
      const Sistem = db.fetch(`UptimeSistemi_${interaction.guild.id}`)
      
      if(!Sistem) {
          
        const SistemAçıldı = new EmbedBuilder()
             .setColor("Green")
             .setTitle("Başarılı")
             .setDescription(`<a:onay1:1101538190315225110> **Uptime sistemi <#${kanal.id}> adlı kanalda kuruldu.**`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blurple")
             .setTitle("AloneDarkUptime • Uptime sistemi")
             .setDescription(`
> **AloneDark Uptime Sistemine Hoş geldiniz.**
            
> **Aşağıda ki \`Link Ekle\` - \`Link Sil\` - \`Link Liste\` Butonları İle Sistemi Kullanabilirsiniz.**
             
> **Diğer Komutlarıma Erişmek İçin \` /yardım \` Komutunu kullanabilirsiniz.**
`)
     
        const EkleButonu = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
           .setEmoji("<:ykle:1102629952802791515>")
           .setLabel("Link Ekle")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("eklebuton"))
        
        const SilButonu = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
           .setEmoji("<:balant:1102629937782997052>")
           .setLabel("Link Sil")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("silbuton"))
              
        const ListeButonu = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
           .setEmoji("<:igne:1102629944250617887>")
           .setLabel("Link Liste")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("listebuton"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [EkleButonu, SilButonu, ListeButonu]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Hata")
         .setDescription(`<a:iptal:1101538157192806450> **Sistem zaten açık. Sıfırlamak için: </uptime-sistemi-sıfırla:0>**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}