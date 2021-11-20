import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styleUrls: ['./inserir-cliente.component.css'],
})
export class InserirClienteComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;

  cliente!: Cliente;

  constructor(private clienteService: ClienteService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  inserir() {
    if (this.formCliente.form.valid) {
      this.clienteService.inserir(this.cliente)
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
