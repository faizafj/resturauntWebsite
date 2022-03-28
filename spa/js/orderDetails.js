/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('orderDetails: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'availableTables', 'logout']) // navbar shown if logged in
		if(localStorage.getItem('authorization') === null) loadPage('login')
		await showOrderDetails(node)
	} catch(err) {
		console.error(err)
	}
	
}
async function showOrderDetails(node){
	const id = window.location.hash.substring(1);
	const url = '/api/v2/orderDetails/'+id
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
		const response = await fetch(url, options)
		const json = await response.json()
		console.log("Hello")
		console.log (json)	
		let orderDetails = json.data.attributes.items
		console.log (orderDetails)
		orderDetails.forEach(order => {
			let figureCreate = document.createElement ("figure")
			let itemIdDetails = document.createElement("h2")
			let itemDescriptionDetails = document.createElement("p")
			itemIdDetails.innerText = order.attributes.itemName + (" x ") + order.attributes.quantity + " @ " + order.attributes.itemPrice
			itemDescriptionDetails.innerText = order.attributes.itemDescription
			figureCreate.appendChild(itemIdDetails)
			figureCreate.appendChild (itemDescriptionDetails)
			node.appendChild(figureCreate)
        })
			let overallPrice = document.createElement("h2")
			overallPrice.innerText = "Order Total: £" +  json.data.attributes.orderTotal
			let orderStatusDetails = document.createElement("h2")
			orderStatusDetails.innerText = "Current Status: " + json.data.attributes.orderStatus
			if (json.data.attributes.orderStatus == ("Placed")){
					orderStatusDetails.style.color = "orange"
			}
			if (json.data.attributes.orderStatus == ("Ready")){
					orderStatusDetails.style.color = "Green"
			}
			node.appendChild(overallPrice)
			node.appendChild(orderStatusDetails)


    }		
