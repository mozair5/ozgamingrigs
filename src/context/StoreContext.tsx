import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { builderSlots, getCompatibleProducts, products, type BuilderSlot, type Product } from '../data/products'

type CartLine = { product: Product; quantity: number }
export type SavedBuild = { id: string; name: string; parts: Record<string, string>; updatedAt: string }
type StoreContextValue = {
  cart: CartLine[]
  wishlist: string[]
  compare: string[]
  builder: Record<string, string>
  currency: string
  savedBuilds: SavedBuild[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  toggleWishlist: (productId: string) => void
  toggleCompare: (productId: string) => void
  setBuilderPart: (slot: string, productId: string) => void
  clearBuilder: () => void
  setCurrency: (currency: string) => void
  saveBuild: () => string | null
  loadBuild: (buildId: string) => void
  deleteBuild: (buildId: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)
const STORAGE_KEY = 'ozgamingrigs-store-v1'
const starterSavedBuild: SavedBuild = {
  id: 'starter-1440p',
  name: '1440p weekend machine',
  parts: { cpu: 'cpu-ryzen7600', motherboard: 'mb-b650', ram: 'ram-32-ddr5', gpu: 'gpu-4070s', storage: 'ssd-sn770', psu: 'psu-rm850e', case: 'case-h510' },
  updatedAt: '2026-11-19T12:00:00.000Z',
}

function normalizeBuilderParts(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const input = value as Record<string, unknown>
  const selected: Record<string, string> = {}
  for (const slot of builderSlots) {
    const productId = input[slot.id]
    if (typeof productId !== 'string') continue
    if (products.some((product) => product.id === productId && product.builderSlot === slot.id)) selected[slot.id] = productId
  }

  const legacyPeripheralId = input.peripherals
  if (typeof legacyPeripheralId === 'string') {
    const product = products.find((candidate) => candidate.id === legacyPeripheralId && candidate.builderSlot)
    if (product?.builderSlot && !selected[product.builderSlot]) selected[product.builderSlot] = product.id
  }
  return selected
}

function validSharedBuild(value: string): Record<string, string> {
  const parsed: unknown = JSON.parse(value)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Shared build must be an object.')

  const selected = normalizeBuilderParts(parsed)

  const dependencies: Record<string, BuilderSlot[]> = {
    cpu: ['motherboard'],
    motherboard: ['cpu', 'ram'],
    gpu: ['case'],
  }
  for (const [source, dependents] of Object.entries(dependencies)) {
    if (!selected[source]) continue
    for (const dependent of dependents) {
      const selectedId = selected[dependent]
      if (selectedId && !getCompatibleProducts(dependent, selected).some((product) => product.id === selectedId)) {
        delete selected[dependent]
      }
    }
  }
  return selected
}

function refreshStoredCart(lines: CartLine[] | undefined): CartLine[] | undefined {
  if (!lines) return lines
  if (!Array.isArray(lines)) {
    console.error('Unable to restore cart items because the saved cart is not a list.')
    return []
  }
  return lines.flatMap((line) => {
    if (!line || typeof line !== 'object' || !line.product || typeof line.product.id !== 'string' || !Number.isSafeInteger(line.quantity) || line.quantity < 1) {
      console.error('Unable to restore a malformed saved cart item.')
      return []
    }
    const currentProduct = products.find((product) => product.id === line.product.id)
    if (!currentProduct) {
      console.error(`Unable to restore cart item "${line.product.id}" because it is not in the current catalog.`)
      return []
    }
    return [{ ...line, product: currentProduct }]
  })
}

function readStoredState() {
  let state: { cart?: CartLine[]; wishlist?: string[]; compare?: string[]; builder?: Record<string, string>; currency?: string; savedBuilds?: SavedBuild[] } = {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) state = JSON.parse(stored) as typeof state
  } catch (error) {
    console.error('Unable to restore the saved store state.', error)
  }
  state.cart = refreshStoredCart(state.cart)
  state.builder = normalizeBuilderParts(state.builder)
  if (state.savedBuilds) {
    state.savedBuilds = state.savedBuilds.map((build) => ({ ...build, parts: normalizeBuilderParts(build.parts) }))
  }
  const sharedBuild = new URLSearchParams(window.location.search).get('build')
  if (sharedBuild) {
    try {
      state.builder = validSharedBuild(sharedBuild)
    } catch (error) {
      console.error('Unable to load the shared build.', error)
    }
  }
  return state
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readStoredState, [])
  const [cart, setCart] = useState<CartLine[]>(initial.cart ?? [])
  const [wishlist, setWishlist] = useState<string[]>(initial.wishlist ?? [])
  const [compare, setCompare] = useState<string[]>(initial.compare ?? [])
  const [builder, setBuilder] = useState<Record<string, string>>(initial.builder ?? {})
  const [currency, setCurrency] = useState(initial.currency ?? 'USD')
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>(initial.savedBuilds ?? [starterSavedBuild])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, compare, builder, currency, savedBuilds }))
    } catch (error) {
      console.error('Unable to save the store state.', error)
    }
  }, [cart, wishlist, compare, builder, currency, savedBuilds])

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    wishlist,
    compare,
    builder,
    currency,
    savedBuilds,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    cartTotal: cart.reduce((total, line) => total + line.product.price * line.quantity, 0),
    addToCart: (product, quantity = 1) => setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      return existing
        ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { product, quantity }]
    }),
    setQuantity: (productId, quantity) => setCart((current) => current.map((line) => line.product.id === productId ? { ...line, quantity: Math.max(1, quantity) } : line)),
    removeFromCart: (productId) => setCart((current) => current.filter((line) => line.product.id !== productId)),
    toggleWishlist: (productId) => setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
    toggleCompare: (productId) => setCompare((current) => {
      if (current.includes(productId)) return current.filter((id) => id !== productId)
      if (current.length >= 4) return current
      return [...current, productId]
    }),
    setBuilderPart: (slot, productId) => setBuilder((current) => {
      const next = { ...current }
      if (productId) next[slot] = productId
      else delete next[slot]
      const dependentSlots: Record<string, BuilderSlot[]> = {
        cpu: ['motherboard'],
        motherboard: ['cpu', 'ram'],
        gpu: ['case'],
      }
      for (const dependentSlot of dependentSlots[slot] ?? []) {
        const selectedId = next[dependentSlot]
        if (selectedId && !getCompatibleProducts(dependentSlot as BuilderSlot, next).some((product) => product.id === selectedId)) {
          delete next[dependentSlot]
        }
      }
      return next
    }),
    clearBuilder: () => setBuilder({}),
    setCurrency: (nextCurrency) => setCurrency(nextCurrency),
    saveBuild: () => {
      if (!Object.keys(builder).length) return null
      const id = `build-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const name = `Custom rig ${new Date().toLocaleDateString()}`
      setSavedBuilds((current) => [{ id, name, parts: { ...builder }, updatedAt: new Date().toISOString() }, ...current])
      return id
    },
    loadBuild: (buildId) => {
      const build = savedBuilds.find((saved) => saved.id === buildId)
      if (build) setBuilder(normalizeBuilderParts(build.parts))
    },
    deleteBuild: (buildId) => setSavedBuilds((current) => current.filter((build) => build.id !== buildId)),
  }), [cart, wishlist, compare, builder, currency, savedBuilds])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}
