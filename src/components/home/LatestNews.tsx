import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "Events" | "Research" | "Blogs";
  href: string;
  imageSrc: string;
}

const newsData: NewsItem[] = [
  {
    id: "featured",
    title: "Touchless Vitals: Non-Invasive Real-Time Monitoring",
    date: "September 2026",
    category: "Research",
    href: "/research",
    imageSrc: "/embs-blog-images/blog1.png",
  },
  {
    id: "2",
    title: "ECG Peak Signal Classification & Bio-Signal Workshop",
    date: "September 2026",
    category: "Events",
    href: "/events",
    imageSrc: "/events/bioblufff.jpeg",
  },
  {
    id: "3",
    title: "Biomedical Instrumentation in Modern Clinical Care",
    date: "August 2026",
    category: "Blogs",
    href: "/blogs",
    imageSrc: "/embs-blog-images/blog1.png",
  },
  {
    id: "4",
    title: "IEEE EMBS Chapter Wins Student Branch Impact Award",
    date: "August 2026",
    category: "Events",
    href: "/events",
    imageSrc: "/embs-blog-images/blog1.png",
  },
  {
    id: "5",
    title: "Wearable Bio-Sensors for Cardiac Monitoring",
    date: "July 2026",
    category: "Research",
    href: "/research",
    imageSrc: "/embs-blog-images/blog1.png",
  },
];

export default function LatestNews() {
  const featuredItem = newsData[0];
  const sideItems = newsData.slice(1);

  return (
    <section className="relative z-20 w-full text-white">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-sans font-semibold tracking-relaxed text-white">Latest news</h2>
        {/*<Link
          href="/events"
          className="px-4 py-1.5 text-xs font-medium bg-black hover:bg-blue-950 text-neutral-200 rounded-full transition-all duration-200"
        >
          View news
        </Link>*/}
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Featured Highlight */}
        <div className="lg:col-span-6 bg-linear-to-br from-gray-950 to-gray-950 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-900/60 transition-colors group">
          <div className="z-10">
            <h3 className="text-2xl font-semibold text-white transition-colors leading-snug mb-4">
              {featuredItem.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-300 mb-6">
              <span className="text-neutral-300">{featuredItem.date}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-500" />
              <span className="text-neutral-300">{featuredItem.category}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-500" />
              <Link
                href={featuredItem.href}
                className="text-white font-medium inline-flex items-center gap-1 transition-colors"
              >
                Learn more <span className="text-sm">›</span>
              </Link>
            </div>
          </div>
          
          <div className="relative w-full h-full sm:h-80 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/60">
            <Image
              src={featuredItem.imageSrc}
              alt={featuredItem.title}
              fill
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Column: Stacked List Items (Internal Scroll Container) */}
        <div className="lg:col-span-6 bg-linear-to-br from-gray-950 to-gray-950 bg-neutral-950/20 backdrop-blur-sm border hover:border-blue-900/60 border-neutral-800/80 rounded-2xl p-6 h-[480px] lg:h-auto max-h-[550px] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {sideItems.map((item, index) => (
              <div key={item.id} className="flex flex-col">
                <div className="flex items-center justify-between gap-4 py-2 group">
                  <div className="flex-1 pr-2 z-10">
                    <h4 className="text-lg font-medium font-sans text-white transition-colors line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs font-sans leading-snug text-neutral-300">
                      <span>{item.date}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-500" />
                      <span>{item.category}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-500" />
                      <Link
                        href={item.href}
                        className="text-white font-bold hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                      >
                        Learn more <span className="text-sm">›</span>
                      </Link>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/60">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Divider between items */}
                {index < sideItems.length - 1 && (
                  <div className="w-full h-[1px] bg-neutral-800/60 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}