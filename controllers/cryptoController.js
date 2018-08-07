import request from 'request';
import Cryptos from '../models/cryptoModel';
import async from 'async';

module.exports = exports = {};

exports.addCrypto = (name, cb) => {
    request({
        url: `https://api.coinmarketcap.com/v1/ticker/${name}/`,
        json: true
    }, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            if (body[0].error)
                cb('notfoundError', null);
            else {
                let newCrypto = new Cryptos({
                    name: name
                });

                newCrypto.save((err) => {
                    if (err)
                        cb('dbError', null);
                    else
                        cb(null, true);
                });
            }

        } else {
            cb('apiError', null);
        }
    });
};

exports.getCryptos = (cb) => {
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/?limit=0',
        json: true
    },
    (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let list = [];
            for (let i = 0; i < body.length; i++) {
                list[i] = {"id": body[i].id, "name": body[i].name, "symbol": body[i].symbol}
            }
            process.nextTick(()=> {
                cb(null, list);
            })
        }
        else {
            cb(null, []);
        }
    });
}

exports.listCrypto = (cb) => {
    Cryptos.find({}, (err, res) => {
        if (err)
            cb('dbError', null);
        else {
            var list = [];
            async.eachOf(res, (item, key, cb2)=> {
                request({
                    url: `https://api.coinmarketcap.com/v1/ticker/${item.name}/`,
                    json: true
                },
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        list[key] = {"dbid": item.id, "id": body[0].id, "symbol": body[0].symbol, "name": body[0].name, "price_usd": body[0].price_usd, "change1h": body[0].percent_change_1h, "change24h": body[0].percent_change_24h, "volume24h": body[0]["24h_volume_usd"]};
                    } else {
                        list.push({"name": "API Offline", "price_usd": 0, "change1h": 0, "change24h": 0});
                    }
                    cb2(err);
                });
            }, (err)=>{
                cb(null,list);
            });
            
        }
    })
};

exports.removeCrypto = (dbid, cb) => {
    Cryptos.findOneAndRemove({id: dbid}, (err, res) => {
        if (err)
            cb('dbError', null);
        else
            cb(null, true);
    });
};
