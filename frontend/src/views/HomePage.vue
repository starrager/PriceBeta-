<template>
  <main class="home">
    <div class="ambient ambient-top"></div>
    <div class="ambient ambient-center"></div>
    <div class="ambient ambient-bottom"></div>

    <header class="header">
      <a href="" class="logo">
        <span @click="router.push('/')" class="logo-mark">P</span>
        <span @click="router.push('/')">PriceWatch</span>
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
          Compare prices across popular stores,
          track price history and know when it's
          the right time to buy.
        </p>

        <div class="search-wrapper">
          <div class="search-box">
            <svg
              class="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="What are you looking for?"
              v-model="input"
            />

            <button @click="searchProduct" class="search-button">Search</button>
          </div>

          <p class="search-hint">
            Try: iPhone 17 Pro, Sony WH-1000XM6, RTX 5070
          </p>
        </div>
      </div>
    </section>

    <section class="popular">
      <div class="section-header">
        <div>
          <span class="section-label">Popular</span>
          <h2>Trending searches</h2>
        </div>

        <button class="view-all">
          View all
          <span>→</span>
        </button>
      </div>

      <div class="products">
        <article class="product-card">
          <div class="product-image">
            <span>iPhone</span>
          </div>

          <div class="product-info">
            <p class="product-category">Smartphone</p>
            <h3>iPhone 17 Pro</h3>

            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>€1,049</strong>
              </div>

              <span class="shops">5 stores</span>
            </div>
          </div>
        </article>

        <article class="product-card">
          <div class="product-image">
            <span>AirPods</span>
          </div>

          <div class="product-info">
            <p class="product-category">Headphones</p>
            <h3>AirPods Pro 3</h3>

            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>€199</strong>
              </div>

              <span class="shops">7 stores</span>
            </div>
          </div>
        </article>

        <article class="product-card">
          <div class="product-image">
            <span>RTX 5070</span>
          </div>

          <div class="product-info">
            <p class="product-category">Graphics Card</p>
            <h3>GeForce RTX 5070</h3>

            <div class="product-bottom">
              <div>
                <span class="price-label">from</span>
                <strong>€699</strong>
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
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import axios from 'axios'

const input=ref('')
const router=useRouter()

const searchProduct=async()=>{
    const res=await axios.get('http://localhost:5178/test')
    console.log(res.data)
}
</script>

