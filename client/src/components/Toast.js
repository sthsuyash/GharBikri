import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
    position: "top-right",
    autoClose: 1400,
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
