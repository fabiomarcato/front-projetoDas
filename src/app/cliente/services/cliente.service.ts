import { Injectable } from '@angular/core';

import { Cliente } from 'src/app/shared/models/cliente.model';

// Chave para acesso ao LocalStorage
const LS_CHAVE: string = 'clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  listarTodos(): Cliente[] {
    const clientes = localStorage[LS_CHAVE];
    // Precisa do condicional, pois retorna undefined se a chave não existe
    return clientes ? JSON.parse(clientes) : [];
    //JSON.parse(string):dado um objeto JSON, retorna um objeto javascript
  }

  inserir(cliente: Cliente): void {
    // Obtém a lista completa de clientes
    const clientes = this.listarTodos();
    //Sete ID unico
    cliente.id = new Date().getTime();
    // Adiciona no final da lista
    clientes.push(cliente);
    //JSON.stringify(Objeto): dado um objeto javascript, retorna uma string JSON
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  buscarPorID(id: number): Cliente | undefined {
    // Obtem a lista completa de clientes
    let clientes: Cliente[] = this.listarTodos();

    // Retorna o primeiro elemento da lista que satisfaz a condição, caso contrario, undefined
    return clientes.find((cliente) => cliente.id === id);
  }

  atualizar(cliente: Cliente): void {
    // Obtém a lista completa de clientes
    const clientes: Cliente[] = this.listarTodos();

    // Varre a lista de clientes
    clientes.forEach((obj, index, objs) => {
      if (cliente.id === obj.id) {
        objs[index] = cliente;
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  remover(id: number): void{
    let clientes: Cliente[] = this.listarTodos();

    // retorna a mesma lista com os registros que satisfazem a condição
    clientes = clientes.filter (cliente => cliente.id !== id);

    localStorage[LS_CHAVE] = JSON.stringify(clientes);

  }
}
