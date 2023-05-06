const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yardım')
    .setDescription('AloneDark Uptime | Uptime Yardım Menüsünü Açar')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const Duyuru = db.fetch(`Duyurular`)
      if(!Duyuru) {
       
      const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://cdn.discordapp.com/attachments/1102604959276613754/1102614245079785532/alonedark.gif")
         .setTitle("AloneDarkUptime • Yardım menüsü")
         .setDescription(`
**\` /yardım \` - Yardım menüsünü gösterir.**

**\` /link-say \` - Sistemdeki link sayılarını gösterir.**

**\` /link-ekle \` - Sisteme link eklersiniz.**

**\` /link-sil \` - Sistemden link silersiniz.**

**\` /link-liste \` - Sistemdeki linklerinizi listeler.**

**\` /premium-kontrol \` - Premium üyeliğinizin olup, olmadığını gösterir.**

**\` /uptime-sistemi-kur \` - Sunucuya özel butonlu uptime sistemini kurarsınız.**

**\` /uptime-sistemi-sıfırla \` - Sunucudaki uptime sistemini sıfırlar.**

**\`> > Duyurular : < <\`
**Aktif bir duyuru bulunmuyor.**
`)
      interaction.reply({embeds: [Yardım]})
        
      } else {
       
        const duyurular = db.fetch(`Duyurular`).map(y => `**Botun Duyurusu : \`${y}\`**`).join("\n")
        
        const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://cdn.discordapp.com/attachments/1102604959276613754/1102614245079785532/alonedark.gif")
         .setTitle("AloneDarkUptime • Yardım menüsü")
         .setDescription(`
**\` /yardım \` - Yardım menüsünü gösterir.**

**\` /link-say \` - Sistemdeki link sayılarını gösterir.**

**\` /link-ekle \` - Sisteme link eklersiniz.**

**\` /link-sil \` - Sistemden link silersiniz.**

**\` /link-liste \` - Sistemdeki linklerinizi listeler.

**\` /premium-kontrol \` - Premium üyeliğinizin olup, olmadığını gösterir.**

**\` /uptime-sistemi-kur \` - Sunucuya özel butonlu uptime sistemini kurarsınız.**

**\` /uptime-sistemi-sıfırla \` - Sunucudaki uptime sistemini sıfırlar.**

**\`> > Duyurular : < <\`
${duyurular || "Aktif bir duyuru bulunmuyor."}
`)
      interaction.reply({embeds: [Yardım]})
        
    }   
  }
}