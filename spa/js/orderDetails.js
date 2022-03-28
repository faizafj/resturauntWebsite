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
			let itemIdDetails = document.createElement("h2")
			itemIdDetails.innerText = order.attributes.itemName + (" x ") + order.attributes.quantity
			node.appendChild(itemIdDetails)
        })

    }		
