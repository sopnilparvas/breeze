const router = require("express").Router();
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productCtrl");
const { auth, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
