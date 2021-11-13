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
  itensDoPedido!: Pedidos[];


  constructor(public activeModal: NgbActiveModal, public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.listarItensPedido(this.pedido.idPedido!).subscribe((data) => {
      this.itensDoPedido = data;
      console.log(this.itensDoPedido);
    });
  }
}
