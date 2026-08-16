import axios from 'axios'
import * as cheerio from 'cheerio'

export async function parseWB(url:string){
    const products:any=[]
    const response=await axios.get(url,{
        headers:{}
    })
    const $=cheerio.load(response.data)
    const name=$('.wrapper').each((_,element)=>{
        const card=$(element)
        const name=card.find('.mo-typography mo-typography_variant_title3 mo-typography_variable-weight_title3 mo-typography_variable mo-typography_colors_primary productTitle--jKvWV')
        const price=card.find('.mo-typography mo-typography_variant_title2 mo-typography_variable-weight_title2 mo-typography_variable mo-typography_colors_primary priceBlockFinalPrice--AUlzU').text().trim()
        products.push({name,price})
    })

    return products
}