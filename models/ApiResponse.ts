
class ApiResponse {
    public code: number = 500;

    public message: string = '';

    public body: any = null;

    constructor (code: number, message: string = '', body: any = null) {
      this.code = code
      this.message = message
      this.body = body
    }

    public wasSuccessful (): boolean {
      return this.code >= 200 && this.code < 300
    }
}

export default ApiResponse
