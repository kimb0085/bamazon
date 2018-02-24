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
	runQuery();
});

//manager selects to view all products for sale
//manager selects to view all inventory with less than 5 items
//manager selects to add inventory to any item currently for sale
//manager selects to add completely new product

//run query to determine what the manager would like to do
function runQuery() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all products for sale",
        "View all products with fewer than 5 items",
        "Add inventory to any product currently for sale",
        "Add brand new product to the table"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View all products for sale":
          showProducts();
          break;

        case "View all products with fewer than 5 items":
          viewLowInventory();
          break;

        case "Add inventory to any product currently for sale":
          addInventory();
          break;

        case "Add brand new product to the table":
          addProduct();
          break;
      }
    });
}

//Pull product information from SQL to node
function showProducts() {
	var query =	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;

		console.log("All of the products available are: " + res);
	});
}

//View Low inventory
function viewLowInventory() {
	var query = connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;

    for (var i = 0; i < res[0].stock_quantity.length; i++){
      if (res[0].stock_quantity < 5) {
        console.log("The following products have fewer than 5 items: " + res);
      }		
		}
	});
}

//add new inventory to existing product
function addInventory() {
  inquirer.
    prompt([
    {
      name: "product",
      type: "input",
      message: "Which item would you like to add inventory to?"
    },
    {
      name: "units",
      type: "input",
      message: "How many units of that item would you like to add?"
    }
      ]).then(function(answer){
        var query = connection.query('SELECT * FROM products WHERE ?', {product_name: answer.product}, function(err, res){
          if (err) throw err;       

            connection.query('UPDATE products SET ? WHERE ?', [{
              stock_quantity: res[0].stock_quantity + answer.units
            }, {
              product_name: answer.product
            }], function(err, res){
              // console.log("Success! Product: " + answer.product + " quantity has been updated to: " + "newStockQty");
          });
        });
          
      });
  }

//add new products to the list
function addProduct(){
  inquirer.
    prompt([
    {
      name: "itemID",
      type: "input",
      message: "What is the itemID?"
    },
    {
      name: "productName",
      type: "input",
      message: "What is the product name?"
    },
    {
      name: "deptName",
      type: "input",
      message: "What department does it belong in?"
    },
    {
      name: "price",
      type: "input",
      message: "What is the cost per item?"
    },
    {
      name: "units",
      type: "input",
      message: "How many units do you have?"
    },
      ]).then(function(answer){
        var query = connection.query("INSERT INTO products SET ?", [
        {
          item_id: answer.itemID, product_name: answer.productName, department_name: answer.deptName, price: answer.price, stock_quantity: answer.units 
                  
        }], function(err, res){
          console.log("Success! You have added the following products: " + "\n" + answer.itemID + "\n" + answer.productName + "\n" + answer.deptName + "\n" + answer.price + "\n" + answer.units);
        });
      });
}