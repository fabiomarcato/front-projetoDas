import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { InserirPedidoComponent } from './inserir-pedido/inserir-pedido.component';
import { PedidoService } from './services/pedido.service';


@NgModule({
  declarations: [
    InserirPedidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    PedidoService
  ]
})
export class PedidoModule { }
