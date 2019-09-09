

class ApiResponse {
    public code: number = 500;

    public message: string = '';

    public body: any = null;

    constructor(code, message, body = null) {
        this.code = code;
        this.message = message;
        this.body = body;
    }
}

export default ApiResponse;
