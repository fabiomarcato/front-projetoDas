import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente.service';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InserirClienteComponent } from './inserir-cliente/inserir-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ListarClienteComponent,
    InserirClienteComponent,
    EditarClienteComponent,
    ModalClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
