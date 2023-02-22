const cart = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');
const all = document.querySelector('.cart');
const cont = document.querySelector('.container');
const items = document.querySelector('.items');
const total = document.querySelector('.total-price');
const cartIcon = document.querySelector('.material-icons');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const totalPrice = () => {
  const array = [];
  for (let i = 0; i < cart.children.length; i += 1) {
    const inner = cart.children[i].innerText;
    const priceValue = inner.split('$');
    array.push(parseFloat(priceValue[1]));
  }

  const money = array.reduce((acc, curr) => acc + curr, 0);
  total.innerHTML = `$${money}`;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const removeItem = (sku) => {
  const savedItems = getSavedCartItems();
  const result = savedItems.filter((item) => item.sku !== sku);
  return result;
};

const removeBtn = (sku) => {
  const removeButton = createCustomElement('button', 'cart__item-remove', '');
  removeButton.id = sku;

  const iconLix = document.createElement('i');
  iconLix.classList.add('material-icons');
  iconLix.innerText = 'delete';
  removeButton.appendChild(iconLix);

  removeButton.addEventListener('click', (event) => {
    event.currentTarget.parentElement.remove();
    saveCartItems(removeItem(event.target.parentElement.id));
    totalPrice();
  });

  return removeButton;
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';

  const div = document.createElement('div');
  div.className = 'cart__item-image';

  const img = createProductImageElement(image);
  div.appendChild(img);
  li.appendChild(div);
  li.innerHTML += `SKU: ${sku}<br> ${name}<br>$${salePrice}`;

  const removeButton = removeBtn(sku);
  
  li.appendChild(removeButton);
  return li;
};

const loading = () => {
  const load = document.createElement('h1');
  load.classList.add('loading');
  load.innerText = 'carregando...';
  all.insertBefore(load, total);
};

const loading2 = () => {
  const load = document.createElement('span');
  load.classList.add('loading');
  load.innerText = 'carregando...';
  items.innerHTML = '';
  cont.insertBefore(load, items);
};

const removeLoad = () => document.querySelector('.loading').remove();

const saveCart = (obj) => {
  const savedItems = getSavedCartItems() || [];
  savedItems.push(obj);
  return savedItems;
};

const getListCart = () => {
  const savedItems = getSavedCartItems();
  for (let i = 0; i < savedItems.length; i += 1) {
    const result = createCartItemElement(savedItems[i]);
    cart.appendChild(result);
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
    image: request.thumbnail,
  };
  const result = createCartItemElement(obj);
  cart.appendChild(result);
  cartIcon.classList.add('added');
  setTimeout(function () {
    cartIcon.classList.remove('added');
  }, 500);
  removeLoad();
  saveCartItems(saveCart(obj));
  totalPrice();
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
  total.innerHTML = '';
};

btnClear.addEventListener('click', clearCart);

const totalPriceSave = () => {
  const values = getSavedCartItems();
  console.log(values);
  const array = [];
  if (values) {
    values.forEach((value) => {
      const priceIten = value.salePrice;
      array.push(parseFloat(priceIten));
    });
  }
  const money = array.reduce((acc, curr) => acc + curr, 0);
  total.innerHTML = `$${money}`;
};

window.onload = () => {
  requestProducts();
  getListCart();
  totalPriceSave();
};

// Commit final.