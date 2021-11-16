import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ClienteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Teste se na requisição POST, o retorno do Observable coincide com o mock', () => {
    const mockCliente = {
      "cpf": "071.218.839-88",
      "nome": "Jorge",
      "sobreNome": "Hernandes",
      "id": 1
    };

    service.inserir(mockCliente).subscribe((data) => {
      expect(data).toEqual(mockCliente);
    });

    const requisicao = httpTestingController.expectOne(
      'https://apiufpr2021.herokuapp.com/api/v1/clientes',
    );
    expect(requisicao.request.method).toEqual('POST');
    requisicao.flush(mockCliente);
  });


})
