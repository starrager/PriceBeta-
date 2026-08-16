import { parseDNS } from "./DNS.parser";

parseDNS('https://books.toscrape.com/').then(result=>{console.log(result)})