import { MERCH } from '../data'
import { useCart } from '../store'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ProductImage from './ProductImage'

export default function Merch() {
  const { addToCart, items, count, total, removeFromCart } = useCart()

  return (
    <section id="merch" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <SectionHeading
          tone="light"
          eyebrow="Rep the Crew"
          title="Redline merch"
          subtitle="Threads and gear for the garage and the grid. Members get free shipping over $50."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {MERCH.map((p, idx) => (
              <Reveal
                key={p.id}
                delay={(idx % 3) * 70}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-36 overflow-hidden bg-slate-100">
                  <ProductImage product={p} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-slate-900">${p.price}</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="rounded-lg bg-redline px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-redline-dark"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Cart */}
          <Reveal className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="flex items-center justify-between text-lg font-bold text-slate-900">
              Your Cart
              <span className="rounded-full bg-redline px-2.5 py-0.5 text-xs text-white">{count}</span>
            </h3>

            {items.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                Cart’s empty. Add some gear to rep the crew.
              </p>
            ) : (
              <>
                <ul className="mt-4 space-y-3">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-slate-700">
                        {i.emoji} {i.name}{' '}
                        <span className="text-slate-400">× {i.qty}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-slate-600">${i.price * i.qty}</span>
                        <button
                          onClick={() => removeFromCart(i.id)}
                          className="text-slate-400 hover:text-redline"
                          aria-label={`Remove ${i.name}`}
                        >
                          ×
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-lg font-bold text-slate-900">${total}</span>
                </div>
                <button className="mt-4 w-full rounded-xl bg-redline px-5 py-3 font-semibold text-white transition hover:bg-redline-dark">
                  Checkout
                </button>
                {total < 50 && (
                  <p className="mt-2 text-center text-xs text-slate-500">
                    ${50 - total} more for free shipping
                  </p>
                )}
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
