/* home.js */
import { customiseNavbar, loadPage } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
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
			customiseNavbar(['kitchen', 'logout'])
		} 
		else {
			customiseNavbar(['home', 'availableTables', 'kitchen' ,'logout']) // navbar shown if logged in
		}
		const token = localStorage.getItem('authorization')
		console.log (userRole)	
		if(token == null) loadPage('login')
		if (userRole == "Admin" || userRole == "Kitchen"){
			await showPlacedOrders(node)
		} else {
			window.alert ("Unathorised Access")
			loadPage('home')
		}

	} catch(err) {
		console.error(err)
	}
}
async function showPlacedOrders(node){
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
			let createAFigure = document.createElement("figure")
            let createAHeader = document.createElement("header")
            let orderTableData = document.createElement("h1")
            let orderTimeData = document.createElement("p")
			let orderItemsData = document.createElement("p")        
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber +  (": ") + order.attributes.orderStatus
 			orderTimeData.innerText = ("Time: ") +order.attributes.timeOfOrder
			order.attributes.items.forEach(item =>{
				let orderItem = document.createElement("p")
				orderItem.innerText =  item.itemName + (" x") + item.quantity
				orderItemsData.appendChild(orderItem)
			})
			let orderButton = document.createElement("button")  
			orderButton.innerText = ("Ready")
			let statusChange = "Ready"
			orderButton.addEventListener("click", async function(){
				const url = '/api/v3/orders/' + order.orderId
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
				location.reload()
			})

			createAFigure.appendChild(createAHeader)
			createAHeader.appendChild(orderTableData)
			createAFigure.appendChild(orderTimeData)
			createAFigure.appendChild(orderItemsData)
			createAFigure.appendChild(orderButton)
			node.getElementById("kitchenArticle").appendChild(createAFigure)

		}
	})
}

