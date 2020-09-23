# delilah-resto
This project is focused on creating a REST API that allows users to easily, register as a new user, creating a new login id, which is going to be authenticated every time they access the website.
Besides there will be some new administrator users who will be able to view and manage the orders that are created and submitted by the active and logged in users.
Registered users are able to select from the products list the products they want to eat, then create their order and then look at the order status which will be changed by the administrator users and updated to the users in real time.

This API also has a cnnection with the database which will save and update the users, the orders and the products alike.

On the following points you will see how the page is distributed on the main endpoints.


tomar el usuario desde el cache para identificarlo, este nombre será guardado en la lista de pedidos, junto al nuevo # de PO, precio total del po, descripción de todos los productos del mismo PO. user requests the Product details, add them to a personal purchasing cart, an endpoint which returns the status for both, purchase orders and products.


Adding a new PO: request the body from a form where user selects among the available products, PO status will be changed automatically when a request is made to the endpoint, according to status updated by the PO Admin
