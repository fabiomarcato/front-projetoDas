import { Produto } from "./produto.model";

export class Pedidos {
  constructor(
    public data?: string,
    public idCliente?: string,
    public idPedido?: number,
    public itensDoPedido?: ItensDoPedido[]
  ) {}
}

export class ItensDoPedido {
  constructor(
    public idCliente?: string,
    public idItemDoPedido?: number,
    public produto?: Produto,
    public quantidade?: number
  ) {}
}

