import { parseDNS } from "./DNS.parser";
import { parseWB } from "./WB.parser";
import { parseGEIZHALS } from "./GEIZHALS.parser";
import {parsePCPARTKEEPER} from './PCPARTKEEPER.parser'
import {parseCapsLocks} from './parse'

//parseDNS('https://books.toscrape.com/').then(result=>{console.log(result)})
//parseWB('https://www.wildberries.ru/catalog/835882175/detail.aspx').then(result=>{console.log(result)})
//parseGEIZHALS('https://geizhals.de/gigabyte-gaming-a18-3whk3dec64sh-a3685733.html').then(result=>{console.log(result)})
//parsePCPARTKEEPER('https://pcpartkeeper.com/models/1433').then(result=>{console.log(result)})
parseCapsLocks('https://capslocks.ru/klaviatury/tproduct/910381501242-klaviatura-wooting-60he-black').then(result=>{console.log(result)})
parseCapsLocks('https://capslocks.ru/klaviatury/tproduct/228497586962-klaviatura-mad-60he-rgb-pro-chernaya').then(result=>{console.log(result)})