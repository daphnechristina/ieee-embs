import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold font-sans tracking-relaxed text-white">
          <Image
            src="/embs-logo-transparent.png"
            alt="IEEE EMBS Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="flex space-x-6 text-sm font-sans text-gray-300">
          <Link href="/about" className="hover:text-blue-300 transition">About Us</Link>
          <Link href="/events" className="hover:text-blue-300 transition">Events</Link>
          <Link href="/blogs" className="hover:text-blue-300 transition">Blogs</Link>
          <Link href="/research" className="hover:text-blue-300 transition">Research</Link>
        </nav>
      </div>
    </header>
  );
}