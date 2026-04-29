import schedule from 'node-schedule';
import { processBirthdays } from '../core/processBirthday.js';

const initScheduler = (userRepository, notificationService) => {
    console.log('[System] Initializing daily birthday cron job (Scheduled for 07:00 AM)...');

    const job = schedule.scheduleJob('0 7 * * *', async () => {
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