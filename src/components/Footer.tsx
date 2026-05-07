import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Music2, Youtube, Linkedin, Globe, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: "https://www.instagram.com/yetkingencler/", color: 'hover:bg-pink-500 hover:text-white hover:shadow-pink-500/25' },
    { name: 'X', icon: Twitter, href: "https://x.com/YetkinGencler", color: 'hover:bg-slate-900 hover:text-white hover:shadow-slate-900/25' },
    { name: 'TikTok', icon: Music2, href: "https://www.tiktok.com/@yetgen", color: 'hover:bg-black hover:text-white hover:shadow-black/25' },
    { name: 'YouTube', icon: Youtube, href: "https://www.youtube.com/c/YetkinGencler", color: 'hover:bg-red-500 hover:text-white hover:shadow-red-500/25' },
    { name: 'LinkedIn', icon: Linkedin, href: "https://www.linkedin.com/company/yetkingencler/", color: 'hover:bg-blue-600 hover:text-white hover:shadow-blue-600/25' },
    { name: 'Web', icon: Globe, href: "https://medium.com/yetkingencler", color: 'hover:bg-indigo-500 hover:text-white hover:shadow-indigo-500/25' }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-12">
      <motion.footer 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] lg:rounded-[3.5rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" 
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start justify-center">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6 inline-block">
              <img 
                src="/partners/yetgen-logo.png" 
                alt="YetGen" 
                className="h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/partners/yetgen-logo-transparent.png";
                }}
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 font-display">
              YetGen Eğitim Kooperatifi
            </h3>
            <p className="text-slate-500 leading-relaxed max-w-sm font-medium">
              Gençlerin potansiyellerini keşfetmelerine ve geleceğin yetkinlikleriyle donanmalarına öncülük ediyoruz.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col justify-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Hızlı Bağlantılar</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Aydınlatma Metni', href: 'https://drive.google.com/file/d/15O8R1FyUTYrXIN818DazMh4Gpmc0RxcM/view' }
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target={link.href !== '#' ? "_blank" : undefined}
                  rel={link.href !== '#' ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600 transition-colors w-fit"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-blue-600 group-hover:scale-150 transition-all" />
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTA & Social Section */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-center lg:items-end text-left lg:text-right">
            <div className="mb-8 w-full bg-slate-50/80 border border-slate-100 p-6 rounded-[2rem] hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
              <h4 className="text-sm font-black text-slate-900 mb-2">Gelişmelerden Haberdar Ol</h4>
              <p className="text-xs text-slate-500 font-medium mb-4">Yeni programlar ve etkinlikler için bizi takip et.</p>
              <div className="flex flex-wrap lg:justify-end gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    >
                      <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col items-center justify-center gap-4 relative z-10"
        >
          <p className="text-xs font-bold text-slate-400">
            © {new Date().getFullYear()} YetGen. Tüm hakları saklıdır.
          </p>
        </motion.div>

      </motion.footer>
    </div>
  );
};
