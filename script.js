// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchItem } = require('./helpers/fetchItem');

const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addItens = async (e) => {
  const id = e.target.parentNode.firstChild.innerText;
  const request = await fetchItem(id);
  const obj = {
    sku: request.id,
    name: request.title,
    salePrice: request.price,
  };

  cart.appendChild(createCartItemElement(obj));
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', addItens);

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(btn);

  return section;
};

const requestProducts = async () => {
  const request = await fetchProducts('computador');
  const section = document.querySelector('.items');

  request.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const obj = { sku, name, image };
    const result = createProductItemElement(obj);
    section.appendChild(result);
  });
};

window.onload = () => { 
  requestProducts();
  addItens();
};
