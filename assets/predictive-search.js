class PredictiveSearch extends HTMLElement {
    constructor() {
      super();
  
      this.input = this.querySelector('input[type="search"]');
      this.predictiveSearchResults = this.querySelector('#predictive-search');
      this.input.addEventListener('click', () => {
        const searchTerm = this.input.value.trim();
        if(!searchTerm.length){
          this.showFeaturedBlogs()
        }
      })
      this.input.addEventListener('input', this.debounce((event) => {
        this.hideFeaturedBlogs()
        this.onChange(event);
      }, 300).bind(this));
    }
  
    showFeaturedBlogs(){
      let array_featured_blocks = this.querySelector('.array_featured_blogs .blog');
      let featuredBlocks = this.querySelector('#featured_blogs');
      featuredBlocks.innerHTML = `<p class="featured_blogs_title">Featured Blogs</p><div class="featured_blogs_content"></div>`
      console.log(array_featured_blocks.innerHTML.length);
      featuredBlocks.querySelector('.featured_blogs_content').innerHTML = array_featured_blocks.innerHTML;
      // for(let i = 0; i< array_featured_blocks.innerHTML.length; i++){
      //   featuredBlocks.querySelector('.featured_blogs_content').innerHTML = array_featured_blocks[i].innerHTML;
      //   }
      // this.querySelector('#featured_blogs').innerHTML = <div class="featured_blogs_content">${array_featured_blocks}</div>`
    }
    hideFeaturedBlogs(){
      this.querySelector('#featured_blogs').innerHTML = ''
    }

    onChange() {
      const searchTerm = this.input.value.trim();
  
      if (!searchTerm.length) {
        this.showFeaturedBlogs();
        this.close();
        return;
      }
      this.hideFeaturedBlogs();
      this.getSearchResults(searchTerm);
    }
  
    getSearchResults(searchTerm) {
      fetch(`/search/suggest?q=${searchTerm}&resources[type]=article&section_id=predictive-search`)
        .then((response) => {
          if (!response.ok) {
            var error = new Error(response.status);
            this.close();
            throw error;
          }
  
          return response.text();
        })
        .then((text) => {
          const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
          this.predictiveSearchResults.innerHTML = resultsMarkup;
          this.open();
        })
        .catch((error) => {
          this.close();
          throw error;
        });
    }
  
    open() {
      this.predictiveSearchResults.style.display = 'block';
    }
  
    close() {
      this.predictiveSearchResults.style.display = 'none';
    }
  
    debounce(fn, wait) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
      };
    }
  }
  
  customElements.define('predictive-search', PredictiveSearch);
  
