export default class Pagination {
    // totalPages = 12;
    
    constructor ({
      activePageIndex = 0,
      totalPages = 0
    } = {}) {
    
        this.activePageIndex = activePageIndex;
        this.totalPages = totalPages;
        this.render();
        this.addEventListeners();
        // this.dispatchEvent();
      }
    
    getTempLate () {
      return `
    
      <nav class="wrapper-pagination">
      <div class="page-back general-pages" data-element="nav-prev"> < </div>
      ${this.getPages()}
      <div class="page-forvard general-pages" data-element="nav-next"> > </div>
      </nav>
      `;
    }
    
      getPages () {
        return`
      <div class="pages" data-element="pagination">
      ${new Array(this.totalPages).fill(1).map((item, index) => {
        return this.getPageTemplate(index);
      }).join('')}
      </div>
        `;
      }
    
      getPageTemplate (pageIndex = 0) {
    
      const isActive = pageIndex === this.activePageIndex ? 'active' : '';
    
      return `
      <div data-element="page-link"
      class="page-1 general-pages ${isActive}"
      data-page-index="${pageIndex}">
      ${pageIndex + 1}
      </div>
      `;
    }
    
      setPage (pageIndex = 0) {
    
        if (pageIndex === this.activePageIndex) return;
        if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;
    
        this.dispatchEvent (pageIndex);
    
        const activePage = this.element.querySelector('.general-pages.active');
    
        if (activePage) {
          activePage.classList.remove('active');
        }
    
        const nextActivePage = this.element.querySelector(`[data-page-index="${pageIndex}"]`);
    
        if (nextActivePage) {
          nextActivePage.classList.add('active');
        }
    
        this.activePageIndex = pageIndex;
      }
    
    nextPage () {
      const nextPageIndex = this.activePageIndex + 1;
      this.setPage (nextPageIndex);
    }
    
    prevPage () {
      const prevPageIndex = this.activePageIndex - 1;
      this.setPage (prevPageIndex);
    }
    
    
    render () {
        const wrapper = document.createElement('div');
    
        wrapper.innerHTML = this.getTempLate();
    
        this.element = wrapper;
      }
    
    addEventListeners() {
      const prevPageBtn = this.element.querySelector ('[data-element="nav-prev"]');
      const nextPageBtn = this.element.querySelector ('[data-element="nav-next"]');
      const pagesList = this.element.querySelector ('[data-element="pagination"]');
    
      prevPageBtn.addEventListener('click', () => {
        this.prevPage ();
      });
    
      nextPageBtn.addEventListener('click', () => {
        this.nextPage ();
      });
    
      pagesList.addEventListener('click', event => {
        const pageItem = event.target.closest('.general-pages') ;
    
        if (!pageItem) return;
        const { pageIndex } = pageItem.dataset;
        this.setPage(parseInt(pageIndex, 10));
      });
      }
    
    dispatchEvent (pageIndex) {
      const customEvent = new CustomEvent ('page-changed', {
        detail: pageIndex
      });
      this.element.dispatchEvent(customEvent);
      }
    }
    
    
    