# MongoDB Cheatsheet

## Getting Started

### Installation
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongod    # Linux
brew services start mongodb-community    # macOS

# Connect to MongoDB
mongo                          # MongoDB Shell (legacy)
mongosh                       # MongoDB Shell (new)

# Check status
sudo systemctl status mongod   # Linux
brew services list | grep mongodb    # macOS
```

### MongoDB Shell Commands
```javascript
// Connect to database
use myDatabase

// Show databases
show dbs

// Show collections
show collections

// Show current database
db

// Get collection stats
db.users.stats()

// Get database stats
db.stats()

// Help
help
db.help()
db.users.help()

// Exit shell
exit
quit()
```

### Connection URI
```bash
# Local connection
mongodb://localhost:27017/mydatabase

# With authentication
mongodb://username:password@localhost:27017/mydatabase

# Replica set
mongodb://host1:27017,host2:27017,host3:27017/mydatabase?replicaSet=myReplSet

# With options
mongodb://username:password@host:27017/mydatabase?authSource=admin&ssl=true

# Environment variable
export MONGODB_URI="mongodb://username:password@localhost:27017/mydatabase"
```

## Database Operations

### Create and Drop Database
```javascript
// Switch to database (creates if doesn't exist)
use company_db

// Drop current database
db.dropDatabase()

// List all databases
show dbs

// Database stats
db.stats()

// Create collection explicitly
db.createCollection("employees")

// Create collection with options
db.createCollection("products", {
   capped: true,
   size: 100000,
   max: 5000
})

// Drop collection
db.employees.drop()
```

### Users and Authentication
```javascript
// Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "password123",
  roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"]
})

// Create database user
use company_db
db.createUser({
  user: "appuser",
  pwd: "apppass123",
  roles: ["readWrite"]
})

// Create read-only user
db.createUser({
  user: "readonly",
  pwd: "readonly123",
  roles: ["read"]
})

// Update user
db.updateUser("appuser", {
  pwd: "newpassword123",
  roles: ["readWrite", "dbAdmin"]
})

// List users
db.getUsers()

// Drop user
db.dropUser("username")

// Authenticate
db.auth("username", "password")

// Change password
db.changeUserPassword("username", "newpassword")

// Grant role
db.grantRolesToUser("username", ["readWrite"])

// Revoke role
db.revokeRolesFromUser("username", ["dbAdmin"])
```

## Document Operations (CRUD)

### Insert Documents
```javascript
// Insert single document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  active: true,
  tags: ["developer", "mongodb"],
  address: {
    street: "123 Main St",
    city: "New York",
    zipcode: "10001"
  },
  createdAt: new Date()
})

// Insert multiple documents
db.users.insertMany([
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    active: true,
    tags: ["designer", "ui/ux"]
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    active: false,
    tags: ["manager", "sales"]
  }
])

// Insert with ordered: false (continue on error)
db.users.insertMany([
  { name: "User1", email: "user1@example.com" },
  { name: "User2", email: "user2@example.com" }
], { ordered: false })

// Insert with write concern
db.users.insertOne(
  { name: "Critical User", email: "critical@example.com" },
  { writeConcern: { w: "majority", j: true } }
)
```

### Find Documents
```javascript
// Find all documents
db.users.find()

// Find with pretty formatting
db.users.find().pretty()

// Find one document
db.users.findOne()

// Find with criteria
db.users.find({ age: 30 })
db.users.find({ active: true })
db.users.find({ "address.city": "New York" })

// Find with multiple criteria (AND)
db.users.find({ age: 30, active: true })

// Find with OR
db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { age: { $gt: 35 } }
  ]
})

// Find with comparison operators
db.users.find({ age: { $gt: 25 } })           // greater than
db.users.find({ age: { $gte: 25 } })          // greater than or equal
db.users.find({ age: { $lt: 35 } })           // less than
db.users.find({ age: { $lte: 35 } })          // less than or equal
db.users.find({ age: { $ne: 30 } })           // not equal
db.users.find({ age: { $in: [25, 30, 35] } }) // in array
db.users.find({ age: { $nin: [25, 30] } })    // not in array

