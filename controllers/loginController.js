const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, name, isPremium) => {
    return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JWT_TOKEN_SECRET);
}

exports.login = (req, res, next) => {
    const data = req.body;
    console.log(data.email);
    Users.findAll({ where: { email: data.email } })
        .then(user => {
            // if user found
            if (user.length > 0) {
                // console.log(user.length);
                bcrypt.compare(data.password, user[0].password, (err, result) => {
                    if (err) {
                        console.log('err', result);
                        res.status(401).json({ message: 'Something went wrong...' });
                    }

                    if (result === true) {
                        // console.log('t', result);
                        const loginSuccess = async () => {
                            try {
                                const premiumCheck = await user[0].getOrders({ where: { status: 'SUCCESS' } });
                                console.log(premiumCheck);
                                if (premiumCheck.length > 0) {
                                    console.log(1, premiumCheck[0].status);
                                    res.json({ message: 'User Logged in Successfully', token: generateAccessToken(user[0].id, user[0].name, true) });
                                }
                                else {
                                    res.json({ message: 'User Logged in Successfully', token: generateAccessToken(user[0].id, user[0].name, false) });
                                }

                            } catch (err) {
                                console.log(err);
                            }
                        }

                        loginSuccess();
                    }
                    else {
                        // console.log('f', result);
                        res.status(401).json({ message: 'Wrong Password, Try Again' });
                    }
                })
            }
            // if user not found
            else {
                res.status(404).json({ message: 'User Not Found' });
            }
        })
        .catch(err => console.log(err));
};