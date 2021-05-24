const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const contextService = require('request-context');


require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require ('./middleware/authMiddleware');
const app = express();

const userRoutes = require('./routes/userRoutes');
const randonneeRoutes = require('./routes/randonneeRoutes');

const commentRoutes = require('./routes/commentRoutes');
const bookingRoutes = require ('./routes/bookingRoutes');



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
 app.use(cors());
app.use(cookieParser());

app.use(contextService.middleware('request'));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user._id)
})


//Routes 

app.use('/api/randonnee',randonneeRoutes);

app.use('/api/user',userRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/booking', bookingRoutes);

//Server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});

