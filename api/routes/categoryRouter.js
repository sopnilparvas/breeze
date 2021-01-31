const router = require("express").Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryCtrl");
const { auth, admin } = require("../middleware/authMiddleware");

router.route("/").get(getCategories).post(auth, admin, createCategory);
router.route("/:id").put(auth, admin, updateCategory).delete(auth, admin, deleteCategory);

module.exports = router;
