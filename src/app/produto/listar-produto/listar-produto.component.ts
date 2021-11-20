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
  todosPedidos: any;

  constructor(private produtoService: ProdutoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.produtoService.listarTodos().subscribe({
      next: (produtos: Produto[]) => {
        if (produtos == null) {
          this.produtos = [];
        }
        else {
          this.produtos = produtos;
        }
      }
    });
  }

  remover($event: any, produto: Produto): void {
    $event.preventDefault();
    if (this.confirmaRemoverProduto(produto)){
      this.produtoService.remover(produto.id!).subscribe({
        error: (erro) => this.mostrarErro(erro),
        complete: () => document.location.reload()
      });
    }
  }

  confirmaRemoverProduto(produto: Produto) {
    return confirm('Deseja realmente remover o produto "' + produto.descricao + '"?');
  }

  mostrarErro(erro: { error: { Erro: any; }; }) {
    alert(erro.error.Erro)
  }

  editarProduto(produto: Produto) {
    const modalRef = this.modalService.open(EditarProdutoComponent);
    modalRef.componentInstance.produto = produto;
  }

  novoProduto() {
    return this.modalService.open(InserirProdutoComponent);
  }
}

