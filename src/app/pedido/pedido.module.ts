import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig} from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

import { InserirPedidoComponent } from './inserir-pedido/inserir-pedido.component';
import { PedidoService } from './services/pedido.service';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';
import { ModalPedidoComponent } from './modal-pedido/modal-pedido.component';


@NgModule({
  declarations: [
    InserirPedidoComponent,
    ListarPedidoComponent,
    ModalPedidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    PedidoService
  ]
})
export class PedidoModule { }
