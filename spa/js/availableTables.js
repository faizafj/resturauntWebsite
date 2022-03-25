import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('availableTables: setup')
	try {
		//console.log(node)
		customiseNavbar(['home', 'availableTables', 'logout']) // navbar shown if logged in
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
	//console.log (json)
	json.data.forEach(availableTable =>{
		//console.log(availableTable)
		if(availableTable.attributes.tableStatus == "Available"){
			let newButton = document.createElement("button")
			let seatsAvailable = document.createElement("p")
			seatsAvailable.innerText = availableTable.attributes.tableSeats + (" seats")
			newButton.innerText = ("Table ") + availableTable.tableNumber 
			node.appendChild(newButton)
			newButton.append(seatsAvailable)
			newButton.addEventListener("click", async function(){
				localStorage.setItem('tableNumber', availableTable.tableNumber)
				const url = '/api/v1/availableTables/'+ availableTable.tableNumber
				const options = {
					method: 'PUT',
					headers: {
					'Content-Type': 'application/vnd.api+json',
					'Authorization': localStorage.getItem('authorization')
					}
				}
				const response = await fetch(url, options)
				const json = await response.json()
				location = "/menuItems"; 
				});
		}

	})
}