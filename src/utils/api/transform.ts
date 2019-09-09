import ApiResponse from '@/models/ApiResponse';

const normalizeResponse = (resp: any, defaultBody: any = null): ApiResponse => {
    // Valid response
    if (!isNaN(resp.code)) {
        return new ApiResponse(resp.code, resp.message, resp.body);
    }

    // Error response
    if (resp.response && resp.response.data) {
        return new ApiResponse(resp.response.data.code, resp.response.data.message, resp.response.data.body);
    }

    // No response
    return new ApiResponse(500, 'Unable to communicate with the server', defaultBody);
};

export {
    normalizeResponse,
};
