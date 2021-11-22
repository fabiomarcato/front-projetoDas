import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import { Pedidos } from '../../shared/models/pedidos.model';
import { Cliente } from '../../shared/models/cliente.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  clientePedido?: Pedidos[];
  cliente!: Cliente;
  messagem!: string | null;

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  buscarCpfCliente(cpf: string): void {
    this.clienteService.buscaPorCpf(cpf).subscribe({
      next: (clientes) => {
        if (clientes) {
          clientes.forEach((cliente) => this.cliente = cliente);
          this.buscarPedidosPorCliente(cpf);
        }
        else {
          this.messagemClienteNaoEncontrado();
        }
      },
      error: (erro) => this.mostrarErroCPFVazio(erro),
    })
  }

  buscarPedidosPorCliente(cpf: string): void {
    this.pedidoService.listarPedidosCPF(cpf).subscribe((pedidoCpf: any) => {
      if (pedidoCpf['Status']) {
        this.messagemClienteSemPedidos();
      }
      else {
        this.formatarDataPedido(pedidoCpf);
        this.clientePedido = pedidoCpf;
        this.messagem = null;
      }
    });
  }

  messagemClienteNaoEncontrado() {
    this.messagem = 'Cliente não encontrado!'
    this.clientePedido = undefined;
  }

  mostrarErroCPFVazio(erro: { error: { Erro: any; }; }) {
    erro.error.Erro == undefined ? alert('Insira um CPF') : alert(erro.error.Erro);
  }

  messagemClienteSemPedidos() {
    this.messagem = 'Cliente não possui pedidos!'
    this.clientePedido = undefined;
  }

  formatarDataPedido(pedidosCpf: any){
    for (let pedidoCpf of pedidosCpf){
      pedidoCpf.data = pedidoCpf.data.substring(0,10).split('-').reverse().join('/') + " | " + pedidoCpf.data.substring(11,19);
    }
  }

  verPedido(pedido: Pedidos) {
    const modalRef = this.modalService.open(ModalPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }
}
