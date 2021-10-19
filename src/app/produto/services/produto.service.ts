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

  BASE_URL = 'http://localhost:8080/api/v1/produtos/'
  //BASE_URL = 'https://apiufpr2021.herokuapp.com/api/v1/produtos'
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodosRest(): Observable<[]>{
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  // listarTodos(): Produto[]{
  //   const produtos = localStorage[LS_CHAVE];
  //   return produtos ? JSON.parse(produtos) : []
  // }

  // inserir(produto: Produto): void {
  //   const produtos = this.listarTodos();
  //   produto.id = new Date().getTime();
  //   produtos.push(produto);
  //   localStorage[LS_CHAVE] = JSON.stringify(produtos);
  // }

  // atualizar(produto: Produto): void{
  //   const produtos: Produto[] = this.listarTodos();
  //   produtos.forEach((obj, index, objs)=>{
  //     if (produto.id === obj.id){
  //       objs[index] = produto
  //     }
  //   });
  //   localStorage[LS_CHAVE] = JSON.stringify(produtos)  
  // }

  // remover(id:number): void {
  //   let produtos: Produto[] = this.listarTodos();
  //   produtos = produtos.filter(produto => produto.id !== id);
  //   localStorage[LS_CHAVE] = JSON.stringify(produtos);
  // }

  // buscarPorID(id: number): Produto | undefined{
  //   const produtos: Produto[] = this.listarTodos();
  //   return produtos.find(produto => produto.id === id)
  // }

  //listarTodos(): Observable<Produto[]>{
    //return this.httpClient.get<Produto[]>(this.BASE_URL);
  //}

  inserir(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.BASE_URL, JSON.stringify(produto));
  }

  atualizar(produto: Produto): Observable<Produto[]> {
    return this.httpClient.put<Produto[]>(this.BASE_URL + produto.id, JSON.stringify(produto)); 
  }
  
  buscarPorID(id: number): Observable<Produto>{
    return this.httpClient.get<Produto>(this.BASE_URL + id);
  }
  
  remover(id: number): Observable<Produto> {
    return this.httpClient.delete<Produto>(this.BASE_URL + id); 
  }
}
