import { Injectable } from '@angular/core';
import { ItensDoPedido, Pedidos } from '../../shared/models/pedidos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'https://apiufpr2021.herokuapp.com/api/v1/pedidos/'
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  inserirPedido(order: {}): Observable<{}> {
    return this.httpClient.post<[{}]>(this.BASE_URL, JSON.stringify(order), this.httpOptions)
  }

  converteProdutosEmItensDoPedido(produtos: Produto[], idCliente: string): ItensDoPedido[]{
    let produtosPedido: ItensDoPedido[] = []
    produtos.forEach(produto => {
      let item: ItensDoPedido = { idCliente: idCliente, produto: produto, quantidade: 0 }
      produtosPedido.push(item)
    });
    return produtosPedido
  }

  listarPedidosCPF(cpf: string): Observable<Pedidos[]> {
    return this.httpClient.get<Pedidos[]>(`${this.BASE_URL}ClienteCpf/${cpf}`, this.httpOptions);
  }

  listarItensPedido(idPedido: number): Observable<{}> {
    return this.httpClient.get<{}>(this.BASE_URL + idPedido, this.httpOptions);
  }

}


