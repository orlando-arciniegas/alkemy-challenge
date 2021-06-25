/********************************************
/               Modules                 /
********************************************/
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import operationsRoutes from './routes/operationsRoutes';

/********************************************
/               Settings                    /
********************************************/
const app = express();
app.set('port', process.env.PORT || 4000); 

/********************************************
/               Middlewares                 /
********************************************/
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/********************************************
/               Routes                      /
********************************************/

app.use('/', operationsRoutes);

export default app;