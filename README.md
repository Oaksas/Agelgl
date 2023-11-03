# Agelgl - Web Backend REST API Documentation

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Response Codes](#response-codes)
- [Examples](#examples)
- [Contact](#contact)

## Introduction

Agelgl is a backend REST API service designed to simplify the process of ordering food from restaurants. It offers a wide range of features, including order management, menu browsing, quick delivery options (food ready in under 30 minutes), customer and vendor roles, and administrative functions. This document serves as a comprehensive guide for using the Agelgl API.

## Features

- **Ordering:** Users can place orders for their desired food items.
- **Menu:** Browse menus from various restaurants and view available dishes.
- **Quick Delivery:** Find restaurants offering food that can be delivered in under 30 minutes.
- **User Roles:**
  - **Customers:** Place orders and track their status.
  - **Vendors:** Manage their restaurant's menu and orders.
  - **Admins:** Oversee and administer the platform.
- **Other Features:** The API supports various other functionalities such as user registration, authentication, and more.

## Getting Started

Before you can start using the Agelgl API, you need to sign up and obtain an API key. This key is used for authentication and authorization. Once you have your API key, you can start making requests to the API endpoints.

## Authentication

Authentication is a crucial part of the Agelgl API. You must include your API key in the request headers to access protected resources. To authenticate your requests, add an `Authorization` header with the `Bearer` token, followed by your API key.

```http
Authorization: Bearer YOUR_API_KEY




```markdown
# API Endpoints

Agelgl provides several endpoints to perform various operations. Below is a list of the main API endpoints.

## Customers

- `POST /customers/sign-up` - Register a new customer.
- `POST /customers/login` - Register a new customer.
- `PATCH /customers/verify` - Login customer.
- `GET /customers/profile` - Get customer details.
- `GET /customers/otp` - send opt for customer.
- `PATCH /customers/profile` - Update customer information.
- `DELETE /customers/{customer_id}` - Delete a customer account.

## Vendors

- `POST /vandor` - Register a new vendor.
- `GET /vandor/{vendor_id}` - Get vendor details.
- `PATCH /vandor/profile` - Update vendor information.
- `DELETE /vandor/{vendor_id}` - Delete a vendor account.
- `GET /vandor/profile/{vendor_id}` - Get vendor information.
- `GET /vandor/service` - Get vendor service status.
- `PATCH /vandor/coverimage/` - Get vendor information.
- `DELETE /vandor/{vendor_id}` - Delete a vendor account.

## Menus

- `GET /vandor/foods` - Get a list of available menus.
- `GET /vandor/food{food_id}` - Get details of a specific food.
- `POST /vandor/food` - Create a new food menu.
- `DELETE /vandor/food/{menu_id}` - Delete a menu.

## Shop

- `GET /shop/{id}` - Get a list of available menus.
- `GET /shop/top-restaurants/{id}` - Get top restaurants based on rating.
- `GET /shop/food-in-30-min/{id}` -  GET foods which can be served under 30 minutes.
- `GET /shop/search/{id | name | location}` - Search foods based on the their name, type and other behaviours .

## Orders

- `GET /vandor/orders` - Get a list of orders.
- `GET /orders/{order_id}` - Get details of a specific order.
- `POST /orders` - Place a new order.
- `PUT /orders/{order_id}` - Update order status.
- `DELETE /orders/{order_id}` - Cancel an order.

## Quick Delivery

- `GET /quick-delivery` - Get restaurants offering quick delivery options.

## Admins

- `POST /admins/vandor` - Register a new Restaurant Vendor.
- `GET /admins/vandors` - Get all Restaurant Vendors.
- `GET /admins/vandors/:ID` - Get a vandor by ID.


Please refer to the API documentation for detailed information about request parameters and response structures for each endpoint.

# Error Handling

Agelgl API handles errors gracefully. If you encounter an issue, you will receive a JSON response with an error message and an appropriate HTTP status code. Make sure to check the response for error details and take appropriate action.

# Response Codes

Here are some of the common HTTP status codes you may encounter:

- `200 OK` - Successful request.
- `201 Created` - Resource successfully created.
- `204 No Content` - Request successful, but no response body.
- `400 Bad Request` - Invalid request or missing parameters.
- `401 Unauthorized` - Authentication failed or missing API key.
- `403 Forbidden` - Insufficient permissions to access a resource.
- `404 Not Found` - Requested resource does not exist.
- `500 Internal Server Error` - An unexpected server error occurred.

# Examples

Here are some sample API requests:

- Register a new customer
- Place a new order
- Get a list of available menus
- Update vendor information







