import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { ContactButton } from "./ContactButton";
import heroPortrait from "@/assets/amen-portrait.png";
import solusLogo from "@/assets/solus-logo.jpg";
import { INTRO_HERO_OFFSET as OFF } from "@/lib/intro";

const NAV_LINKS = ["About", "Skills", "Services", "Projects", "Contact"];

export function HeroSection() {
  return (
    <section className="h-screen flex flex-col relative" style={{ overflowX: "clip" }}>
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={OFF + 0}
        y={-20}
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-nowrap sm:justify-between sm:gap-0 px-6 md:px-10 pt-6 md:pt-8 relative z-20"
      >
        <div className="relative flex basis-full justify-center sm:block sm:basis-auto">
          <div className="relative h-10 w-10 md:h-11 md:w-11">
            <img
              id="solus-nav-logo"
              src={solusLogo}
              alt="SOLUS"
              className="h-full w-full rounded-full"
              draggable={false}
            />
            <span
              id="solus-nav-pulse"
              className="pointer-events-none absolute inset-0 rounded-full border border-[#b99342] opacity-0"
            />
          </div>
        </div>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="
              text-[#D7E2EA]
              font-medium
              uppercase
              tracking-wider
              text-sm
              md:text-lg
              lg:text-[1.4rem]
              hover:opacity-70
              transition-opacity duration-200
            "
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Title */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-2">
        <FadeIn delay={OFF + 0.15} y={40}>
          <h1
            className="
              hero-heading
              font-black
              uppercase
              tracking-tight
              leading-none
              whitespace-nowrap
              w-full
              text-[14vw]
              sm:text-[15vw]
              md:text-[16vw]
              lg:text-[17.5vw]
            "
          >
            Hi, i&apos;m Amen
          </h1>
        </FadeIn>
      </div>

      {/* Description + Button */}
      <div
        className="
          mt-auto
          flex
          justify-between
          items-end
          pb-7
          sm:pb-8
          md:pb-10
          px-6
          md:px-10
          relative
          z-20
        "
      >
        <FadeIn delay={OFF + 0.35} y={20}>
          <p
            className="
              text-[#D7E2EA]
              font-light
              uppercase
              tracking-wide
              leading-snug
              max-w-[160px]
              sm:max-w-[220px]
              md:max-w-[260px]
            "
            style={{
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            Full-stack developer building practical software and exploring the systems behind it.
          </p>
        </FadeIn>

        <FadeIn delay={OFF + 0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait */}
      <FadeIn
        delay={OFF + 0.6}
        y={30}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          z-10
          top-1/2
          -translate-y-1/2
          sm:top-auto
          sm:translate-y-0
          sm:bottom-0
          w-[280px]
          sm:w-[360px]
          md:w-[440px]
          lg:w-[520px]
        "
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={heroPortrait}
            alt="Amen portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}
