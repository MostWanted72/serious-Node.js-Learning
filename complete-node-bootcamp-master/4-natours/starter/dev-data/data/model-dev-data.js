const dotenv = require('dotenv');
dotenv.config({
    path: '../../config.env'
})

const mongoose = require('mongoose');
const Tour = require('../../models/tourModel')
const fs = require('fs')

const allTours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

const dbUrl = process.env.DATEBASE.replace('<PASSWORD>', process.env.DATEBASE_PASSWORD).replace('<dbname>', process.env.DATEBASE_DBNAME)

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// importing data to the db

const importData = async () => {
    try {
        await Tour.create(allTours);
        console.log('data loaded successfully')
    } catch (err) {
        console.log(err)
    }
}

// delete all data from the db 
const deleteAlldata = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Deleted successfully')
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === '--import') {
    importData()
}
if (process.argv[2] === '--delete') {
    deleteAlldata()
}
