const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-ekle')
    .setDescription('AloneDark Uptime | Sisteme Link Eklersiniz')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
  
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
      
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Normal bir kullanıcı en fazla 3 proje ekleyebilir, Destek sunucusuna gelerek link limitinizi arttırabilir veya premium alarak sınırsız link ekleme hakkı kazanabilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<a:onay1:1101538190315225110> **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<a:onay1:1101538190315225110> **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<a:onay1:1101538190315225110> **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<a:iptal:1101538157192806450>  **Sisteme hiç proje eklememişsin.**`)

      await interaction.showModal(LinkEklemeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linkeklemeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if(!link) return

        if(PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink]}).catch(e => { })
            }

        } else {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok]}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar]}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı]}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı]}).catch(e => { })
        }
      //if(!PremiumÜye) {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
      
     /* } else {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`PremiumUptimeLink`, link)
        
      }*/
        
        interaction.reply({embeds: [LinkEklendi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<a:iptal:1101538157192806450>"
        } else {
        PreVarmı = "<a:onay1:1101538190315225110>"
        }
      
      
        const ProjeEklendi = new EmbedBuilder()
           .setColor("Green")
           .setTitle("Sisteme Bir Link Eklendi")
           .addFields({name: ` **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
           .addFields({name: ` **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
           .addFields({name: ` **Kullanıcı id**`, value: `${interaction.user.id}`})
           .addFields({name: ` **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
           .addFields({name: ` **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
           .addFields({name: ` **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        
        client.channels.cache.get("1102638997810983012").send({embeds: [ProjeEklendi]})
     })
  }
}