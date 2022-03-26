/* orders.js */
import { db } from './db.js'

export async function allOrders () {
    let sql = `SELECT * FROM orders;`
	let records = await db.query(sql)
    let orders = [] 
    records.forEach(record => {
        //console.log(parseFloat(record.orderTotal).toFixed(2))
        let order = {
            type: "order",
            orderId: record.orderId,
            attributes:{
                orderStatus: record.orderStatus,
                orderTotal: parseFloat(record.orderTotal).toFixed(2),
                tableNumber: record.tableNumber,
                user: record.user,
                timeOfOrder: record.timeOfOrder,
                itemId: record.itemId,
                quantity: record.quantity,
                date: record.date

        }

    }
    orders.push (order)
})
    return orders
}

//post API for orders
export async function placeOrder (orderDetails, username) {
    let lastOrder = `SELECT * FROM orders ORDER BY orderId DESC LIMIT 1;`
    let detailsOfLastOrder = await db.query(lastOrder)
    let orderId = detailsOfLastOrder[0].orderId + 1
    let date = orderDetails.attributes.date

    for (let i = 0; i < orderDetails.attributes.items.length; i++){
        let item = orderDetails.attributes.items[i]
        let itemDetails = `SELECT * FROM menuItems WHERE itemId = ${item.itemId};`
        let detailOfItem = await db.query(itemDetails)
        let orderTotal = item.quantity * detailOfItem[0].itemPrice
        let sql = `INSERT INTO orders (orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date) VALUES (
        "${orderId}",
        "Placed",
        "${orderTotal}",
        "${orderDetails.attributes.tableNumber}", 
        "${username}",
        "${orderDetails.attributes.time}", 
        "${item.itemId}", 
        "${item.quantity}", 
        "${date}")`
        //console.log (sql)
        await db.query(sql)
        
        }

    return true
}


