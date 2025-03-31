import { Pool } from "pg"

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Helper function to execute SQL queries
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query", error)
    throw error
  }
}

// User-related database functions
export async function getUserByEmail(email: string) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email])
  return result.rows[0]
}

export async function createUser(email: string, hashedPassword: string) {
  const result = await query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword])
  return result.rows[0]
}

// Product-related database functions
export async function getProductsByMood(mood: string) {
  const result = await query("SELECT * FROM products WHERE mood = $1", [mood])
  return result.rows
}

export async function getAllProducts() {
  const result = await query("SELECT * FROM products")
  return result.rows
}

export async function getProductById(id: number) {
  const result = await query("SELECT * FROM products WHERE id = $1", [id])
  return result.rows[0]
}

// Order-related database functions
export async function createOrder(userId: number, totalAmount: number) {
  const result = await query("INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *", [
    userId,
    totalAmount,
    "pending",
  ])
  return result.rows[0]
}

export async function addOrderItem(orderId: number, productId: number, quantity: number, price: number) {
  const result = await query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [orderId, productId, quantity, price],
  )
  return result.rows[0]
}

export async function getUserOrders(userId: number) {
  const result = await query(
    `SELECT o.*, 
      json_agg(json_build_object('id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as items 
    FROM orders o 
    JOIN order_items oi ON o.id = oi.order_id 
    WHERE o.user_id = $1 
    GROUP BY o.id 
    ORDER BY o.created_at DESC`,
    [userId],
  )
  return result.rows
}

