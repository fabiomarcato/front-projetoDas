import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProdutoService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let produtoService: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    produtoService = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(produtoService).toBeTruthy();
  });

  it('Deve retornar a quantidade de produtos (Um request do HttpClient)', (done: DoneFn) => {
    const expectedProducts: Produto[] = [{descricao: 'A', id: 12}];

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    produtoService.listarTodos().subscribe(
      (produtos: Produto[]) => 
      {
        expect(produtos.length).toEqual(1);
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
