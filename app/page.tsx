import Link from "next/link";

const PLATFORMS = [
  { name: "Product Hunt", icon: "🐱", color: "text-orange-400", connected: true },
  { name: "X (Twitter)", icon: "𝕏", color: "text-white", connected: true },
  { name: "Hacker News", icon: "Y", color: "text-orange-500", connected: false },
  { name: "Reddit", icon: "🤖", color: "text-red-400", connected: true },
  { name: "Indie Hackers", icon: "IH", color: "text-blue-400", connected: false },
];

const PLATFORM_POSTS = [
  {
    platform: "X (Twitter)",
    icon: "𝕏",
    color: "border-gray-700",
    accent: "bg-gray-800",
    text: `🚀 Just launched AutoLaunch — fill in your product details once, and it posts to 5 platforms automatically.\n\nNo more rewriting the same announcement over and over.\n\nautolaunch.vercel.app #buildinpublic #indiehacker`,
    chars: "276/280",
  },
  {
    platform: "Product Hunt",
    icon: "🐱",
    color: "border-orange-900/50",
    accent: "bg-orange-950/30",
    text: `**AutoLaunch** — Write once, launch everywhere\n\nTagline: Your launch, on every platform, automatically\n\nDescribe your product once. AutoLaunch writes the right post for each platform and submits them all — so you can focus on shipping, not copy-pasting.`,
    chars: "PH Format",
  },
  {
    platform: "Hacker News",
    icon: "Y",
    color: "border-orange-900/50",
    accent: "bg-orange-950/20",
    text: `Show HN: AutoLaunch – post your launch to 5 platforms with one click\n\nI kept spending launch day rewriting the same announcement for each platform instead of talking to users. Built a tool that writes platform-appropriate posts from a single form and submits them automatically.`,
    chars: "HN Format",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-28 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-700/50 bg-violet-900/20 px-4 py-1.5 text-sm text-violet-300">
            <span className="mr-2">🚀</span>
            Link your accounts once — post to 5 platforms forever after
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Write once.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Post everywhere.
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-xl text-gray-400 leading-relaxed">
            Describe your product in one form. AutoLaunch writes the right post for each platform and
            submits them all automatically —
            <span className="text-white font-medium"> no copy-pasting, no rewriting, no manual posting.</span>
          </p>
          <p className="mx-auto mb-10 max-w-xl text-sm text-gray-500 leading-relaxed">
            Link your X, Reddit, and Product Hunt accounts once (takes 2 minutes).
            Every launch after that is done in 60 seconds.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
            >
              Start for Free →
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-xl border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-600">Free to start · No credit card required</p>
        </div>
      </section>

      {/* Account linking */}
      <section className="border-y border-gray-800 bg-gray-900/50 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">Link your accounts once. That's it.</h2>
            <p className="text-gray-500 text-sm">Your accounts stay linked. Every launch after the first takes under 60 seconds.</p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Your linked accounts
            </div>
            <div className="space-y-3">
              {PLATFORMS.map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    p.connected ? "border-green-900/50 bg-green-950/20" : "border-gray-800 bg-gray-950"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${p.color}`}>{p.icon}</span>
                    <span className="text-sm font-medium text-white">{p.name}</span>
                  </div>
                  {p.connected ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">✓ Linked</span>
                      <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-400">Active</span>
                    </div>
                  ) : (
                    <button className="rounded-lg border border-gray-700 px-3 py-1 text-xs text-gray-400 hover:border-violet-600 hover:text-violet-400 transition-colors">
                      Link account →
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-violet-900/40 bg-violet-950/20 px-4 py-3 text-sm text-violet-300">
              🔒 Your login credentials are never stored. AutoLaunch only gets permission to post on your behalf — nothing else.
            </div>
          </div>
        </div>
      </section>

      {/* Platform-native posts */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">AI writes the right post for each platform</span>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">One product. Five posts, each written differently.</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              A tweet, a Product Hunt description, and a Hacker News post all need different tones and formats.
              AutoLaunch writes each one correctly — you don't have to think about it.
            </p>
          </div>
          <div className="mt-12 space-y-4">
            {PLATFORM_POSTS.map((p) => (
              <div key={p.platform} className={`rounded-xl border ${p.color} ${p.accent} p-5`}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold">{p.icon}</span>
                    <span className="text-sm font-semibold text-gray-300">{p.platform}</span>
                  </div>
                  <span className="text-xs text-gray-600">{p.chars}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-gray-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
            <div className="text-center text-xs text-gray-600 pt-2">+ Reddit and Indie Hackers posts are also generated automatically</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-bold sm:text-4xl">
            Setup takes 5 minutes. Every launch after that takes 60 seconds.
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Link your accounts",
                desc: "Sign in to X, Reddit, Product Hunt, and Indie Hackers through AutoLaunch. One-time setup — about 2 minutes total.",
                badge: "One-time setup",
                badgeColor: "text-green-400 border-green-900/50 bg-green-950/20",
              },
              {
                step: "02",
                title: "Describe your product",
                desc: "Fill in your product name, what it does, and who it's for. The same simple form every time.",
                badge: "~60 seconds",
                badgeColor: "text-violet-400 border-violet-900/50 bg-violet-950/20",
              },
              {
                step: "03",
                title: "AI writes your posts",
                desc: "AutoLaunch generates a tailored post for each platform — the right length, tone, and format for each one.",
                badge: "AI-generated",
                badgeColor: "text-blue-400 border-blue-900/50 bg-blue-950/20",
              },
              {
                step: "04",
                title: "Review and post",
                desc: "Read over each post, edit anything you want, then hit Post. All platforms go live at once — or schedule them for later.",
                badge: "One click",
                badgeColor: "text-orange-400 border-orange-900/50 bg-orange-950/20",
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="mb-2 text-5xl font-bold text-violet-800/30">{s.step}</div>
                <span className={`inline-block rounded-full border px-2 py-0.5 text-xs mb-3 ${s.badgeColor}`}>{s.badge}</span>
                <h3 className="mb-2 text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow-up Management */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">Keep the momentum going</span>
              <h2 className="mb-4 text-3xl font-bold">Launching is just the beginning.</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Most products fade after launch day because there's no follow-up.
                AutoLaunch reminds you when to post again — and writes the posts for you.
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "Day 1: Ready-to-use replies for comments on every platform",
                  "Day 3: A short update post — what you've learned so far",
                  "Week 1: A milestone post when you hit your first users",
                  "Month 1: A growth recap to share your progress",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-violet-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 space-y-3">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Upcoming posts — AutoLaunch v2.0</div>
              {[
                { label: "Comment replies", time: "Today", status: "Ready to send", color: "text-green-400" },
                { label: "Day 3 update", time: "Mar 31", status: "Scheduled", color: "text-blue-400" },
                { label: "Week 1 milestone", time: "Apr 4", status: "Draft ready", color: "text-violet-400" },
                { label: "Month 1 recap", time: "Apr 28", status: "Coming up", color: "text-gray-600" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 px-3 py-2">
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600">{item.time}</span>
                    <span className={`text-xs ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 rounded-lg border border-violet-900/40 bg-violet-950/20 px-3 py-2 text-xs text-violet-400">
                ✨ 4 comment replies written and ready for your Hacker News thread
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="border-y border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 order-2 lg:order-1">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Launch results — Last 7 days</div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Total Views", value: "12,847", delta: "+24%" },
                  { label: "Upvotes", value: "342", delta: "+18%" },
                  { label: "Link Clicks", value: "1,209", delta: "+31%" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
                    <div className="text-lg font-bold text-white">{m.value}</div>
                    <div className="text-xs text-gray-600">{m.label}</div>
                    <div className="text-xs text-green-400 mt-1">{m.delta}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { platform: "🐱 Product Hunt", pct: 42, views: "5,396" },
                  { platform: "𝕏 X (Twitter)", pct: 28, views: "3,597" },
                  { platform: "Y Hacker News", pct: 18, views: "2,312" },
                  { platform: "🤖 Reddit", pct: 8, views: "1,028" },
                  { platform: "IH Indie Hackers", pct: 4, views: "514" },
                ].map((row) => (
                  <div key={row.platform} className="flex items-center gap-3">
                    <span className="w-32 text-xs text-gray-400 shrink-0">{row.platform}</span>
                    <div className="flex-1 rounded-full bg-gray-800 h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs text-gray-600">{row.views}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">See what's actually working</span>
              <h2 className="mb-4 text-3xl font-bold">See which platform is bringing you real users.</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Views and upvotes are nice, but what matters is signups.
                AutoLaunch shows you exactly which platform is driving real traffic to your product — all in one place.
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "All 5 platforms in one dashboard — no switching tabs",
                  "See which platform sends you paying users, not just visitors",
                  "Find out the best time to post on each platform",
                  "Track every launch and see how you're improving",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-violet-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VS comparison */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Why not just do it manually?</h2>
          <p className="mb-12 text-center text-gray-500 text-sm">Here's what posting to 5 platforms by hand actually looks like.</p>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
            <div className="grid grid-cols-3 border-b border-gray-800">
              <div className="p-4 text-sm text-gray-600" />
              <div className="border-l border-gray-800 p-4 text-center text-sm font-semibold text-gray-400">Doing it yourself</div>
              <div className="border-l border-gray-800 p-4 text-center text-sm font-semibold text-violet-400">AutoLaunch</div>
            </div>
            {[
              ["Connecting accounts to post", "Set up each one manually (hours)", "✓ Done in 2 minutes"],
              ["Staying logged in over time", "Re-login every 2–3 months", "✓ Handled automatically"],
              ["Writing posts for each platform", "Rewrite from scratch every time", "✓ AI writes them for you"],
              ["Posting at the right time", "Research and schedule manually", "✓ One click"],
              ["Follow-up posts after launch", "Easy to forget", "✓ Reminded and pre-written"],
              ["Seeing results across platforms", "Check each site separately", "✓ One dashboard"],
              ["Your whole team can use it", "Needs technical setup", "✓ Anyone can use it"],
            ].map(([feature, diy, auto]) => (
              <div key={feature} className="grid grid-cols-3 border-b border-gray-800/50 last:border-0">
                <div className="p-4 text-sm text-gray-400">{feature}</div>
                <div className="border-l border-gray-800/50 p-4 text-center text-sm text-gray-600">{diy}</div>
                <div className="border-l border-gray-800/50 p-4 text-center text-sm text-green-400">{auto}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Simple Pricing</h2>
            <p className="text-gray-400">Try it free. Upgrade only when you need more.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
              <h3 className="text-lg font-bold">Free</h3>
              <div className="mt-2 mb-6 text-4xl font-bold">$0<span className="text-base font-normal text-gray-500">/mo</span></div>
              <ul className="mb-8 space-y-3 text-sm text-gray-400">
                {[
                  "3 launches per month",
                  "All 5 platforms",
                  "Account linking included",
                  "AI-written posts",
                  "Basic results view",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-green-400">✓</span> {item}</li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full rounded-xl border border-gray-700 py-3 text-center text-sm font-semibold hover:border-violet-500 transition-colors">
                Get Started Free
              </Link>
            </div>
            <div className="relative rounded-2xl border border-violet-600 bg-gray-900 p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold">Pro</h3>
              <div className="mt-2 mb-6 text-4xl font-bold">$19<span className="text-base font-normal text-gray-500">/mo</span></div>
              <ul className="mb-8 space-y-3 text-sm text-gray-400">
                {[
                  "Unlimited launches",
                  "All 5 platforms",
                  "Auto re-login (never expires)",
                  "Smart scheduling",
                  "Full analytics dashboard",
                  "Automated follow-up posts",
                  "Comment reply templates",
                  "Best time to post suggestions",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-violet-400">✓</span> {item}</li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-center text-sm font-semibold hover:opacity-90 transition-opacity">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Stop spending launch day writing posts.</h2>
          <p className="mb-8 text-gray-400">
            Set up once. Then every launch takes 60 seconds — start to finish.
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-10 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
          >
            Start for Free →
          </Link>
          <p className="mt-4 text-xs text-gray-600">Setup takes 2 minutes · No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-violet-600 to-purple-600">
              <span className="text-xs font-bold">AL</span>
            </div>
            <span className="font-semibold">AutoLaunch</span>
          </div>
          <p className="text-sm text-gray-600">© 2026 AutoLaunch. Built by indie hackers, for indie hackers.</p>
        </div>
      </footer>
    </div>
  );
}
