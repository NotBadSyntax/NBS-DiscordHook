const discord = require('discord.js');
const MAX_MESSAGE_LENGTH = 40;

module.exports.send = (id, token, repo, branch, url, commits, size) => new Promise((resolve, reject) => {
    var client;
    console.log("Preparing Webhook...");
    try {
        client = new discord.WebhookClient(id, token);
    }
    catch (error) {
        reject(error.message);
        return;
    }

    client.send(createEmbed(repo, branch, url, commits, size)).then(() => {
        console.log("Successfully sent the message!");
        resolve();
        process.exit(0);
    }, reject);
});

function createEmbed(repo, branch, url, commits, size) {
    console.log("Constructing Embed...");
    var latest = commits[0];

    const changes = getChangeLog(commits, size);
    console.log(changes)

    return new discord.MessageEmbed()
        .setColor(12583109)
        .setURL(url)
        .setAuthor(repo, "https://cdn.discordapp.com/attachments/705360312236244993/844518222467432458/MOSHED-2021-5-19-12-13-45.gif", null)
        .setDescription("<:issueopened:507340024786845706> **Information of push:**\n" +
            "> Amount of commits: **" + size + "**\n" +
            "> Branch: **" + branch + "**\n" +
            "\n" +
            ":paperclips: **Commits:**\n" + changes)
        .setTimestamp(Date.parse(latest.timestamp));
}

function getChangeLog(commits, size) {
    let changelog = "";

    for (const i in commits) {
        if (i > 3) {
            changelog += `> + **${size - i}** more...\n`;
            break;
        }

        const commit = commits[i];
        const sha = commit.id.substring(0, 6);
        const message = commit.message.length > MAX_MESSAGE_LENGTH ? (commit.message.substring(0, MAX_MESSAGE_LENGTH) + "...") : commit.message;
        changelog += `> **•** ${message} (@${commit.author.username}) [\`${sha}\`](${commit.url})\n`;
    }

    return changelog;
}
