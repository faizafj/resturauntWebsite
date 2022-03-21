/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('menuItems: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'availableTables', 'logout']) // navbar shown if logged in
		if(localStorage.getItem('authorization') === null) loadPage('login')
		const table = node.getElementById('menuItemsTable')
		await showMenuItems(node)
		await showCurrentOrder(node)
	} catch(err) {
		console.error(err)
	}
	
}
async function showMenuItems(node){
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
	json.data.forEach(menuItem =>{
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
			window.location = '/oneMenuItem#'+ menuItem.itemId
		})
		node.querySelector("#Side1").appendChild(foodItemBtn)

	})
}


async function showCurrentOrder (node){
	let currentOrder = JSON.parse(localStorage.getItem('items'))
	let total = 0
	currentOrder.forEach(menuItem =>{
		console.log(menuItem)	
		total += (menuItem.price * menuItem.quantity)
		let foodItemBtn = document.createElement("h2") 
		foodItemBtn.innerText = menuItem.itemName
		let foodPrice = document.createElement("p")
		foodPrice.innerText = ("£") + menuItem.price
		let foodQty = document.createElement("p")
		foodQty.innerText = menuItem.quantity
		node.querySelector("#Side2").appendChild(foodItemBtn)
		node.querySelector("#Side2").appendChild(foodPrice)
		node.querySelector("#Side2").appendChild(foodQty)

	})
	let totalPrice = document.createElement("h2") 
	totalPrice.innerText = ("£") + total
	node.querySelector("#Side2").appendChild(totalPrice)

	node.getElementById('cancelOrder').addEventListener("click", function(){
		let array = [ ]
		localStorage.setItem('items',JSON.stringify(array) )
		location.reload();
	})
}



//sort by category?
//need to show order and order total too
// update with each item quantity