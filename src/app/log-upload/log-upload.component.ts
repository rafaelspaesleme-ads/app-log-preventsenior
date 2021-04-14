import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-log-upload',
  templateUrl: './log-upload.component.html',
  styleUrls: ['./log-upload.component.scss']
})
export class LogUploadComponent implements OnInit {
  fileName = '';

  uploaded = false;
  loading = false;
  responseError = false;

  message = '';
  subMessage = '';

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  uploadLog(event: any): void {
    this.loading = true;

    if (event.target.files.length > 0) {
      this.fileName = `Nome do arquivo: ${event.target.files[0]?.name}`;
      const formData = new FormData();

      formData.append('file', event.target.files[0]);

      this.api.uploadLog(formData)
        .subscribe(response => {
            if (response?.statusHttp === 201) {
              this.loading = false;
              this.uploaded = true;
              this.message = response?.message;
              this.subMessage = response?.data;
            }
          },
          error => {
            console.error(error);
            this.loading = false;
            this.responseError = true;
            this.message = error?.error?.message ?? error?.message;
            setTimeout(() => this.responseError = false, 5000);
          });
    }
  }

}
