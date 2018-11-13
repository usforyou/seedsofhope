const HttpPort = process.env.PORT || 8084;
const HttpsPort = process.env.PORT || 8085;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

//const session = require('express-session');

const https = require('https');
const http = require('http');
const config = require('./config');
const logger = require('./util/logger');
const security = require('./util/security');

const app = express();

app.use(bodyParser.urlencoded({
      'extended': 'true'
})); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.json({
      type: 'application/vnd.api+json'
})); // Parse application/vnd.api+json as json


//Include Routers
const authRoutes = require('./routes/oauthRoutes');
const acctRoutes = require('./routes/accountRoutes');
const programRoutes = require('./routes/programRoutes');

app.use(logger.log);

//configure CORS
// var cors = require('cors');
// var whiteList = [
//       'http://localhost:4200']
// app.options('*', cors({
//       credentials: true,
//       origin: '*',
//       optionsSuccessStatus: 200,
//       allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization'],
//       preflightContinue: true,
//       methods: ['GET, PUT, POST, DELETE, PATCH, OPTIONS'],
// }))
// app.use(cors({
//       credentials: true,
//       origin: whiteList,
//       optionsSuccessStatus: 200,
//       allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization'],
//       preflightContinue: true,
//       methods: ['GET, PUT, POST, DELETE, PATCH, OPTIONS'],
// }))

app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      if ('OPTIONS' === req.method) {
            res.sendStatus(200);
      } else {
            next();
      }
})

mongoose.connect(config.mongo.url, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
      console.log('Database connection successful!')
})
db.on('error', (err) => {
      console.log(`Database Error! ${err}`)
})

//Routes
app.get('/api', (req, res) => {
      //console.log('req.session ', req.session)
      res.send('this is the home page');
})
app.get('/api/test/ping', (req, res) => {
      res.json({"message": "The server is up and running!"})
});
app.use('/api/accounts/oauth', authRoutes.router);
app.use('/api/accounts', acctRoutes.router);
app.use('/api/programs', programRoutes.router);

//Handle all unavailable routes
app.get('*', function (req, res, next) {
      var err = new Error('Route Error! Please make sure you provided the correct URL');
      err.status = 404;
      next(err);
});

/*
Global Error Handling Middleware
four arguments are vital for error-handling middleware behavior
*/
// app.use((err, req, res, next) => {
//       res.status(err.status || 500).send({
//             message: `Something went wrong! ${err.message}`
//       });
// })

// app.listen(HttpPort, ()=>{
//       console.log('Server started. Listening on port '+ HttpPort)
// })
var options = {
      key: fs.readFileSync('privatekey.key'),
      cert: fs.readFileSync('certificate.crt')
};
http.createServer(app).listen(HttpPort, () => {
      console.log('Http Server started. Listening on port ' + HttpPort)
});
https.createServer(options, app).listen(HttpsPort, () => {
      console.log('Https Server started. Listening on port ' + HttpsPort)
});