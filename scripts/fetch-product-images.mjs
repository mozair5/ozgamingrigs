import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { transform } from 'esbuild'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const productsPath = path.join(root, 'src', 'data', 'products.ts')
const source = await readFile(productsPath, 'utf8')
const { code } = await transform(source, { loader: 'ts', format: 'esm', target: 'node18' })
const productModule = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
const products = productModule.products
const userAgent = 'OZGamingRigs product image fetcher (contact: webmaster@ozgamingrigs.example)'
const selectedUrls = new Set()
const results = new Map()
const familyCache = new Map()

const fallbackQuery = (product) => {
  const name = product.name.toLowerCase()
  if (product.category === 'Processors') return product.brand === 'AMD' ? 'AMD Ryzen processor' : 'Intel Core processor'
  if (product.category === 'Graphics Cards') return name.includes('radeon') ? 'AMD Radeon graphics card' : name.includes('arc ') ? 'Intel Arc graphics card' : 'NVIDIA GeForce RTX graphics card'
  if (product.category === 'Memory') return product.specs.Speed?.includes('DDR4') ? 'DDR4 RAM' : 'DDR5 RAM'
  if (product.category === 'Storage') return name.includes('hdd') ? 'desktop hard disk drive' : name.includes('sata') ? 'SATA SSD' : 'NVMe SSD'
  if (product.category === 'Monitors') return 'gaming monitor'
  if (product.category === 'Gaming PCs') return 'gaming desktop PC'
  if (product.category === 'Motherboards') return 'PC motherboard'
  if (product.category === 'Power Supplies') return 'PC power supply'
  if (product.category === 'Cases') return 'PC case'
  if (product.category === 'Cooling') return name.includes('fan') ? 'PC cooling fan' : 'CPU cooler'
  if (product.category === 'Mechanical Keyboards') return 'mechanical keyboard'
  if (product.category === 'Gaming Mice') return 'gaming mouse'
  if (product.category === 'Mouse Pads & Desk Mats') return 'extended mouse pad'
  if (product.category === 'Headsets & Audio') return name.includes('speaker') ? 'PC speakers' : name.includes('earbud') || name.includes('buds') ? 'gaming earbuds' : 'gaming headset'
  if (product.category === 'Microphones & Webcams') return name.includes('webcam') || name.includes('camera') ? 'computer webcam' : 'USB microphone'
  if (product.category === 'Controllers & Sim Gear') return name.includes('wheel') || name.includes('pedal') ? 'sim racing wheel' : 'game controller'
  if (product.category === 'Battlestations & Gear') {
    if (name.includes('chair')) return 'gaming chair'
    if (name.includes('desk')) return 'standing desk'
    if (name.includes('arm')) return 'monitor arm'
    if (name.includes('ups')) return 'UPS battery backup'
    if (name.includes('light')) return 'computer monitor light bar'
    return 'gaming setup accessory'
  }
  if (name.includes('thermal') || name.includes('paste')) return 'thermal paste computer'
  if (name.includes('windows')) return 'Windows 11 product box'
  if (name.includes('ups') || name.includes('backup')) return 'UPS battery backup'
  if (name.includes('desk mat') || name.includes('mouse pad')) return 'extended mouse pad'
  return 'computer accessory'
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function request(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 18000)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function searchCommons(search) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: search,
    gsrnamespace: '6',
    gsrlimit: '50',
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '800',
    format: 'json',
  })
  const response = await request(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': userAgent },
  })
  if (!response.ok) throw new Error(`Wikimedia API returned ${response.status} for "${search}".`)
  const payload = await response.json()
  return Object.values(payload.query?.pages ?? {})
    .map((page) => ({ title: page.title ?? '', info: page.imageinfo?.[0] }))
    .filter(({ title, info }) => {
      const lowerTitle = title.toLowerCase()
      return info && /\.(?:jpe?g|png|webp)$/i.test(lowerTitle)
        && !/(?:icon|logo|symbol|diagram|schematic|flag)\b/i.test(lowerTitle)
    })
}

