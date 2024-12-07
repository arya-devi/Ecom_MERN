var express = require("express");
var router = express.Router();
const Product = require("../models/ecomModel");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const verifyToken= require('./loginMiddleware');
const { error } = require("console");

//create product
router.post("/create_product",verifyToken, (req, res) => {
  const { name, description, price, image } = req.body;
  const product = new Product({
    
    name,
    description,
    price,
    image
  });
  const validationError = product.validateSync();

  if (validationError) {
    return res.status(400).json({ error: validationError.errors });
  }
  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Product created successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

//get product
router.get("/retrieve_products",verifyToken, (req, res) => {
  Product.find({}, "-__v")
    .then((product_list) => {
      res.json(product_list);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// VIEW PRODUCT

router.get("/viewProduct/:id",verifyToken, (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//update product
router.put("/update_product/:id",verifyToken, (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image } = req.body;
  // Validate the updated product data
  const updatedProduct = new Product({  name, description, price,image });
  const validationError = updatedProduct.validateSync();
  if (validationError) {
    // If there are validation errors, send a JSON response with the errors
    res.status(400).json({ error: validationError.errors });
    console.log(error);
    
  } else {
    // Update the product in the database
    Product.findByIdAndUpdate(productId, {  name, description, price,image })
      .then(() => {
        // Send a JSON response indicating success
        res.status(200).json({ message: "Product updated successfully" });
      })
      .catch((error) => {
        // Handle database update error
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
});

// Delete product
router.delete("/delete_product/:id",verifyToken, (req, res) => {
  const productId = req.params.id;
  // Delete the product from the database
  Product.findByIdAndDelete(productId)
    .then(() => {
      res.json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/signup", async (req, res) => {
  
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password do not match" });
  }

  try {
    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    
    const user = new User({ email, password });
    const validationError = user.validateSync();

    if (validationError) {
      // Convert validationError to an array of error messages
      const errorMessages = Object.values(validationError.errors).map(
        (err) => err.message
      );
      console.log(errorMessages);
      console.log({ errors: errorMessages });

      return res.status(400).json({ errors: errorMessages });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in MongoDB with the hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Respond with success
    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// for generating  secret key

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
console.log(generateSecretKey());

// router.post("/login", (req, res) => {
//   // console.log(req.headers);

//   const { email, password } = req.body;

//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json({ message: "User not Found" });
//       }

//       return bcrypt.compare(password, user.password).then((isPasswordValid) => {
//         if (!isPasswordValid) {
//           return res.status(401).json({ message: "Incorrect password" });
//         }

//         // Generate a JWT token
//         const token = jwt.sign(
//           { userId: user._id },
//           (process.env.JWT_SECRET = generateSecretKey()),
//           // { expiresIn: "1h" }
//         );

//         // Send the token in the response
//       return res.status(200).json({ token ,message: "successfully login"});
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).send("Internal Server Error");
//     });
// });
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User not Found" });
      }

      bcrypt.compare(password, user.password).then((isPasswordValid) => {
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
          { userId: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({ token, isAdmin: user.isAdmin, message: "Successfully logged in" });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
});
module.exports = router;
