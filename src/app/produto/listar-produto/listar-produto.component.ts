import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';
import { InserirProdutoComponent } from '../inserir-produto/inserir-produto.component';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.produtoService.listarTodos().subscribe({
      next: (data: Produto[]) => {
        if(data==null){
          this.produtos = [];
        }
        else {
          this.produtos = data;
        }
      }
    })
  }

  listarTodos() {
    return this.produtoService.listarTodos();
  }

  remover($event: any, produto: Produto): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o produto "' + produto.descricao + '"?')) {
      this.produtoService.remover(produto.id!);
      this.produtoService.listarTodos().subscribe({
        next: (data: Produto[]) => {
          if(data==null){
            this.produtos = [];
          }
          else {
            this.produtos = data;
          }
        }
      })
    }
  }

  editarProduto(produto: Produto) {
    const modalRef = this.modalService.open(EditarProdutoComponent);
    modalRef.componentInstance.produto = produto;
  }

  novoProduto() {
    return this.modalService.open(InserirProdutoComponent);
  }
}
