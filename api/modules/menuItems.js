/* menuItems.js */

import { db } from './db.js'

export async function allMenuItems () {
    let sql = `SELECT * FROM menuItems;`
	let records = await db.query(sql)
    let menuItems = [] 
    records.forEach(record => {
        let menuItem = {
            type: "menuItem",
            itemId: record.itemId,
            attributes:{
                itemName: record.itemName,
                itemPrice: parseFloat(record.itemPrice).toFixed(2),
                itemDescription: record.itemDescription,
                category: record.category,
                allergies: record.allergies,
                nutritionalInfo: record.nutritionalInfo,
                itemPhoto: record.itemPhoto,
        }

    }
    menuItems.push (menuItem)
})
    return menuItems
}

export async function oneMenuItem(id) {
    let sql = `SELECT * FROM menuItems WHERE itemId = ${id};`
	let records = await db.query(sql)
        let menuItem = {
            type: "menuItem",
            itemId: records[0].itemId,
            attributes:{
                itemName: records[0].itemName,
                itemPrice: parseFloat(records[0].itemPrice).toFixed(2),
                itemDescription: records[0].itemDescription,
                category: records[0].category,
                allergies: records[0].allergies,
                nutritionalInfo: records[0].nutritionalInfo,
                itemPhoto: records[0].itemPhoto,
        }

    }
        return menuItem
}
