import BeamsBackground from "@/components/ui/BeamsBackground"; // The v0 component
import Hero from "@/components/about-us/Hero";
import AboutSection from "@/components/about-us/AboutSection";
import EventsRolodex from "@/components/events/EventsRolodex";
import BlogsStack from "@/components/blogs/BlogsStack";
import BoardGrid from "@/components/board/BoardGrid";
import EcgPeakGame from "@/components/game/EcgPeakGame";
import Footer from "@/components/contact-us/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden">
      
      {/* 1. THE BACKGROUND LAYER */}
      {/* This stays fixed while the page scrolls */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BeamsBackground />
      </div>

      {/* 2. THE CONTENT LAYER */}
      {/* This sits on top (z-10) and scrolls normally */}
      <div className="relative z-10 w-full">
        
        {/* Squad: About-Us */}
        <Hero />
        
        <section id="about" className="py-20 container mx-auto px-4">
          <AboutSection />
        </section>

        {/* Squad: Events */}
        <section id="events" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-white uppercase mb-12">Event Timeline</h2>
            <EventsRolodex />
          </div>
        </section>

        {/* Squad: Blogs */}
        <section id="blogs" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-[#ffffff] uppercase mb-12">Blogs</h2>
            <BlogsStack />
          </div>
        </section>

        {/* Squad: Board */}
        <section id="board" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-white uppercase mb-12">Board</h2>
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
        
      </div>
    </main>
  );
}