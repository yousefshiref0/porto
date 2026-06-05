import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { HandDrawnArrow } from '../components/HandDrawnArrow';
import { FloatingCard3D } from '../components/FloatingCard3D';
import { Cpu, Code, Smartphone, Wifi } from 'lucide-react';
import { analyticsService } from '../utils/supabaseClient';
import { useProfile } from '../utils/hooks';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    // Track page view (non-blocking)
    analyticsService.trackPageView('/').catch(() => {
      // Silent fail - analytics is non-critical
    });
  }, []);

  const techIcons = [
    { Icon: Cpu, label: 'Hardware', color: '#FF6B35', delay: 0 },
    { Icon: Code, label: 'Software', color: '#4F46E5', delay: 0.2 },
    { Icon: Smartphone, label: 'Mobile', color: '#FFD93D', delay: 0.4 },
    { Icon: Wifi, label: 'IoT', color: '#FF6B35', delay: 0.6 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EC]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hand-drawn annotation */}
            <div className="handwritten text-2xl text-[#4F46E5] mb-4 flex items-center gap-2">
              <span>Hey there!</span>
              <motion.svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                className="inline-block"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  d="M 20 20 Q 25 15 30 20 Q 35 25 40 20"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="block">BUILDING</span>
              <span className="block text-[#FF6B35]">HARDWARE,</span>
              <span className="block text-[#4F46E5]">SOFTWARE</span>
              <span className="block">& CONNECTED</span>
              <span className="block text-[#FFD93D] [-webkit-text-stroke:2px_#111111]">
                SYSTEMS
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
              A professional engineer & programmer specializing in{' '}
              <strong>Hardware Engineering</strong>,{' '}
              <strong>Full-Stack Development</strong>,{' '}
              <strong>Mobile Apps</strong>, and <strong>IoT Solutions</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/projects')}
              >
                View Projects
              </Button>
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Contact Me
              </Button>
            </div>

            {/* Animated Arrow */}
            <div className="hidden md:block mt-12">
              <HandDrawnArrow direction="right" className="w-24 h-24" />
            </div>
          </motion.div>

          {/* Right: 3D Floating Elements */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Avatar/Photo Placeholder */}
            <FloatingCard3D delay={0} className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64">
              <div className="w-full h-full bg-gradient-to-br from-[#FF6B35] to-[#4F46E5] border-4 border-primary flex items-center justify-center">
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="w-48 h-48 border-4 border-primary rounded-full object-cover"
                  />
                ) : (
                  <div className="w-48 h-48 bg-white border-4 border-primary rounded-full flex items-center justify-center">
                    <div className="text-6xl font-black text-primary">YS</div>
                  </div>
                )}
              </div>
            </FloatingCard3D>

            {/* Floating Tech Icons */}
            {techIcons.map(({ Icon, label, color, delay }, index) => (
              <FloatingCard3D
                key={label}
                delay={delay}
                className={`absolute ${
                  index === 0
                    ? 'top-12 right-12'
                    : index === 1
                    ? 'bottom-24 right-24'
                    : index === 2
                    ? 'bottom-12 left-12'
                    : 'top-24 left-24'
                }`}
              >
                <div
                  className="w-24 h-24 border-4 border-primary flex flex-col items-center justify-center gap-2 bg-white"
                  style={{ boxShadow: '6px 6px 0px 0px #111111' }}
                >
                  <Icon size={32} style={{ color }} />
                  <span className="text-xs font-bold">{label}</span>
                </div>
              </FloatingCard3D>
            ))}

            {/* Hand-drawn decorations */}
            <motion.div
              className="absolute top-32 right-4 w-16 h-16 border-4 border-[#FFD93D] rounded-full opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-32 left-4 w-12 h-12 border-4 border-[#FF6B35] opacity-50"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="handwritten text-sm text-gray-500 mb-2 text-center">
            scroll down
          </div>
          <HandDrawnArrow direction="down" className="w-12 h-12 mx-auto" color="#111111" />
        </motion.div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '5+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '10+', label: 'Technologies' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-black text-[#FFD93D] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#F8F5EC] font-bold uppercase text-sm tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              WHAT I DO
            </h2>
            <div className="w-32 h-2 bg-[#FF6B35] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚙️',
                title: 'Hardware Engineering',
                description: 'Embedded systems, microcontrollers, electronics prototyping, and hardware system development.',
              },
              {
                icon: '💻',
                title: 'Software Engineering',
                description: 'Full-stack development, system architecture, and scalable solutions.',
              },
              {
                icon: '📱',
                title: 'Mobile Development',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
              },
              {
                icon: '🌐',
                title: 'IoT Solutions',
                description: 'Connected devices, sensor integration, MQTT, and cloud platforms.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white border-4 border-primary p-6 relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  translateX: 6,
                  translateY: 6,
                  boxShadow: '6px 6px 0px 0px #111111',
                }}
                style={{
                  boxShadow: '10px 10px 0px 0px #111111',
                }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>

                {/* Hand-drawn decoration */}
                <div className="absolute top-2 right-2 w-6 h-6 border-2 border-[#FFD93D] rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FFD93D] border-y-8 border-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              READY TO BUILD SOMETHING AMAZING?
            </h2>
            <p className="text-xl mb-8 text-gray-800">
              Let's collaborate and turn your ideas into reality.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>

            {/* Hand-drawn annotation */}
            <div className="handwritten text-2xl text-[#4F46E5] mt-6">
              I'd love to hear from you!
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
