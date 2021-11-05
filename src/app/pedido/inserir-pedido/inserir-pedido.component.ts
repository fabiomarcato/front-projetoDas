import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ProdutoService } from '../../produto/services/produto.service';
import { PedidoService } from '../services/pedido.service';
import { Pedidos } from '../../shared/models/pedidos.model';
import { Produto } from '../../shared/models/produto.model';
import { ItensDoPedido } from '../../shared/models/pedidos.model';

import axios from 'axios';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inserir-pedido',
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css']
})
export class InserirPedidoComponent implements OnInit {

  pedido!: Pedidos
  cliente!: {cpf:string, nome:string, sobreNome:string, id:number}  
  produtosPedido: ItensDoPedido[] = []
  message!: string | null
  produtos!: Produto[]
  
  @ViewChild('formNovoPedido') formNovoPedido!: NgForm

  constructor(
    private pedidoService: PedidoService, 
    private clienteService: ClienteService, 
    private produtoService: ProdutoService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProdutos()
  }

  getProdutos(){
    this.produtoService.listarTodos().subscribe({
      next: (data) => {
        if(data){
          this.produtos = data
        } else{
          this.message = 'Nenhum produto encontrado!'
        }
      }, 
    })
  }

  getDataAtual(){
    let now = new Date()
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    return now
  }

  listarProdutos(){
    this.produtosPedido = this.pedidoService.converteProdutosEmProdutosPedido(this.produtos, this.cliente.id.toString())
  }

  buscarCpf(cpf: string): void{
    this.clienteService.buscaPorCpf(cpf).subscribe((data) => {
      if(data){
        data.forEach((x) => this.cliente = x)
        this.message = null
        this.listarProdutos()
      }
      else{
        this.message = 'Cliente não encontrado!'
      }
    })
  }
  
  inserirNovoPedido(){
    const quantidadeMaiorQueZero = (produto: any) => produto.quantidade > 0
    if (!this.produtosPedido.some(quantidadeMaiorQueZero)){
      this.message = 'Nenhum produto adicionado ao pedido.'
    }else{
      this.message = null
      let products = this.produtosPedido.filter(quantidadeMaiorQueZero)
      let itens = []
      for (let product of products){
        itens.push(
          {
            idCliente:product.idCliente, 
            produto:product.produto, 
            quantidade:product.quantidade
          }
        )
      }
      this.pedido = {
        data: '2021-10-20 10:15:15', 
        idCliente: products[0].idCliente?.toString(), 
        itensDoPedido: itens
      }
      //console.log(itens)
      //console.log(this.pedido)
      let dados1 = {
        "data": "2022-11-18 10:15:15",
        "idCliente": "1",
        "idPedido": 44,
        "itensDoPedido": [
          {
            "idCliente": "1",
            "idItemDoPedido": 26,
            "produto": {
              "descricao": "Fita adesiva",
              "id": 6
            },
            "quantidade": 111
          }
        ]
      }
      this.pedidoService.setOrder(this.pedido).subscribe()
      //this.router.navigate([""])
    }
  }
} 
