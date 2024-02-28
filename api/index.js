const express = require('express');
const app = express();
const cors = require("cors");
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const BudgetView = require('./models/BudgetView');
const cookieParser = require('cookie-parser');
const { cookieJwtAuth } = require('./middleware/cookieAuth');
const TransactionItem = require('./models/TransactionItem');

const bcryptSalt = bcrypt.genSaltSync(10);

// Middleware für das Verarbeiten von JSON-Daten und CORS
app.use(express.json());

const corsOptions = {
    credentials: true,
    origin: 'https://my-finance-web.netlify.app'
};

app.use(cors(corsOptions));

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok');
})

// Endpunkt für die Benutzerregistrierung
app.post('/register', cors(), async (req,res) => {
    const {name, email, password} = req.body;
    try {
        // Erstellen eines neuen Benutzers mit gehashtem Passwort
        const user = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }
})

// Endpunkt für den Benutzerlogin
app.post('/login', cors(), async (req,res) => {
    const {email, password} = req.body;
    // Suchen des Benutzers in der Datenbank anhand der E-Mail
    const user = await User.findOne({email});
    try {
        if (user) {
            // Vergleichen des eingegebenen Passworts mit dem gehashten Passwort in der Datenbank
            const passFound = bcrypt.compareSync(password, user.password);
        if (passFound) {
                // Generieren eines JWT-Tokens und Senden als Cookie
                res.json(user);
            } else {
                res.status(422).json("Password nicht gefunden");
            }
        } else {
            res.json("Nicht gefunden");
        }
    } catch (error) {
        res.status(422).json(error);
    }
    
})

// Endpunkt für das Einrichten eines "Budgetblicks"
app.post('/addbudgetview', cors(), cookieJwtAuth, async (req,res) => {
    const {user_id, bankname, startSaldo} = req.body;
    try {
        // Erstellen eines neuen Budgetblicks
        const budgetview = await BudgetView.create({
            user_id,
            bankname,
            startSaldo
        });
        res.json(budgetview);
    } catch (error) {
        res.status(422).json(error);
    }
})

// Endpunkt um alle Budgetviews eines Users zu kriegen
app.post("/getbudgetviews", cors(), cookieJwtAuth, async (req,res) => {
    const {user_id} = req.body;
    const budgetviews = await BudgetView.find({user_id: user_id}).exec()
    try {
        res.json(budgetviews);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post("/setusernotnew", cors(), cookieJwtAuth, async (req,res) => {
    const {user_id} = req.body;
    const userDoc = await User.findById(user_id);
    try {
        if (userDoc) {
            userDoc.isNewUser = false;
            await userDoc.save();
        }
        res.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }    
})

app.post("/deletebudgetview", cors(), cookieJwtAuth, async (req,res) => {
    const {budgetview_id} = req.body;
    try {
        await BudgetView.deleteOne({_id: budgetview_id});
        res.status(200).json("Budgetview deleted");
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post('/addtransactionitem', cors(), cookieJwtAuth, async (req,res) => {
    const {bv_id, date, amnt, desc} = req.body;
    try {
        // Erstellen eines neuen Budgetblicks
        const transactionitem = await TransactionItem.create({
            bv_id,
            amnt,
            date,
            desc
        });
        res.json(transactionitem);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post("/gettransactionitems", cors(), cookieJwtAuth, async (req,res) => {
    const {bv_id} = req.body;
    const transactionitems = await TransactionItem.find({bv_id: bv_id}).exec()
    try {
        res.json(transactionitems);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post("/deletetransactionitem", cors(), cookieJwtAuth, async (req,res) => {
    const {transactionitem_id} = req.body;
    try {
        await TransactionItem.deleteOne({_id: transactionitem_id});
        res.status(200).json("Transactionitem deleted");
    } catch (error) {
        res.status(422).json(error);
    }
})

const PORT = 4000;
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})