// Find with array operations
db.users.find({ tags: "developer" })          // contains element
db.users.find({ tags: { $all: ["developer", "mongodb"] } }) // contains all
db.users.find({ tags: { $size: 2 } })         // array size

// Find with regular expressions
db.users.find({ name: /^John/ })               // starts with John
db.users.find({ email: /@gmail\.com$/ })      // ends with @gmail.com
db.users.find({ name: { $regex: "john", $options: "i" } }) // case insensitive

// Find with exists
db.users.find({ phone: { $exists: true } })   // has phone field
db.users.find({ phone: { $exists: false } })  // doesn't have phone field

// Find with type
db.users.find({ age: { $type: "number" } })   // age is number
db.users.find({ age: { $type: 16 } })         // age is 32-bit integer

// Projection (select specific fields)
db.users.find({}, { name: 1, email: 1 })      // include name and email
db.users.find({}, { _id: 0, name: 1 })        // exclude _id, include name
db.users.find({}, { tags: 0 })                // exclude tags

// Limit and skip
db.users.find().limit(5)                      // first 5 documents
db.users.find().skip(10).limit(5)             // skip 10, take 5

// Sort
db.users.find().sort({ age: 1 })              // ascending
db.users.find().sort({ age: -1 })             // descending
db.users.find().sort({ age: -1, name: 1 })    // multiple fields

// Count
db.users.countDocuments()                     // total count
db.users.countDocuments({ active: true })     // count with criteria

// Distinct
db.users.distinct("age")                      // unique ages
db.users.distinct("tags")                     // unique tags
```

### Update Documents
```javascript
// Update one document
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31, lastUpdated: new Date() } }
)

// Update multiple documents
db.users.updateMany(
  { active: false },
  { $set: { status: "inactive" } }
)

// Replace entire document
db.users.replaceOne(
  { name: "John Doe" },
  {
    name: "John Doe",
    email: "john.doe@newcompany.com",
    age: 31,
    active: true
  }
)

// Update operators
// $set - set field value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { "address.city": "San Francisco" } }
)

// $unset - remove field
db.users.updateOne(
  { name: "John Doe" },
  { $unset: { temporaryField: "" } }
)

// $inc - increment numeric value
db.users.updateOne(
  { name: "John Doe" },
  { $inc: { age: 1, loginCount: 1 } }
)

// $mul - multiply numeric value
db.users.updateOne(
  { name: "John Doe" },
  { $mul: { score: 1.1 } }
)

// $min - update if new value is less
db.users.updateOne(
  { name: "John Doe" },
  { $min: { lowestScore: 85 } }
)

// $max - update if new value is greater
db.users.updateOne(
  { name: "John Doe" },
  { $max: { highestScore: 95 } }
)

// Array update operators
// $push - add element to array
db.users.updateOne(
  { name: "John Doe" },
  { $push: { tags: "expert" } }
)

// $push with $each (multiple elements)
db.users.updateOne(
  { name: "John Doe" },
  { $push: { tags: { $each: ["senior", "lead"] } } }
)

// $pull - remove elements from array
db.users.updateOne(
  { name: "John Doe" },
  { $pull: { tags: "beginner" } }
)

// $pop - remove first or last element
db.users.updateOne(
  { name: "John Doe" },
  { $pop: { tags: 1 } }  // 1 for last, -1 for first
)

// $addToSet - add to array if not exists
db.users.updateOne(
  { name: "John Doe" },
  { $addToSet: { tags: "mongodb" } }
)

// Update with upsert (insert if not found)
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "New User", active: true } },
  { upsert: true }
)

// Update array elements
// Update first matching array element
db.users.updateOne(
  { "scores.subject": "math" },
  { $set: { "scores.$.score": 95 } }
)

