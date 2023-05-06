const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-ekle')
    .setDescription('AloneDark Uptime | Sahip Özel Komut')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteye eklenecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('sebep')
            .setDescription('Karalisteye ekleme sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
     
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<a:iptal:1101538157192806450> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
      const KaralisteAlınamaz = new EmbedBuilder()
        .setDescription(`<a:iptal:1101538157192806450> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
        .setTitle("Hata")
      
      if(interaction.user.id !== "896668078904074250"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const sebep = interaction.options.getString('sebep');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteEklendi = new EmbedBuilder()
      .setDescription(`<a:onay1:1101538190315225110> ${kullanıcı} **adlı kullanıcı karalisteye eklendi, artık botu kullanamayacak.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      
      const KaralisteyeAlındı = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bir kullanıcı karalisteye eklendi")
         .addFields({name: ` **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: ` **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: ` **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: ` **Yetkili id**`, value: `${interaction.user.id}`})
         .addFields({name: ` **Karaliste eklenme sebebi**`, value: `${sebep}`})
      
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteAlınamaz]})
     
      if(!Karaliste) {
        
      db.set(`Karaliste_${kullanıcı.id}`, true)
      db.set(`KaralisteSebep_${kullanıcı.id}`, sebep)
    //  db.delete(`UptimeLink_${kullanıcı.id}`)
      interaction.reply({embeds: [KaralisteEklendi]})
        
      client.channels.cache.get("1102648806379618365").send({embeds: [KaralisteyeAlındı]})
     
      } else {
  
      const KaralistedeVar = new EmbedBuilder()
      .setDescription(`<a:iptal:1101538157192806450> ${kullanıcı} **adlı kullanıcı zaten karalistede bulunuyor.**`)
      .setColor('Red')
      .setTitle("Hata")
      
      interaction.reply({embeds: [KaralistedeVar]})
  
       }
    }
}


