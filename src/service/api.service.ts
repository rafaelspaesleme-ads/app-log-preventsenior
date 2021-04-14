import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const profile = environment.production
  ? 'prod'
  : 'dev';

const baseUrl = profile === 'dev'
  ? 'http://localhost:8080/'
  : 'https://logs-rpl-prvsr.herokuapp.com/';

const apiUrl = baseUrl.concat('logs/');

const endpoint = {
  upload: apiUrl.concat('upload'),
  saveOrUpdate: apiUrl.concat('save-or-update'),
  list: (page: number, linesPerPage: number, orderBy: string, direction: string, limited: number) => apiUrl
    .concat(`list?page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByUserAgent: (userAgent: string, page: number, linesPerPage: number, orderBy: string, direction: string, limited: number) => apiUrl
    .concat(`list?userAgent=${userAgent}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByIp: (ip: string, page: number, linesPerPage: number, orderBy: string, direction: string, limited: number) => apiUrl
    .concat(`list?ip=${ip}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  selectById: (id: string) => apiUrl.concat(`select-by/${id}`),
  countLogsByRequest: (request: string) => apiUrl
    .concat(`count?request=${request}`),
  deleteById: (id: string) => apiUrl.concat(`delete-by/${id}`)
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getLogs(page: number, linesPerPage: number, orderBy: string, direction: string, limited: number): Observable<any> {
    return this.http.get(endpoint.list(page, linesPerPage, orderBy, direction, limited));
  }

  getLogById(id: string): Observable<any> {
    return this.http.get(endpoint.selectById(id));
  }

  getLogByUserAgent(
    userAgent: string, page: number, linesPerPage: number, orderBy: string, direction: string, limited: number): Observable<any> {
    return this.http.get(endpoint.listByUserAgent(userAgent, page, linesPerPage, orderBy, direction, limited));
  }

  getLogByIp(ip: string, page: number, linesPerPage: number, orderBy: string, direction: string, limited: number): Observable<any> {
    return this.http.get(endpoint.listByIp(ip, page, linesPerPage, orderBy, direction, limited));
  }

  countLogsByRequest(request: string): Observable<any> {
    return this.http.get(endpoint.countLogsByRequest(request));
  }

  uploadLog(dataFile: any): Observable<any> {
    return this.http.post(endpoint.upload, dataFile);
  }

  addOrUpdateLog(data: any): Observable<any> {
    return this.http.patch(endpoint.saveOrUpdate, data);
  }

  deleteLogById(id: string): Observable<any> {
    return this.http.delete(endpoint.deleteById(id));
  }
}
