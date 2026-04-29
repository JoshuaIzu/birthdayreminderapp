import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { MongooseUser } from './adapters/mongooseUser.js';
import { EmailNotificationAdapter } from './adapters/EmailNotification.js';
import { FallbackEmailService } from './adapters/FallbackEmailService.js';
import { createApiRouter } from './infastructure/apiRouter.js';
import { initScheduler } from './infastructure/cronScheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DATABASE_NAME
        });
        const userRepository = new MongooseUser();

        const mailAccountOne = new EmailNotificationAdapter({
            host: process.env.SMTP_HOST_1,
            port: parseInt(process.env.SMTP_PORT_1, 10),
            secure: false,
            auth: { user: process.env.SMTP_USER_1, pass: process.env.SMTP_PASS_1 }
        });

        const mailAccountTwo = new EmailNotificationAdapter({
            host: process.env.SMTP_HOST_2,
            port: parseInt(process.env.SMTP_PORT_2, 10),
            secure: false,
            auth: { user: process.env.SMTP_USER_2, pass: process.env.SMTP_PASS_2 }
        });

        const multiSender = new FallbackEmailService([mailAccountOne, mailAccountTwo]);

        const apiRouter = createApiRouter(userRepository);
        app.use('/api/birthdays', apiRouter);

        initScheduler(userRepository, multiSender);

        // Serve frontend static files in production
        if (process.env.NODE_ENV === 'production') {
            const frontendDist = path.resolve(__dirname, '..', 'frontend', 'dist');
            app.use(express.static(frontendDist));
            app.get('*', (_req, res) => {
                res.sendFile(path.join(frontendDist, 'index.html'));
            });
        }

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`[System] API Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('[System] Failed to start application:', error);
        process.exit(1);
    }
};

startApp();
