//Modules
const ItemCollection = require('../config/db');
const dateModule = require('../public/js/date');

class Todo {

    //Get all the items from the database
    async getItems() {

        let data = await ItemCollection.find();
        if(Object.keys(data).length === 0) {
            return { Message: "The database is currently empty.", Date: dateModule.getDate() };
        }
        else {
            return data;
        }
    }

    //get the number of remaining tasks left
    async getProgress() {

        let count = await ItemCollection.count();
        return {tasksRemaining: count};
    }

    //Add item to the database
    addItem(newItem) {
        
        const item = new ItemCollection({
            name: newItem
        });
        console.log("Item added to database!")
        item.save();
    }

    //Update item in a database
    updateItem(idOld,itemNew) {
        
        const filter = { _id: idOld };
        const update = { name: itemNew };
        
        let doc = ItemCollection.findOne(filter,function(err,itemsFound) {
            if(err) {
                console.log(err);
            } else {
                return itemsFound;
            }
        });
        console.log("Item with ID: " + idOld + " updated!");
        doc.updateOne(update);
    }

    //delete item from a database
    deleteItem(itemID) {

        ItemCollection.findByIdAndRemove(itemID, function(err) {
            if (!err) {
            console.log("Item deleted from database!");
        }});
    }

}

module.exports = Todo;