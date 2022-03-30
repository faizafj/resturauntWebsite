/* orders.js */
import { db } from './db.js'

export async function allOrders () {
    let sql = `SELECT * FROM orders ORDER BY orderId`
	let records = await db.query(sql)
    console.log(records)
    let orders = [] 
    let currentId=0
    records.forEach(record => {
        if(currentId !=record.orderId){
            currentId=record.orderId
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
                date: record.date,
                numberOfPlaces: record.numberOfPlaces
             }

            }
            orders.push (order)
        }
    })
    return orders
}

//post API for orders
export async function placeOrder (orderDetails, username) {
    let lastOrder = `SELECT * FROM orders ORDER BY orderId DESC LIMIT 1;`
    let detailsOfLastOrder = await db.query(lastOrder)
    let orderId = detailsOfLastOrder[0].orderId + 1
    let date = orderDetails.attributes.date
    console.log('test')
    console.log(orderDetails.attributes.numberOfPlaces)
    for (let i = 0; i < orderDetails.attributes.items.length; i++){
        let item = orderDetails.attributes.items[i]
        let itemDetails = `SELECT * FROM menuItems WHERE itemId = ${item.itemId};`
        let detailOfItem = await db.query(itemDetails)
        let orderTotal = item.quantity * detailOfItem[0].itemPrice
        let sql = `INSERT INTO orders (orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date, numberOfPlaces) VALUES (
        "${orderId}",
        "Placed",
        "${orderTotal}",
        "${orderDetails.attributes.tableNumber}", 
        "${username}",
        "${orderDetails.attributes.time}", 
        "${item.itemId}", 
        "${item.quantity}", 
        "${date}",
        ${orderDetails.attributes.numberOfPlaces})`
        //console.log (sql)
        await db.query(sql)
        
        }

    return true
}


//displays order details (for the homepage and for each individual page)
export async function getOrderDetails(id) {
    let sql = `SELECT orders.*, menuItems.* FROM orders INNER JOIN menuItems ON orders.itemId = menuItems.itemId WHERE orderId = ${id};`
	let records = await db.query(sql)
    console.log(records)
    let items = []
    records.forEach(record => {
            let item = {
            type: "item",
            itemId: record.itemId,
            attributes:{
                itemName: record.itemName,
                itemPrice: parseFloat(record.itemPrice).toFixed(2),
                itemDescription: record.itemDescription,
                category: record.category,
                allergies: record.allergies,
                nutritionalInfo: record.nutritionalInfo,
                itemPhoto: record.itemPhoto,
                quantity:record.quantity,
                total:record.total
             }
            }
            items.push(item)
    })
    let orderDetails = {
            type: "orderDetails",
            orderId: records[0].orderId,
            attributes:{
                orderStatus: records[0].orderStatus,
                orderTotal: parseFloat(records[0].orderTotal).toFixed(2),
                tableNumber: records[0].tableNumber,
                user: records[0].user,
                timeOfOrder: records[0].timeOfOrder,
                date: records[0].date,
                numberOfPlaces: records[0].numberOfPlaces,
                items:items
        }

    }
        return orderDetails
}

export async function changeOrderStatus (id, statusChange) {
        let sql = `UPDATE orders SET orderStatus = "${statusChange}" WHERE orderId = ${id}`
        console.log (sql)
        console.log ("yes")
        await db.query(sql)  
    return true
}
