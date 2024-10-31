CREATE TABLE shelves (
    shelf_id INT AUTO_INCREMENT PRIMARY KEY,
    shelf_name VARCHAR(50) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    shelf_id INT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shelf_id) REFERENCES shelves(shelf_id) ON DELETE CASCADE
);

CREATE TABLE user_passwords (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(50),
	date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserting items for Chips Shelf (shelf_id = 1)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Lays Potato Chips', 1.50, 1),
('Doritos Nacho Cheese', 1.75, 1),
('Pringles Original', 2.00, 1),
('Cheetos', 1.25, 1),
('Ruffles', 1.60, 1),
('Sun Chips', 1.80, 1),
('Kettle Chips', 2.20, 1),
('Tortilla Chips', 1.50, 1),
('Popcorn', 1.40, 1),
('Puffcorn', 1.60, 1);

-- Inserting items for Beverages Shelf (shelf_id = 2)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Coca-Cola', 1.25, 2),
('Pepsi', 1.25, 2),
('Sprite', 1.25, 2),
('Fanta', 1.25, 2),
('Energy Drink', 2.50, 2),
('Mineral Water', 0.99, 2),
('Iced Tea', 1.50, 2),
('Lemonade', 1.20, 2),
('Orange Juice', 1.80, 2),
('Gatorade', 1.75, 2);

-- Inserting items for Snacks Shelf (shelf_id = 3)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Beef Jerky', 3.00, 3),
('Trail Mix', 2.50, 3),
('Granola Bars', 1.00, 3),
('Rice Cakes', 1.20, 3),
('Pita Chips', 1.80, 3),
('Dried Fruits', 2.00, 3),
('Pop-Tarts', 1.50, 3),
('Nut Mix', 2.25, 3),
('Cookies', 2.00, 3),
('Chocolate Bars', 1.50, 3);

-- Inserting items for Candy Shelf (shelf_id = 4)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Snickers', 1.00, 4),
('M&M\'s', 1.50, 4),
('Skittles', 1.20, 4),
('Gummy Bears', 1.75, 4),
('Twix', 1.25, 4),
('Kit Kat', 1.00, 4),
('Reese\'s', 1.50, 4),
('Sour Patch Kids', 1.75, 4),
('Lollipop', 0.50, 4),
('Chocolate-Covered Pretzels', 2.00, 4);

-- Inserting items for Frozen Foods Shelf (shelf_id = 5)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Frozen Pizza', 5.00, 5),
('Ice Cream', 3.50, 5),
('Frozen Vegetables', 2.50, 5),
('Frozen Burritos', 1.50, 5),
('Frozen Chicken Nuggets', 4.00, 5),
('Frozen French Fries', 2.00, 5),
('Frozen Meals', 3.00, 5),
('Frozen Fish Sticks', 3.50, 5),
('Frozen Breakfast Sandwiches', 2.25, 5),
('Frozen Fruit Bars', 3.00, 5);

-- Inserting items for Dairy Products Shelf (shelf_id = 6)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Milk', 1.50, 6),
('Yogurt', 0.99, 6),
('Cheese Slices', 2.00, 6),
('Butter', 2.50, 6),
('Cream Cheese', 1.80, 6),
('Sour Cream', 1.25, 6),
('Cottage Cheese', 2.00, 6),
('Ice Cream', 4.00, 6),
('Eggs', 2.50, 6),
('Almond Milk', 2.75, 6);

-- Inserting items for Bakery Shelf (shelf_id = 7)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Baguette', 1.50, 7),
('Croissant', 1.75, 7),
('Donuts', 1.00, 7),
('Bread Rolls', 0.80, 7),
('Bagels', 1.50, 7),
('Muffins', 1.25, 7),
('Brownies', 2.00, 7),
('Cookies', 1.00, 7),
('Cake Slices', 2.50, 7),
('Tarts', 2.00, 7);

-- Inserting items for Health & Beauty Shelf (shelf_id = 8)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Shampoo', 3.50, 8),
('Conditioner', 3.50, 8),
('Toothpaste', 1.25, 8),
('Soap', 1.00, 8),
('Deodorant', 2.50, 8),
('Facial Wash', 2.00, 8),
('Lotion', 3.00, 8),
('Sunscreen', 4.00, 8),
('Razor', 2.50, 8),
('Makeup Remover', 2.25, 8);

-- Inserting items for Cleaning Supplies Shelf (shelf_id = 9)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Laundry Detergent', 5.00, 9),
('Dish Soap', 2.00, 9),
('Glass Cleaner', 2.50, 9),
('All-Purpose Cleaner', 3.00, 9),
('Sponges', 1.00, 9),
('Trash Bags', 1.50, 9),
('Paper Towels', 2.50, 9),
('Broom', 3.50, 9),
('Mop', 4.00, 9),
('Disinfectant Wipes', 3.00, 9);

-- Inserting items for Pet Supplies Shelf (shelf_id = 10)
INSERT INTO items (item_name, price, shelf_id) VALUES
('Dog Food', 10.00, 10),
('Cat Food', 8.00, 10),
('Dog Treats', 5.00, 10),
('Cat Treats', 5.00, 10),
('Pet Toys', 3.50, 10),
('Pet Shampoo', 4.00, 10),
('Litter', 6.00, 10),
('Pet Leash', 8.50, 10),
('Pet Bed', 15.00, 10),
('Pet Carrier', 20.00, 10);
