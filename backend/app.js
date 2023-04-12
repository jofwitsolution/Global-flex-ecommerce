const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
const cors = require('cors');

// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'config/.env',
  });
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

const date = 180 * 24 * 60 * 60 * 1000;

let cookie = {
  Secure: true,
  maxAge: date,
};

if (process.env.NODE_ENV === 'development') {
  cookie = {
    httpOnly: false,
    sameSite: 'lax',
    Secure: false,
    maxAge: date,
  };
}

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.set('trust proxy', 1);
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'session',
    cookie,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);
app.use('/', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// import routes
const root = require('./controller/root');
const user = require('./controller/user');
const shop = require('./controller/shop');
const category = require('./controller/category');
const product = require('./controller/product');

app.use('/', root);
app.use('/api/v2/user', user);
app.use('/api/v2/shop', shop);
app.use('/api/v2/categories', category);
app.use('/api/v2/products', product);

// for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
