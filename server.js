"use strict";

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// Folder for partial files.
hbs.registerPartials(__dirname + '/views/partials');
// Set the view engine
app.set('view engine', 'hbs');

// Custom Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: [${req.method}] ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write the file');
        }
    });

    // Required to called next()
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//     });
// });

// Serve a static directory
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    }); // default location is views/
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    }); // default location is views/
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch the URL'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
