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
                choices: () => results.map(item => item.product_name),
                message: "Which item would you like to buy?  Please provide the ID number."
              },
              {
                name: "purchase",
                type: "input",
                message: "How many would you like to buy?"  
              }
            ])
            .then(function(sale) {
                const chosenItem = results.find(item => item.product_name === sale.choice);
                if (chosenItem.purchase > parseInt(sale.stock_quantity)){
                    console.log("Insufficient quantity!");
                    
                } else {
                    const newQuantity = parseInt(sale.stock_quantity) - chosenItem.purchase
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: newQuantity
                          },
                          {
                            id: chosenItem.id
                          }
                        ],
                        function(error) {
                            if (error) throw error;
                            console.log("Purchase Complete!");
                            start();
                        }
                    )
                }
            })
    });
};