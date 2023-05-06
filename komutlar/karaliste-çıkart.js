const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-çıkart')
    .setDescription('AloneDark Uptime | Sahip Özel Komut')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteden çıkartılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
         .setDescription(`<a:iptal:1101538157192806450> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
         .setColor('Red')
         .setTitle("Hata")
        
     if(interaction.user.id !== "896668078904074250"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteÇıkartılmaz = new EmbedBuilder()
        .setDescription(`<a:iptal:1101538157192806450> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
        .setTitle("Hata")
      
      const KaralisteGitti = new EmbedBuilder()
      .setDescription(`<a:onay1:1101538190315225110> ${kullanıcı} **adlı kullanıcı karalisteden çıkartıldı, artık botu kullanabilir.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      
      const KaralistedenÇıkartıldı = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcı karalisteden çıkartıldı")
         .addFields({name: `<:Karaliste:1047167116727550023> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: `<:Kullanici:1046824624165486685> **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: `<:Yetkili:1047167457703497728> **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Yetkili id**`, value: `${interaction.user.id}`})
       
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteÇıkartılmaz]})
     
      if(!Karaliste) {
        
        const KaralistedeYok = new EmbedBuilder()
           .setDescription(`<a:iptal:1101538157192806450> ${kullanıcı} **adlı kullanıcı zaten karalistede bulunmuyor.**`)
           .setColor('Red')
           .setTitle("Hata")
        
        interaction.reply({embeds: [KaralistedeYok]})
      
      } else {
       
        db.delete(`Karaliste_${kullanıcı.id}`)
        db.delete(`KaralisteSebep_${kullanıcı.id}`)
        interaction.reply({embeds: [KaralisteGitti]})
        client.channels.cache.get("1102649124408533022").send({embeds: [KaralistedenÇıkartıldı]})
        
        }
    }
}