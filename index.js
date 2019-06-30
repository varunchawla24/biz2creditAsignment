const express = require('express');  // require express module
const app = express();   // create a instance of express
const bodyParser = require('body-parser');
const config = require('./config/appConstant.js');  // get constants file which is in config
const port = config.port; 
const util = require('./util/customFunction.js');
const locale= require('./locale/message.js');
const routes= require('./routes/user.js');
app.use(bodyParser.urlencoded(
    {
        extended: false,
        limit: "1mb"
    }
));


//create custom headers to set our custom headers
customHeaders = (req, res, next) => {
    // OR set your own header here
    res.setHeader('x-mycure-App-Version', 'v1.0.0');
    //res.header("Content-Type", "application/json");
    res.header("Accept", "application/json, text/plain,*/*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Methods,access-token");

    next();
}
//adding customHeaders function in middleware 
app.use(customHeaders);

//default route
app.get('/', (req, res) => {
 res.send('<center><p><b>This is Biz2Credit server, How may I help You?</b></p></center>')
})
app.use('/app/api/v1',routes);

// not found error handling
app.use(function(req, res, next){
        let err = new Error('Route Not Found');
        err.status = 404;
        util.makeResponse(res, false, err.status, locale.notfound, config.appVersion,{});
        next(err);
    });


    // to catch uncaugth exception
    process.on('uncaughtException', (err) => {
        console.error('There was an uncaught error', err)
        process.exit(1) //mandatory (as per the Node docs)
    })
    /*Initialize Listner*/
    app.listen(port, (err) => {
        if (err) {
            console.log('Response Error');
        }
        else {
            console.log('Response Success, server running at ' + port);
        }
    
    });















