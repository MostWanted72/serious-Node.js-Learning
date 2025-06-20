const express = require('express');
const config = require('./config');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const port = config.port;
const app = express();

// 1. middlewares
app.use(morgan('dev'))
app.use(express.json());

//can be used to add a parameter to requst
app.use((req, res, next) => {
    req.requestedTime = new Date().toLocaleString();
    console.log(req.requestedTime)
    next();
})

// 3. routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)    

// 4. start the server
app.listen(port, () => console.log(`server started at port: ${port}`))