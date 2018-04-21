DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(250),
  department_name VARCHAR(250),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Elephant Coffee Mug", "Kitchenware", 15.00, 50),
	("Iphone Charging Cable", "Electronics", 9.99, 150),
	("3 Pack Gardening Gloves", "Gardening", 7.99, 75),
	("65 inch Sony TV", "Electronics", 1299.99, 3),
	("Moon Necklace", "Jewlery", 49.99, 15),
	("The How to Kill My Husband and Get Away With It Kit", "Gardening", 79.99, 13),
	("Harry Potter Box Set of Books", "Books", 49.99, 7),
	("10 pack of Mens T-Shirts", "Clothing", 12.99, 10),
	("Black Unmbrella", "Outdoors", 2.99, 18),
	("Debugging Rubber Ducky", "Electronics", 1.99, 200);

SELECT * FROM products;

