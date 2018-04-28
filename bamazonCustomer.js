var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer
            .prompt([
              {
                name:"listItems",
                type: "rawlist",
                choices: () => results.map(item => `${item.product_name}..................$ ${item.price} `),
                message: "Which item would you like to buy?  Please provide the ID number."
              },
              {
                name: "purchase",
                type: "input",
                message: "How many would you like to buy?"  
              }
            ])
            .then(function(sale) {
                let itemName = sale.listItems.substr(0, sale.listItems.indexOf("."));
                let quantNumber;
                //Query that can call the specific item chosen by customer
                connection.query(
                    "SELECT * FROM products WHERE ?", 
                    [
                    {
                        product_name: itemName
                    }
                    ], function(error, selectedRow) {
                        if (err) throw err;
                        quantNumber = selectedRow[0].stock_quantity;
                        let itemPrice = selectedRow[0].price;
                        if (parseInt(sale.purchase) > parseInt(quantNumber)) {
                            console.log('Insufficient quantity!  There are only ' +  quantNumber + ' in stock.');
                            connection.end();
                        } else {
                            let newQuantity = (parseInt(quantNumber) - parseInt(sale.purchase));
                            let total = sale.purchase * itemPrice
                            let query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    product_name: itemName
                                }
                                ], function(err, newProductData){
                                    if (err) throw err;
                                    // console.log(newProductData);
                                    
                                })
                            console.log("Your total purchase is $", total);
                            connection.end();
                        }
                    });
            });
        });
}