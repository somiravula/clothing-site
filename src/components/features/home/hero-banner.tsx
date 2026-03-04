import Image from "next/image";

export const HeroBanner = () => {
  return (
    <section className="relative h-[400px] w-full bg-[#D1D5DB] overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-20 pointer-events-none">
        <h1 className="text-7xl font-light tracking-tight text-white leading-[0.9] select-none">
          Simple <br />
          <span className="italic font-serif ml-4">is More</span>
        </h1>
      </div>

      <div className="absolute inset-0 z-10 flex justify-center items-end">
        <div className="relative h-[95%] w-full max-w-4xl">
          <Image
            src="/hero.png"
            alt="Stella Hero Model"
            fill
            priority
            className="object-contain object-bottom animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0" />
    </section>
  );
};
