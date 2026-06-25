import RedlineLogo from './RedlineLogo'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <RedlineLogo />
              <span className="text-lg font-extrabold tracking-tight text-white">
                RED<span className="text-redline">LINE</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              The home base for car culture. Find your people. Find your meet.
            </p>
          </div>
          {[
            { h: 'Explore', items: ['Meets', 'Giveaways', 'Merch', 'Garage Pass'] },
            { h: 'Community', items: ['Group Chats', 'Host a Meet', 'Crews', 'Leaderboard'] },
            { h: 'Company', items: ['About', 'Partners', 'Careers', 'Contact'] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="text-sm font-semibold text-white">{col.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#top" className="text-sm text-slate-400 transition hover:text-white">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Redline. Built for the culture.</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-slate-300">Privacy</a>
            <a href="#top" className="hover:text-slate-300">Terms</a>
            <a href="#top" className="hover:text-slate-300">Safety</a>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-600">
          Demo prototype — events, giveaways, chats, and merch use sample data.
        </p>
      </div>
    </footer>
  )
}
