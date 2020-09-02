module.exports = {
    name: 'showToday',
    description: 'Shows today\'s classes',

    execute(message, args, schedule, schedule_list) {
        let to_send = '';
        const days_of_week = {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thru': 4,
            'fri': 5,
            'sat': 6,
        };
        let day = '';
        const date = new Date();
        for(const [key, value] of Object.entries(days_of_week)) {
            if(date.getDay() == value) {
                day = key;
            }
        }

        for (const [key] of Object.entries(schedule_list)) {
            console.log(key);
            const key_args = key.split(' ');
            if(key_args[2] == day) {
                to_send += `${key} \n`;
            }
          }
        message.channel.send(to_send);
    },
};