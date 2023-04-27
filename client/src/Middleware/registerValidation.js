export function registerValidate(inputs) {
    let errors = {};

    if (!inputs.user_email) {
        errors.user_email = "Email required";
    }
    else if (/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(inputs.email)) {
        errors.user_email = "Email address is invalid";
    }

    if (!inputs.first_name) {
        errors.first_name = "First Name required";
    }

    if (!inputs.last_name) {
        errors.last_name = "Last Name required";
    }

    if (!inputs.password) {
        errors.password = "Password is required";
    } else if (inputs.password.length < 6) {
        errors.password = "Password needs to be 6 characters or more";
    }

    if (!/^[0-9]{10}$/.test(inputs.phone_number)) {
        errors.phone_number = "Phone Number is invalid";
    }

    if (!inputs.address_city) {
        errors.address_city = "City is required";
    }

    if (!inputs.address_state) {
        errors.address_state = "State is required";
    }

    return errors;
}