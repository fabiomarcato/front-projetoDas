import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ProdutoService } from '../../produto/services/produto.service';
import { PedidoService } from '../services/pedido.service';
import { Pedidos } from '../../shared/models/pedidos.model';
import { Produto } from '../../shared/models/produto.model';
import { Cliente } from '../../shared/models/cliente.model';
import { ItensDoPedido } from '../../shared/models/pedidos.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inserir-pedido',
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css']
})
export class InserirPedidoComponent implements OnInit {

  pedido!: Pedidos
  cliente!: Cliente
  produtosPedido: ItensDoPedido[] = []
  message!: string | null
  link!: string | null
  produtos!: Produto[]
  
  @ViewChild('formNovoPedido') formNovoPedido!: NgForm

  constructor(
    private pedidoService: PedidoService, 
    private clienteService: ClienteService, 
    private produtoService: ProdutoService, 
  ) { }

  ngOnInit(): void {
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
      (erro) => this.mostrarErro(erro),
    )
  }

  mostrarErro(erro: { error: { Erro: any; }; }){
    erro.error.Erro == undefined? alert('Insira um CPF'):alert(erro.error.Erro);
  }

  buscarProdutos(){
    this.produtoService.listarTodos().subscribe(
      {
        next: (produtos) => {
          if(produtos){
            this.produtos = produtos
          } else{
            this.message = 'Nenhum produto encontrado!'
          }
        },
        complete: () => this.listarProdutos()
      }
    )
  }

  listarProdutos(){
    this.produtosPedido = this.pedidoService.converteProdutosEmItensDoPedido(this.produtos, this.cliente.id!.toString())
  }
    
  inserirNovoPedido(){
    if(this.pedidoValido()){
      this.message = null
      this.converteDadosParaPedido()
      this.pedidoService.inserirPedido(this.pedido).subscribe(
        (pedido) => {
          if(pedido){
            this.message = 'Pedido inserido com sucesso!'
            this.link = "/"
            this.produtosPedido = []
          }
        }
      )      
    }else{
      this.message = 'Nenhum produto adicionado ao pedido.'
    }
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
    const quantidadeMaiorQueZero = (produto: ItensDoPedido) => produto.quantidade! > 0
    let produtos = this.produtosPedido.filter(quantidadeMaiorQueZero)
    let itens = []
    for (let produto of produtos){
      itens.push(
        {
          idCliente:produto.idCliente, 
          produto:produto.produto, 
          quantidade:produto.quantidade
        }
      )
    }
    this.pedido = {
      data: this.listarDataAtual(), 
      idCliente: produtos[0].idCliente?.toString(), 
      itensDoPedido: itens
    }
  }
  
  listarDataAtual(){
    let agora = new Date()
    let dataAtual = `${agora.getFullYear()}-${(agora.getMonth() + 1)}-${agora.getDate()} ${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`
    return dataAtual
  }
} 


