import { ToastOptions } from 'vue-toasted';
import ApiResponse from '@/models/ApiResponse';

const apiError = (payload: ApiResponse): string => {
    if (!payload.message) {
      return 'There was an issue communicating with the server.';
    }
    return `An error occurred: ${payload.message}`;
};

const apiErrorConfiguration: ToastOptions = ({
    position: 'top-center',
    duration: 5000,
    fullWidth: true,
    fitToScreen: true,
    type: 'error',
});

const apiSuccess = (payload: ApiResponse): string => {
    return payload.message;
};

const apiSuccessConfiguration: ToastOptions = ({
    position: 'top-center',
    duration: 5000,
    fullWidth: true,
    fitToScreen: true,
    type: 'success',
});

export {
    apiError,
    apiErrorConfiguration,
    apiSuccess,
    apiSuccessConfiguration,
};
