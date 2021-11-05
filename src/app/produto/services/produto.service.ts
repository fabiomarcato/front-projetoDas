import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/models/produto.model';

const LS_CHAVE: string = "produtos"

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'https://apiufpr2021.herokuapp.com/api/v1/produtos/'
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodosRest(): Observable<[]>{
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  listarTodos(): Observable<Produto[]>{
    return this.httpClient.get<Produto[]>(this.BASE_URL, this.httpOptions);
  }

  inserir(produto: Produto): Observable<Produto> {
    console.log(produto);
    return this.httpClient.post<Produto>(this.BASE_URL, JSON.stringify(produto), this.httpOptions);
    
  }

  atualizar(produto: Produto): Observable<Produto[]> {
    return this.httpClient.put<Produto[]>(this.BASE_URL + produto.id, JSON.stringify(produto), this.httpOptions);

  }
  
  buscarPorID(id: number): Observable<Produto>{
    return this.httpClient.get<Produto>(this.BASE_URL + id, this.httpOptions);
  }
  
  remover(id: number): Observable<Produto> {
    console.log(this.BASE_URL + id)
    return this.httpClient.delete<Produto>(this.BASE_URL + id, this.httpOptions); 
  }
}
