## Backend code for add to cart , checkout , get statistics and generate discount

## How to run ?
### install dependencies
### `npm i`
### `npm i -D nodemon`
### `npm i dotenv mongoose express cookie-parser cors `

## Setup .env file
### MONGO_DB_URL = `mongodb+srv//Name:Password@cluster0.rjd8k.mongodb.net`
### DATABASE = DatabaseName
### N_VALUE = 3
## then `npm run dev` to run

# All routes 

## 1 Add to cart route (Post method)  `http://localhost:4000/api/order/addtocart`, use postman and pass `productId`, `clientId`, `quantity` in `->body -> x-www-form-.. `

## 2 CheckOut route (Post Method) `http://localhost:4000/api/order/checkout`, pass clientId , and discountCode 
### output after check out general
    "newOrder": {
        "clientId": "1",
        "items": [
            {
                "productId": "p2",
                "name": "Phone",
                "quantity": 1,
                "price": 500,
                "_id": "676e71914a896c130bbf9cbd"
            }
        ],
        "total": 450,
        "discountApplied": true,
        "discountCode": "7f0d42d2bb4b",
        "discountAmount": 50,
        "_id": "676e71a94a896c130bbf9cc3",
        "createdAt": "2024-12-27T09:21:45.382Z",
        "updatedAt": "2024-12-27T09:21:45.382Z",
        "__v": 0
    },
    "msg": "Order Placed successfully"

### output after check out if N order is completed, with `discountCode` in msg
    "newOrder": {
        "clientId": "1",
        "items": [
            {
                "productId": "p2",
                "name": "Phone",
                "quantity": 1,
                "price": 500,
                "_id": "676e77afbdf08af98ad847ae"
            }
        ],
        "total": 500,
        "discountApplied": false,
        "discountAmount": 0,
        "_id": "676e77b3bdf08af98ad847b2",
        "createdAt": "2024-12-27T09:47:31.314Z",
        "updatedAt": "2024-12-27T09:47:31.314Z",
        "__v": 0
    },
    "msg": "Order placed and a coupon generated b0c6627e78bd"

### using that coupon code see checkout output 
    "newOrder": {
        "clientId": "1",
        "items": [
            {
                "productId": "p2",
                "name": "Phone",
                "quantity": 1,
                "price": 500,
                "_id": "676e7805bdf08af98ad847bb"
            }
        ],
        "total": 450,
        "discountApplied": true,
        "discountCode": "b0c6627e78bd",
        "discountAmount": 50,
        "_id": "676e780cbdf08af98ad847c1",
        "createdAt": "2024-12-27T09:49:00.542Z",
        "updatedAt": "2024-12-27T09:49:00.542Z",
        "__v": 0
    },
    "msg": "Order Placed successfully"

## 3 Get statistics route `Get` `http://localhost:4000/api/admin/get-stats`

### output 1
    "totalItems": 4,
    "discountedAmount": 50,
    "discountCode": [
        {
            "_id": "676e712e83fa1115755aa4d5",
            "code": "7f0d42d2bb4b"
        }
    ],
    "totalPurchase": 4450
### output 2
    "totalItems": 7,
    "discountedAmount": 100,
    "discountCode": [
        {
            "_id": "676e712e83fa1115755aa4d5",
            "code": "7f0d42d2bb4b"
        },
        {
            "_id": "676e77b3bdf08af98ad847b7",
            "code": "b0c6627e78bd"
        }
    ],
    "totalPurchase": 5900