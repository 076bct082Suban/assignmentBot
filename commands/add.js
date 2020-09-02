module.exports = {
    name: 'add',
    description: 'Adds the class to the routine',

    execute(message, args, schedule, schedule_list) {
        console.log(args);
        try{
            const days_of_week = {
                'sun': 0,
                'mon': 1,
                'tue': 2,
                'wed': 3,
                'thru': 4,
                'fri': 5,
                'sat': 6,
            };
            const subject = args[0];
            const teacher = args[1];
            const link = args[2];
            const day = days_of_week[args[3]];
            const time = args[4];
            const time_more = args[5];

            const time_arr = time.split(':').map(x => parseInt(x));
            if (time_more === 'pm') {
                time_arr[0] += 12;
            }
            const hash = `${subject} ${teacher} ${args[3]} ${time_arr}`;
            schedule_list[hash] = [];
            if(!time_arr[1] - 15 < 0) {
                const alert = schedule.scheduleJob(`${time_arr[1] - 15} ${time_arr[0]} * * ${day}`, function() {
                    console.log('Alert time');
                    message.channel.send(`This is an alert message, class is supposed to be starting in 15 mins \n ${subject} class (${teacher}) ${link} @${time_arr[0]}:${time_arr[1]} ${args[3]}`);
                  });
                schedule_list[hash].push(alert);
            } else{
                if(time_arr[1] + 60 - 15 == 60) time_arr[1] = 0;
                const alert = schedule.scheduleJob(`${time_arr[1] - 15 + 60} ${time_arr[0] - 1} * * ${day}`, function() {
                    console.log('Alert time');
                    message.channel.send(`This is an alert message, class is supposed to be starting in 15 mins \n ${subject} class (${teacher}) ${link} @${time_arr[0]}:${time_arr[1]} ${args[3]}`);
                });
                schedule_list[hash].push(alert);
            }

            const event = schedule.scheduleJob(`${time_arr[1]} ${time_arr[0]} * * ${day}`, function() {
                console.log('Class time');
                message.channel.send(`Class starting \n ${subject} class (${teacher}) ${link} @${time_arr[0]}:${time_arr[1]} ${args[3]}`);
            });
            schedule_list[hash].push(event);
            console.log('finally');
            message.channel.send(`Class added \n ${subject} class (${teacher}) ${link} @${time_arr[0]}:${time_arr[1]} ${args[3]}`);

        } catch(err) {
            console.log(err);
            message.channel.send('Something went wrong');
        }
    },
};