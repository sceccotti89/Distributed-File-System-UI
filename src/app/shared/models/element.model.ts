
export interface FileObjectView {
    fileName: string;
    folder: boolean;
    lastModified: string;
    size: string;
}

export interface FileObjectRequest {
    filePath: string;
    deep: number;
}
