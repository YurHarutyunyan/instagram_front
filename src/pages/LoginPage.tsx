import { LOGIN_URL } from '../api/client'

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Mango — Instagram replies</h1>
        <p className="mt-3 text-sm text-slate-600">
          Answers your business's Instagram direct messages and comments automatically, and lets you
          read and reply to them here.
        </p>
        <a
          href={LOGIN_URL}
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Log in with Instagram
        </a>
        <p className="mt-4 text-xs text-slate-500">
          You'll be taken to Instagram to log in to your Business or Creator account and choose what this
          app may access. We never see your Instagram password.
        </p>
        <p className="mt-6 text-xs text-slate-400">
          <a className="underline" href="/api/privacy.html">Privacy policy</a> ·{' '}
          <a className="underline" href="/api/terms.html">Terms</a> ·{' '}
          <a className="underline" href="/api/data-deletion.html">Data deletion</a>
        </p>
      </div>
    </div>
  )
}
