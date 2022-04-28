const jwt = require("jsonwebtoken")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
require("dotenv").config()

function hashPassword(password) {
    const salt = genSaltSync(10, 'b');

    return hashSync(password, salt);
}

function comparePassword(plainPassword, hashedPassword) {
    const compare = compareSync(plainPassword, hashedPassword);
    return compare;
}

function generateToken(payload, expiresIn) {
    var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
    return token;
}

function decodeToken(token) {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    return verify;
}

module.exports = { hashPassword, comparePassword, generateToken, decodeToken }