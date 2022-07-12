require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma function', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  });
  
  it('Verifica se fetch é chamado', async () => {
    expect.assertions(1);
    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se o retorno da função fetchProducts é igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const actual = await fetchProducts('computador');

    expect(actual).toEqual(computadorSearch);
  });

  it('Verifica se retorna o erro "You must provide an url" ao chamar a função sem parametro', async () => {
    expect.assertions(1);

    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
