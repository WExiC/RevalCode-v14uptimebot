const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-al')
    .setDescription('AloneDark Uptime | Sahip Özel Komut')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premiumu alınacak kullanıcıyı belirtin.')
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
      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumAlındı = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Başarılı")
         .setDescription(`<a:onay1:1101538190315225110> ${kullanıcı} **adlı kullanıcının premiumu alındı.**`)
        
      const PremiumYok = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Hata")
         .setDescription(`<a:iptal:1101538157192806450> ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunmuyor.**`)
        
      const PremiumGitti = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bir kullancının premiumu alındı")
         .addFields({name: ` **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${kullanıcı.id}`})
         
      if(!PremiumÜye) {
      
      interaction.reply({embeds: [PremiumYok]}) 
      
      } else {
   
      db.delete(`PremiumÜye_${kullanıcı.id}`)
      interaction.reply({embeds: [PremiumAlındı]})
      client.channels.cache.get("1102650354195251301").send({embeds: [PremiumGitti]})
      db.subtract(`PremiumSayı`, 1)
        
       }
    }
}