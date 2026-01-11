import { motion } from 'motion/react';
import { ExternalLink, Radio, BarChart, ShoppingCart } from 'lucide-react';

const projects = [
  {
    title: 'Smart Attendance System',
    description: 'Enterprise-level RFID attendance tracking with real-time analytics and automated reporting.',
    tags: ['Automation', 'IoT', 'React'],
    icon: Radio,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Enterprise Management Dashboard',
    description: 'Comprehensive SaaS platform for business operations with advanced data visualization.',
    tags: ['SaaS', 'React', 'Node.js'],
    icon: BarChart,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'E-commerce Mobile App',
    description: 'Cross-platform shopping experience with seamless payments and inventory management.',
    tags: ['Flutter', 'Firebase', 'Stripe'],
    icon: ShoppingCart,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 relative">
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
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real projects. Real impact. See how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Project Cards - Zig-Zag Layout */}
        <div className="space-y-24">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Visual/Icon Side */}
                <motion.div
                  className="flex-1 glass rounded-3xl p-12 flex items-center justify-center min-h-[400px] group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <motion.div
                      className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center glow-cyan`}
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="w-24 h-24 text-white" strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Floating tag indicators */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center glass animate-glow-pulse">
                      <ExternalLink className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 glass rounded-lg text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      className="inline-flex items-center gap-2 text-primary font-semibold group"
                      whileHover={{ x: 5 }}
                    >
                      View Case Study
                      <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
