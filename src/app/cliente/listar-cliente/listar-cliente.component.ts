import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { InserirClienteComponent } from '../inserir-cliente/inserir-cliente.component';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
})
export class ListarClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    return this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[]) => {
        if (data == null) {
          this.clientes = [];
        }
        else {
          this.clientes = data;
        }
      }
    });
  }

  remover($event: any, cliente: Cliente): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o cliente "' + cliente.nome + '"?')) {
      this.clienteService.remover(cliente.id!).subscribe({
        complete: () => document.location.reload()
      });
    }
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
