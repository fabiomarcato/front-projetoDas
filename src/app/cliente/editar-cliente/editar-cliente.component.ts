import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  atualizar() {
    if (this.formCliente.form.valid) {
      this.clienteService.atualizar(this.cliente)
        .subscribe({
          error: (erro) => this.mostrarErro(erro),
          complete: () => document.location.reload()
        });
    }
  }

  fecharModal() {
    this.activeModal.dismiss();
    document.location.reload();
  }

  mostrarErro(erro: { error: { Erro: any; }; }){
    alert(erro.error.Erro)
  }
}
