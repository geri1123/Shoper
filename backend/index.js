const port = 5000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");


app.use(express.json());
app.use(cors());
//Database connection with mongoDB
mongoose.connect("mongodb+srv://shoping:&&&&@cluster0.xabqr5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


//API Creation
app.get("/" ,(req , res)=>{
    res.send("Express App is Running")
})


////Product

const Product=mongoose.model("Product" , {
    id: { type: Number, required: true },
    
    gender: { type: String, required: true },
    productName:{type:String , required:true},
    itemNumber:{type:String , required:true},
    brand: { type: String, required: true },
    category: { type: String, required: true },
    name:{type:String , required:true},
    type: { type: String },
    color: { type: String, required: true },
    collections: { type: String, required: true },
    material:{type:String, required:true},
    size: [
        {
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            soldOut: { type: Boolean, default: false }
        }
    ],
    old_price: { type: String, required: true },
    new_price: { type: String, required: true },
    description: { type: String, required: true },
    img_url_1: { type: String, required: true },
    img_url_2: { type: String, required: true },
    img_url_3: { type: String, required: true },
   
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
   
})

app.post('/addproduct', async (req, res) => {
    try {
        // Fetch all products to get the last ID
        const products = await Product.find({});
        let id = 1; // Default starting ID
        if (products.length > 0) {
            // Get the last product's ID and increment
            id = products[products.length - 1].id + 1;
        }

        // Extract sizes data
        const size = req.body.size.map(size => ({
            size: size.size,
            quantity: size.quantity,
            soldOut: size.soldOut || false // Default to false if not provided
        }));

        // Create a new product instance
        const newProduct = new Product({
            id: id,
            gender: req.body.gender,
            productName:req.body.productName,
            itemNumber:req.body.itemNumber,
            brand: req.body.brand,
            category: req.body.category,
            name:req.body.name,
            type: req.body.type,
            color: req.body.color,
            collections: req.body.collections,
            material:req.body.material,
            size: size,
            old_price: req.body.old_price,
            new_price: req.body.new_price,
            description: req.body.description,
            img_url_1: req.body.img_url_1,
            img_url_2: req.body.img_url_2,
            img_url_3: req.body.img_url_3
        });

        // Save the new product to the database
        await newProduct.save();
        
        console.log("Product saved successfully:", newProduct);
        res.status(201).json({
            success: true,
            product: newProduct
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ error: error.message });
    }
});


app.post("/removeproduct" , async (req , res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        title:req.body.title
    })
})

app.get("/allproducts" , async (req , res)=>{
    let products=await Product.find({});
    console.log("all products fetch");
    res.setHeader('Content-Type', 'application/json');
    res.send(products);
})
///add brand
const Brand = mongoose.model("Brand", {
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    posterUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

app.post('/addbrand', async (req, res) => {

    const existingBrand=await Brand.findOne({brand:req.body.brand});
    if(existingBrand){
        return res.status(400).json({
            success: false,
            message: 'Brand already exists'
        });
    }

    let brands = await Brand.find({});
    let id;
    if (brands.length > 0) {
        let last_brands_array = brands.slice(-1);
        let last_brands = last_brands_array[0];
        id = last_brands.id + 1;
    } else {
        id = 1;
    }
    const newBrand = new Brand({
        id: id,
        brand: req.body.brand,
        posterUrl: req.body.posterUrl,
    });
    console.log(newBrand);
    await newBrand.save();
    console.log("saved");
    res.json({
        success: true,
        brand: req.body.brand
    });
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage }).single('posterUrl');

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));
app.post("/upload", upload, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
app.get("/allbrands", async (req, res) => {
    let brands = await Brand.find({});
    console.log("all brands fetch");
    res.setHeader('Content-Type', 'application/json');
    res.send(brands);
});
app.post("/removebrand", async (req, res) => {
    await Brand.findOneAndDelete({ id: req.body.id });
    console.log("removed");
    res.json({
        success: true,
        brand: req.body.brand
    });
});





app.listen(port ,(error)=>{
    if(!error){
        console.log("Server running in port"+port)
    } else{
        console.log("error:"+error)
    }
})




