class PredictiveSearch extends HTMLElement {
    constructor() {
      super();
  
      this.input = this.querySelector('input[type="search"]');
      this.predictiveSearchResults = this.querySelector('#predictive-search');
      this.closeIcon = this.querySelector('.blog_search_close_icon');
      this.input.addEventListener('click', () => {
        this.input.closest('predictive-search').classList.add('search_open')
        const searchTerm = this.input.value.trim();
        document.querySelector('body').classList.add('search_open');
        if(!searchTerm.length){
          this.showFeaturedBlogs();
          this.querySelector('.search_icon').style.display = 'none';
          this.closeIcon.style.display = 'block';
        }
        
      })
      this.closeIcon.addEventListener('click', () => {
        this.hideFeaturedBlogs();
        this.querySelector('.search_icon').style.display = 'block';
        this.predictiveSearchResults.style.display = 'none';
        this.closeIcon.style.display = 'none';
        this.input.closest('predictive-search').classList.remove('search_open')
        document.querySelector('body').classList.remove('search_open');
        this.input.value = '';

      })
      this.input.addEventListener('input', this.debounce((event) => {
        this.hideFeaturedBlogs()
        this.onChange(event);
      }, 300).bind(this));
    }
  
    showFeaturedBlogs(){
      let array_featured_blocks = this.querySelector('.array_featured_blogs');
      let featuredBlocks = this.querySelector('#featured_blogs');
      featuredBlocks.innerHTML = `<p class="featured_blogs_title">Featured Blogs</p><div class="featured_blogs_content container"></div>`
      featuredBlocks.querySelector('.featured_blogs_content').innerHTML = array_featured_blocks.innerHTML;
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
          // document.querySelector('#search_results_blogs').setAttribute('href') = `/search/suggest?q=${searchTerm}&resources[type]=article&section_id=predictive-search`
    }
  
    getSearchResults(searchTerm) {
      fetch(`/search/suggest?q=${searchTerm}&resources[type]=article&section_id=predictive-search&_limit=6`)
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
          this.predictiveSearchResults.querySelector('#search_results_blogs').href = `/search?type=article&q=${searchTerm}&options%5Bprefix%5D=last`
          this.input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              window.location = `/search?type=article&q=${searchTerm}&options%5Bprefix%5D=last`
            }
          })
        })
        .catch((error) => {
          this.close();
          throw error;
        });
        
    }
    
    open() {
      this.predictiveSearchResults.style.display = 'flex';
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
  
