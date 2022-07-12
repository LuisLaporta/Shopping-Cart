require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Verifica se é uma function', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });
  
  it('Verifica se fetch é chamado', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Verifica se o retorno da função é igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const actual = await fetchItem('MLB1615760527');

    expect(actual).toEqual(item);
  });

  it('Verifica se retorna o erro "You must provide an url" ao chamar a função sem parametro', async () => {
    expect.assertions(1);

    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
