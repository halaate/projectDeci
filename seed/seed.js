import Order from "../models/order.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/config.js";
import Category from "../models/category.js";
import Product from "../models/products.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        const categories = await Category.insertMany([
            {
                name: "cupcakes",
                description: "Delicious cupcakes",
                slug: "cupcakes"
            },
            {
                name: "cakes",
                description: "Tasty cakes",
                slug: "cakes"
            },
            {
                name: "cookies",
                description: "Freshly baked cookies",
                slug: "cookies"
            },
            {
                name: "bread",
                description: "Soft and fluffy bread",
                slug: "bread"
            },
            {
                name: "books",
                description: "Interesting books",
                slug: "books"
            }
        ]);

        await Product.insertMany([
            {
                name: "Chocolate Cupcake",
                description: "A rich and moist chocolate cupcake",
                price: 2.99,
                category: categories[0]._id,
                images: ["chocolate_cupcake.jpg"],
                inStock: true,
                stock: 20
            },
            {
                name: "Vanilla Cupcake",
                description: "A classic vanilla cupcake with buttercream frosting",
                price: 2.49,
                stock: 20,
                category: categories[0]._id,
                images: ["vanilla_cupcake.jpg"],
                inStock: true
            },
            {
                name: "Chocolate Cake",
                description: "A decadent chocolate cake with layers of ganache",
                price: 15.99,
                stock: 20,
                category: categories[1]._id,
                images: ["chocolate_cake.jpg"],
                inStock: true
            },
            {
                name: "Vanilla Cake",
                description: "A light and fluffy vanilla cake with buttercream frosting",
                price: 12.99,
                stock: 20,
                category: categories[1]._id,
                images: ["vanilla_cake.jpg"],
                inStock: true
            },
            {
                name: "Chocolate Cookies",
                description: "Freshly baked chocolate cookies",
                price: 4.99,
                stock: 20,
                category: categories[2]._id,
                images: ["chocolate_cookies.jpg"],
                inStock: true
            },
            {
                name: "Butter Cookies",
                description: "Crunchy butter cookies",
                price: 3.99,
                stock: 20,
                category: categories[2]._id,
                images: ["butter_cookies.jpg"],
                inStock: true
            },
            {
                name: "Bread Loaf",
                description: "A freshly baked bread loaf",
                price: 3.99,
                stock: 20,
                category: categories[3]._id,
                images: ["bread_loaf.jpg"],
                inStock: true
            },
            {
                name: "Bread Rolls",
                description: "Soft and fluffy bread rolls",
                price: 4.99,
                stock: 20,
                category: categories[3]._id,
                images: ["bread_rolls.jpg"],
                inStock: true
            },
            {
                name: "Comic Book",
                description: "An action-packed comic book",
                price: 9.99,
                stock: 20,
                category: categories[4]._id,
                images: ["comic_book.jpg"],
                inStock: true
            },
            {
                name: "Novel Book",
                description: "A captivating novel",
                price: 14.99,
                stock: 20,
                category: categories[4]._id,
                images: ["novel_book.jpg"],
                inStock: true
            }
        ]);

        console.log("Data seeded successfully");
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Database disconnected");
    }
};

seedData();