// Update all matching array elements
db.users.updateMany(
  {},
  { $set: { "scores.$[].passed": true } }
)

// Update with array filters
db.users.updateMany(
  {},
  { $set: { "scores.$[elem].grade": "A" } },
  { arrayFilters: [{ "elem.score": { $gte: 90 } }] }
)

// findOneAndUpdate (atomic find and update)
db.users.findOneAndUpdate(
  { name: "John Doe" },
  { $inc: { version: 1 } },
  { returnDocument: "after" }  // return updated document
)
```

### Delete Documents
```javascript
// Delete one document
db.users.deleteOne({ name: "John Doe" })

// Delete multiple documents
db.users.deleteMany({ active: false })

// Delete all documents in collection
db.users.deleteMany({})

// findOneAndDelete (atomic find and delete)
const deletedUser = db.users.findOneAndDelete({ name: "John Doe" })

// Delete with write concern
db.users.deleteOne(
  { name: "John Doe" },
  { writeConcern: { w: "majority" } }
)
```

## Aggregation Pipeline

### Basic Aggregation
```javascript
// Simple aggregation
db.users.aggregate([
  { $match: { active: true } },
  { $group: { _id: "$age", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Match stage (filtering)
db.users.aggregate([
  { $match: { age: { $gte: 18 } } }
])

// Project stage (field selection/transformation)
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      ageGroup: {
        $cond: {
          if: { $gte: ["$age", 18] },
          then: "adult",
          else: "minor"
        }
      }
    }
  }
])

// Group stage
db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$amount" },
      avgSale: { $avg: "$amount" },
      maxSale: { $max: "$amount" },
      minSale: { $min: "$amount" },
      count: { $sum: 1 }
    }
  }
])

// Sort stage
db.users.aggregate([
  { $sort: { age: -1, name: 1 } }
])

// Limit and Skip
db.users.aggregate([
  { $skip: 10 },
  { $limit: 5 }
])

// Unwind (flatten arrays)
db.posts.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } }
])
```

### Advanced Aggregation
```javascript
// Lookup (join collections)
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      orderDate: 1,
      amount: 1,
      customerName: "$customer.name"
    }
  }
])

// Add fields
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      isAdult: { $gte: ["$age", 18] }
    }
  }
])

// Facet (multiple aggregation pipelines)
db.products.aggregate([
  {
    $facet: {
      "byCategory": [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ],
      "priceRanges": [
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 100, 500, 1000, Infinity],
            default: "Other"
          }
        }
      ]
    }
  }
])

// Bucket (group by ranges)
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 100, 500, 1000],
      default: "Expensive",
      output: {
        count: { $sum: 1 },
        avgPrice: { $avg: "$price" }
      }
    }
  }
])

// Sample (random documents)
db.users.aggregate([
  { $sample: { size: 10 } }
])

// Text search
db.articles.aggregate([
  { $match: { $text: { $search: "mongodb aggregation" } } },
  { $sort: { score: { $meta: "textScore" } } }
])

// GraphLookup (recursive lookup)
db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$managerId",
      connectFromField: "managerId",
      connectToField: "_id",
      as: "managementHierarchy"
    }
  }
])

