import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        img: string;
        id: string;
    }>;
}
