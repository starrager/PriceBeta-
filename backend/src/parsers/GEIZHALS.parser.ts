import * as cheerio from 'cheerio'
import axios from 'axios'

export async function parseGEIZHALS(url:string){
    const products=[]
    const response=await axios.get(url)
    const $=cheerio.load(response.data)
    const name=$('.variant__header__headline').first().text().trim()
    const price=$('.variant-dropdown-button__offers flex flex--align-end flex--column').first().text().trim()
    products.push({name,price})
    return products
}