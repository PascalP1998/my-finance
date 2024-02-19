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

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET

// Middleware für das Verarbeiten von JSON-Daten und CORS
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok');
})

// Endpunkt für die Benutzerregistrierung
app.post('/register', async (req,res) => {
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
app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    // Suchen des Benutzers in der Datenbank anhand der E-Mail
    const user = await User.findOne({email});
    try {
        if (user) {
            // Vergleichen des eingegebenen Passworts mit dem gehashten Passwort in der Datenbank
            const passFound = bcrypt.compareSync(password, user.password);
        if (passFound) {
                // Generieren eines JWT-Tokens und Senden als Cookie
                const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret, { expiresIn: "1h"});
                res.cookie('token', token, { sameSite: 'None', secure: true }).json(user);
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
app.post('/addbudgetview', cookieJwtAuth, async (req,res) => {
    const {user_id, bankname} = req.body;
    try {
        // Erstellen eines neuen Budgetblicks
        const budgetview = await BudgetView.create({
            user_id,
            bankname
        });
        res.json(budgetview);
    } catch (error) {
        res.status(422).json(error);
    }
})

// Endpunkt um alle Budgetviews eines Users zu kriegen
app.post("/getbudgetviews", cookieJwtAuth, async (req,res) => {
    const {user_id} = req.body;
    const budgetviews = await BudgetView.find({user_id: user_id}).exec()
    try {
        res.json(budgetviews);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post("/setusernotnew", cookieJwtAuth, async (req,res) => {
    const {user_id} = req.body;
    const userDoc = await User.findById(user_id);
    try {
        if (userDoc) {
            userDoc.isNewUser = false;
            await userDoc.save();
        }
        res.json(userDoc.isNewUser);
    } catch (error) {
        res.status(422).json(error);
    }    
})

const PORT = 4000;
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})