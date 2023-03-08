import express from 'express';
import session from 'express-session';
import { sessionConfig } from './configs';
import { User } from './types';
import passport from 'passport';
import { isUserLoggedIn, isUserLoggedOut } from './middlewares';
import './passport';
import { environmentals } from './environmentals';

const app = express();

app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.authenticate('session'));

app.post('/login', isUserLoggedIn, function (req, res, next) {
    passport.authenticate(
        'local',
        function (err: Error, user: User, info: { message: string }) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({ message: info.message, user });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send({ message: info.message, user });
            });
        }
    )(req, res, next);
});

app.post('/logout', isUserLoggedOut, function (req, res, next) {
    req.logout(function (err: Error) {
        if (err) {
            return next(err);
        }
        res.send({
            message: 'User logged out.'
        });
    });
});

app.get('/user', (req, res) => {
    res.send(req.user);
});

app.listen(environmentals.port, () => {
    console.log(`App is listening on port ${environmentals.port}.`);
});
