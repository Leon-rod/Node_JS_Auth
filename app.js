const express = require('express');
const app = express();
app.use(express.json());

const librosRouter = require('./routes/libros');
const errorHandler = require('./middlewares/errorHandler');
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'http://localhost:3000/libros',
  issuerBaseURL: 'https://dev-paxu6zb6yi5ea4h8.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
  
app.use(jwtCheck);
app.use('/libros', librosRouter);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log('Servidor iniciado e el puerto 3000')
});