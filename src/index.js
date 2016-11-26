import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import request from 'request';

// Config file for API key for Capital One API 


const app = express();
app.use(bodyParser.json());

var config = require( "../config/config.js" );

app.use(express.static('public'));

// Routes
app.get('/hello', (req, res, next) => {
    res.status(200).json({message: 'Hello, World!'});
});

app.get('/hello/:name', (req, res, next) => {
    const name = req.params.name;
    res.status(200).json({message: `Hello, ${name}!`});
});

app.get('/', (req, res, next) =>  {
    res.status(200).sendfile('public/view/index.html');
});

app.get('/public', (req, res, next) =>  {
    res.status(200).sendfile('public');
});

// app.get('/atms', (req, res, next) => {
//     request(`http://api.reimaginebanking.com/atms?key=${config.nessieApiKey}`, (err, response, body) => {
//        if (!err) {
//            const bodyJson = JSON.parse(body).data;

//            bodyJson.map((obj) => {
//                delete obj._id;
//                delete obj.accessibility;
//                delete obj.hours;
//                delete obj.address;
//                delete obj.language_list;

//                return obj;
//            });

//            res.status(200).send(bodyJson);
//        } else {
//            next(err);
//        }
//     });
// });

//Authentication for monzo API


// Error Handlers
app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Not Found';
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: {err}
    });
});

// Boot up HTTP server
app.server = http.createServer(app);
app.server.listen(3000);

export default app;
