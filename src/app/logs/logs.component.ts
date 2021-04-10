import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Log } from '../../model/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass']
})
export class LogsComponent implements OnInit {
  private isLoadingResults: boolean | undefined;

  constructor(private api: ApiService) { }

  displayedColumns: string[] = ['id', 'request', 'ip', 'userAgent', 'status'];
  dataSource: Log[] | undefined;

  ngOnInit(): void {
    this.api.getLogs()
      .subscribe((response) => {
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
