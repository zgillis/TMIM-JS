/*  The Most Interesting Man in The World  *
 *      Slack Chatbot by Zach Gillis       */
const Botkit = require('botkit');
const VERSION = '0.1';

console.log('The Most Interesting Man in The World Chatbot - v' + VERSION);
console.log('====================================================')

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token : process.env.token,
    db_host: process.env.db_host,
    db_user: process.env.db_user,
    db_pass: process.env.db_pass,
    db_name: process.env.db_name
}).startRTM();

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        console.log(message.text);
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello there, <@' + message.user + '>. Stay thirsty my friend.');
        }
    });
});