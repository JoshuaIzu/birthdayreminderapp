import nodemailer from 'nodemailer';
import { createElement } from 'react';
import { INotificationService } from '../ports/INotificationService.js';
import { render } from '@react-email/render';
import BirthdayEmail from './emails/BirthdayEmail.jsx';

export class EmailNotificationAdapter extends INotificationService {
    constructor(smtpConfig) {
        super();
        this.transporter = nodemailer.createTransport(smtpConfig);
        this.fromAddress = smtpConfig.auth.user;
    }


    
    async sendBirthdayGreeting(user) {
        if (!user.email) return;
    
        try {
            const html = await render(createElement(BirthdayEmail, { name: user.name }));
            
            await this.transporter.sendMail({
                from: `"Birthday Reminders" <${this.fromAddress}>`,
                to: user.email,
                subject: "Happy Birthday!",
                html, 
            });
            console.log(`[Adapter: Email] Sent to ${user.email}`);
        } catch (error) {
            throw new Error(`SMTP Transport failed: ${error.message}`);
        }
    }
}