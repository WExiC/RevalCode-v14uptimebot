const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") || []
module.exports = {
    name: 'ready',
      
    execute(client) {
     
      console.log(`AloneDark | Uptime Botu Aktif !!`)

      setInterval(function () {
        client.user.setActivity(`AloneDark • Uptime`)
        }, 30000)
    }
}
