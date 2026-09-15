import Navbar from "@/components/ui/NavBar";

interface EventItem {
  date: string;
  year: string;
  title: string;
  image: string;
  description: string;
}

const events: EventItem[] = [
  {
    date: "Mar 25",
    year: "2026",
    title: "The Silent Toxin",
    image: "/events/silenttoxin.jpeg",
    description:
      "A mystery-driven biomedical challenge exploring hidden toxins, diagnosis, and critical thinking through immersive problem-solving.",
  },
  {
    date: "Feb",
    year: "2026",
    title: "ElectroBio",
    image: "/events/electro-bio.jpg.jpeg",
    description:
      "An innovation showcase where participants presented biomedical engineering projects blending electronics, healthcare, and futuristic technology.",
  },
  {
    date: "Feb 10",
    year: "2026",
    title: "Crypt-a-Pharm",
    image: "/events/cryptapharmm.jpg.jpeg",
    description:
      "A pharmaceutical decoding challenge combining medical clues, chemistry, and strategy in a high-energy competitive experience.",
  },
  {
    date: "Sep 26",
    year: "2025",
    title: "404: Cure Not Found",
    image: "/events/curenotfound.jpg.jpeg",
    description:
      "A biomedical mystery event where participants searched for missing cures through diagnosis puzzles, research clues, and medical reasoning.",
  },
  {
    date: "Jul 23",
    year: "2025",
    title: "Bio Bluff",
    image: "/events/bioblufff.jpeg",
    description:
      "An interactive challenge of scientific deception, deduction, and biomedical trivia where participants separated facts from convincing bluffs.",
  },
  {
    date: "Jun",
    year: "2025",
    title: "Inventrek",
    image: "/events/iventrek.jpg.jpeg",
    description:
      "A creativity-driven innovation event encouraging participants to ideate futuristic biomedical solutions and breakthrough healthcare concepts.",
  },
  {
    date: "Apr 7",
    year: "2025",
    title: "Lab-on-a-Chip",
    image: "/events/labonchip.jpg.jpeg",
    description:
      "An insightful session exploring advanced lab-on-chip technologies and their revolutionary applications in neuroscience and precision medicine.",
  },
  {
    date: "Mar 6",
    year: "2025",
    title: "BioConnect",
    image: "/events/bioconnect.jpeg",
    description:
      "A networking and collaboration experience bringing together curious minds passionate about biomedical engineering and healthcare innovation.",
  },
  {
    date: "Sep 29",
    year: "2024",
    title: "Lab of Lunacy",
    image: "/events/laboflunacy.jpeg",
    description:
      "A biomedical escape room where participants solved medical mysteries and experimental challenges hidden within a mad scientist’s lab.",
  },
  {
    date: "Sep 21",
    year: "2024",
    title: "Circuit of Lies",
    image: "/events/circuitoflies.jpeg",
    description:
      "Circuit of Lies was a hands-on workshop where participants built a lie detector from scratch and tested it on themselves and friends.",
  },
  {
    date: "Aug 21",
    year: "2024",
    title: "CASA",
    image: "/events/casa.jpg.jpeg",
    description:
      "An engaging biomedical initiative focused on collaboration, awareness, and interactive learning through creative scientific activities.",
  },
  {
    date: "Jul 8",
    year: "2024",
    title: "Nexum",
    image: "/events/nexum.jpg.jpeg",
    description:
      "An exploration of emerging biomedical breakthroughs and innovative pathways shaping the future of diagnosis and treatment.",
  },
  {
    date: "Jun 26",
    year: "2024",
    title: "Road to Recovery",
    image: "/events/roadtorecovery.jpg.jpeg",
    description:
      "A healthcare-focused event highlighting patient recovery journeys, medical innovation, and the science behind rehabilitation.",
  },
  {
    date: "Mar 19",
    year: "2024",
    title: "CrisisX 2.0",
    image: "/events/crisisx2024.jpeg",
    description:
      "A medical emergency simulation event where students see the daily lives of healthcare professionals motivating them to innovate making emergency healthcare more efficient.",
  },
  {
    date: "Jun 7",
    year: "2023",
    title: "CrisisX",
    image: "/events/crisisx2023.jpeg",
    description:
      "An immersive emergency-response challenge where participants tackled critical healthcare scenarios with technology and developed decision-making skills under pressure.",
  },
];

export default function EventsPage() {
  return (
    <section className="min-h-screen w-full bg-transparent text-white px-6 md:px-16 py-16 font-sans">
        <Navbar />
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
            IEEE EMBS Events
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-1 text-white">
            ARCHIVE
          </h1>
        </div>
        <p className="text-sm text-zinc-400 max-w-sm">
          Explore our complete history of biomedical workshops, hackathons, and scientific challenges.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={`${event.title}-${event.year}`}
            className="group cursor-pointer flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-3">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[11px] font-medium text-white">
                {event.date}, {event.year}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors tracking-tight">
                  {event.title}
                </h3>
                <span className="text-xs text-zinc-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}