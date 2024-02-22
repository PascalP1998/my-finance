const mongoose = require("mongoose");

// Definieren des Benutzer-Schemas mit Name, eindeutiger E-Mail und Passwort
const TransactionItemSchema = new mongoose.Schema({
    bv_id: String,
    amnt: Number,
    date: Date,
    desc: String
});

// Erstellen des Mongoose-Modells für den Benutzer unter Verwendung des Schemas
const TransactionItemModel = mongoose.model('TransactionItem', TransactionItemSchema);

module.exports = TransactionItemModel;