const cart = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');
// const all = document.querySelector('.container');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const saveCart = () => {
  const array = [];
  for (let index = 0; index < cart.children.length; index += 1) {
    const obj = {
      text: cart.children[index].innerText,
    };
    array.push(obj);
  }
  saveCartItems(JSON.stringify(array));
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
  saveCart();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const loading = () => {
  const load = document.createElement('h1');
  load.classList.add('loading');
  load.innerText = 'carregando...';
  cart.appendChild(load);
};

const removeLoad = () => document.querySelector('.loading').remove();

const addItens = async (event) => {
  loading();
  const id = event.target.parentNode.firstChild.innerText;
  const request = await fetchItem(id);
  const obj = {
    sku: request.id,
    name: request.title,
    salePrice: request.price,
  };
  const result = createCartItemElement(obj);
  cart.appendChild(result);
  removeLoad();
  saveCart();
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

const getListCart = () => {
  const itens = getSavedCartItems();
  console.log(itens);
  if (!itens) return 'test';
  for (let i = 0; i < itens.length; i += 1) {
    const nli = document.createElement('li');
    nli.innerText = itens[i].text;
    nli.id = itens[i].id;
    console.log(nli);
    cart.appendChild(nli);
    nli.addEventListener('click', cartItemClickListener);
  }
};

const clearCart = () => {
  localStorage.clear();
  cart.innerHTML = '';
};

btnClear.addEventListener('click', clearCart);

window.onload = () => { 
  getListCart();
  requestProducts();
};