import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, BatteryCharging, Check, ChevronDown,
  ChevronRight, CircleHelp, Cpu, Gauge, Heart, Menu, Minus, Monitor, Package, Plus, Search, ShieldCheck,
  ShoppingBag, SlidersHorizontal, Sparkles, Star, Trash2, Truck, X, Zap,
} from 'lucide-react'
import { builderSlots, categories, departments, getCompatibleProducts, products, type Category, type Department, type Product } from './data/products'
import { useStore } from './context/StoreContext'
import { OZGamingRigsLogo } from './components/OZGamingRigsLogo'

type Page = 'home' | 'catalog' | 'builder' | 'lab' | 'account'
type ProductTab = 'specs' | 'benchmarks' | 'reviews'
type Route = { page: Page; category: Department | 'All hardware'; productId?: string; accountTab: 'customer' | 'admin' }
const orderStatuses = ['Processing', 'Build testing', 'Shipped', 'Delivered'] as const
const defaultRoute: Route = { page: 'home', category: 'All hardware', accountTab: 'customer' }
const money = (amount: number, currency = 'USD') => {
  const rates: Record<string, number> = { USD: 1, CAD: 1.39, EUR: 0.92 }
  return new Intl.NumberFormat(currency === 'EUR' ? 'de-DE' : 'en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount * rates[currency])
}

const categorySlug = (category: Department | 'All hardware') => category === 'All hardware'
  ? 'all-hardware'
  : category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function routeFromPath(path: string): Route {
  const [pathname, query = ''] = path.split('?')
  const params = new URLSearchParams(query)
  const categorySlugValue = pathname.startsWith('/category/') ? pathname.slice('/category/'.length) : ''
  const category = departments.find((item) => categorySlug(item) === categorySlugValue) ?? 'All hardware'
  if (pathname === '/builder') return { ...defaultRoute, page: 'builder' }
  if (pathname === '/lab') return { ...defaultRoute, page: 'lab' }
  if (pathname === '/account') return { ...defaultRoute, page: 'account', accountTab: params.get('tab') === 'admin' ? 'admin' : 'customer' }
  if (pathname.startsWith('/category/')) return { ...defaultRoute, page: 'catalog', category }
  return defaultRoute
}

function routeFromLocation(): Route {
  const hash = window.location.hash.slice(1) || '/home'
  const [pathname, query = ''] = hash.split('?')
  if (pathname.startsWith('/product/')) {
    const productId = decodeURIComponent(pathname.slice('/product/'.length))
    const product = products.find((item) => item.id === productId)
    if (!product) return defaultRoute
    const params = new URLSearchParams(query)
    const from = params.get('from')
    const background = from ? routeFromPath(from) : { ...defaultRoute, page: 'catalog' as const, category: product.department }
    return { ...background, productId }
  }
  return routeFromPath(`${pathname}?${query}`)
}

function routeHash(route: Route): string {
  const path = route.page === 'catalog'
    ? `/category/${categorySlug(route.category)}`
    : route.page === 'home' ? '/home' : `/${route.page}`
  const pathWithQuery = route.page === 'account' && route.accountTab === 'admin' ? `${path}?tab=admin` : path
  if (!route.productId) return `#${pathWithQuery}`
  return `#/product/${encodeURIComponent(route.productId)}?from=${encodeURIComponent(pathWithQuery)}`
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare, currency } = useStore()
  const inWishlist = wishlist.includes(product.id)
  const inCompare = compare.includes(product.id)
  const compareLimitReached = compare.length >= 4 && !inCompare
  return (
    <article className="product-card">
      <div className="product-image">
        <button className="image-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          <img src={product.image} alt="" loading="lazy" />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`icon-button wishlist-button ${inWishlist ? 'is-active' : ''}`} onClick={(event) => { event.stopPropagation(); toggleWishlist(product.id) }} aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-body">
        <div className="product-meta"><span>{product.brand}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span></div>
        <button className="product-title" onClick={() => onOpen(product)}>{product.name}</button>
        <p className="product-spec">{Object.values(product.specs).slice(0, 2).join(' · ')}</p>
        <div className="product-footer">
          <strong className="price">{money(product.price, currency)}</strong>
          <div className="product-actions">
            <button className={`compare-toggle ${inCompare ? 'selected' : ''}`} onClick={() => toggleCompare(product.id)} disabled={compareLimitReached} title={compareLimitReached ? 'Compare up to 4 products' : 'Compare'}><SlidersHorizontal size={15} /></button>
            <button className="add-button" onClick={() => addToCart(product)} disabled={product.stock === 0}>{product.stock === 0 ? <span>Out of stock</span> : <><Plus size={15} /> <span>Add</span></>}</button>
          </div>
        </div>
        <div className={`stock-line ${product.stock <= 5 ? 'low-stock' : ''}`}><span />{product.stock === 0 ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock · Ships free'}</div>
      </div>
    </article>
  )
}

function App() {
  const store = useStore()
  const [route, setRoute] = useState<Route>(routeFromLocation)
  const { page, category } = route
  const activeProduct = route.productId ? products.find((product) => product.id === route.productId) ?? null : null
  const [catalogLimit, setCatalogLimit] = useState(24)
  const [search, setSearch] = useState('')
  const [priceCap, setPriceCap] = useState(6000)
  const [brandFilter, setBrandFilter] = useState('All brands')
  const [socketFilter, setSocketFilter] = useState('')
  const [vramFilter, setVramFilter] = useState('')
  const [wattageFilter, setWattageFilter] = useState('')
  const [refreshFilter, setRefreshFilter] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [productTab, setProductTab] = useState<ProductTab>('specs')
  const [bundleSelection, setBundleSelection] = useState(['paste-nt-h2', 'mat-deskpad'])
  const [cartOpen, setCartOpen] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [compareOpen, setCompareOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null)
  const [builderResolution, setBuilderResolution] = useState('1440p')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState({ ozgamingrigsRoute: true }, '', routeHash(defaultRoute))
    }
    const syncRoute = () => setRoute(routeFromLocation())
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === 'All hardware' || product.department === category
      const query = search.trim().toLowerCase()
      const matchesSearch = !query || `${product.name} ${product.brand} ${product.category} ${product.department} ${Object.values(product.specs).join(' ')}`.toLowerCase().includes(query)
      const matchesSpecs = (!socketFilter || product.socket === socketFilter)
        && (!vramFilter || (product.category === 'Graphics Cards' && product.specs.Memory?.startsWith(vramFilter)))
        && (!wattageFilter || product.watts === Number(wattageFilter))
        && (!refreshFilter || product.specs.Refresh === refreshFilter)
      return matchesCategory && matchesSearch && matchesSpecs && product.price <= priceCap && (brandFilter === 'All brands' || product.brand === brandFilter) && (!inStockOnly || product.stock > 0) && (!wishlistOnly || store.wishlist.includes(product.id))
    })
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [category, search, priceCap, brandFilter, socketFilter, vramFilter, wattageFilter, refreshFilter, inStockOnly, wishlistOnly, sortBy, store.wishlist])
  useEffect(() => setCatalogLimit(24), [category, search, priceCap, brandFilter, socketFilter, vramFilter, wattageFilter, refreshFilter, inStockOnly, wishlistOnly, sortBy])
  const suggestions = search.trim() ? products.filter((product) => `${product.name} ${product.category} ${product.department} ${product.brand}`.toLowerCase().includes(search.toLowerCase())).slice(0, 4) : []
  const buildProducts = builderSlots.map((slot) => ({ slot, product: products.find((item) => item.id === store.builder[slot.id]) }))
  const selectedWattage = buildProducts.reduce((sum, item) => item.slot.id === 'cpu' || item.slot.id === 'gpu' ? sum + (item.product?.watts ?? 0) : sum, 180)
  const recommendedPsu = Math.ceil(selectedWattage * 1.35 / 50) * 50
  const selectedPsu = buildProducts.find((item) => item.slot.id === 'psu')?.product
  const psuInsufficient = Boolean(selectedPsu?.watts && selectedPsu.watts < recommendedPsu)
  const buildComplete = builderSlots.filter((slot) => slot.required).every((slot) => Boolean(store.builder[slot.id]))
  const requiredPartCount = builderSlots.filter((slot) => slot.required).length
  const selectedRequiredCount = builderSlots.filter((slot) => slot.required && store.builder[slot.id]).length
  const buildTotal = buildProducts.reduce((sum, item) => sum + (item.product?.price ?? 0), 0)
  const selectedGpu = buildProducts.find((item) => item.slot.id === 'gpu')?.product
  const selectedCpu = buildProducts.find((item) => item.slot.id === 'cpu')?.product
  const selectedBoard = buildProducts.find((item) => item.slot.id === 'motherboard')?.product
  const selectedMemory = buildProducts.find((item) => item.slot.id === 'ram')?.product
  const selectedCase = buildProducts.find((item) => item.slot.id === 'case')?.product
  const compatibilityChecks = [
    { label: 'CPU / motherboard socket', ready: Boolean(selectedCpu && selectedBoard), valid: !selectedCpu || !selectedBoard || selectedCpu.socket === selectedBoard.socket, detail: selectedCpu && selectedBoard ? `${selectedCpu.socket} socket` : 'Select both parts' },
    { label: 'Memory generation', ready: Boolean(selectedMemory && selectedBoard), valid: !selectedMemory || !selectedBoard || selectedMemory.memoryType === selectedBoard.memoryType, detail: selectedMemory && selectedBoard ? `${selectedMemory.memoryType} platform` : 'Select memory and board' },
    { label: 'GPU / case clearance', ready: Boolean(selectedGpu && selectedCase), valid: !selectedGpu || !selectedCase || !selectedGpu.gpuLength || !selectedCase.caseClearance || selectedGpu.gpuLength <= selectedCase.caseClearance, detail: selectedGpu && selectedCase ? `${selectedGpu.gpuLength}mm GPU · ${selectedCase.caseClearance}mm clearance` : 'Select both parts' },
    { label: 'PSU capacity', ready: Boolean(selectedPsu), valid: !psuInsufficient, detail: selectedPsu ? `${selectedPsu.watts}W selected · ${recommendedPsu}W recommended` : `${recommendedPsu}W recommended` },
  ]
  const gpuFpsBase = selectedGpu?.id.includes('4080') ? 168 : selectedGpu?.id.includes('4070') ? 126 : selectedGpu?.id.includes('7600') ? 82 : 0
  const cpuMultiplier = selectedCpu?.id.includes('9800') ? 1.08 : selectedCpu?.id.includes('7600') ? 0.96 : selectedCpu ? 0.94 : 1
  const fpsBase = Math.round(gpuFpsBase * cpuMultiplier)
  const fpsMultiplier = builderResolution === '1080p' ? 1.45 : builderResolution === '4K' ? 0.62 : 1
  const comparedProducts = store.compare.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product))
  const brands = ['All brands', ...Array.from(new Set(products.map((product) => product.brand))).sort()]
  const freeShippingThreshold = 1000
  const shippingCost = store.cart.length && store.cartTotal < freeShippingThreshold ? 19 : 0
  const promoDiscount = promoCode === 'OZ10' ? store.cartTotal * 0.1 : 0
  const checkoutTotal = store.cartTotal + shippingCost - promoDiscount

  const updateRoute = (nextRoute: Route, replace = false) => {
    const hash = routeHash(nextRoute)
    if (window.location.hash !== hash) {
      const state = { ...(window.history.state ?? {}), ozgamingrigsRoute: true, ozgamingrigsProduct: nextRoute.productId }
      if (replace) window.history.replaceState(state, '', hash)
      else window.history.pushState(state, '', hash)
    }
    setRoute(nextRoute)
  }
  const navigate = (nextPage: Page) => {
    updateRoute({ ...route, page: nextPage, productId: undefined, accountTab: nextPage === 'account' ? route.accountTab : 'customer' })
    setMegaOpen(false)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openCategory = (nextCategory: Department | 'All hardware') => {
    setSearch('')
    setWishlistOnly(false)
    setSocketFilter('')
    setVramFilter('')
    setWattageFilter('')
    setRefreshFilter('')
    updateRoute({ ...route, page: 'catalog', category: nextCategory, productId: undefined })
    setMegaOpen(false)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const changeCategory = (nextCategory: Department | 'All hardware') => {
    updateRoute({ ...route, page: 'catalog', category: nextCategory, productId: undefined })
  }
  const openProduct = (product: Product) => {
    updateRoute({ ...route, productId: product.id })
    setProductTab('specs')
  }
  const closeProduct = () => {
    if (!activeProduct) return
    if (window.history.state?.ozgamingrigsProduct === activeProduct.id) {
      window.history.back()
      return
    }
    updateRoute({ ...route, productId: undefined })
  }
  const changeAccountTab = (nextTab: 'customer' | 'admin') => {
    updateRoute({ ...route, page: 'account', accountTab: nextTab, productId: undefined })
  }
  const toast = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }
  const shareBuild = async () => {
    const savedBuildId = store.saveBuild()
    if (!savedBuildId) {
      toast('Choose at least one component before saving your build')
      return
    }
    const url = `${window.location.origin}${window.location.pathname}?build=${encodeURIComponent(JSON.stringify(store.builder))}`
    try {
      await navigator.clipboard.writeText(url)
      toast('Build saved and share link copied')
    } catch (error) {
      console.error('Unable to copy the build link.', error)
      toast('Build saved, but the link could not be copied')
    }
  }
  const applyPromoCode = () => {
    if (promoInput.trim().toUpperCase() === 'OZ10') {
      setPromoCode('OZ10')
      setPromoMessage('OZ10 applied — 10% off your items.')
    } else {
      setPromoCode('')
      setPromoMessage('That code is not valid. Try OZ10.')
    }
  }

  return (
    <div className="app-shell">
      <div className="utility-bar">
        <div className="container utility-inner">
          <div className="utility-message"><span className="pulse-dot" /> FREE SHIPPING ON BUILDS OVER $1,000 <span className="utility-divider">/</span> 30-DAY RETURNS</div>
          <div className="utility-right">
            <span className="utility-watt"><Zap size={13} /> {selectedWattage}W build</span>
            <label className="currency-select"><select value={store.currency} onChange={(event) => store.setCurrency(event.target.value)} aria-label="Currency"><option value="USD">USD $</option><option value="CAD">CAD $</option><option value="EUR">EUR €</option></select><ChevronDown size={12} /></label>
            <button className="utility-link" onClick={() => navigate('account')}>Support <ArrowUpRight size={12} /></button>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <button className="mobile-menu-button icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu size={20} /></button>
          <button className="brand-lockup" onClick={() => navigate('home')} aria-label="OZGamingRigs home">
            <OZGamingRigsLogo className="oz-logo-header" />
          </button>
          <div className="search-wrap">
            <Search size={17} />
            <input value={search} onChange={(event) => { setSearch(event.target.value); setWishlistOnly(false) }} onFocus={() => setSearchFocused(true)} onBlur={() => window.setTimeout(() => setSearchFocused(false), 180)} onKeyDown={(event) => { if (event.key === 'Enter') navigate('catalog') }} placeholder="Search components, builds, and specs..." />
            <kbd>⌘ K</kbd>
            {searchFocused && suggestions.length > 0 && <div className="search-suggestions">{suggestions.map((item) => <button key={item.id} onMouseDown={() => { setSearch(item.name); openProduct(item) }}><img src={item.image} alt="" /><span><b>{item.name}</b><small>{item.category} · {money(item.price, store.currency)}</small></span><ChevronRight size={15} /></button>)}<button className="all-results" onMouseDown={() => navigate('catalog')}>View all results <ArrowRight size={14} /></button></div>}
          </div>
          <div className="header-actions">
            <button className="header-action" onClick={() => { openCategory('All hardware'); setWishlistOnly(true) }}><span className="action-icon"><Heart size={19} /><i className="count-bubble">{store.wishlist.length}</i></span><span>Saved</span></button>
            <button className="header-action cart-trigger" onClick={() => setCartOpen(true)}><span className="action-icon"><ShoppingBag size={19} /><i className="count-bubble">{store.cartCount}</i></span><span>Cart</span></button>
          </div>
        </div>
        <nav className={`main-nav ${mobileMenu ? 'mobile-open' : ''}`}>
          <div className="container nav-inner">
            <button className={`nav-item ${megaOpen ? 'active' : ''}`} onClick={() => setMegaOpen(!megaOpen)}>Shop hardware <ChevronDown size={14} /></button>
            <button className={`nav-item ${page === 'builder' ? 'active' : ''}`} onClick={() => navigate('builder')}>Build your rig <span className="nav-new">BUILDER</span></button>
            <button className={`nav-item ${page === 'lab' ? 'active' : ''}`} onClick={() => navigate('lab')}>Performance lab</button>
            <button className={`nav-item ${page === 'catalog' ? 'active' : ''}`} onClick={() => openCategory('All hardware')}>Deals <span className="nav-deal">LIVE</span></button>
            <button className="nav-item nav-account" onClick={() => navigate('account')}>My account</button>
            <div className="nav-assurance"><ShieldCheck size={14} /> Expert-built. Benchmark-verified.</div>
          </div>
          {megaOpen && <div className="mega-menu"><div className="container mega-grid">
            <div className="mega-feature"><span className="eyebrow">SHOP BY PERFORMANCE</span><h3>Find your next<br /><em>unfair advantage.</em></h3><button className="text-link" onClick={() => openCategory('Gaming PCs')}>Explore gaming PCs <ArrowRight size={14} /></button><div className="mega-feature-art"><img src={products[0].image} alt="" /></div></div>
            {[
              { title: 'Build your PC', items: departments.slice(0, 6) },
              { title: 'Cooling & power', items: departments.slice(6, 8) },
              { title: 'Complete your setup', items: [
                'Monitors & Displays',
                'Gaming Mice',
                'Mechanical Keyboards',
                'Mouse Pads & Desk Mats',
                'Headsets & Audio',
                'Microphones & Webcams',
                'Controllers & Sim Gear',
                'Battlestations & Gear',
              ] as Department[] },
            ].map((column) => <div className="mega-column" key={column.title}><span className="eyebrow">{column.title}</span>{column.items.map((item) => <button key={item} onClick={() => openCategory(item)}>{item}<ChevronRight size={13} /></button>)}</div>)}
          </div></div>}
        </nav>
      </header>

      <main>
        {page === 'home' && <HomePage navigate={navigate} openCategory={openCategory} openProduct={openProduct} />}
        {page === 'catalog' && <section className="container catalog-page">
          <button className="route-back" onClick={() => navigate('home')}>← Back to Store</button>
          <div className="breadcrumbs"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={12} /><span>Hardware</span>{category !== 'All hardware' && <><ChevronRight size={12} /><span>{category}</span></>}</div>
          <div className="catalog-heading"><div><span className="eyebrow">THE COMPONENT COLLECTION</span><h1>{category === 'All hardware' ? 'Hardware, without the guesswork.' : category}</h1><p>Performance-tested gear, chosen by people who build and play.</p></div><div className="catalog-count">{filteredProducts.length} PRODUCTS <span>·</span> VERIFIED SPECS</div></div>
          <div className="catalog-layout">
            <aside className="filters-panel">
              <div className="filter-title"><SlidersHorizontal size={16} /><b>Refine hardware</b><button onClick={() => { changeCategory('All hardware'); setSearch(''); setPriceCap(6000); setBrandFilter('All brands'); setSocketFilter(''); setVramFilter(''); setWattageFilter(''); setRefreshFilter(''); setInStockOnly(false); setWishlistOnly(false) }}>Reset</button></div>
              <label className="filter-label">Category</label><select className="filter-select" value={category} onChange={(event) => changeCategory(event.target.value as Department | 'All hardware')}><option>All hardware</option>{departments.map((item) => <option key={item}>{item}</option>)}</select>
              <label className="filter-label">Search</label><div className="filter-search"><Search size={14} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, brand, or spec" /></div>
              <label className="filter-label">Brand</label><select className="filter-select" value={brandFilter} onChange={(event) => setBrandFilter(event.target.value)}>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select>
              <details className="spec-filter-group" open><summary>Key specifications <ChevronDown size={13} /></summary>
                <label className="filter-label">CPU socket</label><select className="filter-select" value={socketFilter} onChange={(event) => setSocketFilter(event.target.value)}><option value="">Any socket</option>{[...new Set(products.map((product) => product.socket).filter((value): value is string => Boolean(value)))].map((value) => <option key={value} value={value}>{value}</option>)}</select>
                <label className="filter-label">GPU VRAM</label><select className="filter-select" value={vramFilter} onChange={(event) => setVramFilter(event.target.value)}><option value="">Any VRAM</option>{[...new Set(products.filter((product) => product.category === 'Graphics Cards').map((product) => product.specs.Memory?.match(/^\d+GB/)?.[0]).filter((value): value is string => Boolean(value)))].map((value) => <option key={value} value={value}>{value}</option>)}</select>
                <label className="filter-label">Rated wattage</label><select className="filter-select" value={wattageFilter} onChange={(event) => setWattageFilter(event.target.value)}><option value="">Any wattage</option>{[...new Set(products.map((product) => product.watts).filter((value): value is number => Boolean(value)))].sort((a, b) => a - b).map((value) => <option key={value} value={value}>{value}W</option>)}</select>
                <label className="filter-label">Refresh rate</label><select className="filter-select" value={refreshFilter} onChange={(event) => setRefreshFilter(event.target.value)}><option value="">Any refresh rate</option>{[...new Set(products.map((product) => product.specs.Refresh).filter((value): value is string => Boolean(value)))].map((value) => <option key={value} value={value}>{value}</option>)}</select>
              </details>
              <div className="filter-row"><label className="filter-label">Max price</label><span className="mono">{money(priceCap, store.currency)}</span></div><input className="range-input" type="range" min="25" max="6000" step="25" value={priceCap} onChange={(event) => setPriceCap(Number(event.target.value))} />
              <label className="checkbox-filter"><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} /><span className="custom-check"><Check size={12} /></span> In-stock only</label>
              <label className="checkbox-filter"><input type="checkbox" checked={wishlistOnly} onChange={(event) => setWishlistOnly(event.target.checked)} /><span className="custom-check"><Check size={12} /></span> Saved items only</label>
              <div className="filter-spec-card"><BadgeCheck size={18} /><b>Built for compatibility</b><span>Every component is spec-checked by our hardware team.</span></div>
            </aside>
            <div className="catalog-results">
              <div className="catalog-toolbar"><span>Showing <b>{Math.min(filteredProducts.length, catalogLimit)}</b> of {filteredProducts.length} matched products</span><label>Sort by <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
              {filteredProducts.length ? <><div className="product-grid">{filteredProducts.slice(0, catalogLimit).map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} />)}</div>{filteredProducts.length > catalogLimit && <button className="load-more-button" onClick={() => setCatalogLimit((limit) => limit + 24)}>Load more products <span>{Math.min(24, filteredProducts.length - catalogLimit)} of {filteredProducts.length - catalogLimit} remaining</span></button>}</> : <div className="empty-state"><Search size={28} /><h3>{wishlistOnly && !store.wishlist.length ? 'Your wishlist is empty' : 'No matching hardware'}</h3><p>{wishlistOnly && !store.wishlist.length ? 'Tap the heart on any product to save it here.' : 'Try broadening your search or resetting a filter.'}</p><button className="button button-outline" onClick={() => { changeCategory('All hardware'); setSearch(''); setPriceCap(6000); setBrandFilter('All brands'); setSocketFilter(''); setVramFilter(''); setWattageFilter(''); setRefreshFilter(''); setInStockOnly(false); setWishlistOnly(false) }}>Clear filters</button></div>}
            </div>
          </div>
        </section>}
        {page === 'builder' && <section className="container builder-page">
          <div className="breadcrumbs"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={12} /><span>Build your rig</span></div>
          <div className="builder-heading"><div><span className="eyebrow">OZ CONFIGURATOR / BUILD 01</span><h1>Build your <em>rig.</em></h1><p>Every part, in sync. We’ll catch the conflicts before they reach your cart.</p></div><div className="builder-promise"><ShieldCheck size={18} /> Compatibility checked<br /><small>Socket · memory · clearance · power</small></div></div>
          <div className="builder-layout">
            <div className="builder-list">{builderSlots.map((slot, index) => {
              const compatible = getCompatibleProducts(slot.id, store.builder)
              const current = products.find((product) => product.id === store.builder[slot.id])
              return <div className={`builder-part ${current ? 'part-selected' : ''}`} key={slot.id}>
                <div className="part-step"><span>{String(index + 1).padStart(2, '0')}</span><i>{current ? <Check size={13} /> : <Plus size={13} />}</i></div>
                <div className="part-info"><div className="part-title">{slot.label} {!slot.required && <small>OPTIONAL</small>}</div>{current ? <><b>{current.name}</b><span className="part-detail">{Object.values(current.specs).slice(0, 2).join(' · ')}</span></> : <span className="part-detail">Select a component to get started</span>}</div>
                <div className="part-picker"><select value={store.builder[slot.id] ?? ''} onChange={(event) => store.setBuilderPart(slot.id, event.target.value)} aria-label={`Choose ${slot.label}`}><option value="">Choose {slot.label.toLowerCase()}</option>{compatible.map((product) => <option key={product.id} value={product.id}>{product.name} · {money(product.price, store.currency)}</option>)}</select></div>
                {current && <strong className="part-price">{money(current.price, store.currency)}</strong>}
              </div>
            })}</div>
            <aside className="build-summary">
              <div className="summary-top"><div><span className="eyebrow">YOUR CONFIGURATION</span><h3>Performance<br />at a glance</h3></div><Cpu size={24} /></div>
              <div className={`compat-status ${psuInsufficient ? 'compat-warning' : ''}`}><span className="status-icon">{psuInsufficient ? <CircleHelp size={15} /> : <Check size={16} />}</span><span><b>{psuInsufficient ? 'Choose a higher-wattage PSU' : `${selectedRequiredCount}/${requiredPartCount} required parts selected`}</b><small>{psuInsufficient ? 'Power headroom is below recommendation' : buildComplete ? 'All required components are selected' : 'Choose parts to complete your build'}</small></span></div>
              <div className="compat-check-list">{compatibilityChecks.map((check) => <div className={`compat-check ${check.ready ? (check.valid ? 'check-pass' : 'check-fail') : ''}`} key={check.label}><span>{check.ready ? (check.valid ? <Check size={11} /> : <X size={11} />) : <Plus size={11} />}</span><b>{check.label}</b><small>{check.detail}</small></div>)}</div>
              <div className="power-meter"><div className="meter-label"><span>EST. SYSTEM DRAW</span><b className="mono">{selectedWattage}W</b></div><div className="meter-track"><i style={{ width: `${Math.min(selectedWattage / 10, 100)}%` }} /></div><div className="meter-footer"><span>Recommended PSU</span><b>{recommendedPsu}W+</b></div></div>
              {selectedGpu && <div className="fps-estimator"><div className="fps-title"><Gauge size={15} /> ESTIMATED GAME FPS <select value={builderResolution} onChange={(event) => setBuilderResolution(event.target.value)}><option>1080p</option><option>1440p</option><option>4K</option></select></div><div className="fps-games"><span>Cyberpunk 2077 <b>{Math.round(fpsBase * fpsMultiplier * 0.66)} <small>FPS</small></b></span><span>Valorant <b>{Math.round(fpsBase * fpsMultiplier * 2.45)} <small>FPS</small></b></span><span>Starfield <b>{Math.round(fpsBase * fpsMultiplier * 0.73)} <small>FPS</small></b></span></div><small className="disclaimer">Estimated averages · High preset · Actual results vary</small></div>}
              <div className="summary-total"><span>Build total</span><b>{money(buildTotal, store.currency)}</b></div>
              <button className="button button-primary full-button" disabled={!buildComplete || psuInsufficient} onClick={() => { buildProducts.forEach(({ product }) => { if (product) store.addToCart(product) }); setCartOpen(true) }}>Add complete build <ArrowRight size={16} /></button>
              <button className="button button-quiet full-button" onClick={shareBuild}>Save & share build <ArrowUpRight size={15} /></button>
              <button className="clear-build" onClick={store.clearBuilder}>Clear configuration</button>
            </aside>
          </div>
          <div className="compat-footnote"><CircleHelp size={15} /> Compatibility rules account for CPU socket, RAM generation, GPU length, and estimated power demand.</div>
        </section>}
        {page === 'lab' && <PerformancePage expandedGuide={expandedGuide} setExpandedGuide={setExpandedGuide} />}
        {page === 'account' && <section className="container account-page">
          <div className="breadcrumbs"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={12} /><span>My account</span></div>
          <div className="account-heading"><div><span className="eyebrow">YOUR OZ PROFILE</span><h1>Welcome back, <em>Player One.</em></h1><p>Your orders, builds, and gear—all in one place.</p></div><div className="account-tabs"><button className={route.accountTab === 'customer' ? 'selected' : ''} onClick={() => changeAccountTab('customer')}>My account</button><button className={route.accountTab === 'admin' ? 'selected' : ''} onClick={() => changeAccountTab('admin')}>Store admin</button></div></div>
          {route.accountTab === 'customer' ? <div className="account-grid">
            <div className="account-main"><div className="section-title-row"><div><span className="eyebrow">IN PROGRESS</span><h2>Order tracking</h2></div><button className="text-link" onClick={() => toast('You are viewing your latest order')}>View all orders <ArrowRight size={14} /></button></div>
              <div className="order-card"><div className="order-head"><span className="order-icon"><Package size={18} /></span><div><b>Order #OZ-20481</b><small>Placed Nov 17, 2026 · 3 items</small></div><span className="order-status">IN TRANSIT</span></div><div className="tracking-steps"><div className="complete"><i><Check size={12} /></i><span>Order placed</span><small>Nov 17</small></div><div className="complete"><i><Check size={12} /></i><span>Built & tested</span><small>Nov 19</small></div><div className="current"><i><Truck size={13} /></i><span>On the way</span><small>Est. Nov 23</small></div><div><i><Package size={12} /></i><span>Delivered</span></div></div><button className="text-link">Track shipment <ArrowRight size={14} /></button></div>
              <div className="section-title-row saved-build-title"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Saved builds</h2></div><button className="text-link" onClick={() => navigate('builder')}>Open builder <ArrowRight size={14} /></button></div>
              <div className="saved-build-list">{store.savedBuilds.map((build) => {
                const savedParts = Object.values(build.parts).map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product))
                const savedTotal = savedParts.reduce((total, product) => total + product.price, 0)
                const savedSummary = ['cpu', 'gpu', 'ram'].map((slot) => savedParts.find((product) => product.builderSlot === slot)?.name).filter(Boolean).join(' · ')
                const preview = savedParts.find((product) => product.builderSlot === 'gpu') ?? products[1]
                return <div className="saved-build-card" key={build.id}><img src={preview.image} alt="" /><div><span className="eyebrow">SAVED {new Date(build.updatedAt).toLocaleDateString()}</span><b>{build.name}</b><small>{savedSummary || 'Part selection in progress'}</small></div><strong>{money(savedTotal, store.currency)}</strong><button className="icon-button" onClick={() => { store.loadBuild(build.id); navigate('builder') }} aria-label={`Edit ${build.name}`}><ArrowRight size={17} /></button><button className="icon-button saved-build-delete" onClick={() => store.deleteBuild(build.id)} aria-label={`Delete ${build.name}`}><Trash2 size={14} /></button></div>
              })}</div>
            </div>
            <aside className="account-side"><div className="side-account-card"><span className="profile-avatar">P1</span><span className="eyebrow">PLAYER SINCE 2024</span><h3>Player One</h3><p>player.one@email.com</p><div className="account-stat-row"><span>ORDERS<b>04</b></span><span>WARRANTY<b>02</b></span><span>WISHLIST<b>{store.wishlist.length.toString().padStart(2, '0')}</b></span></div></div>
              <div className="warranty-card"><div className="warranty-head"><ShieldCheck size={17} /><b>Warranty vault</b><span>2 ACTIVE</span></div><div className="warranty-item"><span>GeForce RTX 4070 SUPER</span><small>Serial •••• 83A1 · Until Nov 2028</small></div><div className="warranty-item"><span>Vector 1440p Performance PC</span><small>Serial •••• OZ39 · Until Nov 2028</small></div><button className="text-link" onClick={() => toast('Warranty details are up to date')}>View serial details <ArrowRight size={14} /></button></div>
              <div className="wishlist-vault"><div className="warranty-head"><Heart size={16} /><b>Saved gear</b><span>{store.wishlist.length} ITEMS</span></div>{store.wishlist.length ? store.wishlist.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)).map((product) => <div className="wishlist-row" key={product.id}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{money(product.price, store.currency)}</small></span><button className="icon-button" onClick={() => { store.addToCart(product); toast(`${product.name} added to cart`) }} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={13} /></button><button className="icon-button" onClick={() => store.toggleWishlist(product.id)} aria-label={`Remove ${product.name} from saved gear`}><X size={13} /></button></div>) : <div className="wishlist-empty">Save products with the heart icon to keep them here.</div>}</div>
            </aside>
          </div> : <AdminDashboard toast={toast} />}
        </section>}
      </main>
      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><OZGamingRigsLogo className="oz-logo-footer" /></div><div className="footer-motto">Built by enthusiasts.<br /><em>Benchmarked for you.</em></div><div className="footer-links"><button onClick={() => navigate('lab')}>Performance lab</button><button onClick={() => navigate('builder')}>Build your rig</button><button onClick={() => navigate('account')}>Support & warranty</button></div><div className="footer-copy">© 2026 OZGamingRigs <span>·</span> Specs you can trust.</div></div></footer>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><aside className="cart-drawer">
        <div className="drawer-heading"><div><span className="eyebrow">YOUR GEAR, READY TO GO</span><h2>Shopping cart <small>({store.cartCount})</small></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>
        {store.cart.length ? <>
          <div className="cart-lines">{store.cart.map(({ product, quantity }) => <div className="cart-line" key={product.id}><img src={product.image} alt="" /><div className="cart-product"><b>{product.name}</b><small>{product.brand} · {product.category}</small><div className="quantity-control"><button onClick={() => store.setQuantity(product.id, quantity - 1)} aria-label="Decrease quantity"><Minus size={12} /></button><span>{quantity}</span><button onClick={() => store.setQuantity(product.id, quantity + 1)} aria-label="Increase quantity"><Plus size={12} /></button></div></div><div className="cart-line-end"><b>{money(product.price * quantity, store.currency)}</b><button onClick={() => store.removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={14} /></button></div></div>)}</div>
          <div className="cart-extra">
            <div className="shipping-progress"><div><span>{shippingCost ? `Add ${money(freeShippingThreshold - store.cartTotal, store.currency)} for free shipping` : 'Your order ships free'}</span><b>{shippingCost ? `${Math.min(Math.round(store.cartTotal / freeShippingThreshold * 100), 99)}%` : 'FREE'}</b></div><i><span style={{ width: `${Math.min(store.cartTotal / freeShippingThreshold * 100, 100)}%` }} /></i></div>
            <form className="promo-form" onSubmit={(event) => { event.preventDefault(); applyPromoCode() }}><label htmlFor="promo-code">PROMO CODE</label><div><input id="promo-code" value={promoInput} onChange={(event) => { setPromoInput(event.target.value); setPromoMessage('') }} placeholder="Enter code" /><button type="submit">{promoCode ? 'Update' : 'Apply'}</button></div>{promoMessage && <small className={promoCode ? 'promo-success' : 'promo-error'}>{promoMessage}</small>}</form>
          </div>
          <div className="cart-summary"><div><span>Subtotal</span><b>{money(store.cartTotal, store.currency)}</b></div>{promoDiscount > 0 && <div className="discount-line"><span>OZ10 discount</span><b>−{money(promoDiscount, store.currency)}</b></div>}<div><span>Shipping</span><b className={shippingCost ? '' : 'free-shipping'}>{shippingCost ? money(shippingCost, store.currency) : 'FREE'}</b></div><div className="cart-total-line"><span>Estimated total</span><b>{money(checkoutTotal, store.currency)}</b></div><p><ShieldCheck size={14} /> Taxes calculated at checkout · 30-day returns</p><button className="button button-primary full-button" onClick={() => toast('Demo checkout only — connect a payment provider to process orders')}>Proceed to checkout <ArrowRight size={15} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
        </> : <div className="empty-cart"><span><ShoppingBag size={25} /></span><h3>Your cart is waiting for its first upgrade.</h3><p>Find your next favorite component in the hardware collection.</p><button className="button button-primary" onClick={() => { setCartOpen(false); navigate('catalog') }}>Explore hardware <ArrowRight size={15} /></button></div>}
      </aside></div>}

      {compareOpen && <div className="overlay compare-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompareOpen(false) }}><section className="compare-drawer">
        <div className="drawer-heading"><div><span className="eyebrow">SIDE-BY-SIDE SPEC MATRIX</span><h2>Compare hardware <small>{comparedProducts.length}/4</small></h2></div><button className="icon-button" onClick={() => setCompareOpen(false)} aria-label="Close comparison"><X size={20} /></button></div>
        {comparedProducts.length ? <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>SPECIFICATION</th>{comparedProducts.map((product) => <th key={product.id}><img src={product.image} alt="" /><b>{product.name}</b><span>{money(product.price, store.currency)}</span><button onClick={() => store.toggleCompare(product.id)}><X size={12} /> Remove</button></th>)}</tr></thead><tbody>{Array.from(new Set(comparedProducts.flatMap((product) => Object.keys(product.specs)))).map((spec) => <tr key={spec}><td>{spec}</td>{comparedProducts.map((product) => <td key={product.id}>{product.specs[spec] ?? '—'}</td>)}</tr>)}<tr><td>Stock</td>{comparedProducts.map((product) => <td key={product.id}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</td>)}</tr></tbody></table></div> : <div className="empty-state"><SlidersHorizontal size={26} /><h3>No products selected</h3><p>Add products to compare from the product cards.</p><button className="button button-primary" onClick={() => setCompareOpen(false)}>Browse hardware</button></div>}
      </section></div>}

      {activeProduct && <div className="overlay modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeProduct() }}><section className="product-modal">
        <button className="modal-close icon-button" onClick={closeProduct} aria-label="Close product details"><X size={19} /></button>
        <div className="pdp-image"><img src={activeProduct.image} alt={activeProduct.name} /><span className="verified-tag"><BadgeCheck size={14} /> VERIFIED SPECS</span></div>
        <div className="pdp-content"><button className="route-back pdp-back" onClick={closeProduct}>← Back to {route.page === 'catalog' && category !== 'All hardware' ? category : 'Store'}</button><span className="eyebrow">{activeProduct.brand} / {activeProduct.category}</span><h2>{activeProduct.name}</h2><p>{activeProduct.description}</p><div className="pdp-rating"><span className="rating"><Star size={13} fill="currentColor" /> {activeProduct.rating}</span> <span>({activeProduct.reviews} verified reviews)</span><span className="verified-inline"><ShieldCheck size={13} /> Verified compatible</span></div><div className="pdp-price-row"><b>{money(activeProduct.price, store.currency)}</b><span className="in-stock"><i /> {activeProduct.stock > 0 ? 'In stock, ships free' : 'Backorder'}</span></div>
          <div className="pdp-tabs"><button className={productTab === 'specs' ? 'active' : ''} onClick={() => setProductTab('specs')}>Technical specs</button><button className={productTab === 'benchmarks' ? 'active' : ''} onClick={() => setProductTab('benchmarks')}>Benchmarks</button><button className={productTab === 'reviews' ? 'active' : ''} onClick={() => setProductTab('reviews')}>Reviews</button></div>
          <div className="pdp-tab-content">{productTab === 'specs' ? <div className="spec-list">{Object.entries(activeProduct.specs).map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>)}</div> : productTab === 'benchmarks' ? <div className="benchmark-mini"><div><span>Performance index</span><b>Excellent</b><div className="bench-line"><i style={{ width: '84%' }} /></div></div><div><span>Efficiency rating</span><b>{activeProduct.watts ? `${activeProduct.watts}W TDP` : 'A+'}</b><div className="bench-line amber"><i style={{ width: '71%' }} /></div></div><small>Our lab tests at default settings. Results vary by system configuration.</small></div> : <div className="review-preview"><div className="review-stars">★★★★★ <span>4.8 / 5</span></div><blockquote>“Exactly what I needed for my build. Specs were accurate and setup was painless.”</blockquote><small>VERIFIED BUILD · RTX 4070 SUPER / RYZEN 7 7700</small><button className="text-link" onClick={() => toast('Showing verified customer reviews')}>Read {activeProduct.reviews} reviews <ArrowRight size={13} /></button></div>}</div>
          {(() => {
            const bundles = products.filter((product) => ['paste-nt-h2', 'mat-deskpad'].includes(product.id) && product.id !== activeProduct.id)
            const bundleTotal = activeProduct.price + bundles.filter((product) => bundleSelection.includes(product.id)).reduce((sum, product) => sum + product.price, 0)
            return <>
              <div className="frequently-bought"><div><Sparkles size={14} /><b>Frequently bought together</b></div>{bundles.map((bundleProduct) => <label key={bundleProduct.id}><input type="checkbox" checked={bundleSelection.includes(bundleProduct.id)} onChange={(event) => setBundleSelection((current) => event.target.checked ? [...current, bundleProduct.id] : current.filter((id) => id !== bundleProduct.id))} /><span>{bundleProduct.name}</span><strong>+{money(bundleProduct.price, store.currency)}</strong></label>)}</div>
              <div className="pdp-actions"><button className="button button-primary" disabled={activeProduct.stock === 0} onClick={() => { store.addToCart(activeProduct); bundles.filter((product) => bundleSelection.includes(product.id)).forEach((product) => store.addToCart(product)); closeProduct(); setCartOpen(true) }}>{activeProduct.stock === 0 ? 'Out of stock' : <>Add selected bundle · {money(bundleTotal, store.currency)} <ShoppingBag size={15} /></>}</button><button className={`pdp-save icon-button ${store.wishlist.includes(activeProduct.id) ? 'is-active' : ''}`} onClick={() => store.toggleWishlist(activeProduct.id)} aria-label="Toggle wishlist"><Heart size={18} fill={store.wishlist.includes(activeProduct.id) ? 'currentColor' : 'none'} /></button></div>
            </>
          })()}
        </div>
      </section></div>}
      {store.compare.length > 0 && !compareOpen && <button className="compare-float" onClick={() => setCompareOpen(true)}><SlidersHorizontal size={16} /> Compare <b>{store.compare.length}</b><span className="compare-float-open">View tray <ArrowUpRight size={13} /></span></button>}
      {notice && <div className="toast"><Check size={15} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={13} /></button></div>}
    </div>
  )
}

