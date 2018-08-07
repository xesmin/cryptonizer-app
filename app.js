import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import main from './routers/main.js';


const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(methodOverride('_method'))
app.use(flash());
app.use('/static', express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', main)

app.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log("Magic happens on port " + port + "...");
});
