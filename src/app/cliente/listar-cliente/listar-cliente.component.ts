import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
})
export class ListarClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    //this.clientes = this.listarTodos();

    this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[]) => {
        if (data == null) {
          this.clientes = [];
        }
        else {
          this.clientes = data;
        }
      }
    })
  }

  listarTodos() {
    return this.clienteService.listarTodos();
  }


  remover($event: any, cliente: Cliente): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o cliente "' + cliente.nome + '"?')) {
      this.clienteService.remover(cliente.id!).subscribe(
        // chamada bem sucedida
        data => {
          console.log(data);
        },
        // Leitura do erro
        err => {
          console.log(err.error);
        }
      );
      this.router.navigate(['/clientes']);
    }
  }

  abrirModalCliente(cliente: Cliente) {
    const modalRef = this.modalService.open(ModalClienteComponent);
    modalRef.componentInstance.cliente = cliente;
  }

}
