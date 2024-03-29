const mongoose = require("mongoose");

// Definieren des Benutzer-Schemas mit Name, eindeutiger E-Mail und Passwort
const BudgetViewSchema = new mongoose.Schema({
    user_id: String,
    bankname: String,
    startSaldo: Number,
    saldo: Number,
    rev: Number
});

// Erstellen des Mongoose-Modells für den Benutzer unter Verwendung des Schemas
const BudgetViewModel = mongoose.model('BudgetView', BudgetViewSchema);

module.exports = BudgetViewModel;