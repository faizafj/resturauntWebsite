import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('availableTables: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Available Tables'
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
	console.log (json)
	json.data.forEach(availableTable =>{
		console.log(availableTable)
		if(availableTable.attributes.tableStatus == "Available"){
			let newButton = document.createElement("button")
			newButton.innerText = ("Table ") + availableTable.tableNumber + (" Number of seats available: ") + availableTable.attributes.tableSeats
			node.appendChild(newButton)
			newButton.addEventListener("click", function(){
			localStorage.setItem('tableNumber', availableTable.tableNumber)
			console.log (availableTable.tableNumber)
            location = "/menuItems"; 
			});

		}
		
	})
}


//need to set status to vacant!
//fix navBar not showing addOrders