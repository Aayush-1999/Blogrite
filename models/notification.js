var mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
	username: String,
	userId:String,
	blog:String,
	blogId:String,
	isRead: { 
		type: Boolean, 
		default: false 
	}
});

module.exports = mongoose.model("Notification", notificationSchema);