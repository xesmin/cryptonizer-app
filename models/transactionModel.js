import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import Database from '../controllers/dbController';

const transactionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    amount: Number,
    price: Number
});

autoIncrement.initialize(Database);
transactionSchema.plugin(autoIncrement.plugin, {
    model: 'Transaction',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Transaction', transactionSchema);
