import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  @ViewChild('formProduto') formProduto!: NgForm;
  produto!: any;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.produtoService.buscarPorID(id);
    if (res !== undefined) {
    } else {
      throw new Error("Produto não encontrado: id = " + id);
    }
  }

  atualizar(): void {
    if (this.formProduto.form.valid) {
      this.produtoService.atualizar(this.produto);
      document.location.reload();
      }
  }

  closeModal(){
    this.activeModal.dismiss();
    document.location.reload();
}

}