// Date aggregation
db.sales.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" }
      },
      totalSales: { $sum: "$amount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])

// Complex example: E-commerce analytics
db.orders.aggregate([
  // Match orders from last 30 days
  {
    $match: {
      orderDate: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
    }
  },
  // Lookup customer information
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  // Lookup product information
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  // Group by customer and category
  {
    $group: {
      _id: {
        customerId: "$customerId",
        customerName: "$customer.name",
        category: "$product.category"
      },
      totalSpent: { $sum: { $multiply: ["$quantity", "$product.price"] } },
      orderCount: { $sum: 1 }
    }
  },
  // Calculate customer loyalty score
  {
    $addFields: {
      loyaltyScore: {
        $add: [
          { $multiply: ["$totalSpent", 0.1] },
          { $multiply: ["$orderCount", 10] }
        ]
      }
    }
  },
  // Sort by loyalty score
  { $sort: { loyaltyScore: -1 } },
  // Limit to top 100 customers
  { $limit: 100 }
])
```

## Indexing

### Create Indexes
```javascript
// Single field index
db.users.createIndex({ email: 1 })           // ascending
db.users.createIndex({ age: -1 })            // descending

// Compound index
db.users.createIndex({ age: 1, name: 1 })

// Multikey index (for arrays)
db.posts.createIndex({ tags: 1 })

// Text index
db.articles.createIndex({ title: "text", content: "text" })

// 2dsphere index (geospatial)
db.locations.createIndex({ coordinates: "2dsphere" })

// Sparse index (only documents with the field)
db.users.createIndex({ phone: 1 }, { sparse: true })

// Unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Partial index (with condition)
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gte: 18 } } }
)

// TTL index (time to live)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // 1 hour
)

// Background index creation
db.users.createIndex({ name: 1 }, { background: true })

// Index with custom name
db.users.createIndex({ email: 1 }, { name: "unique_email_idx" })
```

### Index Management
```javascript
// List indexes
db.users.getIndexes()

// Get index stats
db.users.aggregate([{ $indexStats: {} }])

// Drop index
db.users.dropIndex({ email: 1 })
db.users.dropIndex("unique_email_idx")

// Drop all indexes (except _id)
db.users.dropIndexes()

// Reindex collection
db.users.reIndex()

// Hide index (MongoDB 4.4+)
db.users.hideIndex("index_name")

// Unhide index
db.users.unhideIndex("index_name")

// Explain query execution
db.users.find({ email: "john@example.com" }).explain("executionStats")
```

## Schema Design and Validation

### Schema Validation
```javascript
// Create collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
          description: "must be a valid email address"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer between 0 and 120"
        },
        status: {
          enum: ["active", "inactive", "pending"],
          description: "can only be one of the enum values"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

// Add validation to existing collection
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price"],
      properties: {
        name: { bsonType: "string" },
        price: { bsonType: "number", minimum: 0 },
        category: { enum: ["electronics", "books", "clothing"] }
      }
    }
  }
})

// Remove validation
db.runCommand({
  collMod: "users",
  validator: {},
  validationLevel: "off"
})
```

### Design Patterns
```javascript
// Embedding (one-to-few)
// User with embedded addresses
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "New York",
      zipcode: "10001"
    },
    {
      type: "work",
      street: "456 Business Ave",
      city: "New York",
      zipcode: "10002"
    }
  ]
}

// Referencing (one-to-many)
// Post with comments stored separately
// Post document
{
  _id: ObjectId("..."),
  title: "MongoDB Tutorial",
  content: "Learn MongoDB...",
  author: "John Doe",
  createdAt: new Date()
}

// Comment documents
{
  _id: ObjectId("..."),
  postId: ObjectId("..."),  // Reference to post
  author: "Jane Smith",
  content: "Great tutorial!",
  createdAt: new Date()
}

// Hybrid approach (one-to-squillions)
// Store recent comments embedded, older ones referenced
{
  _id: ObjectId("..."),
  title: "Popular Post",
  content: "This post has many comments...",
  recentComments: [
    { author: "User1", content: "Comment 1", createdAt: new Date() },
    { author: "User2", content: "Comment 2", createdAt: new Date() }
  ],
  totalComments: 50000,
  commentPages: ["page1_id", "page2_id", "page3_id"]
}

// Denormalization for read performance
// Order with embedded customer info
{
  _id: ObjectId("..."),
  orderNumber: "ORD-12345",
  customer: {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com"  // Denormalized
  },
  items: [...],
  total: 150.00,
  orderDate: new Date()
}

