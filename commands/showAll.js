module.exports = {
    name: 'showAll',
    description: 'Shows all the classes',

    execute(message, args, schedule, schedule_list) {
        let to_send = '';
        for (const [key] of Object.entries(schedule_list)) {
            console.log(key);
            to_send += `${key} \n`;
          }
        message.channel.send(to_send);
    },
};