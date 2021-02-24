const discord_o2 = require('discord-oauth2')

async function getUserObject(code) {
  discord_client = await new discord_o2({
    clientId: process.env.CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: "https://discordplaystictactoewebsite-1.justdevcreator.repl.co/login/",
    version: "v8"
  })
  token = await discord_client.tokenRequest({
    code: code,
    grantType: "authorization_code",
    scope: ["identify"]
  })
  const access_token = token.access_token
  const user = await discord_client.getUser(access_token)
  /*
  {
  id: '460143849172631553',
  username: 'just.',
  avatar: '7b7ca47c71085336a638e39ea5bc0efe',
  discriminator: '3095',
  public_flags: 256,
  flags: 256,
  locale: 'de',
  mfa_enabled: true
  }
   */
  return user
}

module.exports = getUserObject