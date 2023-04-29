const { check } = require('express-validator');

// posting property validation

const propertyName = check('p_name')
    .notEmpty()
    .withMessage('Property name is required.')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid property name.');

const propertyStreetnum = check('p_address_street_num')
    .notEmpty()
    .withMessage('Property street number is required.')
    .isLength({ min: 1 })
    .withMessage('Please enter a valid property street number.');

const propertyStreetname = check('p_address_street_name')
    .notEmpty()
    .withMessage('Property street name is required.')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid property street name.');

const propertyCity = check('p_address_city')
    .notEmpty()
    .withMessage('Property city is required.')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid property city.');

const propertyState = check('p_address_state')
    .notEmpty()
    .withMessage('Property state is required.')
    .isLength({ min: 2 })
    .withMessage('Please enter a valid property state.');

const imageFrontal = check('frontal')
    .notEmpty()
    .withMessage('Property frontal image is required.');

const imageKitchen = check('kitchen')
    .notEmpty()
    .withMessage('Property kitchen image is required.');

const imageLivingroom = check('living')
    .notEmpty()
    .withMessage('Property livingroom image is required.');

const imageBathroom = check('bath')
    .notEmpty()
    .withMessage('Property bathroom image is required.');

const propertyDescription = check('p_description')
    .notEmpty()
    .withMessage('Property description is required.')

const propertyType = check('p_type')
    .notEmpty()
    .withMessage('Property type is required.');

const propertyBedrooms = check('p_bed')
    .notEmpty()
    .withMessage('Property bedrooms is required.')
    .isNumeric()
    .withMessage('Please enter a valid number.');

const propertyBathrooms = check('p_bath')
    .notEmpty()
    .withMessage('Property bathrooms is required.')
    .isNumeric()
    .withMessage('Please enter a valid number.');

const propertyArea = check('p_area')
    .notEmpty()
    .withMessage('Property area is required.')
    .isNumeric()
    .withMessage('Please enter a valid number.');

const propertyRepairQuality = check('p_repair_quality')
    .notEmpty()
    .withMessage('Property repair quality is required.')

const propertyYear = check('p_year')
    .notEmpty()
    .withMessage('Property year is required.')
    .isNumeric()
    .withMessage('Please enter a valid number.');

const propertyPrice = check('p_price')
    .notEmpty()
    .withMessage('Property price is required.')
    .isNumeric()
    .withMessage('Please enter a valid number.');

const listingType = check('p_listingType')
    .notEmpty()
    .withMessage('Property listing type is required.');

const availabilityStatus = check('p_availability_status')
    .isBoolean()
    .withMessage('Property availability status is required.');

module.exports = {
    propertyValidation: [
        propertyName,
        propertyStreetnum,
        propertyStreetname,
        propertyCity,
        propertyState,
        imageFrontal,
        imageKitchen,
        imageLivingroom,
        imageBathroom,
        propertyDescription,
        propertyType,
        propertyBedrooms,
        propertyBathrooms,
        propertyArea,
        propertyRepairQuality,
        propertyYear,
        propertyPrice,
        listingType,
        availabilityStatus
    ]
}