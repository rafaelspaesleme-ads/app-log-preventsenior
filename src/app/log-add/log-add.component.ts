import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.scss']
})
export class LogAddComponent implements OnInit {
  log = {
    fileName: '',
    ip: '',
    request: '',
    statusHttp: '',
    userAgent: '',
  };

  submitted = false;

  message = '';

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  addLog(): void {
    const data = {
      fileName: this.log.fileName,
      dateTime: new Date(),
      ip: this.log.ip,
      request: this.log.request,
      statusHttp: this.log.statusHttp,
      userAgent: this.log.userAgent,
      active: true
    };

    this.api.addOrUpdateLog(data)
      .subscribe(response => {
          this.submitted = true;
          if (response?.statusHttp === 201) {
            this.message = response?.message;
          } else {
            this.message = response?.message;
          }
        },
        error => {
          console.error(error);
          this.message = error.toLocaleString();
        })
  }

  clearLog(): void {
    this.submitted = false;
    this.log = {
      fileName: '',
      ip: '',
      request: '',
      statusHttp: '',
      userAgent: '',
    }
    this.message = '';
  }

}
