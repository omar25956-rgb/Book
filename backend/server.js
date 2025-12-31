const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port=process.env.PORT ||  5000;
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection

const db = mysql.createConnection({
  host: "metro.proxy.rlwy.net",
  user: "root",
  password: "JagwsaXKyCTZJkUBTYRUxkSNrQyelZTv",
  database: "railway",
  port: 17969,
  ssl: { rejectUnauthorized: false } // IMPORTANT for Railway
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

// ================= SIGN UP =================
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.json({ message: "Account created successfully" });
  });
});

// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  });
});


// ================= START SERVER =================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// ================= ADMIN: GET ALL USERS =================
app.get("/api/admin/users", (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ================= ADMIN: ADD NEW BOOK =================
app.post("/api/admin/books", (req, res) => {
  const { title, author, price, image, description } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const sql = `
    INSERT INTO books (title, author, image, description, price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, author, image, description, price],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book added successfully" });
    }
  );
});


// ================= UPDATE USER PASSWORD =================
app.put("/api/user/password", async (req, res) => {
  const { userId, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);

  db.query(
    "UPDATE users SET password=? WHERE id=?",
    [hashed, userId],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Password updated" });
    }
  );
});

// ================= GET USER PURCHASES =================
app.get("/api/user/purchases/:userId", (req, res) => {
  const sql = `
    SELECT books.*
    FROM purchases
    JOIN books ON purchases.book_id = books.id
    WHERE purchases.user_id = ?
  `;

  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ================= USER: BUY A BOOK =================
app.post("/api/user/buy", (req, res) => {
  const { userId, bookId } = req.body;

  db.query(
    "INSERT INTO purchases (user_id, book_id) VALUES (?, ?)",
    [userId, bookId],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book purchased" });
    }
  );
});

// ================= GET ALL BOOKS =================
app.get("/api/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ================= ADMIN: UPDATE BOOK =================
app.put("/api/admin/books/:id", (req, res) => {
  const { title, author, price, image, description } = req.body;

  const sql = `
    UPDATE books
    SET title=?, author=?, price=?, image=?, description=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, author, price, image, description, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book updated" });
    }
  );
});


// ================= ADMIN: DELETE BOOK =================
app.delete("/api/admin/books/:id", (req, res) => {
  db.query(
    "DELETE FROM books WHERE id=?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book deleted" });
    }
  );
});


// Contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "Message sent successfully!" });
  });
});


// Get all contact messages
app.get("/api/admin/messages", (req, res) => {
  const sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});



// Total Users
app.get("/api/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Total Books
app.get("/api/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// All purchases (optional)
app.get("/api/admin/purchases", (req, res) => {
  const sql = `
    SELECT p.id, u.name AS user_name, b.title AS book_title, b.price, p.purchased_at
    FROM purchases p
    JOIN users u ON p.user_id = u.id
    JOIN books b ON p.book_id = b.id
    ORDER BY p.purchased_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
