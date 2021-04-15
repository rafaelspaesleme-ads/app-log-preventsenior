import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

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
  responseError = false;

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

  // tslint:disable-next-line:typedef
  getLogById(id: string) {
    this.api.getLogById(id)
      .subscribe(response => {
          this.currentLog = {...response?.data};
          this.message = response?.message;
        },
        error => {
          console.error(error);
        });
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
          this.responseError = true;
          this.message = error?.error?.message ?? error?.message;
          setTimeout(() => this.responseError = false, 5000);
        });
  }

  // tslint:disable-next-line:typedef
  returnRouterInitial() {
    const location = window.location;
    window.open(location.protocol + '//' + location.host, '_self');
  }

}
