import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";

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
  deleted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.message = '';
    this.getLogById(String(this.route.snapshot.paramMap.get('id')));
  }

  getLogById(id: String) {
    this.api.getLogById(id)
      .subscribe(response => {
          this.currentLog = {...response?.data};
          this.message = response?.message;
        },
        error => {
          console.error(error);
        })
  }

  deleteLogById(id: any) {
    if (id !== null) {
      this.api.deleteLogById(id)
        .subscribe(response => {
          this.message = response?.message;
          this.deleted = true;
        })
    }
  }

  convertDateEngInDatePtBr(dateTime: any) {
    const dateTimeFormat = String(dateTime).split('T');
    const date = dateTimeFormat[0];
    const time = dateTimeFormat[1];

    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    return day + '/' + month + '/' + year + ' ' + time;
  }

  removeTdateTime(dateTime: any) {
    return String(dateTime).replace('T', ' ');
  }

  returnRouterInitial() {
    window.open('/logs', '_self');
  }
}
