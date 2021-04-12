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
  userAgent = '';
  ip = '';
  displayedColumns: string[] = ['id', 'userAgent', 'request', 'ip', 'status', 'detalhes'];
  dataSource = [];
  page: number = 0;
  currentPage: number = 0;
  pageBackend = 0;
  linesPerPage = 10;
  orderBy = 'dateTime';
  limited = 1000;
  disabledPagePrevius = false;
  disabledPageNext = false;
  titleFilter = 'Filtrar logs mais recentes';

    constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getLogs(this.page);
  }

  getLogs(page : number = 0, direction: string = 'ASC'): void {
    this.api.getLogs(page, this.linesPerPage, this.orderBy, direction, this.limited)
      .subscribe(response => {
          console.log(response);
          this.currentPage = page;
          this.dataSource = response?.data?.content;
          this.pageBackend = response?.data?.totalElements;
          this.page = page;
          this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
          this.linesPerPage !== response?.data?.size ? this.disabledPageNext = true : this.disabledPageNext = false;
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

  filterDateTime(): void {
    if (this.titleFilter === 'Filtrar logs mais recentes') {
      this.getLogs(0, 'DESC');
      this.titleFilter = 'Filtrar logs mais antigos';
    } else {
      this.getLogs(0, 'ASC');
      this.titleFilter = 'Filtrar logs mais recentes';

    }
  }

  searchByUserAgent(page : number = 0, direction: string = 'DESC'): void {
    this.api.getLogByUserAgent(this.userAgent, page, this.linesPerPage, this.orderBy, direction, this.limited)
      .subscribe(response => {
          console.log('logs', response);
          this.currentPage = page;
          this.dataSource = response?.data?.content;
          this.pageBackend = response?.data?.totalElements;
          this.page = page;
          this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
          this.linesPerPage !== response?.data?.size ? this.disabledPageNext = true : this.disabledPageNext = false;
          this.titleFilter = 'Filtrar logs mais antigos';
        },
        error => {
          console.error(error);
        })
  }

  searchByIp(page : number = 0, direction: string = 'DESC'): void {
    this.api.getLogByIp(this.ip, page, this.linesPerPage, this.orderBy, direction, this.limited)
      .subscribe(response => {
          console.log('logs', response);
          this.currentPage = page;
          this.dataSource = response?.data?.content;
          this.pageBackend = response?.data?.totalElements;
          this.page = page;
          this.page === 0 ? this.disabledPagePrevius = true : this.disabledPagePrevius = false;
          this.linesPerPage !== response?.data?.size ? this.disabledPageNext = true : this.disabledPageNext = false;
          this.titleFilter = 'Filtrar logs mais antigos';
        },
        error => {
          console.error(error);
        })
  }

  setPagination(type: string) {
    if (type === 'previus') {
      const { page } = this;

      if (page !== 0) {
        this.disabledPagePrevius = false;
        this.disabledPageNext = true;
        const pageNumber: number = page - 1;
        if (this.userAgent !== '' && this.ip === '') {
          this.searchByUserAgent(pageNumber);
        } else if (this.ip !== '' && this.userAgent === '') {
          this.searchByIp(pageNumber);
        } else {
          this.getLogs(pageNumber);
        }
      }
    } else {
      const { page, pageBackend } = this;
      if (page !== pageBackend) {
        this.disabledPagePrevius = true;
        this.disabledPageNext = false;
        console.log('page', page);
        const pageNumber = page + 1;
        if (this.userAgent !== '' && this.ip === '') {
          this.searchByUserAgent(pageNumber);
        } else if (this.ip !== '' && this.userAgent === '') {
          this.searchByIp(pageNumber);
        } else {
          this.getLogs(pageNumber);
        }

      }
    }
  }

  simplifyingUserAgent(userAgent: String) {
      const listName = userAgent.split(' ');

      if (listName.length > 7) {
        return `${listName[0]} ${listName[1]} ${listName[2]} ${listName[3]} ${listName[4]} ${listName[5]} ${listName[6]}...`;
      } else if (listName.length > 3 && listName.length < 8) {
        return `${listName[0]} ${listName[1]} ${listName[2]}...`;
      } else if (listName.length > 2 && listName.length < 4) {
        return `${listName[0]} ${listName[1]}...`;
      } else if (listName.length > 1 && listName.length < 3) {
        return `${listName[0]} ${listName[1]}`;
      } else {
        return listName[0];
      }
  }

  simplifyingId(id: String) {
    return  id.split('-')[0];
  }

}
