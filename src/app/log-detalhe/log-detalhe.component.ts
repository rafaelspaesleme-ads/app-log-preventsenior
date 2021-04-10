import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../api.service";
import { Log } from "../../model/Log";

@Component({
  selector: 'app-log-detalhe',
  templateUrl: './log-detalhe.component.html',
  styleUrls: ['./log-detalhe.component.scss']
})
export class LogDetalheComponent implements OnInit {
  log: Log = {
    id: '',
    fileName: '',
    dateTime: '',
    ip: '',
    request: '',
    statusHttp: '',
    userAgent: '',
    active: false
  };
  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): any {
    this.getLog(this.route.snapshot.params['id']);
  }

  getLog(id: String) {
    this.api.getLogById(id)
      .subscribe(response => {
        // @ts-ignore
        this.log = response['data'];
        console.log(this.log);
        this.isLoadingResults = false;
      });
  }

  deleteLog(id: String) {
    this.isLoadingResults = true;
    this.api.deleteLogById(id)
      .subscribe(response => {
        this.isLoadingResults = false;
        this.router.navigate(['/logs']);
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      });
  }

}
