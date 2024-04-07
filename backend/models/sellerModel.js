import mongoose from 'mongoose'

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
    bankAccountNumber: {
        type: Number,
        default: 0,
    },
    bankName: {
        type: String,
        default: 'Not Available',
    },
    bankBranch: {
        type: String,
        default: 'Not Available',
    },
    bankIFSC: {
        type: String,
        default: 'Not Available',
    },
    bankAccountHolder: {
        type: String,
        default: 'Not Available',
    },
    verificationStatus: {
        type: Boolean,
        default: false,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
})

const sellerModel = mongoose.model('Seller', sellerSchema)

export default sellerModel