export declare class CloudinaryService {
    constructor();
    uploadFile(buffer: Buffer, originalName?: string): Promise<string>;
    getUrl(publicId: string): Promise<string>;
}
