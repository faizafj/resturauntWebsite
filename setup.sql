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
  `nutritionalInfo` VARCHAR(255),
  `itemPhoto` VARCHAR(255)
);

CREATE TABLE `availableTables` (
  `tableNumber` int PRIMARY KEY,
  `tableStatus` VARCHAR(20),
  `tableSeats` int
);

CREATE TABLE `orders` (
  `orderId` int AUTO_INCREMENT PRIMARY KEY,
  `orderStatus` VARCHAR (255) NOT NULL,
  `orderTotal` int,
  `tableNumber` int NOT NULL,
  `user` VARCHAR(25),
  `timeOfOrder` VARCHAR (255),
  `itemId` int,
  `quantity` int NOT NULL,
  `date` VARCHAR (255), 
  FOREIGN KEY (tableNumber) REFERENCES availableTables(tableNumber),
  FOREIGN KEY (user) REFERENCES accounts(user),
  FOREIGN KEY (itemId) REFERENCES menuItems(itemId)
);

INSERT INTO accounts(user, pass, userType) VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "admin");
INSERT INTO accounts(user, pass, userType) VALUES("faizafj", "$2a$10$y3Arlz52EeinaUOtRhBQ6OwFFO6K22OYfu9lVCw/nl16Smi5mPi.m", "waitress");
INSERT INTO accounts(user, pass, userType) VALUES("user1", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "waiter");
INSERT INTO accounts(user, pass, userType) VALUES("user2", "$2a$10$O5CsucRQkubBzQU3rtJAR./ewhQ40fnzN5hs.91jUGgutkwo.f3Gy", "chef");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, nutritionalInfo, itemPhoto) VALUES ("1", "Nandos Meal", 4.00, "Item Description, yummy food!", "Starter", "nuts", "healthy meal!",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, nutritionalInfo, itemPhoto) VALUES ("2", "Mixed Platter", 16.00, "Mixed Platter with lots of food", "Platters", "N/A", "healthy meal!",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
INSERT INTO menuItems(itemId, itemName, itemPrice, itemDescription, category, allergies, nutritionalInfo, itemPhoto) VALUES ("3", "Fish and Chips", 7.00, "Chips and Fish with Ketchup", "Main", "N/A", "healthy meal!",  "https://images.menu.nandos.dev/uk/sharing-platters/640x360/boneless-platter-50.Image-16-9.101913.jpg");
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
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date) VALUES("1", "Done", 8.00, "3", "faizafj", "12:08", "1", "2", "12/03/22");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date) VALUES("2", "Placed", 16.00, "5", "user1", "12:30", "2", "1", "12/03/22");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date) VALUES("3", "Placed", 7.00, "5", "user1", "12:30", "3", "1", "12/03/22");
INSERT INTO orders(orderId, orderStatus, orderTotal, tableNumber, user, timeOfOrder, itemId, quantity, date) VALUES("4", "Ready", 7.00, "9", "user1", "12:36", "3", "1", "12/03/22")