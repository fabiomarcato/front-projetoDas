import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styleUrls: ['./inserir-cliente.component.css'],
})
export class InserirClienteComponent implements OnInit {
  // Recebe uma referência do formulário aqui no componente
  // 'formCliente' deve ser o nome do formulário no HTML
  @ViewChild('formCliente') formCliente!: NgForm;

  // Atributo de binding, os dados digitados no formulário vêm para este atributo
  cliente!: Cliente;

  // Deve-se injetar no construtor:
  // - service, para efetuar a operação
  // - Router, para redirecionar para a tela de listagem depois da inserção
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  // Para inserir:
  // - Verifica se o formulário é válido, se não deu nenhum erro
  // Se OK:
  // - chama o inserir do Service, this.pessoa está preenchida (binding)
  // - Redireciona para /pessoas
  inserir(): void {
    if (this.formCliente.form.valid) {
      this.clienteService.inserir(this.cliente);
      this.router.navigate(['/clientes']);
    }
  }
}
