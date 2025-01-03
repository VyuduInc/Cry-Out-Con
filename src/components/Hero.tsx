import React, { useState } from 'react';
import { Calendar, MapPin, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from './AnimatedText';
import AnimatedButton from './AnimatedButton';
import AnimatedBackground from './AnimatedBackground';
import GlitchText from './GlitchText';
import NeonText from './NeonText';
import VideoGallery from './VideoGallery';

export const Hero = () => {
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    const navHeight = 80; // Height of the fixed navbar
    
    if (registrationSection) {
      const elementPosition = registrationSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl md:text-8xl font-bold tracking-tight">
                <span className="inline-block">THE </span>
                <NeonText text="CRY OUT" className="mx-2" />
                <span className="inline-block">EXPERIENCE</span>
              </div>
              <div className="text-6xl md:text-8xl font-bold tracking-tight">
                <GlitchText text="2025" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mt-4"
              >
                Join a transformative journey of healing and spiritual growth through the power of surrender and connection with God.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-white/90 text-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            >
              <MapPin className="w-5 h-5" />
              <span>Houston, Texas</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            >
              <Calendar className="w-5 h-5" />
              <span>May 1st - 3rd</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <AnimatedButton 
              onClick={scrollToRegistration}
              className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-white/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
            </AnimatedButton>

            <AnimatedButton
              onClick={() => setIsVideoGalleryOpen(true)}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/20 hover:bg-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>Watch Videos</span>
              </div>
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent z-20"
      />

      <VideoGallery 
        isOpen={isVideoGalleryOpen}
        onClose={() => setIsVideoGalleryOpen(false)}
      />
    </section>
  );
};