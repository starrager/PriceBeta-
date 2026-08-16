import axios from 'axios'
import * as cheerio from 'cheerio'

export async function parseDNS(url:string){
    const books:any=[]
    const response=await axios.get(url)
    const $=cheerio.load(response.data)
    const name=$('.product_pod').each((_,element)=>{
        const card=$(element)
        const name=card.find('h3 a').attr('title')
        const price=card.find('.price_color').text().trim()
        console.log(card.find('a').first().attr('title'))
        books.push({name,price})
    })

    return books
}