export class URLConfig {
    static getApiUrl(): string {
        return `http://localhost:8084/api`;
    };
    static getSecureApiUrl(): string {
        return `https://localhost:8085/api`;
    };
}