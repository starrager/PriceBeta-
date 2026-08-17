import { Router } from 'express'
import axios from 'axios'
import * as cheerio from 'cheerio'

const router=Router()

router.get('/search',async(req,res)=>{
    const query=req.query.q as string

    if(!query||query.length<2){
        return res.json({results:[]})
    }

    try{
        const searchUrl=`https://search.tildacdn.com/search/?p=13793907&num=10&hs=50&st=all&q=${encodeURIComponent(query)}&page=1`

        const response=await axios.get(searchUrl,{
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept':'application/json, text/html'
            },
            timeout:10000
        })

        const data=response.data

        if(typeof data==='string'){
            const $=cheerio.load(data)
            const results:any[]=[]

            $('.t-store__card, .js-product, .product-card').each((_,el)=>{
                const name=$(el).find('.t-store__card__title, .js-product-name, .product-name').first().text().trim()
                const priceText=$(el).find('.t-store__card__price-value, .js-product-price').first().text().trim()
                const link=$(el).find('a').first().attr('href')

                if(name){
                    results.push({
                        name,
                        price:parseInt(priceText.replace(/\s/g,''))||0,
                        url:link?`https://capslocks.ru${link}`:''
                    })
                }
            })

            return res.json({results})
        }

        return res.json(data)
    }catch(error:any){
        try{
            const catalogUrl='https://capslocks.ru/catalog'

            const response=await axios.get(catalogUrl,{
                headers:{
                    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            })

            const $=cheerio.load(response.data)
            const results:any[]=[]

            $('.t-store__card, .js-product, .product-card').each((_,el)=>{
                const name=$(el).find('.t-store__card__title, .js-product-name, .product-name').first().text().trim()
                const priceText=$(el).find('.t-store__card__price-value, .js-product-price').first().text().trim()
                const link=$(el).find('a').first().attr('href')

                if(name&&name.toLowerCase().includes(query.toLowerCase())){
                    results.push({
                        name,
                        price:parseInt(priceText.replace(/\s/g,''))||0,
                        url:link?`https://capslocks.ru${link}`:''
                    })
                }
            })

            return res.json({results})
        }catch(err){
            console.error('Catalog search error:',err)
            return res.json({results:[]})
        }
    }
})

export default router