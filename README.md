This template is to be used when developing a Single Page Application connected to a REST Web API.This

There are two directories:

1. The **api** directory contains the code for the REST Web API.
2. The **spa** directory contains the front-end code.

Project settings: make sure **protect dynamic ports** is switched off.

# Getting Started

This template is designed to be installed inside a Codio box. To to this, open the terminal and run the following command:

```
$ curl -sL https://bit.ly/3ngLmVo | bash
```

This will configure the box ready for you to start development.

> The process can take up to 15 min. Make sure you don't close the browser tab _or let your computer go into sleep mode_.

To run the project:

```
$ deno run --allow-all --unstable index.js
```



# Testing
You are required to create the following accounts to allow the system to be tested. All accounts should have the password p455w0rd:
1. waitress (a member of serving staff).
2. waiter (a second member of serving staff).
3. chef
Each of the serving staff should have placed at least one order and the chef should have flagged at least one order as served.


# Feature 1
The system should only be accessible and viewable by registered users. All non-logged in users to be directed to the login screen.
1. The homepage should display an Add Order link or button.
2. This should take staff to a table select screen with a large button for each table (assume 10 tables labelled 1-10). //needs to set the status to vacant after
3. Clicking on a table button takes the staff member to the food select screen. This has big buttons, one per menu item.
4. Clicking on a button adds the item to the order and returns the member of staff to the same food screen.
5. As items are selected, the order (list of items) should be updated on the same screen. each item in the list should include the name of the ordered item and the quantity.
In addition to the data captured through the forms, the database should also store:
1. The username of the member of staff logged in.
2. The date and time the order was placed (the Done button was clicked).
3. The order status should be set to placed.
To demonstrate this feature and to prove that the form works correctly you will need to show that the data is being persisted correctly, either by running a database query or an API call depending on the platform and technology you are using.
 
# Feature 2
The home screen should list all the active orders (those that have a status of placed or ready).
For each order the following needs to be displayed:
1. Table number.
2. Number of places (the number of meals ordered).
3. Time of order (but not the date)
4. Status (see above)


# Feature 3
The Homepage should also have a Kitchen button or link. This displays summaries of all the orders with a status of placed. The summary should include:
1. Time the order was placed (oldest at the top).
2. List of items ordered with quantities. Each item in the list should include the name of the item and the quantity.
3. A Ready button that sets the order status to ready (and removes it from this screen).

# Feature 4
This feature requires you to make changes to the functionality:
1. You need to assign staff as either welcome, servers, kitchen or till.
2. Each use can only see orders with a particular status.
3. The workflow should handle every step from the customer's arrival to payment and departure.
4. The welcome staff assign tables but are prevented from assigning to an occupied table.

