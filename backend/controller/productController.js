const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");


// >>>>>>>>>>>>>>>>>>>>> CREATE PRODUCT (ADMIN) >>>>>>>>>>>>>>>>>>>>>>
exports.createProduct = asyncWrapper(async (req, res) => {

  /* ---------------- IMAGE HANDLING ---------------- */
  let images = [];

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];
    const chunkSize = 3;
    const imageChunks = [];

    while (images.length > 0) {
      imageChunks.push(images.splice(0, chunkSize));
    }

    for (let chunk of imageChunks) {
      const uploadPromises = chunk.map((img) =>
        cloudinary.v2.uploader.upload(img, { folder: "Products" })
      );

      const results = await Promise.all(uploadPromises);

      for (let result of results) {
        imagesLinks.push({
          product_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    req.body.images = imagesLinks;
  }

  /* ---------------- SIZE LOGIC ---------------- */

  let sizes = [];
  let totalStock = 0;

  if (req.body.sizes) {
    sizes = JSON.parse(req.body.sizes);

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return next(new ErrorHandler("Invalid sizes data", 400));
    }

    sizes.forEach((s) => {
      if (!s.size || s.stock === undefined) {
        throw new ErrorHandler("Each size must have size & stock", 400);
      }
      totalStock += Number(s.stock);
    });

    req.body.sizes = sizes;
    req.body.Stock = totalStock; // auto-calc total stock
  } else {
    req.body.sizes = [];
  }

  /* ---------------- FINAL CREATE ---------------- */
  req.body.user = req.user.id;

  const product = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


// >>>>>>>>>>>>>>>>>>>>> GET ALL PRODUCTS >>>>>>>>>>>>>>>>>>>>>>
exports.getAllProducts = asyncWrapper(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await ProductModel.countDocuments();

  const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductCount = products.length;

  apiFeature.Pagination(resultPerPage);
  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  });
});


// >>>>>>>>>>>>>>>>>>>>> GET ALL PRODUCTS (ADMIN) >>>>>>>>>>>>>>>>>>>>>>
exports.getAllProductsAdmin = asyncWrapper(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({ success: true, products });
});


// >>>>>>>>>>>>>>>>>>>>> UPDATE PRODUCT (ADMIN) >>>>>>>>>>>>>>>>>>>>>>
exports.updateProduct = asyncWrapper(async (req, res, next) => {

  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  /* ----------- IMAGE UPDATE ----------- */
  let images = [];

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    for (let img of product.images) {
      await cloudinary.v2.uploader.destroy(img.product_id);
    }

    const imagesLinks = [];
    for (let img of images) {
      const result = await cloudinary.v2.uploader.upload(img, {
        folder: "Products",
      });

      imagesLinks.push({
        product_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  /* ----------- SIZE UPDATE ----------- */
  if (req.body.sizes) {
    const sizes = JSON.parse(req.body.sizes);
    let totalStock = 0;

    sizes.forEach((s) => {
      totalStock += Number(s.stock);
    });

    req.body.sizes = sizes;
    req.body.Stock = totalStock;
  }

  product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});


// >>>>>>>>>>>>>>>>>>>>> DELETE PRODUCT (ADMIN) >>>>>>>>>>>>>>>>>>>>>>
exports.deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  for (let img of product.images) {
    await cloudinary.v2.uploader.destroy(img.product_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});


// >>>>>>>>>>>>>>>>>>>>> PRODUCT DETAILS >>>>>>>>>>>>>>>>>>>>>>
exports.getProductDetails = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// >>>>>>>>>>>>>>>>>>>>> CREATE / UPDATE REVIEW >>>>>>>>>>>>>>>>>>>>>>
exports.createProductReview = asyncWrapper(async (req, res, next) => {
  const { ratings, comment, productId, title, recommend } = req.body;

  const review = {
    userId: req.user._id,
    name: req.user.name,
    ratings: Number(ratings),
    title,
    comment,
    recommend,
    avatar: req.user.avatar.url,
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.userId.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString()) {
        rev.ratings = ratings;
        rev.comment = comment;
        rev.recommend = recommend;
        rev.title = title;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, r) => acc + r.ratings, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});


// >>>>>>>>>>>>>>>>>>>>> GET REVIEWS >>>>>>>>>>>>>>>>>>>>>>
exports.getProductReviews = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// >>>>>>>>>>>>>>>>>>>>> DELETE REVIEW >>>>>>>>>>>>>>>>>>>>>>
exports.deleteReview = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : reviews.reduce((acc, r) => acc + r.ratings, 0) / numOfReviews;

  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true });
});
