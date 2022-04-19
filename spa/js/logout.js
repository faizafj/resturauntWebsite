
/* logout.js */

import { customiseNavbar, loadPage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGOUT: setup')
		let userRole = localStorage.getItem('userType')	
		if (userRole == 'Kitchen'){
			customiseNavbar(['kitchen', 'logout'])
		} else {
		customiseNavbar(['home'])
		}
		node.querySelectorAll('button').forEach( button => button.addEventListener('click', event => {
			console.log(event.target.innerText)
			if(event.target.innerText === 'OK') {
				localStorage.removeItem('username')
				localStorage.removeItem('authorization')
				localStorage.removeItem('items')
				localStorage.removeItem('userType')
				loadPage('login')
				showMessage('you are logged out')
			} else {
				loadPage('addOrder')
			}
		}))
	} catch(err) {
		console.error(err)
	}
}
