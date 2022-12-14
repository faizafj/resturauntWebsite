/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('menuItems: setup')
	try {
		console.log(node)
		let userRole = localStorage.getItem('userType')	
		if (userRole == 'Server'){
			customiseNavbar(['home', 'availableTables', 'logout'])
		} 
		else if (userRole == 'Till'){
			customiseNavbar(['home', 'logout'])
		} 
		else if (userRole == 'Kitchen'){
			customiseNavbar(['home', 'kitchen', 'logout'])
		} 
		else {
			customiseNavbar(['home', 'availableTables', 'kitchen' ,'logout']) // navbar shown if logged in
		}
		if(localStorage.getItem('authorization') === null) loadPage('login')
		const table = node.getElementById('menuItemsTable')
		await showMenuItems(node)
		await showCurrentOrder(node)
	} catch(err) {
		console.error(err)
	}
	
}
async function showMenuItems(node){ //API call to show all menu items
	const url = '/api/v1/menuItems'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log (json)
	json.data.forEach(menuItem =>{ //for every menu item create a button displaying name and price and a link to the page.
		console.log(menuItem)	
		let foodItemBtn = document.createElement("button") 
		foodItemBtn.style.backgroundImage += "url(https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg)" 
		foodItemBtn.style.backgroundSize = 'cover'
		foodItemBtn.style.backgroundBlendMode = 'screen'
		foodItemBtn.innerText = menuItem.attributes.itemName
		let foodPrice = document.createElement("p")
		foodPrice.innerText = ("£") + menuItem.attributes.itemPrice
		foodItemBtn.appendChild(foodPrice)
		foodItemBtn.addEventListener("click", function(){
			window.location = '/oneMenuItem#'+ menuItem.itemId //takes you to the food page
		})
		node.querySelector("#Side1").appendChild(foodItemBtn)

	})
}


async function showCurrentOrder (node){ //show current order details
	let showTableNumber = JSON.parse(localStorage.getItem('tableNumber')) //local storage
	let tableDetails = node.getElementById ("tableNumberDetails") 
	tableDetails.innerText = ("Table Number ") + (showTableNumber)
	let waitStaff = localStorage.getItem('username')
	let waitStaffDetails = node.getElementById ("waitStaffDetails") 
	waitStaffDetails.innerText = (waitStaff)
	console.log(showTableNumber)

	let currentOrder = JSON.parse(localStorage.getItem('items')) //get all data from local storage 
	let total = 0 //total price set to 0
	let orderLength = currentOrder.length
	if (orderLength == 0) {
		let noOrder = node.getElementById("noOrders")
		noOrder.innerText = ("No order yet")
	} else {
	currentOrder.forEach(menuItem =>{ //display all the items that are in local storage.
		console.log(menuItem)	
		total += (menuItem.price * menuItem.quantity)
		let newRow = document.createElement("tr")
		let itemNameData = document.createElement("td") 
		let quantityData = document.createElement("td") 
		let itemPriceData = document.createElement("td")
		let tableNumberDetail = document.createElement("td") 
		itemNameData.innerText = menuItem.itemName 
		quantityData.innerText =  ("x") + menuItem.quantity
		itemPriceData.innerText = ("£") + menuItem.price

		newRow.appendChild(itemNameData)
		newRow.appendChild(quantityData)		
		newRow.appendChild(itemPriceData)
		node.getElementById("orderTable").appendChild(newRow)
	})}
	
	let totalPrice = node.getElementById('totalOrderPrice')
	totalPrice.innerText = ("£") + total
	

	node.getElementById('cancelOrder').addEventListener("click", function(){
		let array = [ ]
		localStorage.setItem('items',JSON.stringify(array) )
		location.reload();
	})

	node.getElementById('submitOrder').addEventListener("click", async function(){ //when order is submit
		let getItems = JSON.parse(localStorage.getItem('items'))
		let setNumberOfPlaces = document.getElementById('numberOfPlaces').value
		if (setNumberOfPlaces == 0 ){
			window.alert("Error please enter the number of places")
		}  else {
		localStorage.setItem('numberOfPlaces', JSON.parse(setNumberOfPlaces))
		let token = localStorage.getItem('authorization')
		let today = new Date()
		let date = today.getDate() + ('/') +(today.getMonth()+1) + ('/') + today.getFullYear()
		let time = today.getHours() + ":" + today.getMinutes()
		localStorage.setItem('DateOfOrder', date )
		localStorage.setItem('Time', time )
		console.log (getItems)
		let getDate = localStorage.getItem('DateOfOrder')
		let getTime = localStorage.getItem('Time')
		let getTable = localStorage.getItem('tableNumber')
		let getNumberOfPlaces = localStorage.getItem('numberOfPlaces')
		const url = '/api/v1/orders'
		const options = {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		},
		body: JSON.stringify({
			type: "orders",
			attributes:{
				items: getItems,
				time: getTime,
				date: getDate,
				tableNumber: getTable,
				numberOfPlaces: getNumberOfPlaces
			}
		})
		}
		const response = await fetch(url, options)
		const json = await response.json()
		console.log(json)
		let array = [ ]
		localStorage.setItem('items',JSON.stringify(array) )
		await loadPage('home')
	}})
}



//sort by category?
