const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/Listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Middleware to parse coordinates string into an actual array
// routes/listing.js
const parseCoordinates = (req, res, next) => {
    if (req.body.listing && req.body.listing.geometry) {
        let coords = req.body.listing.geometry.coordinates;
        
        // If it's a string (from the form), parse it
        if (typeof coords === 'string' && coords !== "") {
            try {
                req.body.listing.geometry.coordinates = JSON.parse(coords);
            } catch (e) {
                req.body.listing.geometry.coordinates = []; // Fallback
            }
        }
    }
    next();
};

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single('listing[image]'),

        parseCoordinates,

        validateListing, 
        wrapAsync(listingController.createListing)
    );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), parseCoordinates, validateListing, wrapAsync(listingController.updateListing))
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;