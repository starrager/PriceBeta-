<template>
  <main class="home">
    <div class="ambient ambient-top"></div>
    <div class="ambient ambient-center"></div>
    <div class="ambient ambient-bottom"></div>
    <header class="header">
      <a href="#" class="logo" @click.prevent="router.push('/')">
        <span class="logo-mark">P</span>
        <span>PriceWatch</span>
      </a>
      <button class="login-button">Sign in</button>
    </header>
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">Price comparison</span>
        <h1>
          Find the best price.<br />
          <span>Don't overpay.</span>
        </h1>
        <p class="hero-description">
          Compare prices across popular stores, track price history and know
          when it's the right time to buy.
        </p>
        <div class="search-wrapper">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input v-model="input" type="text" placeholder="What are you looking for?" @input="onSearchInput" @keyup.enter="searchProduct" />
            <button class="search-button" :disabled="loading" @click="searchProduct">
              {{ loading ? 'Searching...' : 'Search' }}
            </button>
          </div>
          <p class="search-hint">Try: iPhone 17 Pro, Sony WH-1000XM6, RTX 5070</p>
          <div v-if="results.length" class="search-results">
            <div v-for="(item, index) in results" :key="item.id || index" class="search-result-item" @click="openProduct(item.pageurl || item.url)">
              <div class="result-left">
                <img v-if="item.product?.img" :src="item.product.img" alt="" class="result-image" @error="(e) => (e.target.style.display = 'none')" />
                <div class="result-info">
                  <span class="result-name" v-html="item.highlight || item.product?.title || item.title || item.name"></span>
                  <span v-if="item.title" class="result-category">{{ item.title.replace(/^.*? - /, '') }}</span>
                </div>
              </div>
              <div class="result-right">
                <span v-if="item.product?.price" class="result-price">{{ Number(item.product.price).toLocaleString() }} ₽</span>
                <span v-if="item.product?.priceold" class="result-old-price">{{ Number(item.product.priceold).toLocaleString() }} ₽</span>
                <span v-else class="result-no-price">—</span>
              </div>
            </div>
          </div>
          <div v-if="searched && !results.length && !loading" class="no-results">No products found for "{{ input }}"</div>
        </div>
      </div>
    </section>
    <section class="popular">
      <div class="section-header">
        <div>
          <span class="section-label">Popular</span>
          <h2>Trending searches</h2>
        </div>
        <button class="view-all">View all <span>→</span></button>
      </div>
      <div class="products">
        <article class="product-card">
          <div class="product-image"><span>iPhone</span></div>
          <div class="product-info">
            <p class="product-category">Smartphone</p>
            <h3>iPhone 17 Pro</h3>
            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>1 049 ₽</strong>
              </div>
              <span class="shops">5 stores</span>
            </div>
          </div>
        </article>
        <article class="product-card">
          <div class="product-image"><span>AirPods</span></div>
          <div class="product-info">
            <p class="product-category">Headphones</p>
            <h3>AirPods Pro 3</h3>
            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>199 ₽</strong>
              </div>
              <span class="shops">7 stores</span>
            </div>
          </div>
        </article>
        <article class="product-card">
          <div class="product-image"><span>RTX 5070</span></div>
          <div class="product-info">
            <p class="product-category">Graphics Card</p>
            <h3>GeForce RTX 5070</h3>
            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>699 ₽</strong>
              </div>
              <span class="shops">6 stores</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router=useRouter()
const input=ref('')
const results=ref([])
const loading=ref(false)
const searched=ref(false)

const searchProduct=async()=>{
    const query=input.value.trim()
    if(!query||query.length<2){
        results.value=[]
        searched.value=false
        return
    }

    loading.value=true
    searched.value=true

    try{
        const response=await axios.get(`http://localhost:5178/api/search?q=${encodeURIComponent(query)}`)
        results.value=response.data.pages || []
    }catch(error){
        console.error('Search error:', error)
        results.value=[]
    }finally{
        loading.value=false
    }
}

