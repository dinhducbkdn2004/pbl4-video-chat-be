import metascraper from 'metascraper'
import metascraperTitle from 'metascraper-title'
import metascraperDescription from 'metascraper-description'
import metascraperImage from 'metascraper-image'

const metascraperInstace = metascraper([metascraperTitle(), metascraperDescription(), metascraperImage()])
export default metascraperInstace
