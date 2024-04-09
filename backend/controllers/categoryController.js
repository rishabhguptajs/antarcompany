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

export const categoryViewController = async(req, res) => {
    try {
        const slug = req.params.slug;

        if(slug){
            const category = await categoryModel.findOne({
                slug,
            });

            if(category){
                res.status(200).json({
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentCategory: category.parentCategory,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: 'Category not found',
                    success: false,
                });
            }
        } else {
            res.status(400).json({
                message: 'Please enter the category id',
                success: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching category',
            error: error.message,
            success: false,
        })
    }
}

export const categoryUpdateController = async(req, res) => {}

export const categoryDeleteController = async(req, res) => {}