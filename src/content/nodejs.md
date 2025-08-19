# Node.js Cheatsheet

## Basic Setup

```javascript
// package.json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}

// Basic server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

## Core Modules

### File System (fs)

```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;

// Synchronous operations
const data = fs.readFileSync('file.txt', 'utf8');
fs.writeFileSync('output.txt', 'Hello World');

// Asynchronous operations
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise-based operations
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

// File operations
fs.appendFile('log.txt', 'New entry\n');
fs.copyFile('source.txt', 'destination.txt');
fs.unlink('file.txt'); // Delete file
fs.mkdir('newdir');
fs.rmdir('emptydir');
```

### Path Module

```javascript
const path = require('path');

// Path manipulation
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
// Returns: '/tmp/subfile'

path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'

// Path information
path.basename('/foo/bar/baz/asdf/quux.html');     // 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 'quux'
path.dirname('/foo/bar/baz/asdf/quux');           // '/foo/bar/baz/asdf'
path.extname('index.html');                        // '.html'
```

### URL Module

```javascript
const url = require('url');

const myURL = new URL('https://example.org:8080/path?query=value#hash');

console.log(myURL.hostname);    // 'example.org'
console.log(myURL.port);        // '8080'
console.log(myURL.pathname);    // '/path'
console.log(myURL.search);      // '?query=value'
console.log(myURL.hash);        // '#hash'

// Parsing URLs
const parsed = url.parse('https://example.org:8080/path?query=value#hash');
console.log(parsed.hostname);   // 'example.org'
```

### Query String

```javascript
const querystring = require('querystring');

// Parse query string
const parsed = querystring.parse('foo=bar&baz=qux&baz=quux&corge');
console.log(parsed);
// { foo: 'bar', baz: ['qux', 'quux'], corge: '' }

// Stringify object
const stringified = querystring.stringify({ foo: 'bar', baz: 'qux' });
console.log(stringified); // 'foo=bar&baz=qux'
```

## Express.js Framework

### Basic Setup

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  // Process user data
  res.status(201).json(user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Route Parameters

```javascript
// Route parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, Post ${postId}`);
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  res.send(`Search: ${q}, Page: ${page}, Limit: ${limit}`);
});
```

### Middleware

```javascript
// Custom middleware
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

// Apply middleware
app.use(logger);
app.use(errorHandler);

// Route-specific middleware
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/protected', auth, (req, res) => {
  res.send('Protected content');
});
```

### Template Engines

```javascript
// EJS template engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', users: ['John', 'Jane'] });
});

// Handlebars template engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
```

## Database Operations

### MongoDB with Mongoose

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// CRUD operations
async function createUser() {
  const user = new User({ name: 'John', email: 'john@example.com' });
  await user.save();
}

async function findUsers() {
  const users = await User.find({ age: { $gte: 18 } });
  return users;
}

async function updateUser(id, updates) {
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return user;
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}
```

### SQL with Sequelize

```javascript
const { Sequelize, DataTypes } = require('sequelize');

// Create connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
});

// CRUD operations
async function createUser() {
  const user = await User.create({ name: 'John', email: 'john@example.com' });
  return user;
}

async function findUsers() {
  const users = await User.findAll({ where: { age: { [Op.gte]: 18 } } });
  return users;
}

async function updateUser(id, updates) {
  const user = await User.findByPk(id);
  await user.update(updates);
  return user;
}
```

## Authentication & Security

### JWT Authentication

```javascript
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  req.user = decoded;
  next();
};
```

### Password Hashing

```javascript
const bcrypt = require('bcrypt');

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Usage in registration
app.post('/register', async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
  // Save user with hashed password
});
```

## Testing

### Jest Testing

```javascript
// user.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John');
  });

  test('should get all users', async () => {
    await User.create({ name: 'John', email: 'john@example.com' });

    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
```

## Environment & Configuration

```javascript
// .env file
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key

// Load environment variables
require('dotenv').config();

// Configuration object
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Use configuration
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

## Error Handling

```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

## Performance & Optimization

```javascript
// Compression middleware
const compression = require('compression');
app.use(compression());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Caching headers
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  res.json(data);
});

// Database indexing
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
```
