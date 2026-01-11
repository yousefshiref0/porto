import { motion } from 'motion/react';
import { Code2, Scaling, Layers, HeadphonesIcon } from 'lucide-react';

const valueProps = [
  {
    icon: Code2,
    title: 'Clean Code Architecture',
    description: 'Maintainable, scalable, and well-documented code following industry best practices.',
  },
  {
    icon: Scaling,
    title: 'Scalable Systems',
    description: 'Built to grow with your business from MVP to enterprise-level solutions.',
  },
  {
    icon: Layers,
    title: 'Modern Tech Stack',
    description: 'Cutting-edge technologies ensuring performance, security, and future-proofing.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Long-term Support',
    description: 'Ongoing maintenance, updates, and dedicated support whenever you need us.',
  },
];

export function ValueProps() {
  return (
    <section className="py-24 px-6 relative">
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
            Why Choose <span className="gradient-text">Servtopiya</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just build software—we build partnerships that drive sustainable growth.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                className="glass rounded-2xl p-8 text-center group hover:glass-strong transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </motion.div>

                <h3 className="text-lg font-bold mb-3">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 glass rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">40+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
