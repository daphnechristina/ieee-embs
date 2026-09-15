import Navbar from "@/components/ui/NavBar";

interface Blog {
  id: string;
  title: string;
  author: string;
  desc: string;
  link: string;
  image: string;
}

const blogs: Blog[] = [
  {
    id: "1.biomedical-exoskeleton",
    title: "Biomedical Exoskeleton",
    author: "Tejaswini Borreddi",
    desc: "Dive into how biomedical exoskeletons are making waves of change in the work and health sector!",
    link: "https://medium.com/ieee-embsdiaries/into-the-engineering-marvel-that-may-end-wheelchairs-cbe006ec1107",
    image: "/embs-blog-images/blog1.png",
  },
  {
    id: "2.e-skin",
    title: "E-Skin",
    author: "Swanandi Punse",
    desc: "Delve into how prosthetics are no longer just attachments but more like limbs!",
    link: "https://medium.com/ieee-embsdiaries/e-skin-the-future-of-intelligent-prosthetics-423ed70a2b1d",
    image: "/embs-blog-images/blog2.png",
  },
  {
    id: "3.neural-implants",
    title: "Neural Implants",
    author: "Krishna VP",
    desc: "Find out how signal processing and closed loop systems are used for rehabilitation via neural implants!",
    link: "https://medium.com/ieee-embsdiaries/when-implants-listen-and-respond-signal-processing-at-the-core-of-closed-loop-neurotechnology-aa29145ebe28",
    image: "/embs-blog-images/blog3.png",
  },
  {
    id: "4.lifi-space",
    title: "Li-fi to Space Links",
    author: "Rachel Roshini",
    desc: "Dive into the blog titled 'Shining a Light on Optical Wireless Communication'.",
    link: "https://medium.com/ieee-embsdiaries/li-fi-to-space-links-the-era-of-optical-communication-b486fb763d63",
    image: "/embs-blog-images/blog4.png",
  },
  {
    id: "5.electromagnetic-configuration",
    title: "Electromagnetic Configuration: The Role of Reconfigurable Intelligent Surfaces",
    author: "Aryabrata Pattnaik",
    desc: "Behold Reconfigurable Intelligent Systems (RIS), the dynamic backbone that adapts to the needs of 6G networks on demand.",
    link: "https://medium.com/ieee-embsdiaries/electromagnetic-configuration-on-demand-the-role-of-reconfigurable-intelligent-surfaces-38187009440d",
    image: "/embs-blog-images/blog5.png",
  },
  {
    id: "6.beyond-speed",
    title: "Beyond Speed: How Massive MIMO Shapes 6G Innovation",
    author: "Vaishnavi Murthy",
    desc: "Massive MIMO - the evolution of smart antenna systems.",
    link: "https://medium.com/ieee-embsdiaries/shaping-ultra-fast-futures-6g-powered-by-massive-mimo-f71bd119f6d5",
    image: "/embs-blog-images/blog6.png",
  },
  {
    id: "7.between-code-and-cell",
    title: "Between Code and Cell: Reimagining the Future of Care",
    author: "Salma Mehwish",
    desc: "The visionaries of the future who will take healthcare beyond imagination.",
    link: "https://medium.com/ieee-embsdiaries/between-code-and-cell-building-the-future-of-care-85a1e8d7b17a",
    image: "/embs-blog-images/blog7.png",
  },
  {
    id: "8.when-lab-ideas-became-life-savers",
    title: "When Lab Ideas Became Life-Savers: The Biomedical Game-Changers Since 2000",
    author: "Vani Goel",
    desc: "The engineers of today shaping breakthroughs.",
    link: "https://medium.com/ieee-embsdiaries/when-lab-ideas-became-life-savers-the-biomedical-game-changers-since-2000-fa19bbfc45f4",
    image: "/embs-blog-images/blog8.png",
  },
  {
    id: "9.pioneering-stories",
    title: "The Pioneering Stories Behind Every Modern Medical Miracle",
    author: "Deepika KrishnaKumar",
    desc: "Every medical miracle has a story. The pioneers of the past laid the foundation for the advances we benefit from today.",
    link: "https://medium.com/ieee-embsdiaries/the-pioneering-stories-behind-every-modern-medical-miracle-c5bf924e4831",
    image: "/embs-blog-images/blog9.png",
  },
  {
    id: "10.silent-heroes",
    title: "The Silent Heroes of Healthcare: How Biosciences Power Medical Breakthroughs",
    author: "Ishita Mohanta",
    desc: "They don't wear capes, but they carry lives in their hands. Honoring the unsung heroes who keep our healthcare system alive - silently and selflessly.",
    link: "https://medium.com/ieee-embsdiaries/the-silent-heroes-of-healthcare-how-biosciences-power-medical-breakthroughs-229c370a4a13",
    image: "/embs-blog-images/blog10.png",
  },
  {
    id: "11.space-biotechnology",
    title: "Where Biology Meets Vacuum: Engineering Life Beyond Earth",
    author: "Namanpreet Kaur",
    desc: "Could biotechnology break the bounds of evolution and give rise to life that can exist and thrive beyond Earth? Explore the fascinating world of space biotechnology.",
    link: "https://medium.com/ieee-embsdiaries/where-biology-meets-the-vacuum-engineering-life-beyond-earth-6bdd06a1d7a7",
    image: "/embs-blog-images/blog11.png",
  },
  {
    id: "12.breaking-down-dreams",
    title: "Breaking Down Dreams",
    author: "Anumita Sandeep",
    desc: "Dream engineering is merging science with the surreal. Through neural stimulation and feedback, we're learning to shape the dream world on demand.",
    link: "https://medium.com/ieee-embsdiaries/breaking-down-dreams-5ffd02544073",
    image: "/embs-blog-images/blog12.png",
  },
  {
    id: "13.genetic-autocorrect",
    title: "Genetic Autocorrect: How Cells Do Proofreading",
    author: "Aryabrata Pattnaik",
    desc: "Our cells were pioneers of autocorrect. Learn how they constantly detect and repair errors to keep life functioning smoothly.",
    link: "https://medium.com/ieee-embsdiaries/genetic-autocorrect-how-cells-proofread-752262efdad3",
    image: "/embs-blog-images/blog13.png",
  },
  {
    id: "14.beyond-double-helix",
    title: "Beyond the Double Helix: The Ethics of Genetic Data",
    author: "Mitra",
    desc: "Science gave us the power to edit life itself - but with that power come difficult ethical questions about responsibility, privacy, and control.",
    link: "https://medium.com/ieee-embsdiaries/beyond-the-double-helix-the-ethics-of-genetic-data-2a692f7e3596",
    image: "/embs-blog-images/blog14.png",
  },
  {
    id: "15.invisible-to-the-eye",
    title: "Invisible to the Eye, Predictable to AI",
    author: "Tvisha Jaikumar",
    desc: "What escapes the naked eye - subtle shifts and silent warnings - AI can now detect, transforming invisible patterns into life-saving insights.",
    link: "https://medium.com/ieee-embsdiaries/invisible-to-the-eye-but-predicted-by-ai-44591b047c9d",
    image: "/embs-blog-images/blog15.png",
  },
  {
    id: "16.decoding-human-health-ai",
    title: "Decoding Human Health with AI",
    author: "Anumita Sandeep",
    desc: "The human body contains immense amounts of information. Discover how artificial intelligence helps organize, analyze, and understand it.",
    link: "https://medium.com/ieee-embsdiaries/decoding-human-health-with-ai-d83b169e5fb9",
    image: "/embs-blog-images/blog16.png",
  },
  {
    id: "17.nanobots",
    title: "Nanobots: The Smallest Superheroes",
    author: "Shivani Anandaraj",
    desc: "When machines shrink, powerful invisible engineers emerge. Explore the world-changing potential of nanobots.",
    link: "https://medium.com/ieee-embsdiaries/smallest-superheroes-nanobots-55e9edd252b7",
    image: "/embs-blog-images/blog17.png",
  },
  {
    id: "18.neurobots",
    title: "Neurobots: From Thought to Motion",
    author: "Varalika Mathur",
    desc: "Is it telekinesis or simply neurobots? Discover assistive technologies that connect human thought directly with robotic action.",
    link: "https://medium.com/ieee-embsdiaries/neurobots-from-thought-to-action-d52ec4634f62",
    image: "/embs-blog-images/blog18.png",
  },
  {
    id: "19.bots-or-rehabilitation",
    title: "BOTS in the OR and Rehabilitation",
    author: "Anumita Sandeep",
    desc: "The future is here - where robotic precision meets rehabilitation breakthroughs and AI-assisted surgery transforms recovery.",
    link: "https://medium.com/ieee-embsdiaries/bots-in-the-or-and-rehabilitation-d9e65c3ebfac",
    image: "/embs-blog-images/blog19.png",
  },
  {
    id: "20.cryonics-brain-concepts",
    title: "Confluence of Cryonics and Isolated Brain Concepts",
    author: "Riddhi Sharma and Aishwarya A N",
    desc: "What if consciousness doesn't end - it simply pauses? Explore the fusion of cryonics and isolated brain preservation.",
    link: "https://medium.com/ieee-embsdiaries/confluence-of-cryonics-and-isolated-brain-concept-3ccda4a6cc3a",
    image: "/embs-blog-images/blog20.png",
  },
  {
    id: "21.gene-modifications",
    title: "Gene Modifications",
    author: "Vidhi Garg",
    desc: "The power to cure or the power to control? Explore the promises and risks of genetic modification.",
    link: "https://medium.com/ieee-embsdiaries/gene-modifications-changing-the-blueprint-of-life-one-gene-at-a-time-4cdb54de6374",
    image: "/embs-blog-images/blog21.png",
  },
  {
    id: "22.sickle-anemia",
    title: "A Review on Sickle Anemia",
    author: "Bhadra S N",
    desc: "One condition. Millions affected. A closer look at sickle cell anemia and its impact.",
    link: "https://medium.com/ieee-embsdiaries/a-review-on-sickle-cell-anemia-97bf911f9fb9",
    image: "/embs-blog-images/blog22.png",
  },
  {
    id: "23.lab-on-a-chip",
    title: "Lab-on-a-Chip: The Future of Biomedical Innovation",
    author: "Nampreet Kaur",
    desc: "What if you could run an entire lab test on a device smaller than your phone? Lab-on-a-chip technology is making it possible.",
    link: "https://medium.com/ieee-embsdiaries/lab-on-a-chip-science-with-a-pocket-sized-update-1394867321b7",
    image: "/embs-blog-images/blog23.png",
  },
];

