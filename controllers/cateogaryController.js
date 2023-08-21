import slugify from "slugify";
import cateogaryModel from "../models/cateogaryModel.js";


// Creating a cateogary
export const createCateogaryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                message: 'Name is required'
            })
        }
        const existingCateogary = await cateogaryModel.findOne({ name });
        if (existingCateogary) {
            return res.status(200).send({
                success: true,
                message: 'Cateogary already Exists'
            })
        }
        const cateogary = await new cateogaryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'Successfully Created the cateogary',
            cateogary
        })
    }
    catch (err) {
        console.log('Error in CreateCateogary: ', err);
        res.status(500).send({
            message: 'Error in Create Cateogary',
            success: false,
            err
        })
    }
}


// Updating a cateogary

export const updateCateogaryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const cateogary = await cateogaryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: 'Successfully Updated the cateogary',
            cateogary
        })
    }
    catch (err) {
        console.log('Error in update cateogary', err);
        res.status(500).send({
            success: false,
            message: 'Error while Updating Cateogary',
            err
        })
    }
}

// get all Cateogary

export const getAllCateogaryController = async (req, res) => {
    try {
        const cateogary = await cateogaryModel.find();
        res.status(200).send({
            success: true,
            message: 'Successfully Genereated All the cateogary',
            cateogary
        })
    }
    catch (err) {
        console.log('Error in Get all  cateogary', err);
        res.status(500).send({
            success: false,
            message: 'Error while getting all Cateogary',
            err
        })
    }
}

export const singleCateogaryController = async (req, res) => {
    try {
        const cateogary = await cateogaryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Successfully Genereated Single the cateogary',
            cateogary
        })
    }
    catch (err) {
        console.log('Error in Get Single  cateogary', err);
        res.status(500).send({
            success: false,
            message: 'Error while getting Single Cateogary',
            err
        })
    }
}

export const deleteController = async (req, res) => {
    try {
        await cateogaryModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({
            success: true,
            message: 'Successfully Deleted Single  cateogary',
        })
    }
    catch (err) {
        console.log('Error in deleting Single  cateogary', err);
        res.status(500).send({
            success: false,
            message: 'Error while deleting Single Cateogary',
            err
        })
    }
}

