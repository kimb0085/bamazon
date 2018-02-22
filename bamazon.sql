DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 
USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	item_id INT(11) NULL, 
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10, 2) NULL,
	stock_quantity INT(11) NULL,
	PRIMARY KEY (id) 
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1236, "bow ties", "dog apparel", 3.40, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (894, "side tables", "furniture", 85, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (21, "mirror", "wall art", 25, 72);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (32, "cat nip", "cat entertainment", 9, 136);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (846, "instant pot", "cooking tools", 87.63, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9742, "mascara", "makeup", 7.99, 415);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (35, "cactus", "gardening", 15.62, 31);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "dummies guide to coding", "how-to books", 37.72, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (16, "whole coffee beans", "beverages", 13.40, 63);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (237, "charger", "computers", 17, 115);