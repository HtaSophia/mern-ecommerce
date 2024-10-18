import { isAxiosError } from "axios";

export const errorMessageHandler = (error, context) => {
    let errorMessage = error.message;

    if (isAxiosError(error)) {
        errorMessage = error.response.data.message;
    }

    return context ? `${context}: ${errorMessage}` : errorMessage;
};
