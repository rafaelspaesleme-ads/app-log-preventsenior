import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
  logs: any;
  currentLog = null;
  currentIndex = -1;
  fileName = '';
  ip = '';
  displayedColumns: string[] = ['id', 'fileName', 'request', 'ip', 'status', 'detalhes'];
  dataSource = [];
  currentPage = 10;
  page = 0;
  linesPerPage = 10;
  orderBy = 'dateTime';
  direction = 'ASC';
  limited = 1000;
  disabledPagePrevius = false;
  disabledPageNext = false;
  totalPages = this.limited / this.linesPerPage;
  arrayLenght = 0;


    constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getLogs();
    this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
    this.page === this.totalPages ? this.disabledPageNext = true : this.disabledPageNext = false;
  }

  getLogs(): void {
    this.api.getLogs(this.currentPage, this.linesPerPage, this.orderBy, this.direction, this.limited)
      .subscribe(response => {

          console.log(response);
          this.dataSource = response?.data?.content;
          this.arrayLenght = response?.data?.content?.length;
        },
        error => {
          console.error(error);
        });
  }

  refresh(): void {
    window.location.reload();
    this.getLogs();
    this.currentLog = null;
    this.currentIndex = -1;
  }

  searchByName(): void {
    this.api.getLogByName(this.fileName, this.currentPage, this.linesPerPage, this.orderBy, this.direction, this.limited)
      .subscribe(response => {
          console.log('logs', response);
          this.dataSource = response?.data?.content;
          this.arrayLenght = response?.data?.content?.length;
          this.arrayLenght !== this.linesPerPage ? this.disabledPageNext = true : this.disabledPageNext = false;
        },
        error => {
          console.error(error);
        })
  }

  searchByIp(): void {
    this.api.getLogByIp(this.ip, this.currentPage, this.linesPerPage, this.orderBy, this.direction, this.limited)
      .subscribe(response => {
          console.log('logs', response);
          this.dataSource = response?.data?.content;
          this.arrayLenght = response?.data?.content?.length;
          this.arrayLenght !== this.linesPerPage ? this.disabledPageNext = true : this.disabledPageNext = false;
        },
        error => {
          console.error(error);
        })
  }

  setPagination(currentPage: number, type: string) {
    if (type === 'previus') {
      this.page--;
      this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
      this.page === this.totalPages ? this.disabledPageNext = true : this.disabledPageNext = false;
      this.currentPage = this.currentPage - 10;
      if (this.fileName !== '' && this.ip === '') {
        this.searchByName();
      } else if (this.ip !== '' && this.fileName === '') {
        this.searchByIp();
      } else {
        this.getLogs();
      }
    } else {
      this.page++;
      this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
      this.page === this.totalPages ? this.disabledPageNext = true : this.disabledPageNext = false;
      this.currentPage = this.currentPage + 10;
      if (this.fileName !== '' && this.ip === '') {
        this.searchByName();
      } else if (this.ip !== '' && this.fileName === '') {
        this.searchByIp();
      } else {
        this.getLogs();
      }
    }

  }

}
