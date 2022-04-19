CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser; 
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `menuItems`;
DROP TABLE IF EXISTS `availableTables`;
DROP TABLE IF EXISTS `accounts`;


CREATE TABLE `accounts` (
  `user` VARCHAR(25) NOT NULL PRIMARY KEY,
  `pass` VARCHAR(70) NOT NULL,
  `userType` VARCHAR(15)
);

CREATE TABLE `menuItems` (
  `itemId` int PRIMARY KEY,
  `itemName` VARCHAR(150),
  `itemPrice` int,
  `itemDescription` VARCHAR(255),
  `category` VARCHAR(20),
  `allergies` VARCHAR(255),
  `itemPhoto` VARCHAR(255)
);

CREATE TABLE `availableTables` (
  `tableNumber` int PRIMARY KEY,
  `tableStatus` VARCHAR(20),
  `tableSeats` int
);

CREATE TABLE `orders` (
  `orderId` int ,
  `orderStatus` VARCHAR (255) NOT NULL,
  `orderTotal` int,
  `tableNumber` int NOT NULL,
  `user` VARCHAR(25),
  `timeOfOrder` VARCHAR (255),
  `itemId` int,
  `quantity` int NOT NULL,
  `date` VARCHAR (255), 
  `numberOfPlaces` VARCHAR (255),
  FOREIGN KEY (tableNumber) REFERENCES availableTables(tableNumber),
  FOREIGN KEY (user) REFERENCES accounts(user),
  FOREIGN KEY (itemId) REFERENCES menuItems(itemId)
);

INSERT INTO accounts(user, pass, userType) VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "Admin");
INSERT INTO accounts(user, pass, userType) VALUES("FaizaJaved", "$2a$10$y3Arlz52EeinaUOtRhBQ6OwFFO6K22OYfu9lVCw/nl16Smi5mPi.m", "Admin");
INSERT INTO accounts(user, pass, userType) VALUES("Waiter", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Server");
INSERT INTO accounts(user, pass, userType) VALUES("Waitress", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Server");
INSERT INTO accounts(user, pass, userType) VALUES("Chef2", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Kitchen");
INSERT INTO accounts(user, pass, userType) VALUES("Chef", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Kitchen");
INSERT INTO accounts(user, pass, userType) VALUES("TillStaff", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Till");
INSERT INTO accounts(user, pass, userType) VALUES("TillStaff2", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "Till");

INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("1", "Peri-Peri Chicken", 4.00, "Peri-Peri Chicken Meal with Fries and Our Famous Nandos Sauce", "Main", "Contains Nuts",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("2", "Mixed Platter", 16.00, "Mixed Platter with lots of different Chicken Flavours", "Main", "May contain Seasame and Soy",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("3", "Fish and Chips", 7.00, "Chips and Fish with Ketchup", "Main", "Contains Fish",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("4", "Diet-Coke", 3.50, "Sparkling Diet Coke", "Drinks", "No Allergens",  "https://images.menu.nandos.dev/uk/drinks/640x360/bottomless-diet-coke-136.Image-16-9.105203.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("5", "Grilled Chicken Wrap", 6.95, "Chicken breast infused with PERi-PERi and grilled to your favourite spice. Served in a wrap with lettuce, lightly spiced yoghurt mayo and chilli jam.", "Wraps And Burgers", "Contains, cereals containing Gluten, Wheat, Egg, Milk, Mustard",  "https://images.menu.nandos.dev/uk/drinks/640x360/bottomless-diet-coke-136.Image-16-9.105203.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("6", "Coke", 3.50, "Sparkling Coke", "Drinks", "No Allergens",  "https://images.menu.nandos.dev/uk/drinks/640x360/bottomless-diet-coke-136.Image-16-9.105203.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("7", "4 Chicken Wings", 5.00, "Flame-grilled, infused with PERi-PERi and perfect for pairing with sides. Served in your choice of spice.", "Side", "No Allergens",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("8", "10 Chicken Wings", 10.00, "Flame-grilled, infused with PERi-PERi and perfect for pairing with sides. Served in your choice of spice.", "Main", "No Allergens",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("9", "Sprite", 3.50, "Sparkling Sprite", "Drinks", "No Allergens",  "https://images.menu.nandos.dev/uk/drinks/640x360/bottomless-diet-coke-136.Image-16-9.105203.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("10", "Fanta", 3.50, "Sparkling Fanta", "Drinks", "No Allergens",  "https://images.menu.nandos.dev/uk/drinks/640x360/bottomless-fanta-137.Image-16-9.105247.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("11", "Garlic Bread", 3.25, "Garlic Bread Grilled to perfection", "Sides", "Contains Rye, Wheat",  "https://images.menu.nandos.dev/uk/sides/640x360/garlic-bread-76.Image-16-9.084622.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, itemPhoto) VALUES ("12", "Chips", 3.25, "Chips", "Sides", "Contains Rye, Wheat, Gluten",  "https://images.menu.nandos.dev/uk/sides/640x360/chips-78.Image-16-9.152712.jpg");

INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("1", "Available", "4");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("2", "Vacant", "4");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("3", "Vacant", "6");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("4", "Available", "4");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("5", "Vacant", "2");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("6", "Available", "8");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("7", "Vacant", "10");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("8", "Available", "4");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("9", "Vacant", "2");
INSERT INTO availableTables(tableNumber, tableStatus, tableSeats) VALUES ("10", "Vacant", "6");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date, numberOfPlaces) VALUES("1", "Done", 8.00, "3", "Waitress", "12:08", "1", "2", "12/03/22", "1");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date, numberOfPlaces) VALUES("2", "Placed", 16.00, "5", "Waiter", "12:30", "2", "1", "12/03/22", "2");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date, numberOfPlaces) VALUES("3", "Placed", 7.00, "5", "FaizaJaved", "12:30", "3", "1", "12/03/22", "2");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date, numberOfPlaces) VALUES("4", "Ready", 7.00, "9", "Waiter", "12:36", "3", "1", "12/03/22", "1")