export default function BlogsPage() {
  // First 3 items (id 1, 2, 3) as Staff Picks
  const staffPicks = blogs.slice(0, 3);
  // Remaining items (id 4 to 23) in main feed
  const mainFeed = blogs.slice(3);

  return (
    <div className="min-h-screen bg-transparent text-zinc-200 font-sans">
        <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="border-b border-zinc-800/80 pb-8 mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-3 font-sans">
            Blogs
          </h1>
          <p className="text-base text-zinc-400 font-sans">
            Insights and updates from the IEEE EMBS team.
          </p>
        </header>

        {/* Layout Grid - Interchanged Sidebar and Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Staff Picks Column (Left Side now) */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-8 space-y-6">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase font-sans">
                Staff Picks
              </h3>

              <div className="space-y-6">
                {staffPicks.map((pick) => (
                  <a
                    key={pick.id}
                    href={pick.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block font-sans"
                  >
                    <div className="text-sm text-pink-300 mb-1 font-sans">
                      {pick.author}
                    </div>
                    <h4 className="text-base font-semibold text-zinc-200 group-hover:text-blue-300 transition-colors leading-snug font-sans">
                      {pick.title}
                    </h4>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Feed Column (Right Side now, showing items 4 through 23) */}
          <main className="lg:col-span-8 divide-y divide-zinc-800/60 order-1 lg:order-2">
            {mainFeed.map((blog) => (
              <article key={blog.id} className="py-8 first:pt-0">
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col-reverse sm:flex-row justify-between gap-8 font-sans"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-pink-300 mb-2 font-sans">
                      {blog.author}
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors leading-snug mb-3 font-sans">
                      {blog.title}
                    </h2>
                    <p className="text-base text-zinc-400 line-clamp-3 leading-relaxed font-sans">
                      {blog.desc}
                    </p>
                  </div>

                  {/* Expanded Image Container */}
                  <div className="w-full sm:w-52 h-36 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>
              </article>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}