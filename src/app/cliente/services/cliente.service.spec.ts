import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Cliente } from 'src/app/shared/models/cliente.model';
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

  it('listarTodos() GET - Deve retornar uma lista com 0 clientes', () => {
    const mockClientes: Cliente[] = [];
    clienteService.listarTodos().subscribe((produtos: Cliente[]) => {
      expect(produtos.length).toEqual(0);
    })
    const req = httpTestingController.expectOne('https://apiufpr2021.herokuapp.com/api/v1/clientes/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockClientes);
  });

  it('listarTodos() GET - Deve retornar uma lista com 1 cliente', () => {
    const mockCliente: Cliente[] = [
      {
        "cpf": "04210691631",
        "nome": "Fabio",
        "sobreNome": "Marcato",
        "id": 32
      }
    ];
    clienteService.listarTodos().subscribe((clientes: Cliente[]) => {
      expect(clientes.length).toEqual(1);
      expect(clientes[0].cpf).toEqual('04210691631');
      expect(clientes[0].nome).toEqual('Fabio');
      expect(clientes[0].sobreNome).toEqual('Marcato');
      expect(clientes[0].id).toEqual(32);
    });
    const req = httpTestingController.expectOne('https://apiufpr2021.herokuapp.com/api/v1/clientes/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCliente);
  });

  it('listarTodos() GET - Deve retornar uma lista com n clientes', () => {
    const mockClientes: Cliente[] = [
      {
        "cpf": "04210691631",
        "nome": "Fabio",
        "sobreNome": "Marcato",
        "id": 32
      },
      {
        "cpf": "855.594.509-79",
        "nome": "Marcello",
        "sobreNome": "Ribeiro",
        "id": 16
      },
      {
        "cpf": "483.465.200-93",
        "nome": "Edson",
        "sobreNome": "Junior",
        "id": 40
      }
    ];
    clienteService.listarTodos().subscribe((cliente: Cliente[]) => {
      expect(cliente.length).toEqual(3);
      expect(cliente[0].cpf).toEqual("04210691631");
      expect(cliente[0].nome).toEqual('Fabio');
      expect(cliente[0].sobreNome).toEqual('Marcato');
      expect(cliente[1].cpf).toEqual("855.594.509-79");
      expect(cliente[1].nome).toEqual("Marcello");
      expect(cliente[1].sobreNome).toEqual("Ribeiro");
      expect(cliente[2].cpf).toEqual("483.465.200-93");
      expect(cliente[2].nome).toEqual("Edson");
      expect(cliente[2].sobreNome).toEqual("Junior");
    })
    const req = httpTestingController.expectOne('https://apiufpr2021.herokuapp.com/api/v1/clientes/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockClientes);
  });

  it('inserir(cliente: Cliente) POST - Retorna dados iguais aos mock', () => {
    const mockCliente = {
      "cpf": "04210691631",
      "nome": "Fabio",
      "sobreNome": "Marcato",
      "id": 32
    };
    clienteService.inserir(mockCliente).subscribe((cliente) => {
      expect(cliente).toEqual(mockCliente);
    });
    const requisicao = httpTestingController.expectOne(
      'https://apiufpr2021.herokuapp.com/api/v1/clientes/',
    );
    expect(requisicao.request.method).toEqual('POST');
    requisicao.flush(mockCliente);
  });

  it('atualizar(cliente) PUT - Deve atualizar um cliente', () => {
    const mockCliente: Cliente =
    {
      "cpf": "04210691631",
      "nome": "Fabio2",
      "sobreNome": "Marcato",
      "id": 32
    }

    clienteService.atualizar(mockCliente).subscribe((cliente) => {
      expect(cliente.cpf).toEqual("04210691631");
      expect(cliente.nome).toEqual("Fabio2");
      expect(cliente.sobreNome).toEqual("Marcato");
    })
    const req = httpTestingController.expectOne('https://apiufpr2021.herokuapp.com/api/v1/clientes/' + mockCliente.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockCliente);
  });

  it('remover(cliente.id) DELETE - Deve remover um cliente', () => {
    let mockCliente: Cliente =
    {
      "cpf": "04210691631",
      "nome": "Fabio2",
      "sobreNome": "Marcato",
      "id": 32
    }

    clienteService.remover(mockCliente.id!).subscribe((cliente) => {
      expect(cliente).toBeNull;

    });
    const req = httpTestingController.expectOne('https://apiufpr2021.herokuapp.com/api/v1/clientes/' + mockCliente.id);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockCliente);
  });


})
