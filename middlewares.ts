import express from 'express';

export const isUserLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.user) {
        res.send({
            user: req.user,
            message: 'Already signed in'
        });
    } else {
        next();
    }
};

export const isUserLoggedOut = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.user) {
        res.send({
            user: req.user,
            message: 'User is not signed in'
        });
    } else {
        next();
    }
};
