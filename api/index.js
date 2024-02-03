const express = require('express');
const app = express();
const cors = require("cors");
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hduefghuiwfguigfifuigfgfwgbfv';

// Middleware für das Verarbeiten von JSON-Daten und CORS
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

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
                jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { sameSite: 'None' }).json(user);
                });
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


app.listen(4000);