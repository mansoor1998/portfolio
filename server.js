// Define variables
const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();


// Use the /dist directory
app.use(express.static(__dirname + '/dist/portfolio/browser'));
app.use(expressStaticGzip("/dist/portfolio/browser", {
    enableBrotli: true
}));

// Catch all other invalid routes
app.all('*', function (req, res) {
    res.status(200).sendFile(__dirname + '/dist/portfolio/browser/index.html');
});

// Start the server
app.listen(process.env.PORT || 4200, () => { console.log('frontend app started at 4200'); });