function modelTokens(product) {
  return product.name.match(/[a-z0-9]+/gi)?.filter((token) =>
    token.length >= 3 && /\d/.test(token)
    && !/(?:gb|tb|mhz|ghz|hz|mm|inch|w|va)$/i.test(token),
  ) ?? []
}

function exactModelMatches(product, title) {
  const tokens = modelTokens(product)
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (tokens.length) return tokens.every((token) => normalizedTitle.includes(token.toLowerCase()))
  const distinctiveWords = product.name.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 4)
  return distinctiveWords.some((word) => normalizedTitle.includes(word))
}

async function verifyImage(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await request(url, {
        method,
        headers: { 'User-Agent': userAgent },
      })
      const contentType = response.headers.get('content-type')?.split(';')[0].toLowerCase() ?? ''
      if (method === 'GET') await response.body?.cancel()
      if (response.status === 200 && ['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) return true
    } catch {
      if (method === 'GET') return false
    }
  }
  return false
}

async function chooseImage(candidates) {
  for (const candidate of candidates) {
    const url = candidate.info.thumburl ?? candidate.info.url
    if (!url || selectedUrls.has(url)) continue
    if (await verifyImage(url)) {
      selectedUrls.add(url)
      return url
    }
  }
  return undefined
}

async function getFamilyCandidates(search) {
  if (!familyCache.has(search)) familyCache.set(search, await searchCommons(search))
  return familyCache.get(search)
}

async function fetchProductImage(product, index) {
  const exactQuery = `${product.brand} ${product.name}`
  try {
    const exactCandidates = (await searchCommons(exactQuery)).filter(({ title }) => exactModelMatches(product, title))
    const exactImage = await chooseImage(exactCandidates)
    if (exactImage) {
      results.set(product.id, exactImage)
      return 'exact'
    }
    const family = fallbackQuery(product)
    const fallbackImage = await chooseImage(await getFamilyCandidates(family))
    if (fallbackImage) {
      results.set(product.id, fallbackImage)
      return 'family'
    }
    console.warn(`No verified exact or family image found: ${product.brand} ${product.name}`)
    return 'missing'
  } catch (error) {
    console.error(`Image lookup failed for ${product.brand} ${product.name}: ${error.message}`)
    return 'error'
  } finally {
    if ((index + 1) % 12 === 0) await delay(350)
  }
}

let exactCount = 0
let familyCount = 0
let missingCount = 0
let errorCount = 0
let nextIndex = 0
async function worker() {
  while (nextIndex < products.length) {
    const index = nextIndex++
    const kind = await fetchProductImage(products[index], index)
    if (kind === 'exact') exactCount += 1
    else if (kind === 'family') familyCount += 1
    else if (kind === 'error') errorCount += 1
    else missingCount += 1
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()))

console.log(`Checked ${products.length} products: ${exactCount} exact-model, ${familyCount} family fallback, ${missingCount} unresolved, ${errorCount} lookup errors.`)
if (missingCount || errorCount) {
  throw new Error('Image map was not changed because Wikimedia image coverage could not be fully verified.')
}

const map = [...results.entries()]
  .map(([id, url]) => `  ${JSON.stringify(id)}: ${JSON.stringify(url)},`)
  .join('\n')
const marker = 'const verifiedProductImages: Record<string, string> = {'
const start = source.indexOf(marker)
const end = source.indexOf('\n}', start)
if (start < 0 || end < 0) throw new Error('Unable to find the verified image map in src/data/products.ts.')
const updated = `${source.slice(0, start)}${marker}\n${map}\n}${source.slice(end + 2)}`
await writeFile(productsPath, updated, 'utf8')

console.log(`Wrote ${results.size} unique verified Wikimedia image URLs to src/data/products.ts.`)
