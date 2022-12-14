
/* login.js */

import { createToken, customiseNavbar, secureGet, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGIN: setup')
		console.log(node)
		//document.querySelector('header p').innerText = 'Login Page'
		customiseNavbar(['register', 'login'])
		node.querySelector('form').addEventListener('submit', await login)
	} catch(err) {
		console.error(err)
	}
}

async function login() {
	event.preventDefault()
	console.log('form submitted')
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	const token = 'Basic ' + btoa(`${data.user}:${data.pass}`)
	console.log('making call to secureGet')
	const response = await secureGet('/api/accounts', token)
	console.log(response)
	if(response.status === 200) {
		localStorage.setItem('username', response.json.data.attributes.username)
		localStorage.setItem('userType', response.json.data.attributes.userType)
		localStorage.setItem('authorization', token)
		let array = [ ]
		localStorage.setItem('items',JSON.stringify(array) )
		showMessage(`you are logged in as ${response.json.data.username}`)
		await loadPage('home')
	} else {
		document.querySelector('input[name="pass"]').value = ''
		showMessage(response.json.errors[0].detail)
		}
}
