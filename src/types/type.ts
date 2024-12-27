export interface FileProcessingResult {
  success: boolean;
  originalName: string;
  processedName: string;
  size: number;
  mimeType: string;
  processedAt: string;
}
