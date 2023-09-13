
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin, // Read from standard input (keyboard)
    output: process.stdout // Write to standard output (console)
});


const groceryList = [];

function displayGroceryList() {
    console.log("Grocery List:");
    groceryList.forEach((item, index) => {
        const status = item.bought ? "Bought" : "Not Bought";
        console.log(`${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}, Status: ${status}`);
    });
}


function addItemToGroceryList(name, quantity, price) {
    const newItem = {
        name: name,
        quantity: quantity,
        price: price,
        bought: false
    };
    groceryList.push(newItem);
    console.log(`${name} has been added to the grocery list.`);
}


function removeItemFromGroceryList(index) {
    if (index >= 0 && index < groceryList.length) {
        const removedItem = groceryList.splice(index, 1);
        console.log(`${removedItem[0].name} has been removed from the grocery list.`);
    } else {
        console.log("Invalid item index.");
    }
}


function itemBoughtStatus(index) {
    if (index >= 0 && index < groceryList.length) {
        groceryList[index].bought = !groceryList[index].bought;
        const status = groceryList[index].bought ? "Bought" : "Not Bought";
        console.log(`${groceryList[index].name} is now marked as ${status}.`);
    } else {
        console.log("Invalid item index.");
    }
}
console.log('type add,display,remove,bought, or quit');

rl.on('line', (line) => {
    const input = line.trim().toLowerCase();
    if (input === 'display') {
        displayGroceryList();
        console.log(" Use 'display', 'add', 'remove', 'toggle', or 'quit'.");
    } else if (input === 'add') {
        rl.question("Enter the item name: ", (name) => {
            rl.question("Enter the quantity: ", (quantity) => {
                rl.question("Enter the price: ", (price) => {
                    addItemToGroceryList(name, Number(quantity), Number(price));
                    console.log('type add,display,remove,bought, or quit');
                    rl.prompt();
                });
            });
        });
    } else if (input === 'remove') {
        rl.question("Enter the index of the item to remove: ", (index) => {
            removeItemFromGroceryList(Number(index) - 1);
            console.log('type add,display,remove,bought, or quit');
            rl.prompt();
        });
    } else if (input === 'bought') {
        rl.question("Enter the index of the item to toggle (bought/not bought): ", (index) => {
            itemBoughtStatus(Number(index) - 1);
            console.log('type add,display,remove,bought, or quit');
            rl.prompt();
        });
    } else if (input === 'quit') {
        rl.close();
    } else {
        console.log("Invalid command. Use 'display', 'add', 'remove', 'toggle', or 'quit'.");
        rl.prompt();
    }
});

rl.once('close', () => {
    console.log("Goodbye!");
});
