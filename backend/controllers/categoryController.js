import categoryModel from '../models/categoryModel.js';

export const categoryCreateController = async(req, res) => {
    const { name, slug, parentCategory } = req.body;

    try {
        const categoryExists = await categoryModel.findOne({
            slug,
        });

        if (categoryExists) {
            res.status(400);
            throw new Error('Category already exists');
        }

        const category = await categoryModel.create({
            name,
            slug,
            parentCategory,
        });

        if (category) {
            res.status(201).json({
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentCategory: category.parentCategory,
                success: true,
            });
        } else {
            res.status(400).json({
                message: 'Invalid category data',
                success: false,
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error creating category',
            error: error.message,
            success: false,
        });
    }
}