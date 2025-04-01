const userModel = require("../models/userModel")

const uploadPermission = async(userId) => {
    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return false
    }

    return false
}


module.exports = uploadPermission