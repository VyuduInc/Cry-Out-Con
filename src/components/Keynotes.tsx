import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightEffect from './SpotlightEffect';
import { Instagram, Globe } from 'lucide-react';
import SectionTitle from './SectionTitle';

const GradientText = ({ children, className = "" }) => (
  <motion.span
    className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white bg-[length:200%_auto] ${className}`}
    animate={{
      backgroundPosition: ["0%", "200%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {children}
  </motion.span>
);

const AnimatedLetter = ({ letter, index }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.05,
      type: "spring",
      stiffness: 100,
    }}
  >
    {letter}
  </motion.span>
);

export const Keynotes = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const speakers = [
    {
      name: "Dr. Sarah Chen",
      title: "AI Ethics & Innovation",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/drsarahchen",
      website: "https://sarahchen.ai"
    },
    {
      name: "Mark Thompson",
      title: "Future of Computing",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/markthompson",
      website: "https://markthompson.tech"
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Quantum Computing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/emilyrodriguez",
      website: "https://emilyrodriguez.quantum"
    },
    {
      name: "Dr. James Wilson",
      title: "Cybersecurity Trends",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/drjameswilson",
      website: "https://jameswilson.security"
    },
    {
      name: "Lisa Chang",
      title: "Sustainable Tech",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/lisachang",
      website: "https://lisachang.eco"
    },
    {
      name: "Michael Foster",
      title: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/michaelfoster",
      website: "https://michaelfoster.digital"
    },
    {
      name: "Dr. Aisha Patel",
      title: "Biotech Innovation",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/aishapatel",
      website: "https://aishapatel.bio"
    },
    {
      name: "Robert Kim",
      title: "AR/VR Future",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/robertkim",
      website: "https://robertkim.vr"
    },
    {
      name: "Dr. Maria Santos",
      title: "Space Technology",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
      instagram: "https://instagram.com/mariasantos",
      website: "https://mariasantos.space"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <SpotlightEffect sectionRef={sectionRef} color="blue" delay={0.2} />
      
      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title="Featured Keynotes"
          subtitle="Meet our distinguished speakers and industry leaders"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Keynote speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                className="relative overflow-hidden rounded-xl aspect-[3/4]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                
                {/* Social Icons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                  <motion.a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-purple-500/50 transition-colors duration-300 group/icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-5 h-5 text-white group-hover/icon:text-white group-hover/icon:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  </motion.a>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
                  <p className="text-gray-300">{speaker.title}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keynotes;