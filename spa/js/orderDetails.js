/* menuItems.js */

import { customiseNavbar, loadPage, secureGet, showMessage } from '../util.js'

export async function setup (node) {
	console.log('orderDetails: setup')
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
		await showOrderDetails(node)
	} catch(err) {
		console.error(err)
	}
	
}
async function showOrderDetails(node){
	let userRole = localStorage.getItem('userType')	
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
		let orderIdNumber = json.data.orderId
		let orderNumberData = node.getElementById("orderTable")
			orderNumberData.innerText =  ("Table ") + json.data.attributes.tableNumber
			node.appendChild(orderNumberData)
		let serverNameDetails = node.getElementById("serverName")
			serverNameDetails.innerText =  ("Served By: ") + json.data.attributes.user
			node.appendChild(serverNameDetails)
		let orderDetails = json.data.attributes.items
		console.log (orderDetails)
		let totalOfOrder = 0
		orderDetails.forEach(order => {
			let figureCreate = document.createElement ("figure")
			let tableCreate = document.createElement ("table")
			let itemNameDetails = document.createElement("td")
			let itemQuantityDetails = document.createElement("td")
			let itemPriceDetails = document.createElement("td")
			let itemSinglePrice = document.createElement ("p")
			let itemImage = document.createElement ("img")
			totalOfOrder = totalOfOrder + parseInt(json.data.attributes.orderTotal)
			itemImage.src = order.attributes.itemPhoto
			itemNameDetails.innerText = order.attributes.itemName
			itemSinglePrice.innerText =  "£" + order.attributes.itemPrice
			itemQuantityDetails.innerText = ("x") + order.attributes.quantity
			itemPriceDetails.innerText = ("£") + json.data.attributes.orderTotal
			tableCreate.appendChild(itemImage)
			tableCreate.appendChild(itemNameDetails)
			itemNameDetails.appendChild(itemSinglePrice)
			tableCreate.appendChild (itemQuantityDetails)
			tableCreate.appendChild (itemPriceDetails)
			figureCreate.appendChild(tableCreate)
			node.appendChild(figureCreate)
        })
		let seperatorLine = node.getElementById("seperator")
		let overallPrice = document.createElement("h3")
		overallPrice.innerText = "Order Total: £" +  totalOfOrder
		let orderTimeAndDateData = document.createElement("h3")
		orderTimeAndDateData.innerText = " Date/Time: " + json.data.attributes.date + " - "  + json.data.attributes.timeOfOrder
		let orderStatusDetails = document.createElement("h3")
		orderStatusDetails.innerText = "Current Status: " + json.data.attributes.orderStatus
		if (json.data.attributes.orderStatus == ("Placed")){
				orderStatusDetails.style.color = "orange"
		}
		if (json.data.attributes.orderStatus == ("Ready")){
				orderStatusDetails.style.color = "Green"
			}


		let orderButton = document.createElement("button")  
			orderButton.innerText = ("Complete Order")
			let statusChange = "Done"
			orderButton.addEventListener("click", async function(){
				const url = '/api/v3/orders/' + orderIdNumber
				const options = {
					method: 'PUT',
					headers: {
					'Content-Type': 'application/vnd.api+json',
					'Authorization': localStorage.getItem('authorization')
					},
					body: JSON.stringify({
						type: "orders",
						attributes:{
						statusChange: statusChange
				}})}
				const response = await fetch(url, options)
				const json = await response.json()
				console.log ("Status Changed")
				window.alert("This order Has been successfully completed")
				location.reload()
			})

			if (json.data.attributes.orderStatus == ("Done")){
				orderStatusDetails.style.color = "Green"
				let orderButtonPaid = document.createElement("button")  
				orderButtonPaid.innerText = ("Order Paid")
				let statusChange = "Paid"
				orderButtonPaid.addEventListener("click", async function(){
				const url = '/api/v3/orders/' + orderIdNumber
				const options = {
					method: 'PUT',
					headers: {
					'Content-Type': 'application/vnd.api+json',
					'Authorization': localStorage.getItem('authorization')
					},
					body: JSON.stringify({
						type: "orders",
						attributes:{
						statusChange: statusChange
				}})}
				const response = await fetch(url, options)
				const json = await response.json()
				console.log ("Status Changed")
				window.alert("This order has been PAID")
				// location.reload()
			})
					node.appendChild(orderButtonPaid)
			} else if (json.data.attributes.orderStatus == ("Paid")){
					let itemPaid = document.createElement("H1")
					itemPaid.innerText = "This order has been PAID and is complete."
					itemPaid.style.textAlign = "center"
					itemPaid.style.color = "Red"
					node.appendChild(itemPaid)
			}
			else {
						node.appendChild(orderButton)
			}
		node.appendChild(seperatorLine)
		node.appendChild (orderTimeAndDateData)
		node.appendChild(orderStatusDetails)
		node.appendChild(overallPrice)		


    }		
