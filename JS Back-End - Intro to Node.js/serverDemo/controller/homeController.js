const { html } = require('../util');

const homePage = `
          <h1>Home</h>
          <p>Hello World</p>`;

const aboutPage = `
    <h1>About Us</h1>
    <p>Contact Information</p>`;

function homeController(req, res) {
    res.write(html(homePage));
    res.end();
}

function aboutController(req,res) {
    res.write(html(aboutPage));
    res.end();
}

module.exports = {
    homeController,
    aboutController
}