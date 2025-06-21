const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
})

const mongoose = require('mongoose');
const app = require('./app')

const dbUrl = process.env.DATEBASE.replace('<PASSWORD>', process.env.DATEBASE_PASSWORD).replace('<dbname>', process.env.DATEBASE_DBNAME)

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(process.env.PORT, () => console.log(`server started at port: ${process.env.PORT}`))