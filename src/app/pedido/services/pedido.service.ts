import { Injectable } from '@angular/core';
import { Pedidos, ProdutosPedido } from '../../shared/models/pedidos.model';

const LS_CHAVE_PEDIDOS: string ="pedidos";
const LS_CHAVE_PRODUTOS_PEDIDO: string ="produtosPedido";


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }
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

  buscarPedidosPorCliente(idCliente: number): Pedidos []{
    const pedidos: Pedidos[] = this.listarTodosPedidos();
    return pedidos.filter(pedido => pedido.idCliente === idCliente);
  }

  remover(id:number): void {
      let pedidos: Pedidos[] = this.listarTodosPedidos();
      pedidos = pedidos.filter(pedido => pedido.idPedido !== id);
      localStorage[LS_CHAVE_PEDIDOS] = JSON.stringify(pedidos);
    }

}


