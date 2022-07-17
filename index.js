// import Card from './card.js';

import CardsList from './cards-list.js';
import Pagination from './pagination.js';

const BACKEND_URL = "https://online-store.bootcamp.place/api/"
export default class OnlineStorePage {
  constructor () {
    this.pageSize = 9;
    this.products = [];

    this.url = new URL ('products', BACKEND_URL);
    this.url.searchParams.set('_limit', this.pageSize);
    // this.products = products;
    this.components = {};

    this.initComponents ();
    this.render ();
    this.renderComponents();

    this.initEventListeners();
    this.update(1);
  }

  async loadData (pageNumber) {
    this.url.searchParams.set('_page', pageNumber);

  //  const response = await fetch(`https://online-store.bootcamp.place/api/products?_page=${pageNumber}&_limit=${this.pageSize}`)
const response = await fetch(this.url);
const products = await response.json();

  return products;
  // .then(response => response.json())
  // .then(products => {
  //   console.log (products);
  //   });
  }

  getTempLate () {
    return `
    <div>
    <div data-element="cardsList">
    <!--Cards List component-->
    </div>
    <div data-element="pagination">
    <!--Pagination-->
    </div>
    </div>
    `;
  }

initComponents () {

  // const totalPages = 20;

  const totalElements = 100;
  const totalPages = Math.ceil(totalElements / this.pageSize)

  const cardList = new CardsList (this.products);
  const pagination = new Pagination ({
  activePageIndex: 0,
  totalPages
  });

  this.components.cardList = cardList;
  this.components.pagination = pagination;

}

renderComponents () {
  const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
  const paginationContainer = this.element.querySelector('[data-element="pagination"]');

  cardsContainer.append(this.components.cardList.element);
  paginationContainer.append(this.components.pagination.element);

}

render () {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = this.getTempLate();

  this.element = wrapper.firstElementChild;
}

initEventListeners () {
  this.components.pagination.element.addEventListener ('page-changed', event => {
  const pageIndex = event.detail;
    // console.log (this.products.slice());
    this.update(pageIndex + 1);
  });
}

async update (pageNumber) {
  // const start = pageIndex * this.pageSize;
  // const end = start + this.pageSize;
  // const data = this.products.slice(start, end);

  const data = await this.loadData(pageNumber);

  this.components.cardList.update(data);
  }
}
