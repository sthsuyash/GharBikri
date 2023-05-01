export function propertyValidate(inputs) {
    let error = {};

    if (!inputs.p_name) {
        error.p_name = "Property name is required";
    }

    if (!inputs.p_address_street_num) {
        error.p_address_street_num = "Street number is required";
    }

    if (!inputs.p_address_street_name) {
        error.p_address_street_name = "Street name is required";
    }

    if (!inputs.p_address_city) {
        error.p_address_city = "City is required";
    }

    if (!inputs.p_address_state) {
        error.p_address_state = "State is required";
    }

    if (!inputs.p_description) {
        error.p_description = "Description is required";
    }

    if (!inputs.p_type) {
        error.p_type = "Property type is required";
    }

    if (!inputs.p_bed) {
        error.p_bed = "Number of bedrooms is required";
    }

    if (!inputs.p_bath) {
        error.p_bath = "Number of bathrooms is required";
    }

    if (!inputs.p_area_sq_ft) {
        error.p_area_sq_ft = "Area in square feet is required";
    }

    if (!inputs.p_repair_quality) {
        error.p_repair_quality = "Repair quality is required";
    }

    if (!inputs.p_year) {
        error.p_year = "Year built is required";
    }

    if (!inputs.p_price) {
        error.p_price = "Price is required";
    }

    if (!inputs.p_listingType) {
        error.p_listingType = "Listing type is required";
    }

    if (!inputs.p_frontal_image) {
        error.p_frontal_image = "Frontal image is required";
    }

    return error;
}