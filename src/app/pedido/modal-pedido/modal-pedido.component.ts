import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedidos } from 'src/app/shared/models/pedidos.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.css']
})
export class ModalPedidoComponent implements OnInit {
  @Input() pedido!: Pedidos;
  itensDoPedido!: any;

  constructor(public activeModal: NgbActiveModal, public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.listarItensPedido(this.pedido.idPedido!).subscribe((data) => {
      this.itensDoPedido = data;
      this.itensDoPedido = this.itensDoPedido['itensDoPedido'];
    })
  }
}
