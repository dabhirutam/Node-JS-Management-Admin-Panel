const activeLogModel = require("../models/activeLogModal")

const AddActiveLog = async (msg, _id) => {
    const activeLog = new activeLogModel({
        message: msg,
        productID: _id
    });

    await activeLog.save();
}

module.exports = AddActiveLog;