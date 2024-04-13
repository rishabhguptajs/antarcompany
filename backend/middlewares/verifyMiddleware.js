import sellerModel from "../models/sellerModel.js"

export const verifyBank = async (req, res, next) => {
    try {
        // console.log(req)
        const sellerId = req.seller.id
        console.log(sellerId)

        const seller = await sellerModel.findById(sellerId)
        console.log(seller)

        if (!seller || seller.bankAccountNumber == 0 || !seller.bankName == "Not Available" || !seller.bankBranch == "Not Available" || !seller.bankIFSC == "Not Available" || !seller.bankAccountHolder == "Not Available") {
            return res.status(400).json({ success: false, message: "Bank details not filled. Please fill your bank details first." });
        }

        next();
    } catch (error) {
        res.status(400).json({
            message: "Error verifying bank details",
            error: error.message,
            success: false,
        })
    }
}