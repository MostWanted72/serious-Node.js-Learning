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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price value']
    }
});

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
    name: 'The park camper',
    price: 34
})

testTour.save().then(doc => console.log(`The document created successfully`, doc)).catch(err => console.log('failed to save document', err))

app.listen(process.env.PORT, () => console.log(`server started at port: ${process.env.PORT}`))