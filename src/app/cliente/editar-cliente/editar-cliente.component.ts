import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';

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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // snapshot.params de ActivatedRoute dá acesso aos parâmetros passados
    // Operador + (antes do this) converte para número
    let id = +this.route.snapshot.params['id'];
    // Com o id, obtém a pessoa
    const res = this.clienteService.buscarPorID(id).subscribe(
      // chamada bem sucedida
      data => {
        console.log(data);
      },
      // Leitura do erro
      err => {
        console.log(err.error);
      }
    );
    if (res !== undefined) { }
    else throw new Error('Cliente não econtrado: id = ' + id);
  }

  atualizar() {
    // Verifica se o formulário é válido
    if (this.formCliente.form.valid) {
      this.clienteService.atualizar(this.cliente)
        .subscribe(
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
}
