import createMessage from './services/createMessage'
import getMessagesByChatRoomId from './services/getMessageByRoomId'
import getMDL from './services/getMDL'
import seenMessage from './services/seenMessage'
import axios from 'axios'
import * as cheerio from 'cheerio'

const messageService = {
    createMessage,
    getMessagesByChatRoomId,
    getMDL,
    seenMessage,
    getSeoData: async (url: string) => {
        const response = await axios.get(url)
        const html = response.data

        // Sử dụng cheerio để phân tích HTML
        const $ = cheerio.load(html)

        const title = $('title').text() || null

        const seoImage =
            $('meta[property="og:image"]').attr('content') || // Open Graph image
            $('meta[name="twitter:image"]').attr('content') || // Twitter card image
            $('link[rel="image_src"]').attr('href') || // Link image
            null
        return { title, image: { url: seoImage } }
    }
}
export default messageService
