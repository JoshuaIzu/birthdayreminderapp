import schedule from 'node-schedule';
import { processBirthdays } from '../core/processBirthday.js';

const initScheduler = (userRepository, notificationService) => {

    const tz = process.env.TZ || 'Africa/Lagos';
    console.log(`[System] Initializing daily birthday cron job (Scheduled for 07:00 AM ${tz})...`);

    const rule = new schedule.RecurrenceRule();
    rule.hour = 7;
    rule.minute = 0;
    rule.tz = tz;

    const job = schedule.scheduleJob(rule, async () => {
        console.log('\n[Cron] Triggering daily birthday check...');
        
        try {
            const result = await processBirthdays(userRepository, notificationService, new Date());
            console.log(`[Cron] Job complete. Processed ${result.processed} users.`);
        } catch (error) {
            console.error('[Cron] Job failed during execution:', error);
        }
    });

    return job;
};

export { initScheduler };