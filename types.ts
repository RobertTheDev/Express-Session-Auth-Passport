export interface User {
    id: number;
    email: string;
    password: string;
}

declare module 'express-session' {
    interface SessionData {
        user?: User;
    }
}
