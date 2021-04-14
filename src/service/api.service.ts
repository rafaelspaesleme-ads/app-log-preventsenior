import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const profile = environment.production
  ? 'prod'
  : environment.development
    ? 'dev'
    : 'test';

const baseUrl = profile === 'test'
  ? 'http://localhost:8080/'
  : profile === 'dev'
    ? 'https://logs-rpl-prvsr.heroku.com/'
    : 'https://rpl-prvsr.log';

const apiUrl = baseUrl.concat('logs/');

const endpoint = {
  upload: apiUrl.concat('upload'),
  saveOrUpdate: apiUrl.concat('save-or-update'),
  list: (page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByUserAgent: (userAgent: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?userAgent=${userAgent}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByIp: (ip: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?ip=${ip}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  selectById: (id: String) => apiUrl.concat(`select-by/${id}`),
  countLogsByRequest: (request: String) => apiUrl
    .concat(`count?request=${request}`),
  deleteById: (id: String) => apiUrl.concat(`delete-by/${id}`)
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLogs(page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.list(page, linesPerPage, orderBy, direction, limited));
  }

  getLogById(id: String): Observable<any> {
    return this.http.get(endpoint.selectById(id));
  }

  getLogByUserAgent(userAgent: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.listByUserAgent(userAgent, page, linesPerPage, orderBy, direction, limited));
  }

  getLogByIp(ip: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.listByIp(ip, page, linesPerPage, orderBy, direction, limited));
  }

  countLogsByRequest(request: String): Observable<any> {
    return this.http.get(endpoint.countLogsByRequest(request));
  }

  uploadLog(dataFile: any): Observable<any> {
    return this.http.post(endpoint.upload, dataFile);
  }

  addOrUpdateLog(data: any): Observable<any> {
    return this.http.patch(endpoint.saveOrUpdate, data);
  }

  deleteLogById(id: String): Observable<any> {
    return this.http.delete(endpoint.deleteById(id));
  }
}
