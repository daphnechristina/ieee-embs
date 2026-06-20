import BeamsBackground from "@/components/ui/BeamsBackground";
import Hero from "@/components/about-us/Hero";
import AboutSection from "@/components/about-us/AboutSection";
import EventsRolodex from "@/components/events/EventsRolodex";
import BlogsStack from "@/components/blogs/BlogsStack";
import BoardGrid from "@/components/board/BoardGrid";
import EcgPeakGame from "@/components/game/EcgPeakGame";
import Footer from "@/components/contact-us/Footer";
import IntroAnimation from "@/components/ui/IntroAnimation";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent w-full overflow-x-hidden">
      <IntroAnimation />
      <div className="fixed inset-0 z-0 ...">
        <BeamsBackground />
      </div>
        <Hero />

        {/* Squad: About Us */}
        <section id="about" className="py-20 container mx-auto px-4">
          <AboutSection />
        </section>

        {/* Squad: Events */}
        <section id="events" className="py-20">
          <div className="container mx-auto px-4">
          <div className="relative z-10 text-center">
          <h1
            className="text-6xl font-light tracking-wide text-white mb-2"
            style={{ textShadow: "0 0 24px rgba(69,190,214,0.28)" }}
          >
            EVENT TIMELINE
          </h1>
          <p
            className="text-sm uppercase"
            style={{
              letterSpacing: "0.3em",
              background: "linear-gradient(90deg, #45bed6 0%, #f0c4da 45%, #d85897 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A glimpse of our work
          </p>
        </div>
            <EventsRolodex />
          </div>
        </section>

        {/* Squad: Blogs */}
        <section id="blogs" className="py-20">
          <div className="container mx-auto px-4">
            <BlogsStack />
          </div>
        </section>

        {/* Squad: Board */}
        <section id="board" className="py-20">
          <div className="container mx-auto px-4">
            <BoardGrid />
          </div>
        </section>

        {/* Squad: Game */}
        <section id="game" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-white uppercase mb-12">ECG Rhythm Game</h2>
            <EcgPeakGame />
          </div>
        </section>

        {/* Squad: UI (Footer) */}
        <Footer />
      </main>
  );
}