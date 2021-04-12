import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { LogDetalheComponent } from './log-detalhe/log-detalhe.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogEditarComponent } from './log-editar/log-editar.component';
import {LogUploadComponent} from "./log-upload/log-upload.component";

const routes: Routes = [
  {
    path: 'logs',
    component: LogsComponent,
    data: { title: 'Lista de Logs' }
  },
  {
    path: 'log-detalhe/:id',
    component: LogDetalheComponent,
    data: { title: 'Detalhe do Log' }
  },
  {
    path: 'log-add',
    component: LogAddComponent,
    data: { title: 'Adicionar um novo Log' }
  },
  {
    path: 'log-upload',
    component: LogUploadComponent,
    data: { title: 'Upload de arquivo de Log' }
  },
  {
    path: 'log-editar/:id',
    component: LogEditarComponent,
    data: { title: 'Editar o Log' }
  },
  {
    path: '',
    redirectTo: '/logs',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
