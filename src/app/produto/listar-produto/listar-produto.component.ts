import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
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
  aux?: Boolean;
  todosPedidos: any;

  constructor(private produtoService: ProdutoService, private pedidoService: PedidoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.produtoService.listarTodos().subscribe((data) => {
      this.produtos = data;
    });
  }

  remover($event: any, produto: Produto): void {
    $event.preventDefault();
    this.checarProdutosEmPedido(produto)
    if (this.aux == false) {
      if (confirm('Deseja realmente remover o produto "' + produto.descricao + '"?'))
        this.produtoService.remover(produto.id!).subscribe({
          complete: () => document.location.reload()
        });

    } else {
      confirm('O produdo: "' + produto.descricao + '" está vinculado a um pedido e não pode ser removido')
    }
  }

  editarProduto(produto: Produto) {
    const modalRef = this.modalService.open(EditarProdutoComponent);
    modalRef.componentInstance.produto = produto;
  }

  novoProduto() {
    return this.modalService.open(InserirProdutoComponent);
  }

  checarProdutosEmPedido(produto: Produto) {
    let produtosPedido: any;
    let itensPedido: any = [];
    this.pedidoService.listarTodosPedidos().subscribe({
      next: (data) => {
        produtosPedido = data;
        this.aux = false;
        for (let i = 0; i < produtosPedido.length; i++) {
          itensPedido = produtosPedido[i]['itensDoPedido'];
          for (let j = 0; j < itensPedido.length; j++) {
            if (produto.id === itensPedido[j]['produto']['id']) {
              this.aux = true;
            }
          }
        }
      }
    })
  }
}

