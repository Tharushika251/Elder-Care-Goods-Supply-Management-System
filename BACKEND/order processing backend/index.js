// index.js (Backend with Node.js and Express)
const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require('dotenv');


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect('mongodb+srv://tempaco2002:bLyAEMeDuPfjWghg@cluster0.0wml6k1.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



//------------products crud
//Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

//Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

//Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },

})

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price

  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  })
})

//Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name
  })
})

//Creating API for getting all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
})



app.get("/search/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const products = await Product.find({
      $or: [
        { name: { $regex: new RegExp(key, "i") } },
        { category: { $regex: new RegExp(key, "i") } }
      ]
    });
    res.json(products);
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id })
  if (result) {
    resp.send(result)
  } else {
    resp.send({ "result": "No Record Found" })
  }
})

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  resp.send(result)
})

//creating endpoint for newcollection data
app.get('/newcollection',async(req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
})

//creating popular in mobility
app.get('/popularinmobility',async(req,res)=>{
  let products = await Product.find({category:"Mobility items"});
  let popular_in_mobility = products.slice(0,4);
  console.log("Popular in Mobility fetched");
  res.send(popular_in_mobility);
})





//schema creationg for user cart model
const cartUsers = mongoose.model('cartUsers',{
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

//creating end point for registring the userCart
app.post('/addcartuser',async(req,res)=>{
  let check = await cartUsers.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"existind user found"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const newUser = new cartUsers({
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await newUser.save();
  
  const data = {
    cartUser:{
      id:newUser.id
    }
  }
  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
})

// creating end point for login
app.post('/login',async(req,res)=>{
  let cartUser = await cartUsers.findOne({email:req.body.email});
  if (cartUser) {
    const passCompare = req.body.password === cartUser.password;
    if (passCompare) {
      const data = {
        cartUser: {
          id:cartUser.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({success:false,errors:"worong password"});
    }
  }
  else{
    res.json({success:false,errors:"wrong email ID"})
  }
})

// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({errors:"Please authenticate using valid token"})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.cartUser = data.cartUser;
      next();
    } catch (error) {
      res.status(401).send({errors:"please authenticate using valid token"})
    }
  }
}


app.post('/addtocart',fetchUser, async (req, res) => {
  console.log("added",req.body.itemId);
  let userData = await cartUsers.findOne({_id:req.cartUser.id});
  userData.cartData[req.body.itemId]+=1;
  await cartUsers.findOneAndUpdate({_id:req.cartUser.id},{cartData:userData.cartData});
  res.send("Added")
})


//creating endpoint to remove product from cart data
app.post('/removefromcart',fetchUser,async(req,res)=>{
  console.log("removed",req.body.itemId);
  let userData = await cartUsers.findOne({_id:req.cartUser.id});
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -=1;
  await cartUsers.findOneAndUpdate({_id:req.cartUser.id},{cartData:userData.cartData});
  res.send("Removed")
})

//creating end point for get cartData
app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("getcart");
  let userData = await cartUsers.findOne({_id:req.cartUser.id});
  res.json(userData.cartData);
})


//Schema for creating delivary information
/*const orderSchema = mongoose.model("orderSchema", {
  id: {
    type: Number,
    required: true,
  },
  Product: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  }

})

app.post("/place",async(req,res)=>{
  
  const placeOrder = async(req,res)=>{
    try {
      const newOrder = new Order({
        id:req.body.id,
        Product:req.body.Product,
        amount:req.body.amount,
        address:req.body.address,
      })
      await newOrder.save()
      await Order.findByIdAndUpdate(req.body.id,{cartData: {}});
    } catch (error) {
      
    }
  }
})*/

//Card Page
/*const CardSchema = new mongoose.Schema({
  email:String,
  cardholder_name:String,
  card_number:String,
  expiry_date: Date,
  cvv:String

})*/

const CardSchema = mongoose.model('card',{
  email:{
    type:String,
    unique:true,
  },
  cardholder_name:{
    type:String,
  },
  card_number:{
    type:String,
  },
  expiry_date:{
    type:Date,
  },
  cvv:{
    type:String,
  },
})

// Endpoint to create payment with card details
app.post("/CreatePayment", (req, res) => {
  CardSchema.create(req.body)
  .then(card => res.json(card))
  .catch(err => res.json(err))
})

app.post('/clearcart', async (req, res) => {
  try {
    const id = req.cartUser.id; // Assuming req.cartUser.id contains the user's ID
    console.log('Clearing cart for user with ID:', id);

    // Assuming your cartUsers model has a method to clear the cart data for a user
    const updatedUser = await cartUsers.findByIdAndUpdate(id, { cartData: {} });

    console.log('Cart cleared successfully:', updatedUser);

    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
