import { Injectable } from '@angular/core';
import { Pedidos, ProdutosPedido } from '../../shared/models/pedidos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_CHAVE_PEDIDOS: string ="pedidos";
const LS_CHAVE_PRODUTOS_PEDIDO: string ="produtosPedido";


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }
  //BASE_URL = 'http://localhost:8080/api/v1/clientes/cpf/071.218.839-88'
  BASE_URL = 'http://localhost:8080/api/v1/clientes/cpf/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  metodoTeste(): Observable<[]>{
    return this.httpClient.get<[]>(this.BASE_URL, this.httpOptions)
  }

  listarTodosPedidos(): Pedidos[]{
    const pedidos = localStorage[LS_CHAVE_PEDIDOS];
    return pedidos ? JSON.parse(pedidos) : [];
  }
  
  inserirPedido(pedido: Pedidos): void{
    const pedidos = this.listarTodosPedidos();
    pedidos.push(pedido);
    localStorage[LS_CHAVE_PEDIDOS] = JSON.stringify(pedidos);
  }
  
  listarTodosProdutosPedido(): ProdutosPedido[]{
    const produtos = localStorage[LS_CHAVE_PRODUTOS_PEDIDO];
    return produtos ? JSON.parse(produtos) : [];
  }

  inserirProdutosPedido(produto: ProdutosPedido): void{
    const produtos = this.listarTodosProdutosPedido();
    produtos.push(produto);
    localStorage[LS_CHAVE_PRODUTOS_PEDIDO] = JSON.stringify(produtos);
  }

  buscarProdutosPedidoPorId(idProdutos: number): any{
    const produtos: ProdutosPedido[] = this.listarTodosProdutosPedido();
    return produtos.find(produto => produto.idProdutosPedido === idProdutos);
  }
}


