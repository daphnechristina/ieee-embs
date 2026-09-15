import BeamsBackground from "@/components/ui/BeamsBackground";
import Hero from "@/components/about-us/Hero";
import LatestNews from "@/components/home/LatestNews";
import AboutSection from "@/components/about-us/AboutSection";
import EventsRolodex from "@/components/events/EventsRolodex";
import BlogsStack from "@/components/blogs/BlogsStack";
import BoardGrid from "@/components/board/BoardGrid";
import EcgPeakGame from "@/components/game/EcgPeakGame";
import IntroAnimation from "@/components/ui/IntroAnimation";
import Navbar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent w-full overflow-x-hidden">
      <IntroAnimation />
      <div className="fixed inset-0 z-0 ...">
        <BeamsBackground />
      </div>
      <Navbar />
        <Hero/>

        <section id="news" className="py-20">
          <div className="container mx-auto px-4">
            <LatestNews />
          </div>
        </section>

        {/* Squad: About Us 
        <section id="about" className="py-20 container mx-auto px-4">
          <AboutSection />
        </section>*/}

        {/* Squad: Events */}
        <section id="events" className="py-20">
          <div className="container mx-auto px-4">
          <div className="relative z-10">
          <h1 className="text-3xl font-sans font-semibold tracking-relaxed text-white">Events</h1>
          {/*<p
            className="text-sm uppercase"
            style={{
              letterSpacing: "0.1em",
              background: "linear-gradient(90deg, #45bed6 0%, #f0c4da 45%, #d85897 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A glimpse of our work
          </p>*/}
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

        {/* Squad: Board 
        <section id="board" className="py-20">
          <div className="container mx-auto px-4">
            <BoardGrid />
          </div>
        </section>*/}

        {/* Squad: Game 
        <section id="game" className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative z-10 mb-2 text-center">
              <h1
                className="text-6xl font-semibold font-serif tracking-wide text-white mb-2"
                style={{ textShadow: "0 0 24px rgba(69,190,214,0.28)" }}
              >
                ECG PEAK GAME
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
                Try it out :)
              </p>
            </div>
            <EcgPeakGame />
          </div>
        </section>*/}
      </main>
  );
}