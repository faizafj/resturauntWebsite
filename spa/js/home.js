/* home.js */
import { customiseNavbar, loadPage } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'availableTables', 'kitchen' ,'logout']) // navbar shown if logged in
		const token = localStorage.getItem('authorization')
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
	//console.log (json)
	
	json.data.forEach(order =>{
		console.log(order)
		if (order.attributes.orderStatus == ("Placed")){
			let newRow = document.createElement("tr")
			let orderTableData = document.createElement("td")
			let orderStatusData = document.createElement("td")
			let orderTimeData = document.createElement("td")
			let orderNumberOfPlacesData = document.createElement("td")
			let orderButton = document.createElement("button")			
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber
			orderStatusData.innerText = order.attributes.orderStatus
			orderTimeData.innerText = order.attributes.timeOfOrder
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (' Places')
			orderButton.innerText = ("View order")
			orderStatusData.style.background = "orange"
			orderButton.addEventListener("click", function(){
				window.location = '/orderDetails#'+ order.orderId	
			})
			newRow.appendChild(orderTableData)
			newRow.appendChild(orderStatusData)
			newRow.appendChild(orderTimeData)
			newRow.appendChild(orderNumberOfPlacesData)
			newRow.appendChild(orderButton)
        	node.querySelector("table").appendChild(newRow)
		}
		if ( order.attributes.orderStatus == ("Ready")){
let newRow = document.createElement("tr")
			let orderTableData = document.createElement("td")
			let orderStatusData = document.createElement("td")
			let orderTimeData = document.createElement("td")
			let orderNumberOfPlacesData = document.createElement("td")
			let orderButton = document.createElement("button")			
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber
			orderStatusData.innerText = order.attributes.orderStatus
			orderTimeData.innerText = order.attributes.timeOfOrder
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (' Places')
			orderButton.innerText = ("View order")
			orderStatusData.style.background = "green"
			orderButton.addEventListener("click", function(){
				window.location = '/orderDetails#'+ order.orderId	
			})
			newRow.appendChild(orderTableData)
			newRow.appendChild(orderStatusData)
			newRow.appendChild(orderTimeData)
			newRow.appendChild(orderNumberOfPlacesData)
			newRow.appendChild(orderButton)
        	node.querySelector("table").appendChild(newRow)
		}
	})
}

