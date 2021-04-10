import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-log-editar',
  templateUrl: './log-editar.component.html',
  styleUrls: ['./log-editar.component.scss']
})
export class LogEditarComponent implements OnInit {
  // @ts-ignore
  logForm: FormGroup;
  id: String = '';
  fileName: String = '';
  dateTime: String = '';
  ip: String = '';
  request: String = '';
  statusHttp: String = '';
  userAgent: String = '';
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
  }

  getLog(id: string) {
    this.api.getLogById(id)
      .subscribe(response => {
        const { data } = response;
        // @ts-ignore
        this.id = data['id'];
        this.logForm.setValue({
          // @ts-ignore
          fileName: data['fileName'],
          // @ts-ignore
          dateTime: data['dateTime'],
          // @ts-ignore
          ip: data['ip'],
          // @ts-ignore
          request: data['request'],
          // @ts-ignore
          statusHttp: data['statusHttp'],
          // @ts-ignore
          userAgent: data['userAgent'],
        })
      })
  }

  ngOnInit(): any {
    this.getLog(this.route.snapshot.params['id']);
    this.logForm = this.formBuilder.group({
      'fileName': ["", Validators.required],
      'dateTime': ["", Validators.required, Validators.pattern('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9].[0-9][0-9][0-9]')],
      'ip': ["", Validators.required, Validators.pattern('[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]')],
      'request': ["", Validators.required],
      'statusHttp': ["", Validators.required, Validators.pattern('[0-5][0-9][0-9]')],
      'userAgent': ["", Validators.required]
    })
  }

  updateLog(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addOrUpdateLog({...form, active: true})
      .subscribe(response => {
        this.isLoadingResults = false;
        this.router.navigate([`/log-detalhe/${this.id}`]);
      }, error => {
        console.log(error)
        this.isLoadingResults = false;
      })
  }

}
