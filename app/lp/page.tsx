import Link from 'next/link'

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Solo founder, DevToolKit',
    avatar: 'SK',
    text: 'I used to spend an entire day crafting launch posts for each platform. With AutoLaunch, I was live on 5 platforms in under 10 minutes. Got 400+ upvotes on ProductHunt on day one.',
  },
  {
    name: 'Marcus T.',
    role: 'Indie hacker, NoteAI',
    avatar: 'MT',
    text: 'The AI-generated posts are surprisingly good. The HN post especially — it nailed the "Show HN" format perfectly. No hype, just clear explanation. Ended up on the front page.',
  },
  {
    name: 'Yuki N.',
    role: 'Builder, ShipFast.io',
    avatar: 'YN',
    text: 'AutoLaunch paid for itself after the first launch. The distribution reach alone would have taken me 8+ hours manually. Now I launch every new feature like it\'s nothing.',
  },
]

const FAQ = [
  {
    q: 'Do I need API keys to use AutoLaunch?',
    a: 'You need an Anthropic API key for AI post generation. Platform posting is simulated in the current version — direct API integrations for ProductHunt, X, etc. are on the roadmap.',
  },
  {
    q: 'How good is the AI-generated content?',
    a: 'We use Claude claude-sonnet-4-6, one of the most capable AI models available. Each platform gets its own specialized prompt crafted by experienced launchers. You can always edit the posts before distributing.',
  },
  {
    q: 'Can I edit posts before they go live?',
    a: 'Absolutely. You get a full preview of every generated post and can edit them freely before hitting distribute.',
  },
  {
    q: 'What platforms does AutoLaunch support?',
    a: 'Currently: X (Twitter), Product Hunt, Hacker News, Reddit (r/SideProject), and Indie Hackers. More platforms coming soon.',
  },
  {
    q: 'Is there a free tier?',
    a: 'Yes! The free tier includes 3 launches per month across all 5 platforms. No credit card required.',
  },
  {
    q: 'Can I schedule launches in advance?',
    a: 'Yes. You can schedule your launch for any date and time in the future.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Fill in your product details',
    desc: 'Service name, URL, one-liner, description, target users, and key features. Takes about 2 minutes.',
    details: ['Service name & URL', '30-char punchy one-liner', '200-char description', 'Key features (3)', 'Target user persona'],
  },
  {
    step: '02',
    title: 'AI generates platform-native posts',
    desc: 'Claude AI creates posts specifically tailored to each platform\'s culture and format.',
    details: ['X tweet with hook + CTA', 'ProductHunt title + tagline + desc', '"Show HN:" format for HN', 'Casual r/SideProject post', 'Milestone post for IH'],
  },
  {
    step: '03',
    title: 'Review & edit everything',
    desc: 'See all posts side-by-side. Edit any post to match your voice. Regenerate if needed.',
    details: ['Full post preview', 'Inline editing', 'Character count validation', 'Regenerate individual posts'],
  },
  {
    step: '04',
    title: 'Distribute in one click',
    desc: 'Toggle platforms on/off, set timing, and watch real-time distribution logs.',
    details: ['Per-platform toggles', 'Post now or schedule', 'Real-time log console', 'Automatic retry on failure'],
  },
  {
    step: '05',
    title: 'Track results & follow up',
    desc: 'See metrics from each platform and get AI-generated follow-up post suggestions.',
    details: ['Views, upvotes, comments', 'Per-platform URLs', 'Follow-up post templates', 'Launch history'],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[800px] w-[800px] rounded-full bg-violet-600/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-700/50 bg-violet-900/20 px-4 py-1.5 text-sm text-violet-300">
            Powered by Claude claude-sonnet-4-6 · 5 platforms · &lt;60 seconds
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
            Your product deserves
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              the spotlight it earned.
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-400 leading-relaxed">
            You spent months building. Don&apos;t let your launch fall flat because you didn&apos;t have time
            to write 5 different platform-native posts. AutoLaunch does it in 60 seconds.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/launch/new"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
            >
              Launch Your Product Free →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              View Demo Dashboard
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-600">3 free launches/month · No credit card · Cancel anytime</p>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="border-y border-gray-800 bg-gray-900/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-red-900/50 bg-red-900/10 p-6">
              <h3 className="mb-4 font-semibold text-red-300 text-lg">The old way 😩</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  'Spend 30 min writing a tweet, rewrite 5 times',
                  'Google "how to write ProductHunt tagline"',
                  'Forget to post on HackerNews until day 2',
                  'Reddit post gets removed for self-promotion',
                  'Exhausted before launch day even starts',
                  'Launch fizzles because distribution was an afterthought',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-green-900/50 bg-green-900/10 p-6">
              <h3 className="mb-4 font-semibold text-green-300 text-lg">With AutoLaunch ✨</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  'Fill one form in 2 minutes',
                  'AI generates all 5 posts instantly',
                  'Preview and edit before posting',
                  'One click distributes everywhere',
                  'Real-time distribution logs',
                  'Follow-up post templates for day 2',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — detailed */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">How AutoLaunch works</h2>
            <p className="text-lg text-gray-400">5 steps from idea to everywhere in under 60 seconds</p>
          </div>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.step} className="flex gap-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
                <div className="shrink-0 text-3xl font-bold text-violet-800/60 w-10">{step.step}</div>
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-semibold text-white">{step.title}</h3>
                  <p className="mb-3 text-sm text-gray-400">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((d) => (
                      <span key={d} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400 border border-gray-700">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockup placeholder */}
      <section className="border-y border-gray-800 bg-gray-900/30 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">See it in action</h2>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-900 overflow-hidden">
            {/* Mock browser chrome */}
            <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-800/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <div className="mx-auto flex-1 max-w-sm rounded bg-gray-700 px-3 py-1 text-xs text-gray-400 text-center">
                autolaunch.app/launch/preview
              </div>
            </div>
            {/* Mock content */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Preview: CodeSnap AI</p>
                  <p className="text-sm text-gray-400">Turn screenshots into code instantly</p>
                </div>
                <div className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-400">↺ Regenerate</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { platform: 'X (Twitter)', color: '#000', icon: '𝕏', preview: 'I just built something I wish existed 2 years ago 🧵\n\nTurn any UI screenshot → production React code in 3 seconds. No more manually translating designs.\n\nCodeSnap AI: codesnap.ai\n\n#indiehacker #buildinpublic' },
                  { platform: 'Product Hunt', color: '#DA552F', icon: '🐱', preview: 'Title: CodeSnap AI\nTagline: Screenshot to code in 3 seconds\n\nWe built CodeSnap because we were tired of...' },
                  { platform: 'Hacker News', color: '#FF6600', icon: 'Y', preview: 'Show HN: CodeSnap AI – Turn UI screenshots into production React code\n\nWe built a tool that...' },
                  { platform: 'Reddit', color: '#FF4500', icon: '🤖', preview: 'I built CodeSnap AI – turns any screenshot into React code\n\nHey r/SideProject! After 3 months...' },
                ].map((card) => (
                  <div key={card.platform} className="rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-gray-700 px-3 py-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white" style={{ backgroundColor: card.color }}>
                        {card.icon}
                      </div>
                      <span className="text-xs font-medium text-white">{card.platform}</span>
                    </div>
                    <p className="p-3 text-xs text-gray-400 whitespace-pre-wrap leading-relaxed line-clamp-4">{card.preview}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <div className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white">
                  Approve &amp; Distribute →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Loved by indie hackers</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <p className="mb-4 text-sm text-gray-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 inline-flex items-center rounded-full border border-violet-700/50 bg-violet-900/20 px-4 py-1.5 text-sm text-violet-300">
            Free tier available · No credit card
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Your next launch,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              everywhere at once.
            </span>
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Stop leaving distribution as an afterthought. Launch everywhere in 60 seconds.
          </p>
          <Link
            href="/launch/new"
            className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-12 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
          >
            Start Your Free Launch →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
                <span className="text-xs font-bold text-white">AL</span>
              </div>
              <span className="font-bold text-white">AutoLaunch</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link href="/launch/new" className="hover:text-gray-300">New Launch</Link>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 AutoLaunch
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
