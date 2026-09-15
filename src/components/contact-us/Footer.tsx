import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-screen h-max overflow-x-hidden  px-6 py-16">

      <div className="bg-black h-11/12 backdrop-blur-xl border border-white/10 p-10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-white">

          {/* MAIL */}
          <a
            href="mailto:ieeeembs@vit.ac.in"
            className="flex items-center gap-4 group"
          >
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
              <Mail className="w-7 h-7 text-purple-300" />
            </div>

            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Mail
              </p>

              <p className="text-lg font-medium">
                ieeeembs@vit.ac.in
              </p>
            </div>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/embs_vit"
            target="_blank"
            className="flex items-center gap-4 group"
          >
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                className="w-7 h-7"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Instagram
              </p>

              <p className="text-lg font-medium">
                @embs_vit
              </p>
            </div>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/company/ieee-embs-chapter-vit/posts/?feedView=all"
            target="_blank"
            className="flex items-center gap-4 group"
          >
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-7 h-7"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                LinkedIn
              </p>

              <p className="text-lg font-medium">
                ieee-embs-chapter-vit
              </p>
            </div>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/IEEE.EMBS.VIT"
            target="_blank"
            className="flex items-center gap-4 group"
          >
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-7 h-7"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Facebook
              </p>

              <p className="text-lg font-medium">
                IEEE.EMBS.VIT
              </p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}