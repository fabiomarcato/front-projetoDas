import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProdutoService } from './services/produto.service';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { InserirProdutoComponent } from './inserir-produto/inserir-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';




@NgModule({
  declarations: [
    ListarProdutoComponent,
    InserirProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutoModule { }
