import { environmentals } from './environmentals';

export const sessionConfig = {
    secret: String(environmentals.sessionId),
    resave: true,
    saveUninitialized: false
};
