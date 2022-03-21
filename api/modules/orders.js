/* orders.js */
import { db } from './db.js'

export async function allOrders () {
    let sql = `SELECT * FROM orders;`
	let records = await db.query(sql)
    let orders = [] 
    records.forEach(record => {
        console.log(parseFloat(record.orderTotal).toFixed(2))
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
