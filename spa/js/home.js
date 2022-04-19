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
		if(token == null) loadPage('login')
		if(userRole == 'Kitchen') loadPage('kitchen')
		await showAllOrders(node)
	} catch(err) {
		console.error(err)
	}
}
async function showAllOrders(node){
	let userRole = localStorage.getItem('userType')	
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

		if ( userRole == ("Till")){
		if ( order.attributes.orderStatus == ("Done")){
			let createAFigure = document.createElement("figure")
			let createAHeader = document.createElement("header")
			let orderTableData = document.createElement("h1")
			let orderTimeData = document.createElement("p")
			let orderNumberOfPlacesData = document.createElement("p")
			let orderButton = document.createElement("button")			
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber +  (": ") + order.attributes.orderStatus
			orderTimeData.innerText = ("Time: ") +order.attributes.timeOfOrder
			if ( order.attributes.numberOfPlaces == ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Place")  
			}
			if ( order.attributes.numberOfPlaces != ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Places")  
			}
			orderButton.innerText = ("View order")
			createAHeader.style.background = "green"
			orderButton.addEventListener("click", function(){
				window.location = '/orderDetails#'+ order.orderId	
			})
			createAFigure.appendChild(createAHeader)
			createAHeader.appendChild(orderTableData)
			createAFigure.appendChild(orderTimeData)
			createAFigure.appendChild(orderNumberOfPlacesData)
			createAFigure.appendChild(orderButton)
			node.getElementById("homeArticle").appendChild(createAFigure)
		}} else {
		if (order.attributes.orderStatus == ("Placed")){
			let createAFigure = document.createElement("figure")
			let createAHeader = document.createElement("header")
			let orderTableData = document.createElement("h1")
			let orderTimeData = document.createElement("p")
			let orderNumberOfPlacesData = document.createElement("p")
			let orderButton = document.createElement("button")			
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber +  (": ") + order.attributes.orderStatus
			orderTimeData.innerText = ("Time: ") +order.attributes.timeOfOrder
			if ( order.attributes.numberOfPlaces == ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Place")  
			}
			if ( order.attributes.numberOfPlaces != ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Places")  
			}
			orderButton.innerText = ("View order")
			createAHeader.style.background = "orange"
			orderButton.addEventListener("click", function(){
				window.location = '/orderDetails#'+ order.orderId	
			})
			createAFigure.appendChild(createAHeader)
			createAHeader.appendChild(orderTableData)
			createAFigure.appendChild(orderTimeData)
			createAFigure.appendChild(orderNumberOfPlacesData)
			createAFigure.appendChild(orderButton)
			node.getElementById("homeArticle").appendChild(createAFigure)
		}
		if ( order.attributes.orderStatus == ("Ready")){
			let createAFigure = document.createElement("figure")
			let createAHeader = document.createElement("header")
			let orderTableData = document.createElement("h1")
			let orderTimeData = document.createElement("p")
			let orderNumberOfPlacesData = document.createElement("p")
			let orderButton = document.createElement("button")			
			orderTableData.innerText = ("Table ") + order.attributes.tableNumber +  (": ") + order.attributes.orderStatus
			orderTimeData.innerText = ("Time: ") +order.attributes.timeOfOrder
			if ( order.attributes.numberOfPlaces == ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Place")  
			}
			if ( order.attributes.numberOfPlaces != ("1")){
			orderNumberOfPlacesData.innerText = order.attributes.numberOfPlaces + (" Places")  
			}
			orderButton.innerText = ("View order")
			createAHeader.style.background = "green"
			orderButton.addEventListener("click", function(){
				window.location = '/orderDetails#'+ order.orderId	
			})
			createAFigure.appendChild(createAHeader)
			createAHeader.appendChild(orderTableData)
			createAFigure.appendChild(orderTimeData)
			createAFigure.appendChild(orderNumberOfPlacesData)
			createAFigure.appendChild(orderButton)
			node.getElementById("homeArticle").appendChild(createAFigure)
		}}




	})
}

