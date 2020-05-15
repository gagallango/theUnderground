const favicon = require('serve-favicon')
const path = require('path')
const express = require('express')
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}

module.exports = app => {
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'hbs')
    app.use(express.static(path.join(__dirname, '..', 'public')))
    // app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')))
    app.use(ignoreFavicon);
}
