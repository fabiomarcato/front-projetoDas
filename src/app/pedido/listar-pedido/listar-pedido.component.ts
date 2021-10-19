import { Component, OnInit } from '@angular/core';

import { PedidoService } from '../services/pedido.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';

import { Pedidos } from '../../shared/models/pedidos.model';
import { Cliente } from '../../shared/models/cliente.model';
import { Produto } from 'src/app/shared/models/produto.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  pedido: Pedidos[] = [];
  clientePedido?: Pedidos[];
  cliente!: Cliente;
  produtosPedido!: any;
  message!: string | null;
  produtos: Produto[] = [];

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService, private produtoService: ProdutoService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pedido = this.pedidoService.listarTodosPedidos();
  }


  buscarPedidos(cpf: string): void {
    this.clienteService.buscaPorCpf(cpf).subscribe((data) => {
      if(data){
        data.forEach((x) => this.cliente = x)
        this.message = null
      }
      else{
        this.message = 'Cliente não encontrado!'
        this.clientePedido = this.pedidoService.buscarPedidosPorCliente(this.cliente.id? this.cliente.id:0);
        if (!this.clientePedido) {
          this.message = 'Cliente não possui pedidos!'
        } else {
          this.message = null
        }
      }
    })
  }

  verPedido(pedido: Pedidos) {
    const modalRef = this.modalService.open(ModalPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  remover($event: any, pedido: Pedidos, idCliente: number): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o pedido "' + pedido.idPedido + '"?')) {
      this.pedidoService.remover(pedido.idPedido!);
      this.clientePedido = this.pedidoService.buscarPedidosPorCliente(idCliente)
      if (!this.clientePedido) {
        this.message = 'Cliente não possui pedidos!'
      } else {
        this.message = null
      }
    }
  }
}
