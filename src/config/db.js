const mysql = require('mysql2/promise');  
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "irctc", 
});

async function initializeDatabase() {
    try {
        await db.query("CREATE DATABASE IF NOT EXISTS irctc");
        console.log("Database created successfully!");

        await db.query("USE irctc");
        console.log("Switched to database irctc");

        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        console.log('Users table created successfully!');

        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        console.log('Admins table created successfully!');

        await db.query(`
            CREATE TABLE IF NOT EXISTS trains (
                id INT AUTO_INCREMENT PRIMARY KEY,
                train_number VARCHAR(50) UNIQUE NOT NULL,
                source VARCHAR(100) NOT NULL,
                destination VARCHAR(100) NOT NULL,
                total_seats INT NOT NULL,
                available_seats INT NOT NULL
            )
        `);
        console.log('Trains table created successfully!');

        await db.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                train_id INT,
                seats INT,
                booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE
            )
        `);
        console.log('Bookings table created successfully!');
        
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}

initializeDatabase();

module.exports = db;
