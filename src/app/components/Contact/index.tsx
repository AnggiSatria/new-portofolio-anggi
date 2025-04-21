import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-[#0a0a0a] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">CONTACT ME</h2>
        <p className="text-gray-400 mb-8">
          If you want to discuss projects or collaborations, please contact me
          via email or social media.
        </p>

        {/* Email & WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <Link
            href="mailto:anggisatria109@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            <Mail size={20} />
            Emailed Me
          </Link>

          <Link
            href="https://wa.me/62895600414111"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            <Phone size={20} />
            Chat WhatsApp
          </Link>
        </div>

        {/* Sosial Media */}
        <div className="flex justify-center gap-6 text-gray-400">
          <Link
            href="https://github.com/AnggiSatria"
            target="_blank"
            className="hover:text-white transition"
          >
            <Github size={30} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/anggi-satria-a41455207/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Linkedin size={30} />
          </Link>
          <Link
            href="https://twitter.com/username"
            target="_blank"
            className="hover:text-white transition"
          >
            <Twitter size={30} />
          </Link>
        </div>
      </div>
    </section>
  );
}
