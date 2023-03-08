import passport from 'passport';
import users from './data';
import { User } from './types';
import LocalStrategy from 'passport-local';

passport.serializeUser(function (user: Express.User, cb) {
    process.nextTick(function () {
        cb(null, user);
    });
});

passport.deserializeUser(function (user: User, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(
    new LocalStrategy.Strategy(function verify(username, password, cb) {
        const user = users.find((user) => user.email === username);
        if (user) {
            const checkPasssword = user.password === password;
            if (checkPasssword) {
                const { password, ...userWithoutPassword } = user;
                return cb(null, userWithoutPassword, {
                    message: 'User successfully signed in.'
                });
            } else {
                return cb(null, false, { message: 'Password incorrect' });
            }
        } else {
            return cb(null, false, {
                message: 'No user found with that email.'
            });
        }
    })
);
