export function GlobalVideoHero() {
  return (
    <section className="relative h-96 w-full overflow-hidden sm:h-120">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/45" />
    </section>
  );
}
