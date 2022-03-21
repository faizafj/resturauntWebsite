/* home.js */
import { customiseNavbar, loadPage } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'availableTables', 'logout']) // navbar shown if logged in
		document.querySelector('header p').innerText = 'Homepage'		
		const token = localStorage.getItem('authorization')
		//console.log(token)
		if(token == null) loadPage('login')
		await showAllOrders(node)
	} catch(err) {
		console.error(err)
	}
}
async function showAllOrders(node){
	const url = '/api/v1/orders'
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
	json.data.forEach(order =>{
		console.log(order)
		if (order.attributes.orderStatus == ("Placed")|| order.attributes.orderStatus == ("Ready")){
			let newRow = document.createElement("tr")
			let orderTotalData = document.createElement("td")
			let orderStatusData = document.createElement("td")
			let orderTimeData = document.createElement("td")
			let orderItemData = document.createElement("td")
			let orderQuantityData = document.createElement("td")
			orderTotalData.innerText = ("Table ") + order.attributes.tableNumber
			orderStatusData.innerText = order.attributes.orderStatus
			orderTimeData.innerText = order.attributes.timeOfOrder
			orderItemData.innerText = order.attributes.itemId
			orderQuantityData.innerText = order.attributes.quantity
			newRow.appendChild(orderTotalData)
			newRow.appendChild(orderStatusData)
			newRow.appendChild(orderTimeData)
			newRow.appendChild(orderItemData)
			newRow.appendChild(orderQuantityData)
        	node.querySelector("table").appendChild(newRow)
		}
	})
}

