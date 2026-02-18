const UserActivity = require("../model/UserActivityModel");
const Product = require("../model/ProductModel");

exports.getReminderProducts = async (req, res) => {
  const userId = req.user._id;

  const activities = await UserActivity.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(50);

  const viewed = new Set();
  const purchased = new Set();

  activities.forEach(a => {
    if (a.action === "purchase") purchased.add(a.product.toString());
    else viewed.add(a.product.toString());
  });

  const reminderIds = [...viewed].filter(id => !purchased.has(id));

  const products = await Product.find({ _id: { $in: reminderIds } }).limit(10);

  res.json(products);
};
