import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ClienteService } from '../services/cliente.service';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { InserirClienteComponent } from '../inserir-cliente/inserir-cliente.component';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
})
export class ListarClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.clienteService.listarTodos().subscribe({
      next: (clientes: Cliente[]) => {
        if (clientes == null) {
          this.clientes = [];
        }
        else {
          this.clientes = clientes;
        }
      }
    });
  }

  remover($event: any, cliente: Cliente) {
    $event.preventDefault();
    if (this.confirmaRemoverCliente(cliente)) {
      this.clienteService.remover(cliente.id!).subscribe({
        error: (erro) => this.mostrarErro(erro),
        complete: () => document.location.reload()
      });
    }
  }

  confirmaRemoverCliente(cliente: Cliente){
    let confirmaRemocaoCliente = confirm("Deseja remover o cliente " + cliente.nome + "?");
    return confirmaRemocaoCliente;
  }

  mostrarErro(erro: { error: { Erro: any; }; }){
    alert(erro.error.Erro)
  }

  abrirModalCliente(cliente: Cliente) {
    const modalRef = this.modalService.open(ModalClienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

  abrirModalEditar(cliente: Cliente) {
    const modalRef = this.modalService.open(EditarClienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

  abrirModalNovo() {
    return this.modalService.open(InserirClienteComponent);
  }
}
