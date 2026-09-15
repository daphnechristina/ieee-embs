import AboutSection from "@/components/about-us/AboutSection";
import BoardGrid from "@/components/board/BoardGrid";
import BeamsBackground from "@/components/ui/BeamsBackground";
import Navbar from "@/components/ui/NavBar";

export default function About() {
    return (
        <main className="relative min-h-screen bg-transparent w-full overflow-x-hidden">
            <div className="fixed inset-0 z-0 ...">
                <BeamsBackground />
            </div>
            <Navbar />
            <section id="about" className="container mx-auto px-4">
                <AboutSection />
            </section>

            <section id="contact" className="py-20">
                <BoardGrid />
            </section>
        </main>
    );
}