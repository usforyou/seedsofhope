const scheduler = require('node-schedule');

//unix cron -> every 5 mins
const clearExpiredDataJob = scheduler.scheduleJob('0 0/5 * 1/1 * ? *', () => {

})
