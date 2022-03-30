/* availableItems.js */
import { db } from './db.js'

export async function allAvailableTables () {
    let sql = `SELECT * FROM availableTables;`
	let records = await db.query(sql)
    let availableTables = [] 
    records.forEach(record => {
        let availableTable = {
            type: "availableTable",
            tableNumber: record.tableNumber,
            attributes:{
                itemName: record.itemName,
                tableStatus: record.tableStatus,
                tableSeats: record.tableSeats

        }

    }
    availableTables.push (availableTable)
})
    return availableTables
}


export async function changeTableStatus (tableNumber, tableStatusChange) {
        let sql = `UPDATE availableTables SET tableStatus ="${tableStatusChange}" WHERE tableNumber = ${tableNumber}`
        console.log (sql)
        await db.query(sql)  
    return true
}

