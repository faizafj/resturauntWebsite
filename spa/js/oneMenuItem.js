/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('menuItems: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'availableTables','kitchen' , 'logout']) // navbar shown if logged in
		if(localStorage.getItem('authorization') === null) loadPage('login')
		const table = node.getElementById('menuItemsTable')
		await showMenuItems(node)
	} catch(err) {
		console.error(err)
	}
	
}
async function showMenuItems(node){
	const id = window.location.hash.substring(1);
	const url = '/api/v1/menuItems/'+id
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
		node.querySelector('h2').innerText = json.data.attributes.itemName
		node.getElementById('itemPhotoPlaceholder').src = json.data.attributes.itemPhoto
		node.getElementById('category').innerText = "Category: " + json.data.attributes.category
		node.getElementById('description').innerText = json.data.attributes.itemDescription
		node.getElementById('price').innerText = ("£") + json.data.attributes.itemPrice + (" each")
		
		node.getElementById('submitQuantity').addEventListener("click", function() {
			let quantity = document.getElementById('quantityInput').value
			let currentOrder = JSON.parse(localStorage.getItem('items'))
			let valid = false
			for (const food of currentOrder){
				if (food.itemName == json.data.attributes.itemName){
					food.quantity += parseInt(quantity)
					valid = true
				}
			}
			console.log(currentOrder)
			if (valid == false){
				let item = { itemId: json.data.itemId, 
				itemName: json.data.attributes.itemName, 
				quantity: parseInt(quantity), 
				price: json.data.attributes.itemPrice, 
				tableNumber: localStorage.getItem('tableNumber')}
				console.log(item)
				currentOrder.push(item)
			}
			localStorage.setItem('items', JSON.stringify(currentOrder))
			loadPage('menuItems')
		})

		node.getElementById('cancelItem').addEventListener("click", function() {
			loadPage('menuItems')
		})

}