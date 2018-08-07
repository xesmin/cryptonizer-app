import Transaction from '../models/transactionModel';

module.exports = exports = {};

exports.addTransaction = (name, amount, price, cb) => {
    let newTransaction = new Transaction({
        name: name,
        amount: amount,
        price: price
    });

    newTransaction.save((err) => {
        if (err)
            cb('dbError', null);
        else
            cb(null, true);
    });
};

exports.removeTransaction = (id, cb) => {
    Transaction.findOneAndRemove({
        id: id
    }, (err, res) => {
        if (err)
            cb('dbError', null);
        else
            cb(null, true);
    });
};

exports.listTransactions = (cb) => {
    Transaction.find({}, (err, res) => {
        cb(null, res);
    });
};
