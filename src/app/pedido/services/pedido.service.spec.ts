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
  
  it('inserirPedido POST retorna dados igual ao mock', () => {      
    const mockPedido = {
      data: '2020-06-01',
      idCliente: 'Cliente 1',
      itensDoPedido: [
        {
          idCliente: 1,
          produto: {
            descricao: "Produto 1",
            id: 1
          },
          quantidade: 2,
        },
      ],
    };
    
    service.inserirPedido(mockPedido).subscribe((data) => {
      expect(data).toEqual(mockPedido);
    });
  
    const requisicao = httpTestingController.expectOne(
      'https://apiufpr2021.herokuapp.com/api/v1/pedidos/',
    );
    expect(requisicao.request.method).toEqual('POST');
    requisicao.flush(mockPedido);
  });
  
  it('converteProdutosEmItensDoPedido(produto, idCliente) deve retornar uma lista vazia', () => {
    const produto: [] = [];
    const idCliente = '1';
    const produtosPedido = service.converteProdutosEmItensDoPedido(produto, idCliente);
    
    expect(produtosPedido).toEqual([]);
  })

  it('converteProdutosEmItensDoPedido(produto, idCliente) deve retornar uma lista com um item', () => {
    const produto = [{
      id: 1,
      nome: 'Produto 1',
    }]
    const idCliente = '1';
    const produtosPedido = service.converteProdutosEmItensDoPedido(produto, idCliente);
    expect(produtosPedido.length).toEqual(1);
  })

  it('converteProdutosEmItensDoPedido(produto, idCliente) deve retornar as chaves de ItensDoPedido', () => {
    const produto = [{
      id: 1,
      nome: 'Produto 1',
    }]
    const idCliente = '1';
    const produtosPedido = service.converteProdutosEmItensDoPedido(produto, idCliente);
    expect(Object.keys(produtosPedido[0])).toEqual(['idCliente', 'produto', 'quantidade']);
  })

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

  it('converteProdutosEmItensDoPedido(produto, idCliente) deve retornar ItensDoPedido com quantidade igual a zero', () => {
    const produto = [{
      id: 1,
      descricao: 'Produto 1',
    }];
    const idCliente = '1';
    const produtosPedido = service.converteProdutosEmItensDoPedido(produto, idCliente);
    
    expect(produtosPedido[0].quantidade).toEqual(0);
  })

  it('listarPedidosCPF(cpf) deve retornar dados iguais aos do mock.', () => {
    const mockPedidos = [
      {
        idPedido: 1,
        data: '2020-06-01',
        cliente: {
          cpf: "074.628.912-79",
          nome: "Cliente 1",
          sobreNome: "Cliente",
          id: 1,
        },
        itensDoPedido: [
          {
            idItemDoPedido: 81,
            quantidade: 3,
            idCliente: "1",
            produto: {
              descricao: "Borracha",
              id: 5
            }
          }
        ]
      },
    ];
    const cpf = '07345678901';
    service.listarPedidosCPF(cpf).subscribe((data) => {
      expect(data).toEqual(mockPedidos);
    })
    const requisicao = httpTestingController.expectOne(
      `https://apiufpr2021.herokuapp.com/api/v1/pedidos/ClienteCpf/${cpf}`,
    )
    expect(requisicao.request.method).toEqual('GET')
    requisicao.flush(mockPedidos)
  })

  it('listarItensPedido(idPedido) deve retornar dados iguais aos do mock', () => {
    const mockItens = {
      idPedido: 62,
      data: "2021-11-11 20:26:8",
      cliente: {
        cpf: "071.218.839-88",
        nome: "Jorge",
        sobreNome: "Hernandes",
        id: 1
      },
      itensDoPedido: [
        {
          idItemDoPedido: 81,
          quantidade: 3,
          idCliente: "1",
          produto: {
            descricao: "Borracha",
            id: 5
          }
        }
      ]
    }
    const idPedido = 62;
    service.listarItensPedido(idPedido).subscribe((data) => {
      expect(data).toEqual(mockItens);
    })
    const requisicao = httpTestingController.expectOne(
      `https://apiufpr2021.herokuapp.com/api/v1/pedidos/${idPedido}`,
    )
    expect(requisicao.request.method).toEqual('GET')
    requisicao.flush(mockItens)
  })
})

