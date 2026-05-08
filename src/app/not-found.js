import Image from "next/image";
import Link from "next/link";

const backgroundStyle = {
  background:
    "radial-gradient(1200px 520px at 8% 12%, rgba(var(--color-primary-container-rgb), 0.35), transparent 60%)," +
    "radial-gradient(900px 520px at 88% 18%, rgba(var(--color-primary-rgb), 0.25), transparent 62%)," +
    "linear-gradient(135deg, var(--color-surface-container-lowest), var(--color-surface))",
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-16" style={backgroundStyle}>
      <section className="w-full max-w-6xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-outline-variant)] bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-on-surface-variant)]">
            404
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-primary)] pearl-disc-rotate" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[color:var(--color-on-surface)]">
            This route is off the map.
            <span className="block text-[color:var(--color-on-surface-variant)]">Nice try, detective.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[color:var(--color-on-surface-variant)] max-w-xl">
            The page you are hunting does not exist. Why are you poking around my website like a secret
            agent? Grab a safe link below before the lasers reset.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-primary)] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[color:rgba(var(--color-primary-rgb),0.35)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Take me home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-outline-variant)] bg-white/80 px-6 py-3 text-base font-semibold text-[color:var(--color-on-surface)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Report a broken link
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full border border-[color:var(--color-outline-variant)] bg-white/70 pearl-disc-rotate" />
          <div className="absolute -bottom-8 right-8 h-24 w-24 rounded-full bg-[color:var(--color-primary-container)]/60 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-outline-variant)] bg-white/90 p-6 shadow-2xl">
            <Image
              src="/team/placeholder.png"
              alt="K-Hub team placeholder"
              width={520}
              height={520}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
            <div className="mt-4 flex items-center justify-between text-sm text-[color:var(--color-on-surface-variant)]">
              <span>Lost explorer, meet the K-Hub crew stand-in.</span>
              <span className="font-semibold text-[color:var(--color-on-surface)]">Placeholder Squad</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
