There are two directories within this project:

1. The **api** directory contains the code for the REST Web API.
2. The **spa** directory contains the front-end code.


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



# Feature 1
The system is accessible and viewable only by registered users. All non-logged in users are directed to the login page.
1. The homepage displays an Add Order button, which takes the user to a table select page, with a large button for each table, when when a table is selected, the the status of it is set to vacant after
3. Clicking on a table button takes the staff member to the menu page. 
4. Clicking on a menu button adds the item to the order and returns the member of staff to the same food screen.
5. As items are selected, the order is shown and updated on the same screen, where details on the quantity, name and price are shown. 

In addition to the data captured through the forms, the database also stores:
1. The username of the member of staff logged in.
2. The date and time the order was placed (which is taken from the moment the Done button was clicked).
3. The order status which is set to placed.

# Feature 2
The homepage lists all the active orders which have a status of placed or ready.
For each order the following information is displayed:
1. Table number.
2. Number of places (the number of meals ordered).
3. Time of order
4. The Status 

# Feature 3
The Homepage also displays a Kitchen button which when clicked on displays summaries of all the orders with a status of placed. This page includes the following information:
1. The time the order was placed.
2. A list of items ordered with quantities.
3. A Ready button that sets the order status to ready (and removes it from this page when clicked on).

# Feature 4
This feature required changes to the functionality:
1. The users where changed so that the staff were asigned as either welcome, servers, kitchen or till, in order to add user access roles, meaning each user can only see orders with a particular status. For example, The welcome staff can assign tables but are prevented from assigning to an occupied table with a status of vacant.



## Technologies used:
- Javascript
- CSS
- HTML
- DENO
- Mysql
- DBDatabase

