const express = require("express")

module.exports = (app) => {
    const userHandlers = require('../controllers/auth');
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/login')
        .post(userHandlers.login);
};