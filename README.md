# Build Nook

## Description

Build Nook is an ecommerce app where you can buy PC components.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform 
-  **Login:** As a user I can login to the platform 
-  **Logout:** As a user I can logout from the platform 
-  **Add Products to Shopping Cart** As a user I can add a product to shopping cart
-  **Add Products to Wish List** As a user I want to see the wish list so that I can choose one to buy
-  **Add Reviews** As a user I want to search restaurants by name so that I know if it´s already in the platform
-  **Payment with Stripe** As a user I want pay with Stripe. (Test Card: 4242 4242 4242 4242, 11/23 111)

## Backlog

List of other features outside of the MVPs scope

Nav bar
- Access from all the website
- Access to the homepage
- Access to profile sections
- Access to shopping cart
- Access to signup/login or logout

User Profile
- See my profile and add or change a picture
- Upload my profile picture
- See Wish List 
- See Purchase History

Homepage
- Side Nav Bar with a Category List
- A list of New Products

Categories List
- You can see all the products by each Categorie

Product Details
- See more information of each Product
- Write a Review
- Possibility to rate the product and check the Average Rating
- Possibility to add shopping cart & wish list

Shopping Cart
- Side Nav where you can see your Products to buy
- Button redirects to Shopping Cart page where you can pay your products

Success Page
- Confirms the Payment
  
# Client

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /products/:categorie - Products by each categorie
- /products/:productId/details - Products details
- /cart/:userId - Shopping cart
- /profile/:userId/:display - User profile
- /paymentsuccess - Confirms Payment
- /error
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Categories (public)
- Product Details (public)
- Shopping Cart (user only)
- My Profile Page (user only)
- Success (user only)
- 404 Page (public)

## Components

### Navbar
- Cart button
- Footer
- Side NavBar List categories
- Navbar

### Payment
- Checkout Form
- Payment Intent
- Success

### Product Reviews
- Add Review
- Product Review
- Description + Review

### Profile
- Purchase History Desktop
- Purchase History Mobile
- Edit Profile
- Profile Side NavBar
- Purchase History
- Wish List
- isPrivate

### Products
- Product Cards
- Product Description

### Loading
- Simple Backdrop

## IO


## Services

- Config service
- Auth Service
- Products service
- Profile service
- Reviews service
- Transaction service
- Upload service

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
wishList - [ObjectID<product>]
shoppingCart - [ObjectID<product>]
role - String // enum
isBanned - Boolean
```

Product model

```
name - String
description - [String]
image - String
price - Number
Categorie - String // enum

```

Review model

```
title - String
description - String
rating - Number
product - ObjectID<product>
user - ObjectID<user>

```

Transaction model

```
paymentIntent - String
clientSecret - String
isPaid - Boolean
product - ObjectID<product>
user - ObjectID<user>

```

## API Endpoints/Backend Routes

- Index routes
- Auth routes
- Product routes
- Profile routes
- Reviews routes
- Transaction routes
- Upload routes
- Wish List routes

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/culedev/BuildNook-client)
[Server repository Link](https://github.com/culedev/BuildNook-server)

[Build Nook Deploy Page](https://buildnook.netlify.app/)
