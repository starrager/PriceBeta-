    <template>
    <main class="auth-page">
        <div class="ambient ambient-top"></div>
        <div class="ambient ambient-left"></div>
        <div class="ambient ambient-right"></div>

        <header class="header">
        <a href="/" class="logo">
            <span class="logo-mark">P</span>
            <span>PriceWatch</span>
        </a>
        </header>

        <section class="auth-section">
        <div class="auth-content">
            <div class="auth-heading">
            <span class="eyebrow">Welcome back</span>
            <h1>Sign in to <span>PriceWatch.</span></h1>
            <p>
                Track prices, compare stores and know when it's the right time to buy.
            </p>
            </div>

            <form class="auth-form" @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                v-model="email"
                id="email"
                type="text"
                placeholder="you@example.com"
                autocomplete="email"
                />
            </div>

            <div class="form-group">
                <div class="label-row">
                <label for="password">Password</label>
                <a href="#" class="forgot-link">Forgot password?</a>
                </div>

                <input
                v-model="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                />
            </div>

            <button type="submit" class="primary-button">
                Sign in
                <span>→</span>
            </button>
            </form>

            <div class="auth-bottom">
            <span>Don't have an account?</span>
            <a href="/register">Create account</a>
            </div>

            <p class="terms">
            By signing in, you agree to our
            <a href="#">Terms of Service</a>
            and
            <a href="#">Privacy Policy</a>.
            </p>
        </div>
        </section>
    </main>
    </template>

<script setup>
import {ref} from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router=useRouter()
const toast=useToast()
const email=ref('')
const password=ref('')

const login=async()=>{
    try{
        const response=await axios.post('http://localhost:5178/api/auth/login',{email:email.value,password:password.value})
        toast.success('logged in')
        email.value=''
        password.value=''

        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user',JSON.stringify(response.data.user))

        router.push('/')
    }catch(error){
        console.error(error)
        if(error.response){
            const message=error.response.data?.error||'register error'
            toast.error(message)
        }else toast.error('no connect to server please repeat later')
    }
}
</script>

<style scoped>
.auth-page{
    min-height:100vh;
    position:relative;
    overflow:hidden;
    background:#09090b;
    color:#fff;
    font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
.header{
    width:min(1200px,calc(100% - 48px));
    margin:0 auto;
    padding:28px 0;
    position:relative;
    z-index:10;
}
.logo{
    display:flex;
    align-items:center;
    gap:10px;
    width:max-content;
    color:#fff;
    font-size:20px;
    font-weight:700;
    text-decoration:none;
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
    box-shadow:0 0 30px rgba(158,114,255,.2);
}
.auth-section{
    min-height:calc(100vh - 90px);
    position:relative;
    z-index:2;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:40px 24px 90px;
    box-sizing:border-box;
}
.auth-content{
    width:min(440px,100%);
    margin-top:-35px;
    text-align:center;
}
.register-content{
    width:min(470px,100%);
}
.auth-heading{
    margin-bottom:32px;
}
.eyebrow{
    color:#9e72ff;
    font-size:12px;
    font-weight:600;
    text-transform:uppercase;
    letter-spacing:.12em;
}
.auth-heading h1{
    margin:18px 0 17px;
    color:#fff;
    font-size:clamp(36px,5vw,50px);
    line-height:1.05;
    letter-spacing:-.045em;
}
.auth-heading h1 span{
    color:#9e72ff;
}
.auth-heading p{
    max-width:390px;
    margin:0 auto;
    color:#71717a;
    font-size:14px;
    line-height:1.7;
}
.auth-form{
    display:flex;
    flex-direction:column;
    gap:17px;
    padding:28px;
    border:1px solid #27272a;
    border-radius:16px;
    background:rgba(20,20,25,.72);
    box-shadow:0 25px 70px rgba(0,0,0,.25);
    backdrop-filter:blur(12px);
    text-align:left;
}
.form-group{
    display:flex;
    flex-direction:column;
    gap:8px;
}
.form-group label{
    color:#d4d4d8;
    font-size:12px;
    font-weight:600;
}
.form-group input{
    width:100%;
    height:48px;
    padding:0 15px;
    box-sizing:border-box;
    border:1px solid #3f3f46;
    border-radius:10px;
    outline:none;
    background:#121216;
    color:#fff;
    font-family:inherit;
    font-size:13px;
    transition:.2s;
}
.form-group input::placeholder{
    color:#52525b;
}
.form-group input:hover{
    border-color:#52525b;
}
.form-group input:focus{
    border-color:#9e72ff;
    box-shadow:0 0 0 3px rgba(158,114,255,.1);
}
.primary-button{
    height:49px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    margin-top:3px;
    border:0;
    border-radius:10px;
    background:#9e72ff;
    color:#fff;
    font-family:inherit;
    font-size:13px;
    font-weight:600;
    cursor:pointer;
    transition:.2s;
}
.primary-button span{
    font-size:16px;
    transition:transform .2s;
}
.primary-button:hover{
    background:#8d5ff0;
    box-shadow:0 10px 30px rgba(158,114,255,.2);
    transform:translateY(-1px);
}
.primary-button:hover span{
    transform:translateX(3px);
}
.auth-bottom{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:6px;
    margin-top:22px;
    color:#71717a;
    font-size:12px;
}
.auth-bottom a{
    color:#9e72ff;
    text-decoration:none;
    font-weight:600;
}
.auth-bottom a:hover{
    color:#b696ff;
}
.terms{
    margin:18px auto 0;
    max-width:350px;
    color:#52525b;
    font-size:10px;
    line-height:1.7;
}
.terms a{
    color:#71717a;
    text-decoration:none;
}
.terms a:hover{
    color:#9e72ff;
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
    top:-300px;
    left:50%;
    transform:translateX(-50%);
    background:#9e72ff;
}
.ambient-left{
    width:400px;
    height:400px;
    left:-260px;
    top:45%;
    background:#6d4aff;
}
.ambient-right{
    width:400px;
    height:400px;
    right:-260px;
    bottom:-150px;
    background:#9e72ff;
}
@media(max-width:768px){
    .header{
        width:calc(100% - 32px);
    }
    .auth-section{
        padding:40px 16px 70px;
    }
    .auth-content{
        margin-top:-10px;
    }
}
@media(max-width:500px){
    .auth-heading h1{
        font-size:36px;
    }
    .auth-form{
        padding:20px;
    }
}
</style>