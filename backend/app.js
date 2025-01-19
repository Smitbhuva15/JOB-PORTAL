const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
const cors = require('cors');

require('dotenv').config();

const cookieParser = require('cookie-parser');

const { userroutes } = require('./Routes/userRoutes');
const { companyroutes } = require('./Routes/companyRoutes');
const { jobroutes } = require('./Routes/jobRoutes');
const { applicationRoutes } = require('./Routes/applicationRoutes');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
app.use(cookieParser());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully!!!');
  } catch (error) {
    console.log('MongoDB connection failed:');
  }
};


app.use('/user/v2/api', userroutes); 
app.use('/user/v2/api', companyroutes); 
app.use('/user/v2/api', jobroutes); 
app.use('/user/v2/api', applicationRoutes); 






const PORT =process.env.PORT || 3000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
