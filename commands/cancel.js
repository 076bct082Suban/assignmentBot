module.exports = {
    name: 'cancel',
    description: 'Cancels something fron schedule',

    execute(message, args, schedule, schedule_list) {
        // Todo
        try {
            const subject = args[0];
            const teacher = args[1];
            const day = args[2];
            const time = args[3];
            const time_more = args[4];

            const time_arr = time.split(':').map(x => parseInt(x));
            if (time_more === 'pm') {
                time_arr[0] += 12;
            }
            const hash = `${subject} ${teacher} ${day} ${time_arr}`;
            const notifications = schedule_list[hash];
            if(!notifications) {
                message.channel.send('Could not find the class');
                return;
            }
            notifications[1].cancelNext();

            const rightnow = new Date();
            const days_of_week = {
                'sun': 0,
                'mon': 1,
                'tue': 2,
                'wed': 3,
                'thru': 4,
                'fri': 5,
                'sat': 6,
            };
            let need_to_change_alert = true;
            if(rightnow.getDay == days_of_week[args[2]]) {
                const d_notice = new Date(2020, 11, 24, time_arr[0], time_arr[1]);
                const d_alert = d_notice;
                d_alert.setMinutes(d_notice - 15);

                if(rightnow > d_alert && rightnow < d_notice) {
                    need_to_change_alert = false;
                }
            }
            if(need_to_change_alert) {
                notifications[0].cancelNext();
            }
            message.channel.send('Successfully canceled ');

        } catch (error) {
            console.log(error);
            message.channel.send('Expected "69# cancel {subject} {teacher} {day} {time} am/pm"');
        }

    },
};