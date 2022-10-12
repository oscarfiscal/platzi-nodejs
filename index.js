const
express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {logErrors,errorHandler,boomErrorHandler}= require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());
const whitelist = ['http://localhost:8080','https://myapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors());

app .get('/', (req, res) => res.send('hola mi server en express'));

app.get('/nueva-ruta', (req, res) => res.send('hola mi nueva ruta'));

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
}
);
routerApi(app);