// Bucketing pattern (time series data)
// Sensor readings bucketed by hour
{
  _id: ObjectId("..."),
  sensorId: "sensor_001",
  date: ISODate("2023-01-01T10:00:00Z"),
  readings: [
    { time: ISODate("2023-01-01T10:00:00Z"), value: 23.5 },
    { time: ISODate("2023-01-01T10:01:00Z"), value: 23.7 },
    // ... more readings for this hour
  ],
  count: 60,
  sum: 1420.5,
  avg: 23.675
}
```

## Replica Sets and Sharding

### Replica Set Operations
```javascript
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
})

// Check replica set status
rs.status()

// Add member
rs.add("localhost:27020")

// Remove member
rs.remove("localhost:27020")

// Step down primary
rs.stepDown()

// Check if primary
db.isMaster()

// Read preference
db.users.find().readPref("secondary")
db.users.find().readPref("primaryPreferred")

// Write concern
db.users.insertOne(
  { name: "John" },
  { writeConcern: { w: "majority", j: true } }
)
```

### Sharding
```javascript
// Enable sharding on database
sh.enableSharding("myDatabase")

// Shard collection
sh.shardCollection("myDatabase.users", { userId: 1 })

// Shard with compound key
sh.shardCollection("myDatabase.orders", { customerId: 1, orderDate: 1 })

// Check sharding status
sh.status()

// Check collection sharding info
db.users.getShardDistribution()

// Split chunk
sh.splitAt("myDatabase.users", { userId: 1000 })

// Move chunk
sh.moveChunk("myDatabase.users", { userId: 1000 }, "shard0001")

// Add shard
sh.addShard("localhost:27020")

// Remove shard
sh.removeShard("shard0001")
```

## Performance and Monitoring

### Performance Analysis
```javascript
// Explain query execution
db.users.find({ age: { $gt: 25 } }).explain("executionStats")

// Profile database operations
db.setProfilingLevel(2)  // Profile all operations
db.setProfilingLevel(1, { slowms: 100 })  // Profile slow operations (>100ms)
db.setProfilingLevel(0)  // Disable profiling

// View profiler data
db.system.profile.find().limit(5).sort({ ts: -1 }).pretty()

// Current operations
db.currentOp()

// Kill operation
db.killOp(opId)

// Database stats
db.stats()

// Collection stats
db.users.stats()

// Index usage stats
db.users.aggregate([{ $indexStats: {} }])

// Server status
db.serverStatus()

// Check locks
db.serverStatus().locks

// Memory usage
db.serverStatus().mem

// Connection stats
db.serverStatus().connections
```

### Optimization Tips
```javascript
// Use projection to limit returned fields
db.users.find({}, { name: 1, email: 1 })

// Use covered queries (query uses only indexed fields)
db.users.find({ age: 30 }, { age: 1, _id: 0 })

// Use hint to force index usage
db.users.find({ name: "John" }).hint({ name: 1 })

// Use allowDiskUse for large aggregations
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
], { allowDiskUse: true })

// Batch operations for better performance
const bulk = db.users.initializeUnorderedBulkOp()
for (let i = 0; i < 1000; i++) {
  bulk.insert({ name: `User${i}`, age: Math.floor(Math.random() * 100) })
}
bulk.execute()
```

## Security

### Authentication and Authorization
```javascript
// Enable authentication in mongod.conf
// security:
//   authorization: enabled

// Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword123",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
})

// Create application user
use myapp
db.createUser({
  user: "appUser",
  pwd: "appPassword123",
  roles: [
    { role: "readWrite", db: "myapp" }
  ]
})

// Custom roles
use admin
db.createRole({
  role: "customRole",
  privileges: [
    {
      resource: { db: "myapp", collection: "users" },
      actions: ["find", "insert", "update"]
    }
  ],
  roles: []
})

// SSL/TLS configuration in mongod.conf
// net:
//   ssl:
//     mode: requireSSL
//     PEMKeyFile: /etc/ssl/mongodb.pem
//     CAFile: /etc/ssl/ca.pem
```

### Auditing
```javascript
// Enable auditing in mongod.conf
// auditLog:
//   destination: file
//   format: JSON
//   path: /var/log/mongodb/audit.json

