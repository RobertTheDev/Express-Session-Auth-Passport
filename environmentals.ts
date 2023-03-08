import dotenv from 'dotenv';

dotenv.config();

export const environmentals = {
    port: process.env.PORT,
    sessionId: process.env.SESSION_ID
};
