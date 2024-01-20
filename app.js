// Imports on Node
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();
const fs = require('fs')
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routes require
const sequelize = require('./util/database');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

// Model Tables
const Users = require('./models/users');
const Expenses = require('./models/expense');
const Orders = require('./models/order');
const Forgotpassword = require('./models/forgotpass');
const Downloads = require('./models/download');

// Using packages to read Requests
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })  // a appends each entry, instead of rewiting last entrry
app.use(morgan('combined', { stream: accessLogStream }));    // Logging HTTP requests & errors

// Routes
app.use('/user', signupRoutes);
app.use('/user', loginRoutes);
app.use('/expenses', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premiumFeatures', leaderboardRoutes);
app.use('/password', passwordRoutes);

app.use(function(req, res, next) { 
    res.removeHeader("Content-Security-Policy");
    next(); 
})

app.use((req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, `frontend/${req.url}`));
})

// Associations
Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Users);

Users.hasMany(Downloads);
Downloads.belongsTo(Users);

// DB & server start
sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));