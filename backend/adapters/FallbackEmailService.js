import { INotificationService } from '../ports/INotificationService.js';

export class FallbackEmailService extends INotificationService {
    constructor(services) {
        super();
        this.services = services; 
    }

    async sendBirthdayGreeting(user) {
        for (let i = 0; i < this.services.length; i++) {
            try {
                await this.services[i].sendBirthdayGreeting(user);
                return; // Exits on the first successful send
            } catch (error) {
                console.warn(`[Adapter: Fallback] Service ${i + 1} failed. ${i + 1 < this.services.length ? 'Attempting fallback...' : ''}`);
            }
        }
        console.error(`[Adapter: Fallback]  CRITICAL: All email services failed for user ${user.name}`);
    }
}