<style scoped>
.home{
  position:relative;
  min-height:100vh;
  overflow:hidden;
  background:#09090b;
  color:#f4f4f5;
}
.ambient{
  position:absolute;
  pointer-events:none;
  border-radius:50%;
  filter:blur(100px);
}
.ambient-top{
  top:-280px;
  left:50%;
  width:750px;
  height:550px;
  transform:translateX(-50%);
  background:rgba(255,255,255,.055);
}
.ambient-center{
  top:22%;
  left:50%;
  width:650px;
  height:500px;
  transform:translateX(-50%);
  background:rgba(255,255,255,.035);
}
.ambient-bottom{
  bottom:-400px;
  left:50%;
  width:900px;
  height:500px;
  transform:translateX(-50%);
  background:rgba(255,255,255,.025);
}
.header{
  position:relative;
  z-index:2;
  width:min(1180px,calc(100% - 48px));
  height:72px;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.logo{
  display:flex;
  align-items:center;
  gap:10px;
  color:#fafafa;
  text-decoration:none;
  font-size:17px;
  font-weight:600;
  letter-spacing:-.02em;
}
.logo-mark{
  width:32px;
  height:32px;
  display:grid;
  place-items:center;
  border:1px solid #3f3f46;
  border-radius:9px;
  background:#18181b;
  color:#fff;
  font-size:14px;
  font-weight:700;
  box-shadow:0 0 25px rgba(255,255,255,.04);
}
.login-button{
  padding:9px 16px;
  border:1px solid #27272a;
  border-radius:8px;
  background:#18181b;
  color:#d4d4d8;
  font-size:14px;
  cursor:pointer;
  transition:.2s;
}
.login-button:hover{
  background:#27272a;
  color:#fff;
}
.hero{
  position:relative;
  z-index:1;
  min-height:calc(100vh - 72px - 270px);
  width:min(900px,calc(100% - 48px));
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
}
.hero-content{
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  transform:translateY(-2vh);
}
.eyebrow{
  margin-bottom:16px;
  color:#a1a1aa;
  font-size:13px;
  font-weight:500;
  letter-spacing:.08em;
  text-transform:uppercase;
}
h1{
  margin:0;
  font-size:clamp(42px,6vw,68px);
  line-height:1.05;
  letter-spacing:-.055em;
  font-weight:650;
  text-shadow:0 0 50px rgba(255,255,255,.04);
}
h1 span{
  color:#71717a;
}
.hero-description{
  max-width:590px;
  margin:20px auto 0;
  color:#a1a1aa;
  font-size:16px;
  line-height:1.55;
}
.search-wrapper{
  width:min(700px,100%);
  margin-top:30px;
}
.search-box{
  display:flex;
  align-items:center;
  gap:12px;
  padding:7px 7px 7px 18px;
  border:1px solid #27272a;
  border-radius:14px;
  background:rgba(17,17,19,.88);
  box-shadow:0 0 0 4px rgba(255,255,255,.015),0 0 70px rgba(255,255,255,.035),0 20px 50px rgba(0,0,0,.35);
  backdrop-filter:blur(12px);
}
.search-icon{
  width:20px;
  height:20px;
  flex-shrink:0;
  color:#71717a;
}
.search-box input{
  min-width:0;
  flex:1;
  border:0;
  outline:0;
  background:transparent;
  color:#f4f4f5;
  font-size:15px;
}
.search-box input::placeholder{
  color:#52525b;
}
.search-button{
  padding:12px 22px;
  border:0;
  border-radius:9px;
  background:#f4f4f5;
  color:#09090b;
  font-size:14px;
  font-weight:600;
  cursor:pointer;
  transition:.2s;
  box-shadow:0 0 25px rgba(255,255,255,.08);
}
.search-button:hover{
  background:#fff;
  box-shadow:0 0 35px rgba(255,255,255,.13);
}
.search-hint{
  margin-top:9px;
  color:#52525b;
  font-size:12px;
}
.popular{
  position:relative;
  z-index:1;
  width:min(1180px,calc(100% - 48px));
  margin:0 auto;
  padding:0 0 32px;
}
.section-header{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  margin-bottom:14px;
}
.section-label{
  color:#71717a;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.08em;
}
.section-header h2{
  margin:5px 0 0;
  font-size:22px;
  letter-spacing:-.035em;
}
.view-all{
  border:0;
  background:transparent;
  color:#a1a1aa;
  font-size:13px;
  cursor:pointer;
}
.view-all span{
  margin-left:5px;
}
.products{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}
.product-card{
  overflow:hidden;
  border:1px solid #27272a;
  border-radius:14px;
  background:rgba(17,17,19,.8);
  transition:.2s;
}
.product-card:hover{
  transform:translateY(-3px);
  border-color:#3f3f46;
}
.product-image{
  height:135px;
  display:grid;
  place-items:center;
  background:radial-gradient(circle,#27272a 0%,#18181b 45%,#111113 100%);
  color:#52525b;
  font-size:20px;
  font-weight:600;
}
.product-info{
  padding:14px 16px 16px;
}
.product-category{
  margin:0 0 5px;
  color:#71717a;
  font-size:11px;
}
.product-info h3{
  margin:0;
  font-size:16px;
  font-weight:550;
  letter-spacing:-.02em;
}
.product-bottom{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  margin-top:14px;
}
.price-label{
  margin-right:5px;
  color:#71717a;
  font-size:12px;
}
.product-bottom strong{
  font-size:16px;
  letter-spacing:-.02em;
}
.shops{
  color:#52525b;
  font-size:11px;
}
@media(max-width:760px){
  .header{
    width:calc(100% - 32px);
  }
  .hero{
    width:calc(100% - 32px);
    min-height:auto;
    padding:70px 0 90px;
  }
  .hero-content{
    transform:none;
  }
  .hero-description{
    font-size:15px;
  }
  .search-box{
    padding-left:14px;
  }
  .search-button{
    padding:11px 15px;
  }
  .popular{
    width:calc(100% - 32px);
  }
  .products{
    grid-template-columns:1fr;
  }
  .product-image{
    height:150px;
  }
}
</style>