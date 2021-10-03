import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inserir-produto',
  templateUrl: './inserir-produto.component.html',
  styleUrls: ['./inserir-produto.component.css']
})
export class InserirProdutoComponent implements OnInit {
  @ViewChild('formProduto') formProduto! : NgForm;
  produto! : Produto;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.produto = new Produto();
  }

  inserir(): void{
    if(this.formProduto.form.valid) {
      this.produtoService.inserir(this.produto);
      document.location.reload();
    }
  }

  closeModal(){
    document.location.reload();
}
}
