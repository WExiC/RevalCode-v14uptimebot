const Discord = require('discord.js')
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-sil')
    .setDescription('AloneDark Uptime | Sistemden Link Silersiniz')
    .setDMPermission(false),
  
    async execute(client, interaction) { 
      
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Tik:1046504590775947274> **Projen başarıyla sistemden silindi.**`)
    
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform')
    .setTitle('Link sil')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi);
      
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      await interaction.showModal(LinkSilmeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linksilmeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
      
     // if(!PremiumÜye) {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
     
     /* } else {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`PremiumUptimeLink`, linkInput)
        
      }*/
        interaction.reply({embeds: [LinkSilindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<a:iptal:1101538157192806450>"
        } else {
        PreVarmı = "<:Tik:1046504590775947274>"
        }
  
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link silindi")
         .addFields({name: ` **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: ` **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: ` **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: ` **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1102639763258875924").send({embeds: [ProjeSilindi]})
        
      })  
   }
}