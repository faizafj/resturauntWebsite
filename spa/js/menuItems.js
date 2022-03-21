/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('menuItems: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Menu Items'
		customiseNavbar(['home', 'availableTables', 'logout']) // navbar shown if logged in
		if(localStorage.getItem('authorization') === null) loadPage('login')
		const table = node.getElementById('menuItemsTable')
		await showMenuItems(node)
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
		foodItemBtn.innerText = menuItem.attributes.itemName
		foodItemBtn.addEventListener("click", function(){
			window.location = '/oneMenuItem#'+ menuItem.itemId
		})
		node.querySelector("#Side1").appendChild(foodItemBtn)

	})
}



//sort by category?
//need to show order and order total too
// update with each item quantity
//place into side