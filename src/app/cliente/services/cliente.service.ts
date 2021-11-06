import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from 'src/app/shared/models/cliente.model';

// Chave para acesso ao LocalStorage
const LS_CHAVE: string = 'clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'https://apiufpr2021.herokuapp.com/api/v1/clientes/'
  //BASE_URL = 'http://localhost:8080/api/v1/clientes/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodos(): Observable<[]> {
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  inserir(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.BASE_URL, JSON.stringify(cliente), this.httpOptions);
  }

  buscarPorID(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.BASE_URL + id);
  }

  buscaPorCpf(cpf: string): Observable<[]> {
    return this.httpClient.get<[]>(`${this.BASE_URL}clientes/cpf/${cpf}`, this.httpOptions)
  }

  atualizar(cliente: Cliente): Observable<Cliente[]> {
    return this.httpClient.put<Cliente[]>(this.BASE_URL + cliente.id, JSON.stringify(cliente));
  }

  remover(id: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(this.BASE_URL + id);
  }

}

