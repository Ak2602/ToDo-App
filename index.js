import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';


import logRouter from './routes/logRouter.js';
import regRouter from './routes/regRouter.js';
import listRouter from './routes/listRouter.js';


const app = express();
const port = process.env.port || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: "sukuna26",
    resave: false,
    saveUninitialized: true,
    Cookie: { maxAge: 60000 }
}));

app.use(flash());
app.get('/', (req, res)=>{
    res.render('index')
});
app.use('/', regRouter);
app.use('/', logRouter);
app.use('/', listRouter);



app.listen(port, ()=>{
    console.log(`Server is Running at ${port}...`)
})
