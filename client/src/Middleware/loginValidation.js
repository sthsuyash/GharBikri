export function loginValidate(inputs) {
    let error = {};

    if (!inputs.user_email) {
        error.user_email = "Email is required";
    }

    if (!inputs.password) {
        error.password = "Password is required";
    }

    return error;
}