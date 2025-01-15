import { CloudinaryService } from 'src/service/cloudinary/cloudinary,service';
import { FileUploadDTO } from './dto/file-upload.dto';
export declare class FileUploadService {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: FileUploadDTO): Promise<string>;
    getUrl(publicId: string): Promise<string>;
}
