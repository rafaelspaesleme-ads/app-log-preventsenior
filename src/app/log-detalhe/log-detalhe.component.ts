import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-log-detalhe',
  templateUrl: './log-detalhe.component.html',
  styleUrls: ['./log-detalhe.component.scss']
})
export class LogDetalheComponent implements OnInit {
  currentLog = {
    id: '',
    fileName: '',
    ip: '',
    request: '',
    statusHttp: '',
    userAgent: '',
    dateTime: null
  };
  message = '';
  responseError = false;
  deleted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
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

  // tslint:disable-next-line:typedef
  deleteLogById(id: any) {
    if (id !== null) {
      this.api.deleteLogById(id)
        .subscribe(response => {
          this.message = response?.message;
          this.deleted = true;
        },
          error => {
            console.error(error);
            this.responseError = true;
            this.message = error?.error?.message ?? error?.message;
            setTimeout(() => this.responseError = false, 5000);
          });
    }
  }

  // tslint:disable-next-line:typedef
  convertDateEngInDatePtBr(dateTime: any) {
    const dateTimeFormat = String(dateTime).split('T');
    const date = dateTimeFormat[0];
    const time = dateTimeFormat[1];

    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    return day + '/' + month + '/' + year + ' ' + time;
  }

  // tslint:disable-next-line:typedef
  removeTdateTime(dateTime: any) {
    return String(dateTime).replace('T', ' ');
  }

  // tslint:disable-next-line:typedef
  returnRouterInitial() {
    window.open('/logs', '_self');
  }

  ngOnInit(): void {
    this.message = '';
    this.getLogById(String(this.route.snapshot.paramMap.get('id')));
  }
}
