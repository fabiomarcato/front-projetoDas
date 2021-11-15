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
  }

  buscarCpfCliente(cpf: string): void {
    this.clienteService.buscaPorCpf(cpf).subscribe((data) => {
      if (data) {
        data.forEach((x) => this.cliente = x);
        this.buscarPedidosPorCliente(cpf);
      }
      else {
        this.message = 'Cliente não encontrado!'
        this.clientePedido = undefined;
      }
    })
  }

  buscarPedidosPorCliente(cpf: string): void {;
    this.pedidoService.listarPedidosCPF(cpf).subscribe((data) => {
      if (data.length != 0) {
        this.clientePedido = data;
        this.message = null;
      }
      else {
        this.message = 'Cliente não possui pedidos!'
        this.clientePedido = undefined;
      }
    });

  }

  verPedido(pedido: Pedidos) {
    const modalRef = this.modalService.open(ModalPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }
}
