const mongoose = require("mongoose");

// Definieren des Benutzer-Schemas mit Name, eindeutiger E-Mail und Passwort
const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String
});

// Erstellen des Mongoose-Modells für den Benutzer unter Verwendung des Schemas
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;