import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PedidoService } from './pedido.service';

describe('PedidoService', () => {
  let service: PedidoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(PedidoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Teste se o serviço é criado', () => {
    expect(service).toBeTruthy();
  });
  
  it('Teste se na requisição POST, o retorno do Observable coincide com o mock', () => {  
    const mockPedido = {
      id: 1,
      data: '2020-06-01',
      cliente: 'Cliente 1',
      valorTotal: 100,
      itens: [
        {
          id: 1,
          produto: 'Produto 1',
          valorUnitario: 10,
          quantidade: 1,
        },
      ],
    };
  
    service.inserirPedido(mockPedido).subscribe((data) => {
      expect(data).toEqual(mockPedido);
    });
  
    const requisicao = httpTestingController.expectOne(
      'https://apiufpr2021.herokuapp.com/api/v1/pedidos',
    );
    expect(requisicao.request.method).toEqual('POST');
    requisicao.flush(mockPedido);
  });
  
  it('converteProdutosEmItensDoPedido(produto, idCliente) deve retornar ItensDoPedido', () => {
    const produto = [{
      id: 1,
      descricao: 'Produto 1',
    }];
    
    const idCliente = '1';
    const produtosPedido = service.converteProdutosEmItensDoPedido(produto, idCliente);
    expect(produtosPedido).toEqual([{
      idCliente: '1',
      produto: {
        id: 1,
        descricao: 'Produto 1',
      },
      quantidade: 0,
    }]);
  })
})