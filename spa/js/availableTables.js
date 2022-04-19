import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('availableTables: setup')
	try {
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
		if(localStorage.getItem('authorization') === null) loadPage('login') // if there is no token in localstorage - goto Login Page
		await showAvailableTables(node)
	} catch(err) {
		console.error(err)
	}
}

async function showAvailableTables(node){
	const url = '/api/v1/availableTables'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const json = await response.json()
	json.data.forEach(availableTable =>{
		if(availableTable.attributes.tableStatus == "Available"){
			let newButton = document.createElement("button")
			let seatsAvailable = document.createElement("p")
			let tableStatusText = document.createElement ("p")
			seatsAvailable.innerText = availableTable.attributes.tableSeats + (" seats")
			newButton.innerText = ("Table ") + availableTable.tableNumber
			tableStatusText.innerText = ("Available")
			node.querySelector("#availableSide").appendChild(newButton)
			newButton.append(seatsAvailable)
			newButton.append(tableStatusText)
			let tableStatusChange = "Vacant"
			newButton.addEventListener("click", async function(){
				localStorage.setItem('tableNumber', availableTable.tableNumber)
				const url = '/api/v3/availableTables/' + availableTable.tableNumber
				const options = {
					method: 'PUT',
					headers: {
					'Content-Type': 'application/vnd.api+json',
					'Authorization': localStorage.getItem('authorization')
					},
					body: JSON.stringify({
						type: "availableTables",
						attributes:{
						tableStatusChange: tableStatusChange
				}})}
				const response = await fetch(url, options)
				const json = await response.json()
				console.log ("Status Changed")
				location = "/menuItems"; 
				});
		}


		if (availableTable.attributes.tableStatus == "Vacant"){
			let newButton = document.createElement("button")
			newButton.innerText = ("Table ") + availableTable.tableNumber 
			node.querySelector("#vacantSide").appendChild(newButton)
			let tableStatusChange = "Available"
			newButton.addEventListener("click", async function(){
				const url = '/api/v3/availableTables/' + availableTable.tableNumber
				const options = {
					method: 'PUT',
					headers: {
					'Content-Type': 'application/vnd.api+json',
					'Authorization': localStorage.getItem('authorization')
					},
					body: JSON.stringify({
						type: "availableTables",
						attributes:{
						tableStatusChange: tableStatusChange
				}})}
				const response = await fetch(url, options)
				const json = await response.json()
				console.log ("Status Changed")
				location.reload()
				});
		}
	})
}