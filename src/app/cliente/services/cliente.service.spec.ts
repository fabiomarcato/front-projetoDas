import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    clienteService = TestBed.inject(ClienteService);
  });

  it('Teste se o serviço deve ser criado', () => {
    expect(clienteService).toBeTruthy();
  });

  it('inserir(cliente: Cliente) - POST retorna dados iguais aos mock', () => {
    const mockCliente = {
      "cpf": "04210691631",
      "nome": "Fabio",
      "sobreNome": "Marcato",
      "id": 32
    };
    clienteService.inserir(mockCliente).subscribe((data) => {
      expect(data).toEqual(mockCliente);
    });
    const requisicao = httpTestingController.expectOne(
      'https://apiufpr2021.herokuapp.com/api/v1/clientes/',
    );
    expect(requisicao.request.method).toEqual('POST');
    requisicao.flush(mockCliente);
  });

  it('buscarPorID(id: number) - GET retorna dados iguais aos do mock', () => {
    const mockCliente = {
      "cpf": "04210691631",
      "nome": "Fabio",
      "sobreNome": "Marcato",
      "id": 32
    };
    const id = 32;
    clienteService.buscarPorID(id).subscribe((data) => {
      expect(data).toEqual(mockCliente);
    })
    const requisicao = httpTestingController.expectOne(
      `https://apiufpr2021.herokuapp.com/api/v1/clientes/${id}`,
    )
    expect(requisicao.request.method).toEqual('GET')
    requisicao.flush(mockCliente)
  })

})
