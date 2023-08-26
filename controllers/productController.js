import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'

export const createProductController = async (req, res) => {
    console.log('in create product');
    try {
        console.log('in try block');
        const { name, description, price, cateogary, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !cateogary || !quantity || !shipping || (photo && photo.size > 1000000)) {
            return res.status(500).send({
                success: false,
                error: 'All fields required and Photo size less then 1Mb'
            })
        }

        console.log(req.fields)
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;

        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products
        })
    }
    catch (err) {
        console.log('Error in createProduct', err);
        res.status(500).send({
            message: 'Error in createProduct',
            success: false,
            err
        })
    }
}


export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select('-photo')
            .populate("cateogary")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All Products displayed successfully',
            products
        })
    }
    catch (err) {
        console.log('error in get product controller: ', err);
        res.status(500).send({
            success: false,
            message: 'Error in get All product controller',
            err
        })
    }
}
export const getSingleProductController = async (req, res) => {
    try {
        const products = await productModel
            .findOne({ slug: req.params.slug })
            .select('-photo')
            .populate("cateogary");
        res.status(200).send({
            success: true,
            message: 'Single Products displayed successfully',
            products
        })
    }
    catch (err) {
        console.log('error in get single product controller: ', err);
        res.status(500).send({
            success: false,
            message: 'Error in get single product controller',
            err
        })
    }
}


export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select('photo');
        if (product?.photo?.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            res.status(500).send({
                success: false,
                message: "Cannot find Product Photo",
            });
        }
    } catch (error) {
        console.log('error in photo product controller: ', error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export const updateProductController = async (req, res) => {
    try {
        console.log(req.fields)
        const { name, description, price, cateogary, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !cateogary || !quantity || (photo && photo.size > 1000000)) {
            return res.status(500).send({
                success: false,
                error: 'All fields required and Photo size less then 1Mb'
            })
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;

        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            products
        })
    }
    catch (err) {
        console.log('Error in updateProduct', err);
        res.status(500).send({
            message: 'Error in updateProduct',
            success: false,
            err: err
        })
    }
}