/* routes.js */
import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { allOrders } from './modules/orders.js'
import { allMenuItems, oneMenuItem } from './modules/menuItems.js'
import { allAvailableTables } from './modules/availableTables.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})



router.get('/api/v1/menuItems', async context => {
	console.log('GET /api/v1/menuItems')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const menuItems = await allMenuItems()
		const host = context.request.url.host
		menuItems.forEach(menuItem => {
			menuItem.url = `https://${host}/api/v1/menuItem/${menuItem.itemId}`
		})
		context.response.body = JSON.stringify(
			{
				name: "menuItems",
				description: "This API call is used to fetch all menu items" ,
				schema: {
					type: "string",
					attributes:
					{
					itemName: "string",
					itemPrice: "integer",
					itemDescription: "string",
					category: "string",
					allergies: "string",
					nutritionalInfo: "string",
					itemPhoto: "string",
					}},
				data: menuItems
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/v1/menuItems/:id', async context => {
	console.log('GET /api/v1/menuItems/:id')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const menuItems = await oneMenuItem(context.params.id)
		const host = context.request.url.host
		context.response.body = JSON.stringify(
			{
				name: "menuItems",
				description: "This API call is used to fetch all menu items" ,
				schema: {
					type: "string",
					attributes:
					{
					itemName: "string",
					itemPrice: "integer",
					itemDescription: "string",
					category: "string",
					allergies: "string",
					nutritionalInfo: "string",
					itemPhoto: "string",
					}},
				data: menuItems
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/v1/orders', async context => {
	console.log('GET /api/v1/orders')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const orders = await allOrders()
		const host = context.request.url.host
		orders.forEach(order => {
			order.url = `https://${host}/api/v1/orders/${order.orderId}`
		})
		context.response.body = JSON.stringify(
			{
				name: "orders",
				description: "This API call is used to fetch all order details" ,
				schema: {
					type: "string",
					attributes:
					{
					orderStatus: "string",
					orderTotal: "float",
					tableNumber: "integer",
					user: "string",
					timeOfOrder: "string",
					itemId: "integer",
					quantity: "integer",
					date: "string"
					}},
					links:{
						availableTables: `https://${host}/api/v1/availableTables`,
						menuItems: `https://${host}/api/v1/menuItems`,
					},
					data: orders
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/v1/orders', async context => {
	console.log('POST /api/v1/orders')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const data = await context.request.body ().value
		const orders = await placeOrder(data)
		const host = context.request.url.host
		
		context.response.body = JSON.stringify(
			{
				name: "orders",
				description: "This API call is used to fetch all order details" ,
					links:{
						availableTables: `https://${host}/api/v1/availableTables`,
						menuItems: `https://${host}/api/v1/menuItems`,
					},
					data: orders
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})






router.get('/api/v1/availableTables', async context => {
	console.log('GET /api/v1/availableTables')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const availableTables = await allAvailableTables()
		const host = context.request.url.host
		availableTables.forEach(availableTable => {
			availableTable.url = `https://${host}/api/v1/availableTables/${availableTable.tableNumber}`
		})
		context.response.body = JSON.stringify(
			{
				name: "availableTable",
				description: "This API call is used to fetch all table details" ,
				schema: {
					type: "string",
					attributes:
					{
					tableNumber: "integer",
					tableStatus: "string",
					tableSeats: "integer"
					}},
					data: availableTables
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})



router.get("/(.*)", async context => {      
// 	const data = await Deno.readTextFile('static/404.html')
// 	context.response.body = data
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

export default router

