import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Response } from "../../model/Response";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  private isLoadingResults: boolean | undefined;
  displayedColumns: string[] = ['id', 'request', 'ip', 'userAgent', 'status'];
  dataSource: any | undefined;

  constructor(private api: ApiService) { }


  ngOnInit(): any {
    this.isLoadingResults = true;
    this.api.getLogs()
      .subscribe(response => {
          console.log(response);
          this.dataSource = response.data;
        console.log(this.dataSource);
        this.isLoadingResults = false;
      },
        error => {
        console.log(error);
        this.isLoadingResults = false;
        });
  }

}
