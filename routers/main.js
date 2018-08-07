import express from 'express';
import Cryptos from '../controllers/cryptoController';
import Transaction from '../controllers/transactionController';

const router = express.Router();

router.get('/', (req, res) => {
    Cryptos.listCrypto((err, result) => {
        if (err) {
            res.send(err);
        } else {
            Transaction.listTransactions((err, result2) => {
                res.render('index', { cryptoList: result, transactionsList: result2 });  
            });
        }
    });
});

router.get('/crypto', (req, res) => {
    Cryptos.getCryptos((err, result) => {
        res.render('new', {list: result});
    });
});

router.post('/crypto', (req, res) => {
    Cryptos.addCrypto(req.body.name, (err, result) => {
        if (err)
            res.send(err);
        else
            res.redirect('/');
    });
});

router.post('/crypto/del/:id', (req, res) => {
    Cryptos.removeCrypto(String(req.params.id), (err, result) => {
        if (err)
            res.send(err);
        else
            res.redirect('/');
    });
});

router.post('/transaction', (req, res) => {
    var data = req.body;
    Transaction.addTransaction(data.name, data.amount, data.price, (err, result) => {
        if (err)
            res.send(err);
        else
            res.redirect('/');
    });
});

router.delete('/transaction/:id', (req, res) => {
    Transaction.removeTransaction(req.params.id, (err, result) => {
        if (err)
            res.send('err');
        else
            res.redirect('/');
    });
})


export default router;
