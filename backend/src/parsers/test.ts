import { parseDNS } from "./DNS.parser";
import { parseWB } from "./WB.parser";
import { parseGEIZHALS } from "./GEIZHALS.parser";
import {parsePCPARTKEEPER} from './PCPARTKEEPER.parser'

//parseDNS('https://books.toscrape.com/').then(result=>{console.log(result)})
//parseWB('https://www.wildberries.ru/catalog/835882175/detail.aspx').then(result=>{console.log(result)})
//parseGEIZHALS('https://geizhals.de/gigabyte-gaming-a18-3whk3dec64sh-a3685733.html').then(result=>{console.log(result)})
//parsePCPARTKEEPER('https://pcpartkeeper.com/models/1433').then(result=>{console.log(result)})
https://capslocks.ru/klaviatury/tproduct/910381501242-klaviatura-wooting-60he-black



const url = 'https://pcpartkeeper.com/models/1433'
async function test() {
    const result = await parsePCPARTKEEPER(url)
    console.log('📦 Название:', result.name)
    console.log('📁 Категория:', result.category)
    console.log('💻 Chip:', result.chip)
    console.log('📊 Статус:', result.status)
}

test()