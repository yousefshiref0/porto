import { motion } from 'motion/react';
import { Code, Smartphone, Server, Palette, Radio, Zap } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'React & Next.js solutions for modern web applications with stunning performance.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform Flutter development that works seamlessly on iOS and Android.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    description: 'Firebase & Node.js scalable architectures built for growth and reliability.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centric interfaces that convert visitors into loyal customers.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Radio,
    title: 'Smart Automation',
    description: 'Attendance & Management systems with RFID and IoT integration.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast applications optimized for speed and efficiency.',
    gradient: 'from-yellow-500 to-amber-500',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end digital solutions crafted with cutting-edge technology and expert craftsmanship.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group glass rounded-2xl p-8 hover:glass-strong transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                <div className="mt-6 flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
