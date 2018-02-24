//Connect to NPM Installs: MySQL and Inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
//Create a connection MySQL account
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "1234",
	database: "bamazon"
});
//Ensure connection is right... test connection using thread Id
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id: " + connection.threadId + "\n");
	showProducts();
});
//Pull product information from SQL to node
function showProducts() {
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;

		console.log(res);
		placeOrder();
	});
}
//Generate a prompt request to ask which item id and quantity the user wants
//Then, check SQL if there were enough of the quantity if:
//yes, then show the user how much they owe and depreciate the number in the SQL database
//no, then indicate to the user, there aren't enough units
function placeOrder() {
	inquirer.
		prompt([
		{
			name: "item",
			type: "input",
			message: "What item_id are you interested in?"
		},
		{
			name: "units",
			type: "input",
			message: "How many units of that item would you like?"
		}
			]).then(function(answer){
				var query = connection.query('SELECT * FROM products WHERE ?', {item_id: answer.item}, function(err, res){
					if (err) throw err;

					if (res[0].stock_quantity > answer.units) {
						var cost = res[0].price * answer.units
						console.log("You owe: $" + cost + " for " + answer.units + "\nYour order has been placed, thank you, shop with us again!");

						var newStockQty = res[0].stock_quantity - answer.units;
						connection.query('UPDATE products SET ? WHERE ?', [{
							stock_quantity: newStockQty
						}, {
							item_id: answer.item
						}], function(err, res){});
					} else {
						console.log("Looks like you've requested more units than we have available. \nWe only have " + res[0].stock_quantity + " unit(s) of item_id: " + res[0].item_id);
					}
				});
			});
	}
