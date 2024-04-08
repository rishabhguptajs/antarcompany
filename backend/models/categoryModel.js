import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        enum:['Carpets', 'Sarees', 'Chikankari', 'Pottery', 'Wooden Crafts', 'Metal Crafts']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
})

const Category = mongoose.model('Category', categorySchema)

export default Category