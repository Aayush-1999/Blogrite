const express         =  require("express");
      router          =  express.Router();
      User            =  require("../models/user");
      Notification    =  require("../models/notification");
      middleware      =  require("../middleware/verify");

// view all notifications
router.get("/", middleware.isLoggedIn, async function(req, res) {
    try {
      let user = await User.findById(req.user._id).populate({
        path: "notifications",
        options: { sort: { "_id": -1 } }
      }).exec();
      let allNotifications = user.notifications;
      res.render("notification", { allNotifications });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("back");
    }
  });
  
  // handle notification
  router.get('/:id', middleware.isLoggedIn, async function(req, res) {
    try {
      let notification = await Notification.findById(req.params.id);
      notification.isRead = true;
      notification.save();
      res.redirect("/blog/"+notification.blogId);
    } 
    catch(err) {
      req.flash("error", err.message);
      res.redirect("back");
    }
  });

module.exports=router;