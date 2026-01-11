# Diet Planner Project – Important Setup Steps

## 1. System Requirements

* Install **Node.js (v18+)**
* Install **MySQL Server (v8+)**
* Install **MySQL Workbench** or MySQL CLI

---

## 2. Database Setup

1. Open **MySQL Workbench**
2. Open and execute:
   **diet_planner_database.sql**
3. Confirm tables are created successfully

---

## 3. Backend Setup

1. Navigate to backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file inside `backend/config/` with DB credentials and JWT secret
4. Start backend server:

   ```bash
   node server.js
   ```

---

## 4. Frontend Setup

1. Open `frontend/index.html` in browser
   *(Live Server recommended)*
2. Ensure backend is running on **port 5000**

---

## 5. Application Flow

* Register a new user
* Login to generate JWT token
* Fill & save user profile
* Create and save weekly meal plan
* View saved meal plan in **View Meal Plan** page

---

## 6. Important Notes

* Meal plans store **food names**, not IDs (future-safe)
* Partial meal selection is allowed
* Pages are protected using JWT authentication

---

## 7. Final Check

* Backend running without errors
* Database connected successfully
* Planner data persists after refresh

✔ Project ready to use

backend\config\.env - 
.env file - 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=diet_planner
JWT_SECRET=your_secure_secret_key
PORT=5000


packages -

npm install express
npm install mysql2
npm install jsonwebtoken bcryptjs
npm install dotenv
npm install cors

npm install express mysql2 jsonwebtoken bcryptjs dotenv cors
