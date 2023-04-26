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

    return errors;
}