function HomePage({ navigate, openCategory, openProduct }: { navigate: (page: Page) => void; openCategory: (category: Department | 'All hardware') => void; openProduct: (product: Product) => void }) {
  const featured = products.filter((product) => ['rig-apex', 'gpu-4070s', 'cpu-9800x3d', 'monitor-lg27'].includes(product.id))
  const shopDepartments: { category: Department; title: string; tag: string; count: string; icon: ReactNode }[] = [
    { category: 'Gaming PCs', title: 'Gaming PCs', tag: 'READY TO PLAY', count: 'Custom & prebuilt', icon: <Cpu size={18} /> },
    { category: 'Graphics Cards (GPUs)', title: 'Graphics Cards', tag: 'PUSH EVERY PIXEL', count: 'Next-gen GPUs', icon: <Zap size={18} /> },
    { category: 'Monitors & Displays', title: 'Monitors', tag: 'SEE THE DIFFERENCE', count: '144Hz to OLED', icon: <Monitor size={18} /> },
    { category: 'Battlestations & Gear', title: 'Battlestations & Gear', tag: 'LEVEL UP YOUR SPACE', count: 'Complete the setup', icon: <Sparkles size={18} /> },
  ]
  return <>
    <section className="hero-section"><div className="hero-glow" /><div className="container hero-inner"><div className="hero-copy"><div className="hero-eyebrow"><span className="pulse-dot" /> HARDWARE FOR THE NEXT LEVEL</div><h1>Every frame.<br /><em>Engineered.</em></h1><p>From the first part picked to the final benchmark, find gear that performs as hard as you do.</p><div className="hero-actions"><button className="button button-primary" onClick={() => navigate('builder')}>Build your rig <ArrowRight size={16} /></button><button className="button button-outline" onClick={() => openCategory('Gaming PCs')}>Shop gaming PCs <ArrowUpRight size={15} /></button></div><div className="hero-proof"><span><BadgeCheck size={15} /> Compatibility checked</span><i /><span><Zap size={14} /> Benchmarked in-house</span><i /><span>30-day returns</span></div></div>
      <div className="hero-art"><div className="hero-grid-pattern" /><img src={products[0].image} alt="Premium custom gaming PC" /><div className="hero-art-glass" /><div className="hero-floating-tag fps-tag"><span className="tag-icon"><Gauge size={15} /></span><span><small>4K PERFORMANCE</small><b>144 <i>FPS</i></b></span><ArrowUpRight size={14} /></div><div className="hero-floating-tag temp-tag"><span className="tag-icon orange"><Zap size={14} /></span><span><small>THERMAL PROFILE</small><b>62° <i>°C AVG</i></b></span><span className="temp-bars"><i /><i /><i /><i /><i /></span></div><span className="hero-index">OZ / SYSTEM 001</span></div>
      <div className="hero-side-note">PRECISION<br />BUILT FOR PLAY <span>EST. 2020 / SYDNEY</span></div>
    </div></section>
    <div className="container trust-strip"><div><span className="trust-icon"><ShieldCheck size={18} /></span><span><b>Benchmarked builds</b><small>Every rig stress-tested before dispatch</small></span></div><div><span className="trust-icon"><Truck size={18} /></span><span><b>Free build delivery</b><small>On all complete systems over $1,000</small></span></div><div><span className="trust-icon"><BatteryCharging size={18} /></span><span><b>Expert support</b><small>Real builders, here when you need us</small></span></div><div className="trust-rating"><span>★★★★★</span><b>4.9 / 5</b><small>from 2,400+ gamers</small></div></div>
    <section className="container home-category-section"><div className="section-heading"><div><span className="eyebrow">SHOP YOUR WAY</span><h2>From the core to the <em>whole setup.</em></h2></div><button className="text-link" onClick={() => openCategory('All hardware')}>All hardware <ArrowRight size={14} /></button></div><div className="category-tiles">
      {shopDepartments.map((tile) => {
        const representative = products.find((product) => product.department === tile.category)
        return <button className="category-tile" key={tile.category} onClick={() => openCategory(tile.category)}><img src={representative?.image ?? products[0].image} alt="" /><span className="tile-gradient" /><span className="tile-content"><i>{tile.icon}</i><small>{tile.tag}</small><b>{tile.title}</b><span>{tile.count} <ArrowRight size={13} /></span></span></button>
      })}
    </div></section>
    <section className="featured-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">THE COMMUNITY'S PICKS</span><h2>Performance, <em>proven.</em></h2></div><button className="text-link" onClick={() => openCategory('All hardware')}>Shop all hardware <ArrowRight size={14} /></button></div><div className="product-grid featured-grid">{featured.map((product) => <ProductCard key={product.id} product={product} onOpen={openProduct} />)}</div></div></section>
    <section className="builder-promo"><div className="container promo-inner"><div className="promo-art"><img src={products[1].image} alt="" /><div className="promo-chip"><span className="pulse-dot" /> LIVE COMPATIBILITY ENGINE</div></div><div className="promo-copy"><span className="eyebrow">YOUR BUILD. YOUR RULES.</span><h2>Good builds don’t<br />happen <em>by accident.</em></h2><p>Choose your parts. Our compatibility engine checks the details—socket, clearance, memory, wattage—so you can focus on the fun stuff.</p><div className="promo-points"><span><Check size={14} /> Real-time part matching</span><span><Check size={14} /> Live wattage headroom</span><span><Check size={14} /> FPS estimates by resolution</span></div><button className="button button-primary" onClick={() => navigate('builder')}>Start your build <ArrowRight size={15} /></button></div></div></section>
    <section className="lab-teaser container"><div><span className="eyebrow">OZ PERFORMANCE LAB</span><h2>Numbers that mean <em>something.</em></h2><p>Real-world benchmarks, thermal profiles, and tuning guides from our test bench.</p><button className="text-link" onClick={() => navigate('lab')}>Explore the lab <ArrowRight size={14} /></button></div><div className="teaser-chart"><div className="chart-caption"><span><BarChart3 size={15} /> 1440P / HIGH PRESET</span><small>AVERAGE FPS</small></div>{[{ label: 'RTX 4080 SUPER', value: 88 }, { label: 'RTX 4070 SUPER', value: 68 }, { label: 'RX 7600', value: 43 }].map((bar) => <div className="chart-bar-row" key={bar.label}><span>{bar.label}</span><div><i style={{ width: `${bar.value}%` }} /></div><b>{bar.value === 88 ? 138 : bar.value === 68 ? 106 : 67}</b></div>)}<small className="chart-note">CYBERPUNK 2077 · RT OFF · INTERNAL TESTING</small></div></section>
  </>
}

