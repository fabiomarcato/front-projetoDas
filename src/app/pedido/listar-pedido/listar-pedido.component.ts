import { Component, OnInit } from '@angular/core';

import { PedidoService } from '../services/pedido.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';

import { Pedidos } from '../../shared/models/pedidos.model';
import { Cliente } from '../../shared/models/cliente.model';
import { Produto } from 'src/app/shared/models/produto.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pedidoService.listarTodosPedidos().subscribe({
      next: (data: Pedidos[]) => {
        if (data == null) {
          this.pedido = [];
        }
        else {
          this.pedido = data;
        }
      }
    })
  }

  buscarPedidos(cpf: string): void {
    this.clienteService.buscaPorCpf(cpf).subscribe((data) => {
      if (data) {
        data.forEach((x) => this.cliente = x);
        this.buscarPedidosPorCliente(this.cliente.id!.toString());
        this.message = null;
      }
      else {
        this.message = 'Cliente não encontrado!'
      }
    })
  }

  buscarPedidosPorCliente(idCliente: string): void {
    this.pedidoService.listarTodosPedidos().subscribe((data) => {
      //Esse filter ta retornando vazio sempre. Acho que pode ser algo da diferença da classe de pedidos do front pro back
      this.clientePedido = data//.filter(pedido => pedido.idCliente == idCliente);
      if (this.clientePedido?.length == 0) {
        this.message = 'Cliente não possui pedidos!'
      }
    })

    //
  }

  verPedido(pedido: Pedidos) {
    const modalRef = this.modalService.open(ModalPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  // Back não remove pedidos
  //   remover($event: any, pedido: Pedidos, idCliente: string): void {
  //     $event.preventDefault();
  //     if (confirm('Deseja realmente remover o pedido "' + pedido.idPedido + '"?')) {
  //       this.pedidoService.remover(pedido.idPedido!);
  //       this.clientePedido = this.pedidoService.buscarPedidosPorCliente(idCliente)
  //       if (!this.clientePedido) {
  //         this.message = 'Cliente não possui pedidos!'
  //       } else {
  //         this.message = null
  //       }
  //     }
  //   }
  // }
  // (click)="remover($event, pedido, pedido.idCliente!)"
}
