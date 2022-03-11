CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser; 
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `menuItems`;
DROP TABLE IF EXISTS `availableTables`;
DROP TABLE IF EXISTS `accounts`;


CREATE TABLE `accounts` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user` VARCHAR(25) NOT NULL,
  `pass` VARCHAR(70) NOT NULL,
  `userType` VARCHAR(15) NOT NULL
);

CREATE TABLE `menuItems` (
  `itemId` int PRIMARY KEY,
  `itemName` VARCHAR(150),
  `itemPrice` int,
  `itemDescription` VARCHAR(255),
  `category` VARCHAR(20),
  `nutritionalInfo` VARCHAR(255),
  `itemPhoto` VARCHAR(255)
);

CREATE TABLE `availableTables` (
  `tableNumber` int PRIMARY KEY,
  `tableStatus` VARCHAR(20)
);

CREATE TABLE `orders` (
  `orderId` int AUTO_INCREMENT PRIMARY KEY,
  `orderStatus` VARCHAR (255) NOT NULL,
  `orderTotal` int ,
  `tableNumber` int NOT NULL,
  `id` int UNSIGNED,
  `timeOfOrder` timestamp,
  `itemId` int,
  `quantity` int NOT NULL,
  `date` VARCHAR (255),
  FOREIGN KEY (id) REFERENCES accounts(id),
  FOREIGN KEY(itemId) REFERENCES menuItems(itemId),
  FOREIGN KEY (tableNumber) REFERENCES availableTables(tableNumber)

);


INSERT INTO accounts(user, pass, userType)
  VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "admin");

