const cart = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');
const all = document.querySelector('.cart');
const cont = document.querySelector('.container');
const items = document.querySelector('.items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const saveCart = () => {
  const array = [];
  for (let index = 0; index < cart.children.length; index += 1) {
    const obj = cart.children[index].innerHTML;
    array.push(obj);
    saveCartItems(JSON.stringify(array));
  }
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
  all.insertBefore(load, btnClear);
};

const loading2 = () => {
  const load = document.createElement('span');
  load.classList.add('loading');
  load.innerText = 'carregando...';
  items.innerHTML = '';
  cont.insertBefore(load, items);
};

const removeLoad = () => document.querySelector('.loading').remove();

const getListCart = () => {
  const itens = getSavedCartItems();

  if (!itens) return 'test';
  if (itens) {
    for (let i = 0; i < itens.length; i += 1) {
      const nli = document.createElement('li');
      nli.innerText = itens[i];
      console.log(nli);
      cart.appendChild(nli);
      nli.addEventListener('click', cartItemClickListener);
    }
  }
};

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
  loading2();
  const request = await fetchProducts('computador');
  const section = document.querySelector('.items');

  request.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const obj = { sku, name, image };
    const result = createProductItemElement(obj);
    section.appendChild(result);
  });
  removeLoad();
};

const clearCart = () => {
  localStorage.clear();
  cart.innerHTML = '';
};

btnClear.addEventListener('click', clearCart);

window.onload = () => {
  requestProducts();
  getListCart();
};