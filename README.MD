## Backend Code for Add to Cart, Checkout, Get Statistics, and Generate Discount

### How to Run
1. **Install dependencies:**
    ```bash
    npm i
    npm i -D nodemon
    npm i dotenv mongoose express cookie-parser cors
    ```
2. **Setup `.env` file:**
    ```plaintext
    MONGO_DB_URL=mongodb+srv://Name:Password@cluster0.rjd8k.mongodb.net
    DATABASE=DatabaseName
    N_VALUE=3
    ```
3. **Run the server:**
    ```bash
    npm run dev
    ```

---

### All Routes

#### 1. Add to Cart Route
**Method:** POST  
**Endpoint:** `http://localhost:4000/api/order/addtocart`  
**Usage:** Use Postman and pass the following parameters in `Body -> x-www-form-urlencoded`:
   - `productId`
   - `clientId`
   - `quantity`

---

#### 2. Checkout Route
**Method:** POST  
**Endpoint:** `http://localhost:4000/api/order/checkout`  
**Usage:** Pass the following parameters:
   - `clientId`
   - `discountCode` (optional)

##### Sample Outputs:
1. **General Checkout:**
   ```json
   {
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
   }
   ```

2. **Checkout After Completing N Orders:**
   ```json
   {
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
   }
   ```

3. **Using Generated Coupon Code:**
   ```json
   {
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
   }
   ```

---

#### 3. Get Statistics Route
**Method:** GET  
**Endpoint:** `http://localhost:4000/api/admin/get-stats`

##### Sample Outputs:
1. **Stats Output 1:**
   ```json
   {
       "totalItems": 4,
       "discountedAmount": 50,
       "discountCode": [
           {
               "_id": "676e712e83fa1115755aa4d5",
               "code": "7f0d42d2bb4b"
           }
       ],
       "totalPurchase": 4450
   }
   ```

2. **Stats Output 2:**
   ```json
   {
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
   }
   ```

