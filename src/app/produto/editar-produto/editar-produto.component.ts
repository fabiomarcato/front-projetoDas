import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { NgForm } from '@angular/forms';
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
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  atualizar(): void {
    if (this.formProduto.form.valid) {
      this.produtoService.atualizar(this.produto).subscribe(
        {
          complete: () => document.location.reload()
        }
      );
    }
  }

  fecharModal() {
    this.activeModal.dismiss();
    document.location.reload();
  }

}
