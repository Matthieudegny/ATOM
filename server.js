// const dotenv = require('dotenv');
const express = require('express');
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// const router = require('./app/router');
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/home.html')
})
app.get('/researchByDate',(req,res) => {
    res.sendFile(__dirname + '/public/researchByDate.html')
})
app.get('/researchByText',(req,res) => {
    res.sendFile(__dirname + '/public/researchByText.html')
})
app.all('*',(req,res) => {
    res.sendFile(__dirname + '/public/page404.html')
})
app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}/`);
});
