import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Globe, Star, Coffee, Wifi, Waves, Car, Utensils, ChevronDown, ChevronUp } from 'lucide-react';
import SectionTitle from './SectionTitle';

const Hotels = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hotels = [
    {
      name: 'Marriott Marquis Houston',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      description: 'Connected to the George R. Brown Convention Center, featuring a rooftop Texas-shaped lazy river and infinity pool.',
      address: '1777 Walker St, Houston, TX 77010',
      phone: '+1 (713) 654-1777',
      website: 'https://www.marriott.com/houston-marquis',
      rating: 4.5,
      price: 189,
      amenities: [
        { icon: <Waves className="w-5 h-5" />, label: 'Rooftop Pool' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi' },
        { icon: <Coffee className="w-5 h-5" />, label: 'Restaurant' },
        { icon: <Car className="w-5 h-5" />, label: 'Valet Parking' },
        { icon: <Utensils className="w-5 h-5" />, label: 'Room Service' }
      ],
      features: [
        'Connected to Convention Center',
        'Texas-shaped Lazy River',
        'Infinity Pool',
        'Luxury Spa',
        'Multiple Restaurants'
      ]
    },
    {
      name: 'Hilton Americas-Houston',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80',
      description: 'Downtown luxury hotel with skyline views and direct access to the George R. Brown Convention Center.',
      address: '1600 Lamar St, Houston, TX 77010',
      phone: '+1 (713) 739-8000',
      website: 'https://www.hilton.com/americas-houston',
      rating: 4.4,
      price: 179,
      amenities: [
        { icon: <Waves className="w-5 h-5" />, label: 'Indoor Pool' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Free WiFi' },
        { icon: <Coffee className="w-5 h-5" />, label: 'Restaurant' },
        { icon: <Car className="w-5 h-5" />, label: 'Parking' },
        { icon: <Utensils className="w-5 h-5" />, label: 'Room Service' }
      ],
      features: [
        'Skyline Views',
        'Convention Center Access',
        'Full-Service Spa',
        'Executive Lounge',
        'Health Club'
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
      
      <div className="container mx-auto px-4 relative">
        <SectionTitle 
          title={
            <span className="inline-flex flex-col sm:flex-row items-center justify-center gap-x-4 whitespace-nowrap">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Conference
              </span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                Hotels
              </span>
            </span>
          }
          subtitle="Exclusive rates at premier hotels near the venue"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Experience luxury and convenience at our partner hotels, both directly connected to the George R. Brown Convention Center. Choose between the Marriott Marquis Houston, featuring its iconic Texas-shaped rooftop pool, or the Hilton Americas-Houston with stunning skyline views. Both hotels offer special conference rates starting from $179/night and include premium amenities to enhance your stay.
            </p>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isExpanded ? (
                <>
                  Hide Hotel Details
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  View Hotel Details
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Collapsible Hotel Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {hotels.map((hotel) => (
                  <motion.div
                    key={hotel.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative group"
                  >
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                        
                        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          <span className="text-lg font-bold text-white">${hotel.price}</span>
                          <span className="text-sm text-white/80">/night</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">{hotel.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="text-white">{hotel.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6">{hotel.description}</p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-5 h-5" />
                            <span>{hotel.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-5 h-5" />
                            <span>{hotel.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Globe className="w-5 h-5" />
                            <a href={hotel.website} target="_blank" rel="noopener noreferrer" 
                               className="hover:text-white transition-colors">
                              Visit Website
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6">
                          {hotel.amenities.map((amenity) => (
                            <div key={amenity.label} className="flex items-center gap-2 text-gray-300">
                              {amenity.icon}
                              <span className="text-sm">{amenity.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {hotel.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                              <span className="text-sm text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <motion.a
                          href={hotel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Book Now at Special Rate
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-gray-300 mb-8">
            Special conference rates are available until April 15, 2025. Book early to secure your preferred accommodation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#registration"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register for Conference
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hotels;