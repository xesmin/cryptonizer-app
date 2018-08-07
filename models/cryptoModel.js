import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import Database from '../controllers/dbController';

const cryptoSchema = new mongoose.Schema({
    id: Number,
    name: String
});

autoIncrement.initialize(Database);
cryptoSchema.plugin(autoIncrement.plugin, {
    model: 'Crypto',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Crypto', cryptoSchema);
