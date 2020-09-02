const express= require('express');
const app= express();
const path = require('path');
const gameSrc = require('./game/gameSrc');

app.listen(3000, (req, res)=>{
    console.log('server is working, go...');
})
app.use(express.static(path.join(__dirname, 'public')));

gameSrc(app);