function PerformancePage({ expandedGuide, setExpandedGuide }: { expandedGuide: number | null; setExpandedGuide: (index: number | null) => void }) {
  const { currency } = useStore()
  const [metric, setMetric] = useState<'fps' | 'dollar' | 'power' | 'thermal'>('fps')
  const [componentClass, setComponentClass] = useState<'gpu' | 'cpu'>('gpu')
  const [benchmarkTitle, setBenchmarkTitle] = useState('Cyberpunk 2077')
  const [qualityPreset, setQualityPreset] = useState('High')
  const baseRows = componentClass === 'gpu'
    ? [
      { name: 'GeForce RTX 4080 SUPER', brand: '16GB GDDR6X · 320W', baseFps: 154, price: 999, watts: 320, thermal: 68, color: 'cyan' },
      { name: 'GeForce RTX 4070 SUPER', brand: '12GB GDDR6X · 220W', baseFps: 126, price: 599, watts: 220, thermal: 64, color: 'cyan' },
      { name: 'Radeon RX 7600', brand: '8GB GDDR6 · 165W', baseFps: 82, price: 269, watts: 165, thermal: 69, color: 'amber' },
    ]
    : [
      { name: 'Ryzen 7 9800X3D', brand: '8 CORES · 120W', baseFps: 189, price: 479, watts: 120, thermal: 72, color: 'cyan' },
      { name: 'Core i5-14600K', brand: '14 CORES · 125W', baseFps: 151, price: 289, watts: 125, thermal: 83, color: 'amber' },
      { name: 'Ryzen 5 7600', brand: '6 CORES · 65W', baseFps: 142, price: 189, watts: 65, thermal: 68, color: 'cyan' },
    ]
  const titleFactors: Record<string, number> = { 'Cyberpunk 2077': 1, Starfield: 0.84, Valorant: 2.45 }
  const presetFactors: Record<string, number> = { High: 1, Ultra: 0.82, Competitive: 1.35 }
  const benchmarkRows = baseRows.map((row) => ({ ...row, fps: Math.round(row.baseFps * titleFactors[benchmarkTitle] * presetFactors[qualityPreset]) }))
  const maxFps = Math.max(...benchmarkRows.map((row) => row.fps))
  const maxFpsPerDollar = Math.max(...benchmarkRows.map((row) => row.fps / row.price))
  const maxWatts = Math.max(...benchmarkRows.map((row) => row.watts))
  const benchmarkWidth = (row: typeof benchmarkRows[number]) => {
    if (metric === 'dollar') return `${(row.fps / row.price / maxFpsPerDollar) * 100}%`
    if (metric === 'power') return `${(row.watts / maxWatts) * 100}%`
    if (metric === 'thermal') return `${((80 - row.thermal) / 20) * 100}%`
    return `${(row.fps / maxFps) * 100}%`
  }
  const benchmarkValue = (row: typeof benchmarkRows[number]) => {
    if (metric === 'dollar') return `${(row.fps / row.price).toFixed(3)} FPS/$`
    if (metric === 'power') return `${row.watts}W`
    if (metric === 'thermal') return `${row.thermal}°C`
    return `${row.fps} FPS`
  }
  const guides = [
    { category: 'THERMALS / 8 MIN READ', title: 'Undervolting your GPU: cooler, quieter, faster.', text: 'Learn how to reduce GPU voltage while maintaining stable clocks. Start small, test thoroughly, and keep a profile you can roll back to.', level: 'INTERMEDIATE', icon: <Zap size={18} /> },
    { category: 'AIRFLOW / 6 MIN READ', title: 'A practical fan curve for a quieter PC.', text: 'Set a smooth ramp that responds to real load instead of reacting to every temperature spike. Includes suggested starting points.', level: 'BEGINNER', icon: <Gauge size={18} /> },
    { category: 'BUILD BASICS / 5 MIN READ', title: 'Thermal paste, applied with confidence.', text: 'A clean, repeatable approach to applying compound without overthinking the dot, line, or spread debate.', level: 'BEGINNER', icon: <Cpu size={18} /> },
    { category: 'DIAGNOSTICS / 9 MIN READ', title: 'Spotting and solving a CPU bottleneck.', text: 'Understand utilization, frame-time consistency, and the settings that can help identify the actual limit in your system.', level: 'INTERMEDIATE', icon: <BarChart3 size={18} /> },
  ]
  return <section className="container lab-page">
    <div className="breadcrumbs"><span>OZGamingRigs</span><ChevronRight size={12} /><span>Performance lab</span></div>
    <div className="lab-hero"><div><span className="hero-eyebrow"><span className="pulse-dot" /> SAMPLE DATASET / STATIC DEMO</span><h1>Performance is<br /><em>measurable.</em></h1><p>Explore comparative sample data and practical tuning advice. Replace demo figures with validated test-bench results before publishing.</p><div className="lab-hero-stats"><div><b>06</b><small>COMPONENT PROFILES</small></div><i /><div><b>03</b><small>GAME PRESETS</small></div><i /><div><b>DEMO</b><small>DATA SOURCE</small></div></div></div><div className="lab-orbit"><div className="orbit-ring one" /><div className="orbit-ring two" /><div className="orbit-center"><BarChart3 size={30} /><span>OZ<span>/</span>LAB</span></div><div className="orbit-node node-a"><Cpu size={16} /></div><div className="orbit-node node-b"><Gauge size={16} /></div><div className="orbit-node node-c"><Zap size={16} /></div><div className="orbit-readout">LOAD 100% <b>STABLE</b></div></div></div>
    <div className="bench-section">
      <div className="section-title-row"><div><span className="eyebrow">{componentClass === 'gpu' ? 'GPU SHOOTOUT / 1440P' : 'CPU GAMING / 1080P'}</span><h2>Benchmarks, <em>side by side.</em></h2></div><div className="metric-switch"><button className={metric === 'fps' ? 'selected' : ''} onClick={() => setMetric('fps')}>Average FPS</button><button className={metric === 'dollar' ? 'selected' : ''} onClick={() => setMetric('dollar')}>FPS / $</button><button className={metric === 'power' ? 'selected' : ''} onClick={() => setMetric('power')}>Power draw</button><button className={metric === 'thermal' ? 'selected' : ''} onClick={() => setMetric('thermal')}>Thermals</button></div></div>
      <div className="bench-controls"><div className="component-switch"><button className={componentClass === 'gpu' ? 'selected' : ''} onClick={() => setComponentClass('gpu')}>GPU comparison</button><button className={componentClass === 'cpu' ? 'selected' : ''} onClick={() => setComponentClass('cpu')}>CPU comparison</button></div><label>Game<select aria-label="Benchmark game" value={benchmarkTitle} onChange={(event) => setBenchmarkTitle(event.target.value)}><option>Cyberpunk 2077</option><option>Starfield</option><option>Valorant</option></select></label><label>Preset<select aria-label="Benchmark preset" value={qualityPreset} onChange={(event) => setQualityPreset(event.target.value)}><option>High</option><option>Ultra</option><option>Competitive</option></select></label></div>
      <div className="bench-card"><div className="bench-card-head"><span>{benchmarkTitle.toUpperCase()} · {qualityPreset.toUpperCase()} · {componentClass === 'gpu' ? '1440P' : '1080P'}</span><span><i /> SAMPLE DATASET / 2026</span></div>{benchmarkRows.map((row, i) => <div className="bench-row" key={row.name}><span className="bench-rank">0{i + 1}</span><div className="bench-product-name"><b>{row.name}</b><small>{row.brand}</small></div><div className="bench-bar-track"><i className={row.color} style={{ width: benchmarkWidth(row) }} /></div><b className="bench-value">{benchmarkValue(row)}</b><span className="bench-price">{money(row.price, currency)}</span><button className="bench-details" title={`View ${row.name} product`}><ArrowUpRight size={15} /></button></div>)}<div className="bench-foot"><span>{componentClass === 'gpu' ? 'GPU COMPARISON · 1440P · HIGH-LEVEL ESTIMATES' : 'CPU COMPARISON · 1080P · FIXED GPU TEST PROFILE'}</span><span>ILLUSTRATIVE DATA · NOT A GUARANTEE</span></div></div>
      <p className="benchmark-disclaimer">Estimates are for relative comparison only. Results vary with game version, drivers, cooling, and full system configuration.</p>
    </div>
    <div className="guides-section"><div className="section-title-row"><div><span className="eyebrow">FIELD NOTES / KNOW YOUR HARDWARE</span><h2>Play smarter. <em>Tune better.</em></h2></div><span className="guides-count">01 — 04 / GUIDES</span></div><div className="guide-grid">{guides.map((guide, index) => <button className={`guide-card ${expandedGuide === index ? 'expanded' : ''}`} key={guide.title} onClick={() => setExpandedGuide(expandedGuide === index ? null : index)}><div className="guide-top"><span className="guide-icon">{guide.icon}</span><span className="guide-level">{guide.level}</span></div><span className="eyebrow">{guide.category}</span><h3>{guide.title}</h3>{expandedGuide === index && <p>{guide.text}</p>}<span className="guide-read">{expandedGuide === index ? 'Close guide' : 'Read guide'} <ArrowRight size={14} /></span><span className="guide-number">0{index + 1}</span></button>)}</div></div>
  </section>
}

