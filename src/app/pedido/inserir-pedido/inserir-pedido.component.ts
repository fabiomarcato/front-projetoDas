import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ProdutoService } from '../../produto/services/produto.service';
import { PedidoService } from '../services/pedido.service';
import { Pedidos } from '../../shared/models/pedidos.model';
import { Produto } from '../../shared/models/produto.model';
import { ItensDoPedido } from '../../shared/models/pedidos.model';

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
    
  }

  buscarProdutos(){
    this.produtoService.listarTodos().subscribe(
      (produtos) => {
        if(produtos){
          this.produtos = produtos
        } else{
          this.message = 'Nenhum produto encontrado!'
        }
      },
      (error) => {console.log(error)},
      () => {this.listarProdutos()} 
    )
  }

  listarDataAtual(){
    let agora = new Date()
    let dataAtual = `${agora.getFullYear()}-${(agora.getMonth() + 1)}-${agora.getDate()} ${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`
    return dataAtual
  }

  listarProdutos(){
    this.produtosPedido = this.pedidoService.converteProdutosEmProdutosPedido(this.produtos, this.cliente.id.toString())
  }

  buscarCpf(cpf: string): void{
    this.clienteService.buscaPorCpf(cpf).subscribe(
      (clientes) => {
        if(clientes){
          clientes.forEach((cliente) => this.cliente = cliente)
          this.message = null
          this.buscarProdutos()
        } else{
          this.message = 'Cliente não encontrado!'
        }
      },
      (error) => {console.log(error)},
    )
  }
  
  pedidoValido(){
    let pedidoValido = false
    const quantidadeMaiorQueZero = (produto: any) => produto.quantidade > 0
    
    if (this.produtosPedido.some(quantidadeMaiorQueZero)){
      pedidoValido = true
    }
    return pedidoValido
  }
  
  converteDadosParaPedido(){
    const quantidadeMaiorQueZero = (produto: any) => produto.quantidade > 0
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
      data: this.listarDataAtual(), 
      idCliente: products[0].idCliente?.toString(), 
      itensDoPedido: itens
    }
  }

  inserirNovoPedido(){
    if(this.pedidoValido()){
      this.message = null
      this.converteDadosParaPedido()
      this.pedidoService.inserirPedido(this.pedido).subscribe(
        (pedido) => {
          if(pedido){
            this.message = 'Pedido inserido com sucesso!'
            this.formNovoPedido.reset()
            this.produtosPedido = []
            this.router.navigate([""])
          }
        },
        (error) => {console.log(error)}
      )      
    }else{
      this.message = 'Nenhum produto adicionado ao pedido.'
    }
  }
} 
