import axios from 'axios'
import * as cheerio from 'cheerio'

export async function parseCapsLocks(url:string){
    try{
        const response=await axios.get(url,{
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        })

        const $=cheerio.load(response.data)

        const nameSelectors=[
            '.js-store-prod-name.js-product-name.t-store__prod-popup__name',
            '.t-store__prod-popup__name',
            'h1'
        ]
        let name=''
        for(const selector of nameSelectors){
            const el=$(selector)
            if(el.length&&el.text().trim()){
                name=el.text().trim()
                break
            }
        }

        const priceSelectors=[
            '.js-product-price.js-store-prod-price-val.t-store__prod-popup__price-value',
            '.t-store__prod-popup__price-value',
            '.t-store__prod-popup__price'
        ]
        let price=0
        for(const selector of priceSelectors){
            const el=$(selector)
            if(el.length&&el.text().trim()){
                const priceText=el.text().trim().replace(/\s/g,'')
                price=parseInt(priceText)||0
                break
            }
        }
        return{name,price,url}
    }catch(error:any){
        console.error('Error CapsLocks',error.message)
        return null
    }
}