let searchTimeout=null
const onSearchInput=()=>{
    clearTimeout(searchTimeout)
    searchTimeout=setTimeout(()=>{
    if(input.value.trim().length>=2){
        searchProduct()
    }else{
        results.value=[]
        searched.value=false
    }
    },500)
}

const openProduct=(url)=>{
    if(!url)return
    const fullUrl=url.startsWith('http')?url:`https://capslocks.ru${url}`
    window.open(fullUrl,'_blank')
}
</script>

<style scoped>
.home{
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
  background:#09090b;
}
.header{
  width:min(1200px,calc(100% - 48px));
  margin:0 auto;
  padding:28px 0;
  display:flex;
  align-items:center;
  justify-content:space-between;
  position:relative;
  z-index:10;
}
.logo{
  display:flex;
  align-items:center;
  gap:10px;
  color:#fff;
  text-decoration:none;
  font-size:20px;
  font-weight:700;
}
.logo-mark{
  width:34px;
  height:34px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  background:#9e72ff;
  color:#fff;
  font-weight:800;
}
.login-button{
  padding:9px 18px;
  border:1px solid #3f3f46;
  border-radius:9px;
  background:transparent;
  color:#fff;
  cursor:pointer;
  transition:.2s;
}
.login-button:hover{
  background:#18181b;
}
.hero{
  position:relative;
  z-index:2;
  padding:100px 24px 120px;
}
.hero-content{
  width:min(900px,100%);
  margin:0 auto;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
}
.eyebrow,
.section-label{
  color:#9e72ff;
  font-size:12px;
  font-weight:600;
  text-transform:uppercase;
  letter-spacing:.12em;
}
.hero h1{
  margin:18px 0 20px;
  color:#fff;
  font-size:clamp(42px,6vw,72px);
  line-height:1.05;
  letter-spacing:-.04em;
}
.hero h1 span{
  color:#9e72ff;
}
.hero-description{
  max-width:600px;
  margin:0;
  color:#a1a1aa;
  font-size:17px;
  line-height:1.6;
}
.search-wrapper{
  width:min(700px,100%);
  margin-top:42px;
  position:relative;
  z-index:20;
}
.search-box{
  height:62px;
  display:flex;
  align-items:center;
  padding:6px 7px 6px 20px;
  box-sizing:border-box;
  border:1px solid #3f3f46;
  border-radius:16px;
  background:rgba(20,20,25,.95);
}
.search-icon{
  width:21px;
  height:21px;
  flex-shrink:0;
  color:#71717a;
}
.search-box input{
  flex:1;
  min-width:0;
  height:100%;
  padding:0 14px;
  border:0;
  outline:0;
  background:transparent;
  color:#fff;
  font-size:15px;
}
.search-box input::placeholder{
  color:#71717a;
}
.search-button{
  height:48px;
  padding:0 20px;
  flex-shrink:0;
  border:0;
  border-radius:11px;
  background:#9e72ff;
  color:#fff;
  font-weight:600;
  cursor:pointer;
  transition:.2s;
}
.search-button:hover:not(:disabled){
  background:#8d5ff0;
}
.search-button:disabled{
  opacity:.5;
  cursor:not-allowed;
}
.search-hint{
  margin:12px 0 0;
  color:#52525b;
  font-size:12px;
}
.search-results{
  width:100%;
  max-height:420px;
  margin-top:10px;
  padding:6px;
  box-sizing:border-box;
  overflow-y:auto;
  border:1px solid #3f3f46;
  border-radius:14px;
  background:rgba(20,20,25,.98);
  box-shadow:0 20px 50px rgba(0,0,0,.4);
  text-align:left;
}
.search-result-item{
  min-height:64px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:10px 14px;
  border-radius:10px;
  cursor:pointer;
  transition:background .15s;
}
.search-result-item:hover{
  background:rgba(255,255,255,.06);
}
.result-left{
  min-width:0;
  display:flex;
  align-items:center;
  gap:12px;
}
.result-image{
  width:46px;
  height:46px;
  flex-shrink:0;
  object-fit:cover;
  border-radius:8px;
  background:#18181b;
}
.result-info{
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.result-name{
  overflow:hidden;
  color:#f4f4f5;
  font-size:14px;
  font-weight:500;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.result-name :deep(b){
  color:#9e72ff;
}
.result-category{
  overflow:hidden;
  color:#71717a;
  font-size:12px;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.result-right{
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  flex-shrink:0;
}
.result-price{
  color:#9e72ff;
  font-size:15px;
  font-weight:600;
}
.result-old-price{
  color:#52525b;
  font-size:12px;
  text-decoration:line-through;
}
.result-no-price{
  color:#52525b;
}
.no-results{
  width:100%;
  margin-top:10px;
  padding:18px;
  box-sizing:border-box;
  border:1px solid #3f3f46;
  border-radius:14px;
  background:rgba(20,20,25,.95);
  color:#71717a;
  font-size:14px;
}
.popular{
  width:min(1200px,calc(100% - 48px));
  margin:0 auto;
  padding-bottom:100px;
  position:relative;
  z-index:1;
}
.section-header{
  margin-bottom:28px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
}
.section-header h2{
  margin:8px 0 0;
  color:#fff;
  font-size:30px;
}
.view-all{
  border:0;
  background:transparent;
  color:#a1a1aa;
  cursor:pointer;
}
.view-all span{
  margin-left:5px;
}
.products{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:18px;
}
.product-card{
  overflow:hidden;
  border:1px solid #27272a;
  border-radius:16px;
  background:rgba(20,20,25,.8);
  transition:transform .2s,border-color .2s;
}
.product-card:hover{
  transform:translateY(-3px);
  border-color:#3f3f46;
}
.product-image{
  height:180px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#18181b;
  color:#71717a;
  font-size:18px;
  font-weight:600;
}
.product-info{
  padding:20px;
}
.product-category{
  margin:0 0 7px;
  color:#71717a;
  font-size:12px;
}
.product-info h3{
  margin:0;
  color:#fff;
  font-size:18px;
}
.product-bottom{
  margin-top:25px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
}
.price-label{
  display:block;
  margin-bottom:3px;
  color:#71717a;
  font-size:11px;
}
.product-bottom strong{
  color:#fff;
  font-size:20px;
}
.shops{
  color:#71717a;
  font-size:12px;
}
.ambient{
  position:absolute;
  pointer-events:none;
  border-radius:50%;
  filter:blur(100px);
  opacity:.15;
}
.ambient-top{
  width:500px;
  height:500px;
  top:-250px;
  left:50%;
  transform:translateX(-50%);
  background:#9e72ff;
}
.ambient-center{
  width:400px;
  height:400px;
  top:400px;
  left:-200px;
  background:#6d4aff;
}
.ambient-bottom{
  width:400px;
  height:400px;
  right:-200px;
  bottom:0;
  background:#9e72ff;
}
.search-results::-webkit-scrollbar{
  width:6px;
}
.search-results::-webkit-scrollbar-track{
  background:transparent;
}
.search-results::-webkit-scrollbar-thumb{
  border-radius:10px;
  background:#3f3f46;
}
@media (max-width:768px){
  .header,
  .popular{
    width:calc(100% - 32px);
  }
  .hero{
    padding:70px 16px 90px;
  }
  .hero h1{
    font-size:42px;
  }
  .search-box{
    height:58px;
    padding-left:14px;
  }
  .search-button{
    padding:0 14px;
  }
  .products{
    grid-template-columns:1fr;
  }
  .section-header{
    align-items:flex-start;
  }
  .search-result-item{
    gap:10px;
  }
  .result-name{
    white-space:normal;
  }
}
</style>