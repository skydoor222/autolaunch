export default function OGCard() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      {/* Tweet Card 1 — メイン告知 */}
      <div className="w-[600px] space-y-6">

        {/* Card 1: メイン */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
          {/* OGP Image area */}
          <div className="relative h-72 bg-gradient-to-br from-gray-950 via-violet-950/40 to-gray-950 flex flex-col items-center justify-center overflow-hidden px-8">
            {/* bg glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
            </div>
            {/* Logo */}
            <div className="relative mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
                <span className="text-lg font-bold text-white">AL</span>
              </div>
              <span className="text-2xl font-bold text-white">AutoLaunch</span>
            </div>
            <p className="relative text-center text-3xl font-bold text-white leading-tight mb-3">
              一度の連携で、<br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                5プラットフォーム全自動。
              </span>
            </p>
            <p className="relative text-sm text-gray-500 text-center">autolaunch.vercel.app</p>
            {/* platform icons row */}
            <div className="relative mt-4 flex items-center gap-3">
              {["🐱", "𝕏", "Y", "🤖", "IH"].map((icon, i) => (
                <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-xs font-bold text-white">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tweet text */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-3 text-xs text-gray-600 uppercase tracking-widest">投稿テキスト案 ①</div>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{`🚀 AutoLaunch リリースしました。

サービス情報を1回入力するだけで、ProductHunt・X・HackerNews・Reddit・Indie Hackersに自動配布。

AIが各プラットフォームに最適化した投稿文を生成 → OAuth連携済みなのでそのまま投稿。

個人開発のローンチに使ってみてください👇
autolaunch.vercel.app

#個人開発 #buildinpublic`}</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-3 text-xs text-gray-600 uppercase tracking-widest">投稿テキスト案 ② （短め）</div>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{`「Claude Codeでも投稿文は作れる」

そう、でも5つのAPIトークン管理して、90日ごとに再認証して、プラットフォームごとにプロンプト書き直しますか？

→ AutoLaunchはOAuth一度繋ぐだけ。あとは永遠にワンクリック。

autolaunch.vercel.app #個人開発`}</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-3 text-xs text-gray-600 uppercase tracking-widest">投稿テキスト案 ③ （英語・グローバル向け）</div>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{`Just shipped AutoLaunch 🚀

Connect your accounts once → AI generates platform-native posts → distribute to 5 platforms with one click.

No API tokens. No re-auth every 90 days. No rewriting the same post 5 times.

Try it free → autolaunch.vercel.app

#buildinpublic #indiehacker #sideproject`}</p>
        </div>

      </div>
    </div>
  );
}
