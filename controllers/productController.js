import slugify from "slugify"
import productModel from "../models/productModel.js"
import cateogaryModel from "../models/cateogaryModel.js"



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
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select('-photo')
            .populate("cateogary");
        res.status(200).send({
            success: true,
            message: 'Single Products displayed successfully',
            product
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




// FILTER CONTROLLER

export const productFilterController = async (req, res) => {
    try {
        const checked = req.body.checked
        const radio = req.body.radio
        const args = {};
        if (checked.length > 0) args.cateogary = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: 'Filter Successful',
            products
        })
    }
    catch (err) {
        res.status(400).send({
            message: 'Error in Filtering Product',
            success: false,
            err
        })
    }
}

// GET PRODUCT COUNT
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count cntrllr",
            error,
            success: false,
        });
    }
};


// PAGINATION FOR PRODUCT
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// SEARCH PRODUCT
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ],
        }).select("-photo");
        res.json(result);
    }
    catch (err) {
        console.log('Error in search product Ctrl : ', err);
        res.status(400).send({
            success: false,
            message: 'errror in Search product Ctrl',
            err
        })
    }
}

//SIMILAR PRODUCT 
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                cateogary: cid,
                _id: { $ne: pid }
            })
            .select('-photo')
            .limit(3)
            .populate('cateogary')
        res.status(200).send({
            success: true,
            mesaage: 'Similar Products ',
            products
        })
    }
    catch (err) {
        console.log('Error in related product ctrl: ', err);
        res.status(500).send({
            success: false,
            message: "Error in related product ctrl",
            err
        })
    }
}

// CATEOGARY WISE PRODUCT 
export const productCategaryController = async (req, res) => {
    try {
        const category = await cateogaryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ cateogary: category }).populate('cateogary');
        res.status(200).send({
            message: 'Product based on cateogary',
            success: true,
            products,
            category
        })
    }
    catch (err) {
        console.log('Error in ProductCateogary ctrl: ', err);
        res.status(400).send({
            message: 'Error in Product based on cateogary',
            success: false,
            err
        })
    }
}