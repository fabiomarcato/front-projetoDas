export class Pedidos {
    constructor(
        public idPedido?: number,
        public idCliente?: number,
    ) {}
}

export class ProdutosPedido {
    constructor(
      public idProdutosPedido?: number,
      public idPedido?: number,  
      public nomeProduto?: String,
      public quantidade?: number,
    ) {}
  }
  