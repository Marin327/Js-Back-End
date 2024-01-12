const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { dbInit } = require('./database/database-controllers')
const processToken = require('./middlewares/auth')
const { guestOnly, ownedOnly, userOnly } = require('./middlewares/routeGuards')
const { preloadCube } = require('./middlewares/preloads')

// views
const { createCubeGet, createCubePost } = require('./controllers/createCube')
const home = require('./controllers/home')
const about = require('./controllers/about')
const details = require('./controllers/details')
const { createAccessoryGet, createAccessoryPost } = require('./controllers/createAccessory')
const { attachAccessoryGet, attachAccessoryPost } = require('./controllers/attachAccessory')
const register = require('./controllers/register')
const login = require('./controllers/login')
const logout = require('./controllers/logout')
const edit = require('./controllers/edit')
const deleteCube = require('./controllers/delete')

// bloat
const app = express()
const port = 3030

app.engine(
	'.hbs',
	hbs({
		extname: '.hbs',
		helpers: {
			isNotEmpty: (arr) => {
				return arr.length > 0
			}
		}
	})
)

async function start () {
	app.set('view engine', '.hbs')

	// middleware
	app.use(express.static('static'))
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())
	app.use(processToken)
	app.use(await dbInit())

	// routes
	app.get('/', home)
	app.get('/about', about)
	app.get('/login', guestOnly, login.get)
	app.post('/login', guestOnly, login.post)
	app.get('/register', guestOnly, register.get)
	app.post('/register', guestOnly, register.post)
	app.get('/logout', userOnly, logout)
	app.get('/create/cube', userOnly, createCubeGet)
	app.post('/create/cube', userOnly, createCubePost)
	app.get('/details/:id', preloadCube, details)
	app.get('/create/accessory', userOnly, createAccessoryGet)
	app.post('/create/accessory', userOnly, createAccessoryPost)
	app.get('/attach/accessory/:id', preloadCube, userOnly, attachAccessoryGet)
	app.post('/attach/accessory/:id', preloadCube, userOnly, attachAccessoryPost)
	app.get('/edit/:id', preloadCube, ownedOnly, edit.get)
	app.post('/edit/:id', preloadCube, ownedOnly, edit.post)
	app.get('/delete/:id', preloadCube, ownedOnly, deleteCube.get)
	app.post('/delete/:id', preloadCube, ownedOnly, deleteCube.post)

	app.all('*', (req, res) => {
		res.render('404')
	})

	app.listen(port, () => console.log(`Server started on port ${port}`))
}

start()
