// TODO: display all items available for sale. Include ids, names, and prices.
var mysql = require('mysql');
var inquirer = require('inquirer');
// This is an npm module that allows tables to be built.
var Table = require('cli-table');
var command = process.argv[2];
var input1 = process.argv[3];
var input2 = process.argv[4];
var optionsArray = [];
var productID = 0;
var price = 0;
var availableQuantity = 0;
var pricesArray = [];
var purchase = false;
var cartTable = new Table({
	head: ['Product Name', 'Quantity', 'Total Price']
	, colWidths: [30, 10, 20]
});

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password	
	password: "17Lily!7h",
	database: "bamazon"
});

// Runs intial display of available items.
displayAvailableItems()




// Displays all items available from products table. Limited to items with stock quantity > 0.
function displayAvailableItems() {
	connection.query('SELECT * FROM products where stock_quantity > 0', function (error, results, fields) {
		if (error) {
			return console.log(error);
		}
		console.log('Items available for sale:\n');
		// This is making a new table for the displayed items.
		var availableTable = new Table({
			head: ['ID', 'Product Name', 'Price']
			, colWidths: [4, 30, 10]
		});
		// For loop will push the values into the new table created above.
		for (let i = 0; i < results.length; i++) {
			optionsArray.push(results[i].product_name);
			// This is pushing the results into a generated table to display all available items nicely.
			availableTable.push(
				[results[i].id, results[i].product_name, parseFloat(results[i].price)]
			);
		};
		console.log(availableTable.toString());
		purchasePrompt(results)
	});
};

// This function will be called after the intial displaying of available items. It will pass through the query results so the items can be provided in a list using inquirer for the user to select from.
function purchasePrompt(results) {

	// This will prompt the user on which item they would like to select to purchase.
	inquirer.prompt([
		{
			type: "list",
			message: "Which item would you like to purchase?",
			choices: optionsArray,
			name: "options"
		},
		{
			type: "input",
			message: "How many do you want to get?",
			name: "quantity",
			validate: function (value) {
				if (isNaN(value) === false && parseInt(value) > 0) {
					return true;
				} else {
					console.log('\n\x1b[31mPlease use a valid quantity\x1b[0m');
					return false;
				}
			}
		}
	]).then(function (order) {
		// Loop through original query results to match the product name then pull price and available quantity.
		for (let i = 0; i < results.length; i++) {
			if (results[i].product_name === order.options) {
				productID = results[i].id
				price = parseFloat(results[i].price);
				availableQuantity = results[i].stock_quantity;
			};
		};
		// Check if the quantity ordered is over what is available. If not available, tell the customer insufficent quantity. If enough, update server and provide customer with the order $ total.
		if (order.quantity > availableQuantity) {
			console.log('Insufficient Quantity!');
			console.log('We have ' + availableQuantity + ' of this item in stock.');
		} else {
			// store variables to be used in update query below.
			var orderQuantity = {
				stock_quantity: availableQuantity - order.quantity
			},
				prodID = {
					id: productID
				}

			// Update server with new available quantity.
			connection.query('UPDATE products SET ? WHERE ?',
				[orderQuantity, prodID],
				function (error, results, fields) {
					if (error) {
						return console.log(error);
					}
					purchase = true;
					pricesArray.push(price);
					cartTable.push(
						[order.options, order.quantity, price*order.quantity]
					);
				});
		};
		// After the customer tries to order something, it will run keepShopping which will check if they either want to get something else or stop.
		keepShopping()
	});
};

function keepShopping() {
	inquirer.prompt([
		{
			type: "confirm",
			message: "Would you like to purchase anything else?",
			name: "shopMore"
		}
	]).then(function (answer) {
		if (answer.shopMore) {
			displayAvailableItems();
		} else if (purchase) {
			// Loops through pricesArray to get a total price of everything combined.
			var totalPrice = 0;
			for (let i = 0; i < pricesArray.length; i++) {
				totalPrice += parseFloat(pricesArray[i]);
			}
			console.log('Thank you for your purchase! Here is your receipt.\n' + 'Your total is $' + parseFloat(totalPrice));
			console.log(cartTable.toString());
			connection.end();
		} else {
			console.log('We hope you come back!');
			connection.end();
		}
	});
};

