### Shopp

This is a full stack ecommerce project built using MERN stack.

### Technologies

- MERN stack
- Redux Toolkit: for state management
- JWT: for authentication
- Paypal: for online payment

### Setup
1. Clone the repository:

   ```bash
   git clone git@github.com:parikshitadhikari/shopp-mern.git
   ```
2. Change directory to `shopp-mern`

   ```bash
   cd shopp-mern
   ```
3. In the root directory create a .env file:
   ```bash
   NODE_ENV=development
   PORT=8000
   MONGO_URI= ********
   JWT_SECRET= ********
   PAYPAL_CLIENT_ID= ********
   PAYPAL_APP_SECRET= ********
   PAYPAL_API_URL=https://api-m.sandbox.paypal.com 
   PAGINATION_LIMIT=4
   ```
   In order to get PAYPAL_CLIENT_ID and PAYPAL_APP_SECRET, login to [Paypal Devs](https://developer.paypal.com/), go to Apps & Credentials > Create App > Enter app name, select merchant and create the app. You then see the Client Id and App Secret which can then be copied into .env

4. Now, in the root directory run the command:
   ```bash
   npm i
   ```

5. Then, change the directory to `frontend` and run:
   ```bash
   npm i
   ```

6. Return back to root directory using `cd..` and run the script:
   ```bash
   npm run dev
   ```

The project can be then viewed at: http://localhost:3000/

Live url: https://shopp-mern.onrender.com/