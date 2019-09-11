import ApiResponse from '@/models/ApiResponse';

const normalizeResponse = (resp: any, defaultBody: any = null): ApiResponse => {
    // Axios response
    if (resp.data && !isNaN(resp.status)) {
        return new ApiResponse(resp.data.code, resp.data.message, (resp.data.body && resp.data.body) || defaultBody);
    }

    // Response body
    if (!isNaN(resp.code)) {
        return new ApiResponse(resp.code, resp.message, (resp.body && resp.body) || defaultBody);
    }

    // Error response
    if (resp.response && resp.response.data) {
        return new ApiResponse(
            resp.response.data.code,
            resp.response.data.message,
            (resp.response.data.body && resp.response.data.body) || defaultBody);
    }

    // No response
    return new ApiResponse(500, 'Unable to communicate with the server', defaultBody);
};

export {
    normalizeResponse,
};
