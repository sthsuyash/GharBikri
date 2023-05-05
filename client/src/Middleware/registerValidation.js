export function registerValidate(inputs) {
    let register_errors = {};

    if (!inputs.register_user_email) {
        register_errors.register_user_email = "Email required";
    }
    else if (!/\S+@\S+\.\S+/.test(inputs.register_user_email)) {
        register_errors.register_user_email = "Email address is invalid";
    }

    if (!inputs.register_first_name) {
        register_errors.register_first_name = "First Name required";
    }

    if (!inputs.register_last_name) {
        register_errors.register_last_name = "Last Name required";
    }

    if (!inputs.register_password) {
        register_errors.register_password = "Password is required";
    } else if (inputs.register_password.length < 6) {
        register_errors.register_password = "Password needs to be 6 characters or more";
    }

    if (!/^[0-9]{10}$/.test(inputs.register_phone_number)) {
        register_errors.register_phone_number = "Phone Number is invalid";
    }

    if (!inputs.register_address_city) {
        register_errors.register_address_city = "City is required";
    }

    if (!inputs.register_address_state) {
        register_errors.register_address_state = "State is required";
    }

    return register_errors;
}