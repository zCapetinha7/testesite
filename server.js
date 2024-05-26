const express = require('express');
const { Client, Intents } = require('discord.js');

const app = express();
const port = 3000;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => {
    console.log('Bot está online!');
});

client.login('MTI0NDEyNzY3NzY2MTU4MTMyMg.GhOAKo.b6vtmde9niyx3OcmKV9KmodIXhQELI7AmWin1U
');

// Endpoint para obter informações do servidor
app.get('/server-info', async (req, res) => {
    const guild = client.guilds.cache.get('1049070587181531186');
    if (!guild) return res.status(404).json({ error: 'Servidor não encontrado' });

    const members = await guild.members.fetch();
    const admins = members.filter(member => member.permissions.has('ADMINISTRATOR'));

    res.json({
        name: guild.name,
        memberCount: guild.memberCount,
        onlineCount: members.filter(member => member.presence?.status === 'online').size,
        admins: admins.map(admin => ({ username: admin.user.username, id: admin.user.id }))
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
