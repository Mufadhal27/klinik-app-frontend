function Hero() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background Image */}
      <div className="absolute inset-0 mt-10 bg-[url('assets/img/hero.jpeg')] bg-cover bg-center brightness-40" />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-screen flex flex-col justify-center lg:px-32 px-5 min-h-screen">
        <div className="w-full lg:w-4/5 space-y-5">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-emerald-600">Medisia -</span> Solusi Kesehatan Modern untuk Anda.
          </h1>
          <p className="text-lg text-gray-100">
             Klinik terpercaya dengan pelayanan cepat, nyaman, dan penuh kepedulian.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
