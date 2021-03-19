const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
/*const commandFiles = fs.readdirSync('./comandos/').filter(file => file.endsWith('js'));*/

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
/*for(const file of commandFiles){
    const command = require(`./comandos/${file}`);

    client.commands.set(command.name, command);
};*/


/*client.on('message', message =>{ //identificar si tiene prefijo
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'amarillo'){
        client.commands.get('amarillo').run(client, message, args);
    }
    if(command === 'naranja'){
        client.commands.get('naranja').run(client, message, args);
    }
    if(command === 'rojo'){
        client.commands.get('rojo').run(client, message, args);
    }
    if(command === 'azul'){
        client.commands.get('azul').run(client, message, args);
    }
    if(command === 'rosa'){
        client.commands.get('rosa').run(client, message, args);
    }
    if(command === 'verde'){
        client.commands.get('verde').run(client, message, args);
    }
});

//mensajes
client.on('message', msg =>{
    if(msg.content === "este"){
        msg.reply('bendiciones🙏')
    } else if(msg.content === "gracias"){
        msg.reply('denada maricon')
    } else if(msg.content === "si"){
        msg.channel.send('no')
    } else if(msg.content === "el pepe"){
        msg.channel.send('https://cdn.discordapp.com/attachments/759012564977451048/760412416935985202/el-pepe-tremendo-pajero-eres-pepe_1.gif')
    } else if(msg.content === "sech"){
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760082441490268180/ete-sech-sech-moment.gif')
    } else if(msg.content === "guapo"){
        msg.reply('ya lo se gracias')
    } else if(msg.content === "maricon"){
        msg.reply('maricon tu puta madre')
    } else if(msg.content === "porque"){
        msg.reply('porque eres un parguela')
    } else if(msg.content === "Gracias"){
        msg.reply('denada maricon') 
    } else if(msg.content === "QUE"){
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760471916795658300/Tlz-Mx.gif')
    } else if(msg.content === "ciri"){
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760852615348748288/un-ciri-fazendo-pa.gif')
    } else if(msg.content === 'sechvideo'){
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760915195442102312/ete-sech-sech-moment.mp4')
    } else if(msg.content === 'el pepevideo'){
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760915224445845624/el-pepe-tremendo-pajero-eres-pepe.mp4')
    } else if(msg.content === 'cirivideo') {
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/760915267307307038/un-ciri-fazendo-pa.mp4')
    } else if(msg.content === 'duki') {
        msg.channel.send('https://cdn.discordapp.com/attachments/667473194323804170/761493397072510976/que-buen-dato-duki.mp4')
    }
})

//reaccionar mensajes

/*client.on('message', message => {
    let args = message.content.split(" ");
    switch (args[0]) {
        case 'vote':
            message.react('🇴').then(message.react('🇰')).then(message.react('👍'))
        break;
    }
});

client.on("message", message => {
    if(message.content === ("!c")){
        const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Colores: ", "**!rosa:** Color del nombre en rosa\n**!rojo:** Color del nombre en rojo\n**!verde:** Color del nombre en verde\n**!zaul:** Color del nombre en azul\n**!amarillo:** Color del nombre en amarillo\n**!naranja:** Color del nombre en naranja")
        message.channel.send(embed2)
    }
})

const got = require('got');
client.on('message', message => {
    if(message.content === "!meme") {
        const embed4 = new MessageEmbed()
        got('https://www.reddit.com/r/orslokx/random/.json').then(response => {
            let content = JSON.parse(response.body);
            console.log(content)
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed4.setTitle(`${memeTitle}`)
            embed4.setURL(`${memeUrl}`)
            embed4.setImage(memeImage)
            embed4.setColor('RANDOM')
            embed4.setFooter(`🤙🏿 ${memeUpvotes} 👎🏿 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed4);
        })
    }
})
*/
client.login(process.env.token);