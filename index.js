const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var uri = 'mongodb+srv://cs3219:cs3219-TaskB@cluster0.awti3.mongodb.net/cs3219-TaskB?retryWrites=true&w=majority';

mongoose.connect(uri)
     .then((result) => {
         console.log('Connected to MongoDB');

         const port = process.env.PORT || 3600;
         app.listen(port, () => {
             console.log(`Server listening on port ${port}`);
         });
     })
     .catch((err) => console.log(err));


 app.use('/', apiRoutes);

 app.use((req, res) => {
     res.status(404).json({
         status: "failed",
         data: {
             message: "invalid API endpoint"
         }
     });
 });