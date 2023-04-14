export function validate(inputs) {
    let errors = {};

    if (!inputs.username.trim()) {
        errors.name = "Username required";
    }

    if (!inputs.user_email) {
        errors.user_email = "Email required";
    } else if (!/\S+@\S+.\S+/.test(inputs.email)) {
        errors.email = "Email address is invalid";
    }

    if (!inputs.password) {
        errors.password = "Password is required";
    } else if (inputs.password.length < 6) {
        errors.password = "Password needs to be 6 characters or more";
    }

    return errors;
};