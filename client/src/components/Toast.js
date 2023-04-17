import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const toastError = (message) => {
    toast.error(message, {
        ...toastStyle,
    });
}

export const toastSuccess = (message) => {
    toast.success(message, {
        ...toastStyle,
    });
}
