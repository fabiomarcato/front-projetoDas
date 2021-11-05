import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ItensDoPedido } from 'src/app/shared/models/pedidos.model';
import { Pedidos } from 'src/app/shared/models/pedidos.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.css']
})
export class ModalPedidoComponent implements OnInit {
  @Input() pedido!: Pedidos;
  itensPedido!: ItensDoPedido[];

  constructor(public activeModal: NgbActiveModal, public pedidoService: PedidoService) { }

  ngOnInit(): void {
    //this.itensPedido = this.pedidoService.listarTodosProdutosPedido().filter(produtoPedido => produtoPedido.idPedido == this.pedido.idPedido);
  }
}
