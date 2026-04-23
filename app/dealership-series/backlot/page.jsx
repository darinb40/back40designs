import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const backLotItems = [
  {
    title: 'Let Me Guess...',
    subtitle: 'Just looking, not buying today.',
    description:
      'An instant insider line for anyone who has worked a real showroom floor.',
  },
  {
    title: 'Closer High Gross',
    subtitle: 'For the real finishers.',
    description:
      'A Back Lot statement piece for the ones who know how to land it and hold the line.',
  },
  {
    title: 'No Stips',
    subtitle: 'Say less.',
    description:
      'For the people who understand exactly why those two words hit.',
  },
];

async function unlockBackLot(formData: FormData) {
  'use server';

  const password = formData.get('password');
  const expectedPassword = process.env.BACKLOT_PASSWORD;

  if (!expectedPassword) {
    redirect('/dealership-series/backlot?error=missing-config');
  }

  if (password === expectedPassword) {
    const cookieStore = await cookies();

    cookieStore.set('b40_backlot_access', 'granted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/dealership-series/backlot');
  }

  redirect('/dealership-series/backlot?error=invalid');
}

export default async function BackLotPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('b40_backlot_access')?.value === 'granted';
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-10">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-2xl md:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Back Lot Access</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              This side of the business isn&apos;t for everyone.
            </h1>

            <p className="mt-5 text-base leading-7 text-stone-300 md:text-lg md:leading-8">
              If you know, you know.
            </p>

            <form action={unlockBackLot} className="mt-8 space-y-4">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-200">
                  Enter password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-stone-950 px-5 py-3 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-white/30"
                  placeholder="Password"
                />
              </div>

              {error === 'invalid' && (
                <p className="text-sm text-red-400">Incorrect password. Try again.</p>
              )}

              {error === 'missing-config' && (
                <p className="text-sm text-amber-400">
                  Back Lot password is not configured yet. Add BACKLOT_PASSWORD to your environment variables.
                </p>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100"
              >
                Unlock Back Lot
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link
                href="/dealership-series"
                className="text-sm text-stone-300 transition hover:text-white"
              >
                ← Back to Dealership Series
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Back Lot</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            Insider-only access granted.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-stone-300 md:text-xl md:leading-8">
            Humor, pressure, language, and real-world dealership culture — built for the people who actually live this business.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {backLotItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-6 shadow-xl md:p-7"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Back Lot</p>
              <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm font-medium text-stone-400">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
