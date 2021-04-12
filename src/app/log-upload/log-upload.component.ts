import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-log-upload',
  templateUrl: './log-upload.component.html',
  styleUrls: ['./log-upload.component.scss']
})
export class LogUploadComponent implements OnInit {
  fileName = '';

  uploaded = false;
  loading = false;

  message = '';
  subMessage = '';

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  uploadLog(event: any): void {
    console.log('file', event.target.files);
    this.loading = true;

    if (event.target.files.length > 0) {
      this.fileName = `Nome do arquivo: ${event.target.files[0]?.name}`;
      const formData = new FormData();

      formData.append('file', event.target.files[0]);
      formData.append('sizeFile', event.target.files[0]?.size);

      this.api.uploadLog(formData)
        .subscribe(response => {
            console.log('upload', response);
            if (response?.statusHttp === 201) {
              this.loading = false;
              this.uploaded = true;
              this.message = response?.message;
              this.subMessage = response?.data;
            }
          },
          error => {
            console.error(error);
          })
    }
  }

}