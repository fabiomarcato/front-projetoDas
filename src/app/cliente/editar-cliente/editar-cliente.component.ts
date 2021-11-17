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
  // Recebe uma referência do formulário aqui no componente
  // 'formCliente' deve ser o nome do formulário no HTML
  @ViewChild('formCliente') formCliente!: NgForm;

  // Atributo de binding, os dados digitados no formulário vêm para este atributo
  cliente!: Cliente;

  //pessoaService: para fazer a operação de edição
  //route: ActivatedRoute, para obter o parâmetro passado na URL
  //router: para fazer o redirecionamento, após a edição
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
          complete: () => document.location.reload()
        });
    }
  }

  fecharModal() {
    this.activeModal.dismiss();
    document.location.reload();
  }
}
