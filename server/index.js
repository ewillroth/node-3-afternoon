require('dotenv').config()
const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');
const app = express()
const {checkForSession} = require('./middlewares/checkForSession')
const swagctrl = require('./controllers/swag_controller')
const authctrl = require('./controllers/auth_controller')
const cartctrl = require('./controllers/cart_controller')
const searchctrl = require('./controllers/search_controller')


app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(json())
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagctrl.read)

app.post('/api/login', authctrl.login)
app.post('/api/register', authctrl.register)
app.post('/api/signout', authctrl.signout)
app.get('/api/user', authctrl.getUser)

app.post('/api/cart', cartctrl.add)
app.post('/api/cart/checkout', cartctrl.checkout)
app.delete('/api/cart', cartctrl.remove)

app.get('/api/search', searchctrl.search)

app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT}`))