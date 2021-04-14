import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../service/api.service';

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
  numberCard1 = 0;
  descriptionCard1 = '';
  numberCard2 = 0;
  descriptionCard2 = '';
  numberCard3 = 0;
  descriptionCard3 = '';
  numberCard4 = 0;
  descriptionCard4 = '';
  numberCard5 = 0;
  descriptionCard5 = '';
  numberCard6 = 0;
  descriptionCard6 = '';
  cardsDashboard = false;

    constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getLogs(this.page);
    this.getCountLastHourByGET();
    this.getCountLastHourByPOST();
    this.getCountLastHourByPUT();
    this.getCountLastHourByPATCH();
    this.getCountLastHourByDELETE();
    this.getCountLastHourByOPTION();
  }

  getLogs(page : number = 0, direction: string = 'ASC'): void {
    this.api.getLogs(page, this.linesPerPage, this.orderBy, direction, this.limited)
      .subscribe(response => {
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

  getCountLastHourByGET(): void {
    this.api.countLogsByRequest('GET')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard1 = response?.data;
            this.descriptionCard1 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
  }

  getCountLastHourByPOST(): void {
    this.api.countLogsByRequest('POST')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard2 = response?.data;
            this.descriptionCard2 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
  }

  getCountLastHourByPUT(): void {
    this.api.countLogsByRequest('PUT')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard3 = response?.data;
            this.descriptionCard3 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
  }

  getCountLastHourByPATCH(): void {
    this.api.countLogsByRequest('PATCH')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard4 = response?.data;
            this.descriptionCard4 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
  }

  getCountLastHourByOPTION(): void {
    this.api.countLogsByRequest('OPTION')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard5 = response?.data;
            this.descriptionCard5 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
  }

  getCountLastHourByDELETE(): void {
    this.api.countLogsByRequest('DELETE')
      .subscribe(response => {
          if (response?.statusHttp === 200) {
            this.cardsDashboard = true;
            this.numberCard6 = response?.data;
            this.descriptionCard6 = response?.message;
          }
        },
        error => {
          console.error(error);
          this.cardsDashboard = false;
        })
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
