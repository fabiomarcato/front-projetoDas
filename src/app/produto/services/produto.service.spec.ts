import { TestBed } from '@angular/core/testing';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let httpTestingController: HttpTestingController;
let produtoService: ProdutoService;
const BASE_URL = 'https://apiufpr2021.herokuapp.com/api/v1/produtos/'


describe('Serviço de produtos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    produtoService = TestBed.inject(ProdutoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('Serviço de produtos é criado', () => {
    expect(produtoService).toBeTruthy();
  });
  
  it('Deve retornar uma lista com 0 produtos', () => {
    const mockProdutos: Produto[] = [];
    produtoService.listarTodos().subscribe((produtos: Produto[]) => {
      expect(produtos.length).toEqual(0);
    })
    const req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProdutos);
  });
  
  it('Deve retornar uma lista com 1 produto', () => {
    const mockProdutos: Produto[] = [
      {
        "descricao": "Caderno",
        "id": 1
      }
    ];
    produtoService.listarTodos().subscribe((produtos: Produto[]) => {
      expect(produtos.length).toEqual(1);
      expect(produtos[0].descricao).toEqual('Caderno');
      expect(produtos[0].id).toEqual(1);
    });
    const req = httpTestingController.expectOne(BASE_URL);
    req.flush(mockProdutos);
  });
  
  it('Deve retornar uma lista com 2 produtos', () => {
    const mockProdutos: Produto[] = [
      {
        "descricao": "Caderno",
        "id": 1
      },
      {
        "descricao": "Lápis de cor",
        "id": 2
      }
    ];
    produtoService.listarTodos().subscribe((produtos: Produto[]) => {
      expect(produtos.length).toEqual(2);
      expect(produtos[0].descricao).toEqual('Caderno');
      expect(produtos[0].id).toEqual(1);
      expect(produtos[1].descricao).toEqual('Lápis de cor');
      expect(produtos[1].id).toEqual(2);
    })
    const req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProdutos);
  });
  
  it('Deve retornar uma lista com vários produtos', () => {
    const mockProdutos: Produto[] = [
      {
        "descricao": "Caderno",
        "id": 1
      },
      {
        "descricao": "Lápis de cor",
        "id": 2
      },
      {
        "descricao": "Caneta",
        "id": 3
      },
      {
        "descricao": "Apontador",
        "id": 4
      },
      {
        "descricao": "Giz de cera",
        "id": 5
      },
      {
        "descricao": "Marcador de texto",
        "id": 6
      },
      {
        "descricao": "Grampeador",
        "id": 7
      },
      {
        "descricao": "Caderno",
        "id": 8
      }
    ];
    produtoService.listarTodos().subscribe((produtos: Produto[]) => {
      expect(produtos.length).toEqual(8);
      expect(produtos[0].descricao).toEqual('Caderno');
      expect(produtos[0].id).toEqual(1);
      expect(produtos[1].descricao).toEqual('Lápis de cor');
      expect(produtos[1].id).toEqual(2);
      expect(produtos[2].descricao).toEqual('Caneta');
      expect(produtos[2].id).toEqual(3);
      expect(produtos[3].descricao).toEqual('Apontador');
      expect(produtos[3].id).toEqual(4);
      expect(produtos[4].descricao).toEqual('Giz de cera');
      expect(produtos[4].id).toEqual(5);
      expect(produtos[5].descricao).toEqual('Marcador de texto');
      expect(produtos[5].id).toEqual(6);
      expect(produtos[6].descricao).toEqual('Grampeador');
      expect(produtos[6].id).toEqual(7);
      expect(produtos[7].descricao).toEqual('Caderno');
      expect(produtos[7].id).toEqual(8);
    })
    const req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProdutos);
  });

  it('Deve inserir 1 produto na lista vazia', () => {
    const novoProduto: Produto =
    {
      "descricao": "Caderno",
      "id": 1
    };

    produtoService.inserir(novoProduto).subscribe((produto) => {
      expect(produto).toEqual(novoProduto);

    })
    const req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('POST');
    req.flush(novoProduto);
  });

  it('Deve inserir um produto após o outro', () => {
    let novoProduto: Produto =
    {
      "descricao": "Caderno",
      "id": 1
    };

    produtoService.inserir(novoProduto).subscribe((produto) => {
      expect(produto.descricao).toEqual('Caderno');
      expect(produto.id).toEqual(1);
    });

    let req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('POST');
    req.flush(novoProduto);

    novoProduto =
    {
      "descricao": "Caneta",
      "id": 2
    };

    produtoService.inserir(novoProduto).subscribe((produto) => {
      expect(produto.descricao).toEqual('Caneta');
      expect(produto.id).toEqual(2);
    });

    req = httpTestingController.expectOne(BASE_URL);
    expect(req.request.method).toEqual('POST');
    req.flush(novoProduto);
  });

  it('Deve editar a descrição de um produto', () => {
    const produtoEditado: Produto =
    {
      "descricao": "Caderno de 10 matérias",
      "id": 1
    }

    produtoService.atualizar(produtoEditado).subscribe((produto) => {
      expect(produto.descricao).toEqual('Caderno de 10 matérias');

    })
    const req = httpTestingController.expectOne(BASE_URL + produtoEditado.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(produtoEditado);
  });

  it('Deve editar a descrição de um produto após o outro', () => {
    let produtoEditado: Produto =
    {
      "descricao": "Caderno de 100 matérias",
      "id": 1
    }

    produtoService.atualizar(produtoEditado).subscribe((produto) => {
      expect(produto.descricao).toEqual('Caderno de 100 matérias');

    })
    let req = httpTestingController.expectOne(BASE_URL + produtoEditado.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(produtoEditado);

    produtoEditado =
    {
      "descricao": "Caderno de 5 matérias",
      "id": 2
    }

    produtoService.atualizar(produtoEditado).subscribe((produto) => {
      expect(produto.descricao).toEqual('Caderno de 5 matérias');

    })
    req = httpTestingController.expectOne(BASE_URL + produtoEditado.id);
    expect(req.request.method).toEqual('PUT');
    req.flush(produtoEditado);
  });

  it('Deve remover um produto', () => {
    const produtoRemovido: Produto =
    {
      "descricao": "Caderno de 10 matérias",
      "id": 1
    }

    produtoService.remover(produtoRemovido.id!).subscribe((produto) => {
      expect(produto).toBeNull;

    });
    const req = httpTestingController.expectOne(BASE_URL + produtoRemovido.id);
    expect(req.request.method).toEqual('DELETE');
    req.flush(produtoRemovido);
  });

  it('Deve remover um produto após o outro', () => {
    let produtoRemovido: Produto =
    {
      "descricao": "Apontador de lápis",
      "id": 189
    }

    produtoService.remover(produtoRemovido.id!).subscribe((produto) => {
      expect(produto).toBeNull;
    });

    let req = httpTestingController.expectOne(BASE_URL + produtoRemovido.id);
    expect(req.request.method).toEqual('DELETE');
    req.flush(produtoRemovido);

    produtoService.remover(produtoRemovido.id!).subscribe((produto) => {
      expect(produto).toBeNull;
    });

    req = httpTestingController.expectOne(BASE_URL + produtoRemovido.id);
    expect(req.request.method).toEqual('DELETE');
    req.flush(produtoRemovido);
  });
});


