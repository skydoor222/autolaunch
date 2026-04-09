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
    text: `🚀 AutoLaunch をリリースしました。\n\nサービス情報を1回入力するだけで、5つのプラットフォームに自動投稿。同じ文章を書き直す作業、もう終わりにしませんか。\n\nautolaunch.vercel.app #個人開発 #indiehacker`,
    chars: "140文字",
  },
  {
    platform: "Product Hunt",
    icon: "🐱",
    color: "border-orange-900/50",
    accent: "bg-orange-950/30",
    text: `**AutoLaunch** — 一度の入力で、5プラットフォームに同時投稿\n\nTagline: Ship once, launch everywhere\n\nAIが各プラットフォームに合った投稿文を自動で作成。ProductHunt・X・HackerNews・Reddit・Indie Hackersに一発で配布できます。`,
    chars: "PH形式",
  },
  {
    platform: "Hacker News",
    icon: "Y",
    color: "border-orange-900/50",
    accent: "bg-orange-950/20",
    text: `Show HN: AutoLaunch – distribute your launch to 5 platforms with one click\n\nBuilt this because I was spending half my launch day rewriting announcements. AI generates platform-appropriate posts from a single form.`,
    chars: "HN形式",
  },
];

export default function JaPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-28 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-700/50 bg-violet-900/20 px-4 py-1.5 text-sm text-violet-300">
            <span className="mr-2">🔑</span>
            アカウントを一度つなぐだけ。あとはずっとワンクリック。
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            一度書いたら、
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              5か所に自動で届く。
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-xl text-gray-400 leading-relaxed">
            サービスの説明を一つのフォームに入力するだけ。AutoLaunchが各プラットフォームに合った投稿文を作成し、全部まとめて自動で投稿します。
            <span className="text-white font-medium"> コピペも書き直しも一切不要。</span>
          </p>
          <p className="mx-auto mb-10 max-w-xl text-sm text-gray-600">
            「自分で投稿文を作れる」—— そうです。でも5か所分を書き直して、アカウントにログインして、タイミングを見て投稿して……それを毎回やりますか？
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
            >
              無料で始める →
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-xl border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              仕組みを見る
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-600">初期設定2分 · クレジットカード不要</p>
        </div>
      </section>

      {/* Account Connect Section */}
      <section className="border-y border-gray-800 bg-gray-900/50 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">アカウントをつなぐのは最初の一回だけ。</h2>
            <p className="text-gray-500 text-sm">つないだままにしておけば、次回のローンチは60秒で完了します。</p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              接続済みのアカウント
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
                      <span className="text-xs text-green-400">✓ 接続済み</span>
                      <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-400">有効</span>
                    </div>
                  ) : (
                    <button className="rounded-lg border border-gray-700 px-3 py-1 text-xs text-gray-400 hover:border-violet-600 hover:text-violet-400 transition-colors">
                      接続する →
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-violet-900/40 bg-violet-950/20 px-4 py-3 text-sm text-violet-300">
              🔒 ログイン情報は保存しません。投稿する権限だけをお預かりしています。接続は自動で維持されます。
            </div>
          </div>
        </div>
      </section>

      {/* Cross-platform posts */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">プラットフォームごとに最適化</span>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">一つの情報から、5つの投稿文が生まれる。</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              プラットフォームによって読者も文化も違います。同じ文章をコピペするのではなく、それぞれに合った書き方で自動的に作成します。
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
            <div className="text-center text-xs text-gray-600 pt-2">+ Reddit・Indie Hackers向けも自動で作成</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-bold sm:text-4xl">
            初回の設定は5分。2回目以降は60秒。
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "アカウントを接続",
                desc: "X・Reddit・ProductHuntなど、使いたいサービスにログインするだけ。一度やればずっと使えます。",
                badge: "最初だけ",
                badgeColor: "text-green-400 border-green-900/50 bg-green-950/20",
              },
              {
                step: "02",
                title: "サービス情報を入力",
                desc: "サービス名・説明・主な特徴を入力します。毎回同じフォームでOKです。",
                badge: "60秒",
                badgeColor: "text-violet-400 border-violet-900/50 bg-violet-950/20",
              },
              {
                step: "03",
                title: "AIが投稿文を作成",
                desc: "AIが5プラットフォーム分の投稿文を、それぞれに合った書き方で一気に作ります。",
                badge: "自動生成",
                badgeColor: "text-blue-400 border-blue-900/50 bg-blue-950/20",
              },
              {
                step: "04",
                title: "確認して投稿",
                desc: "内容を確認したら、ボタン一つで全プラットフォームに一斉投稿。投稿日時の予約もできます。",
                badge: "ワンクリック",
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

      {/* Follow-up */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">ローンチ後のフォロー</span>
              <h2 className="mb-4 text-3xl font-bold">ローンチ当日だけで終わらない。</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                多くのローンチが伸びない理由の一つは、投稿した後に何もしないから。AutoLaunchはその後の投稿文も自動で作成し、ちょうどいいタイミングでお知らせします。
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "当日: コメントへの返信テンプレートを自動作成",
                  "3日後: 「やってみてわかったこと」の投稿文",
                  "1週間後: 初めて100人に使ってもらったなどの報告投稿",
                  "1か月後: Indie Hackers向けの振り返りレポート",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-violet-400">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 space-y-3">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">フォローアップの予定 — AutoLaunch v2.0</div>
              {[
                { label: "返信テンプレート", time: "今日", status: "準備完了", color: "text-green-400" },
                { label: "3日後のアップデート", time: "3/31", status: "予約済み", color: "text-blue-400" },
                { label: "1週間後の報告", time: "4/4", status: "下書き完成", color: "text-violet-400" },
                { label: "1か月後のレポート", time: "4/28", status: "待機中", color: "text-gray-600" },
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
                ✨ HNのコメント返信テンプレートを4件作成しました
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="border-y border-gray-800 bg-gray-900/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 order-2 lg:order-1">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">ローンチの成果 — 直近7日間</div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "総表示数", value: "12,847", delta: "+24%" },
                  { label: "高評価", value: "342", delta: "+18%" },
                  { label: "クリック数", value: "1,209", delta: "+31%" },
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
                    <span className="w-36 text-xs text-gray-400 shrink-0">{row.platform}</span>
                    <div className="flex-1 rounded-full bg-gray-800 h-1.5">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-12 text-right text-xs text-gray-600">{row.views}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block rounded-full border border-violet-700/50 bg-violet-900/20 px-3 py-1 text-xs text-violet-400 mb-4">成果の可視化</span>
              <h2 className="mb-4 text-3xl font-bold">どこからユーザーが来ているか、一目でわかる。</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                全プラットフォームの表示回数・クリック数・登録数を一つの画面で確認できます。「どこからの投稿が実際に使ってもらえたか」がはっきりわかります。
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "5プラットフォームの成果をまとめて確認",
                  "実際にサービス登録につながった流入元を特定",
                  "過去のローンチと比較して改善",
                  "投稿時間ごとの効果を学習",
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
          <h2 className="mb-12 text-center text-3xl font-bold">自分でやるのと何が違うの？</h2>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
            <div className="grid grid-cols-3 border-b border-gray-800">
              <div className="p-4 text-sm text-gray-600" />
              <div className="border-l border-gray-800 p-4 text-center text-sm font-semibold text-gray-400">自分でやる場合</div>
              <div className="border-l border-gray-800 p-4 text-center text-sm font-semibold text-violet-400">AutoLaunch</div>
            </div>
            {[
              ["各サービスへのログイン・設定", "手動（数時間かかることも）", "✓ はじめから設定済み"],
              ["ログインが切れたときの再接続", "数か月ごとに手動対応", "✓ 自動で維持"],
              ["プラットフォームごとの書き直し", "毎回自分で作成", "✓ AIが自動生成"],
              ["複数サービスへの同時投稿", "一つずつ手作業", "✓ ワンクリック"],
              ["その後のフォロー投稿", "カレンダーと記憶頼み", "✓ 自動でリマインド"],
              ["どこから来たか確認する", "バラバラに確認", "✓ 一画面でまとめて確認"],
              ["デザイナーや非エンジニアも使える", "難しい", "✓ 誰でも使える"],
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
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">シンプルな料金体系</h2>
            <p className="text-gray-400">まず無料で試して、必要になったらアップグレードしてください。</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
              <h3 className="text-lg font-bold">無料</h3>
              <div className="mt-2 mb-6 text-4xl font-bold">$0<span className="text-base font-normal text-gray-500">/月</span></div>
              <ul className="mb-8 space-y-3 text-sm text-gray-400">
                {["月3回まで投稿", "全5プラットフォーム対応", "アカウント接続機能", "AI投稿文の自動作成", "基本的な成果確認"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-green-400">✓</span> {item}</li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full rounded-xl border border-gray-700 py-3 text-center text-sm font-semibold hover:border-violet-500 transition-colors">
                無料で始める
              </Link>
            </div>
            <div className="relative rounded-2xl border border-violet-600 bg-gray-900 p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-semibold whitespace-nowrap">
                最も人気
              </div>
              <h3 className="text-lg font-bold">Pro</h3>
              <div className="mt-2 mb-6 text-4xl font-bold">$19<span className="text-base font-normal text-gray-500">/月</span></div>
              <ul className="mb-8 space-y-3 text-sm text-gray-400">
                {[
                  "投稿回数無制限",
                  "全5プラットフォーム対応",
                  "接続が自動で維持される",
                  "投稿時間の予約設定",
                  "詳細な成果ダッシュボード",
                  "フォローアップ投稿の自動作成",
                  "コメント返信テンプレート",
                  "効果の高い投稿時間の提案",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-violet-400">✓</span> {item}</li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-center text-sm font-semibold hover:opacity-90 transition-opacity">
                Proを無料で試す
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">ローンチ当日を、投稿作業に使わないでください。</h2>
          <p className="mb-8 text-gray-400">
            初回の設定は5分。2回目以降は60秒で完了します。
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-10 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 hover:opacity-90 transition-opacity"
          >
            無料で始める →
          </Link>
          <p className="mt-4 text-xs text-gray-600">初期設定2分 · クレジットカード不要</p>
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
          <p className="text-sm text-gray-600">© 2026 AutoLaunch. 個人開発者のために、個人開発者が作りました。</p>
        </div>
      </footer>
    </div>
  );
}
