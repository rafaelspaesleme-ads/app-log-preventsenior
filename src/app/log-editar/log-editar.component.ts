import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-log-editar',
  templateUrl: './log-editar.component.html',
  styleUrls: ['./log-editar.component.scss']
})
export class LogEditarComponent implements OnInit {
  currentLog = {
    id: '',
    fileName: '',
    ip: '',
    request: '',
    dateTime: '',
    statusHttp: '',
    userAgent: '',
    active: true,
  };

  updated = false;

  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.message = '';
    this.getLogById(String(this.route.snapshot.paramMap.get('id')));
  }

  getLogById(id: String) {
    this.api.getLogById(id)
      .subscribe(response => {
          console.log('res', response);
          this.currentLog = {...response?.data};
          this.message = response?.message;
        },
        error => {
          console.error(error);
        })
  }

  updateLog(): void {
    const data = {
      id: String(this.route.snapshot.paramMap.get('id')),
      fileName: this.currentLog.fileName,
      dateTime: this.currentLog.dateTime,
      ip: this.currentLog.ip,
      request: this.currentLog.request,
      statusHttp: this.currentLog.statusHttp,
      userAgent: this.currentLog.userAgent,
      active: this.currentLog.active
    };

    this.api.addOrUpdateLog(data)
      .subscribe(response => {
          this.updated = true;
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

  returnRouterInitial() {
    window.open('/logs', '_self');
  }

}
