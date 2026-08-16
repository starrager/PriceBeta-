// backend/src/parsers/pcpartkeeper.parser.ts
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function parsePCPARTKEEPER(url: string) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })

        const $ = cheerio.load(response.data)
        const text = $('body').text()

        // 🔍 Ищем по тексту
        const nameMatch = text.match(/Dell GeForce RTX 3060 Ti OEM|GeForce RTX \d+/) 
        const name = nameMatch ? nameMatch[0] : ''

        // 🔍 Ищем категорию
        const categoryMatch = text.match(/Category:\s*(\w+)/)
        const category = categoryMatch ? categoryMatch[1] : ''

        // 🔍 Ищем Chip
        const chipMatch = text.match(/NVIDIA RTX \d+ Ti \([^)]+\)/)
        const chip = chipMatch ? chipMatch[0] : ''

        // 🔍 Ищем статус
        const statusMatch = text.match(/approved|pending|rejected/)
        const status = statusMatch ? statusMatch[0] : ''

        return { name, category, chip, status }

    } catch (error: any) {
        console.error('❌ Ошибка:', error.message)
        return { name: '', category: '', chip: '', status: '' }
    }
}