// Audit specific operations
// auditLog:
//   destination: file
//   format: JSON
//   path: /var/log/mongodb/audit.json
//   filter: '{ atype: { $in: ["createCollection", "dropCollection"] } }'
```

## Backup and Recovery

### mongodump and mongorestore
```bash
# Backup entire database
mongodump --host localhost:27017 --db myDatabase --out /backup/

# Backup with authentication
mongodump --host localhost:27017 --username admin --password --authenticationDatabase admin --db myDatabase --out /backup/

# Backup specific collection
mongodump --host localhost:27017 --db myDatabase --collection users --out /backup/

# Backup with query
mongodump --host localhost:27017 --db myDatabase --collection users --query '{"active": true}' --out /backup/

# Compressed backup
mongodump --host localhost:27017 --db myDatabase --gzip --out /backup/

# Restore database
mongorestore --host localhost:27017 --db myDatabase /backup/myDatabase/

# Restore with different database name
mongorestore --host localhost:27017 --db newDatabase /backup/myDatabase/

# Restore specific collection
mongorestore --host localhost:27017 --db myDatabase --collection users /backup/myDatabase/users.bson

# Restore and drop existing collections
mongorestore --host localhost:27017 --db myDatabase --drop /backup/myDatabase/
```

### mongoexport and mongoimport
```bash
# Export to JSON
mongoexport --host localhost:27017 --db myDatabase --collection users --out users.json

# Export to CSV
mongoexport --host localhost:27017 --db myDatabase --collection users --type csv --fields name,email,age --out users.csv

# Export with query
mongoexport --host localhost:27017 --db myDatabase --collection users --query '{"active": true}' --out active_users.json

# Import from JSON
mongoimport --host localhost:27017 --db myDatabase --collection users --file users.json

# Import from CSV
mongoimport --host localhost:27017 --db myDatabase --collection users --type csv --headerline --file users.csv

# Import with upsert
mongoimport --host localhost:27017 --db myDatabase --collection users --upsert --file users.json
```

### Replica Set Backup
```bash
# Backup from secondary (to avoid affecting primary)
mongodump --host secondary.example.com:27017 --db myDatabase --out /backup/

# Point-in-time backup using oplog
mongodump --host localhost:27017 --oplog --out /backup/

# Restore with oplog replay
mongorestore --host localhost:27017 --oplogReplay /backup/
```

## Best Practices

### Performance Best Practices
1. **Create appropriate indexes** for your query patterns
2. **Use projection** to limit returned fields
3. **Limit result sets** with limit() and skip()
4. **Use aggregation pipeline** instead of client-side processing
5. **Avoid large documents** (16MB limit)
6. **Use connection pooling** in applications
7. **Monitor slow queries** with profiler
8. **Use covered queries** when possible
9. **Batch operations** for bulk inserts/updates
10. **Consider read preferences** for replica sets

### Schema Design Best Practices
1. **Embed vs Reference** based on access patterns
2. **Denormalize for read performance** when appropriate
3. **Use atomic operations** for data consistency
4. **Design for your queries** not normalized structure
5. **Avoid unbounded arrays** that grow indefinitely
6. **Use schema validation** for data quality
7. **Consider document growth** in design
8. **Use appropriate data types** for efficiency
9. **Plan for scalability** from the beginning
10. **Document your schema** decisions

### Security Best Practices
1. **Enable authentication** and authorization
2. **Use strong passwords** and regular rotation
3. **Implement SSL/TLS** for network encryption
4. **Regular security updates** for MongoDB
5. **Audit database access** and operations
6. **Network security** with firewalls
7. **Backup encryption** for sensitive data
8. **Principle of least privilege** for users
9. **Regular security assessments**
10. **Monitor for suspicious activity**