function AdminDashboard({ toast }: { toast: (message: string) => void }) {
  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('ozgamingrigs-admin-order-status-v1')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === 4 && parsed.every((status: unknown) => typeof status === 'string' && orderStatuses.some((knownStatus) => knownStatus === status))) return parsed
      }
    } catch (error) {
      console.error('Unable to restore order statuses.', error)
    }
    return ['Processing', 'Build testing', 'Shipped', 'Shipped']
  })
  const [stockLevels, setStockLevels] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('ozgamingrigs-admin-stock-v1')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as Record<string, number>
      }
    } catch (error) {
      console.error('Unable to restore inventory counts.', error)
    }
    return { 'gpu-4080s': 4, 'cpu-9800x3d': 5, 'desk-levitate': 2 }
  })
  const [uploadNames, setUploadNames] = useState<string[]>([])
  useEffect(() => {
    try {
      localStorage.setItem('ozgamingrigs-admin-order-status-v1', JSON.stringify(statuses))
    } catch (error) {
      console.error('Unable to persist order statuses.', error)
    }
  }, [statuses])
  useEffect(() => {
    try {
      localStorage.setItem('ozgamingrigs-admin-stock-v1', JSON.stringify(stockLevels))
    } catch (error) {
      console.error('Unable to persist inventory counts.', error)
    }
  }, [stockLevels])
  const orders = [['#OZ-20485', 'M. Thompson', '$1,498'], ['#OZ-20484', 'L. Chen', '$2,899'], ['#OZ-20483', 'A. Patel', '$628'], ['#OZ-20482', 'S. Williams', '$3,249']]
  const inventory = [
    { id: 'gpu-4080s', name: 'RTX 4080 SUPER Trinity', category: 'GPU' },
    { id: 'cpu-9800x3d', name: 'Ryzen 7 9800X3D', category: 'CPU' },
    { id: 'desk-levitate', name: 'Magnus Pro Sit-to-Stand', category: 'FURNITURE' },
  ]
  const handleCatalogUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const content: unknown = JSON.parse(await file.text())
      const rows = Array.isArray(content) ? content : content && typeof content === 'object' && 'products' in content && Array.isArray(content.products) ? content.products : []
      const validRows = rows.filter((item): item is Product => {
        if (!item || typeof item !== 'object') return false
        const product = item as Record<string, unknown>
        return typeof product.id === 'string' && typeof product.name === 'string' && typeof product.brand === 'string'
          && categories.includes(product.category as Category) && typeof product.price === 'number' && product.price > 0
          && typeof product.rating === 'number' && typeof product.reviews === 'number' && typeof product.image === 'string'
          && typeof product.description === 'string' && typeof product.stock === 'number'
          && Boolean(product.specs) && typeof product.specs === 'object' && !Array.isArray(product.specs)
      })
      if (!rows.length || validRows.length !== rows.length) throw new Error('The file must contain valid product records with category, price, image, stock, and specs.')
      setUploadNames(validRows.map((product) => product.name))
      toast(`${validRows.length} product records validated in preview. Connect your catalog API to publish.`)
    } catch (error) {
      console.error('Unable to validate the product import.', error)
      setUploadNames([])
      toast(error instanceof Error ? error.message : 'Unable to read this product file.')
    } finally {
      event.target.value = ''
    }
  }
  return <div className="admin-dashboard"><div className="admin-welcome"><div><span className="eyebrow">STORE OPERATIONS / NOV 21, 2026</span><h2>Operations overview</h2><p>Your store is running smoothly. Here’s the latest.</p></div><button className="button button-outline" onClick={() => toast('Report exported successfully')}>Export report <ArrowDown size={14} /></button></div>
    <div className="admin-metrics"><div className="admin-metric"><span className="metric-label">GROSS SALES / 30D</span><b>$84,290</b><small className="metric-positive"><ArrowUpRight size={13} /> +12.8% vs last month</small><div className="sparkline"><i style={{ height: '32%' }} /><i style={{ height: '52%' }} /><i style={{ height: '42%' }} /><i style={{ height: '68%' }} /><i style={{ height: '56%' }} /><i style={{ height: '83%' }} /><i style={{ height: '74%' }} /><i style={{ height: '100%' }} /></div></div><div className="admin-metric"><span className="metric-label">OPEN ORDERS</span><b>38</b><small>12 orders need fulfillment</small><div className="metric-bottom"><span>Processing</span><b>09</b><span>Shipped</span><b>29</b></div></div><div className="admin-metric"><span className="metric-label">LOW STOCK ALERTS</span><b className="orange-metric">06</b><small>Across 4 component categories</small><button className="text-link" onClick={() => toast('Inventory list opened')}>Review inventory <ArrowRight size={13} /></button></div><div className="admin-metric"><span className="metric-label">TOP COMPONENT</span><b className="top-component-name">RTX 4070 SUPER</b><small>42 units sold · $25,158 revenue</small><div className="component-rank"><span>01</span><span>GPU / GRAPHICS</span><BarChart3 size={15} /></div></div></div>
    <div className="admin-lower"><div className="admin-panel"><div className="panel-title"><h3>Recent orders</h3><button className="text-link" onClick={() => toast('Showing all recent orders')}>View all <ArrowRight size={13} /></button></div><table className="orders-table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>STATUS</th><th>TOTAL</th></tr></thead><tbody>{orders.map(([id, name, total], index) => <tr key={id}><td>{id}</td><td>{name}</td><td><select className={`order-status-select ${statuses[index] === 'Shipped' || statuses[index] === 'Delivered' ? 'shipped' : ''}`} aria-label={`Update status for ${id}`} value={statuses[index]} onChange={(event) => setStatuses((current) => current.map((status, statusIndex) => statusIndex === index ? event.target.value : status))}><option>Processing</option><option>Build testing</option><option>Shipped</option><option>Delivered</option></select></td><td>{total}</td></tr>)}</tbody></table></div>
      <div className="admin-panel inventory-panel"><div className="panel-title"><h3>Inventory watch</h3><span className="stock-saved"><Check size={12} /> Saved locally</span></div>{inventory.map((item) => { const quantity = stockLevels[item.id] ?? 0; return <div className="inventory-row" key={item.id}><span className="inventory-indicator"><Package size={15} /></span><span><b>{item.name}</b><small>{item.category}</small></span><span className="inventory-stock">{quantity} left</span><div className="inventory-stepper"><button onClick={() => setStockLevels((current) => ({ ...current, [item.id]: Math.max(0, quantity - 1) }))} aria-label={`Decrease ${item.name} stock`}>−</button><button onClick={() => setStockLevels((current) => ({ ...current, [item.id]: quantity + 1 }))} aria-label={`Increase ${item.name} stock`}>+</button></div><div className="inventory-meter"><i style={{ width: `${Math.min(quantity / 20 * 100, 100)}%` }} /></div></div> })}</div></div>
    <div className="admin-panel catalog-upload-panel"><div><span className="eyebrow">CATALOG TOOLS</span><h3>Product & spec import</h3><p>Validate a JSON product feed before connecting it to your catalog service.</p></div><label className="button button-outline upload-picker">Preview product JSON<input type="file" accept=".json,application/json" onChange={handleCatalogUpload} /></label>{uploadNames.length > 0 && <div className="upload-preview"><b>{uploadNames.length} products validated</b><span>{uploadNames.slice(0, 3).join(' · ')}{uploadNames.length > 3 ? ` · +${uploadNames.length - 3} more` : ''}</span></div>}</div>
  </div>
}

export default App
