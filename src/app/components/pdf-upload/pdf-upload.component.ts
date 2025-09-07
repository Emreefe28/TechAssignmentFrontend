import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css']
})
export class PdfUploadComponent {
  selectedFile: File | null = null;
  uploading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private apiService: ApiService) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.error = null;
    this.success = null;

    if (file) {
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
      } else {
        this.error = 'Please select a PDF file only.';
        this.selectedFile = null;
      }
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.error = 'Please select a PDF file first.';
      return;
    }

    this.uploading = true;
    this.error = null;
    this.success = null;

    this.apiService.uploadPdf(this.selectedFile).subscribe({
      next: (response) => {
        this.success = 'PDF uploaded successfully!';
        this.selectedFile = null;
        this.uploading = false;
        console.log('PDF upload response:', response);
        
        // Reset file input
        const fileInput = document.getElementById('pdfFile') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        this.error = 'Failed to upload PDF: ' + err.message;
        this.uploading = false;
        console.error('Error uploading PDF:', err);
      }
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
