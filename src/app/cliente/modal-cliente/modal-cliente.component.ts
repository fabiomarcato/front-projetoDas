import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css'],
})
export class ModalClienteComponent implements OnInit {
  @Input() cliente!: Cliente;

  constructor(public activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {}
}
