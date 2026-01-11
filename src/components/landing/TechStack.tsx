import { motion } from 'motion/react';

const technologies = [
  'React',
  'Next.js',
  'Flutter',
  'Firebase',
  'Node.js',
  'TypeScript',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Git',
];

export function TechStack() {
  return (
    <section id="technologies" className="py-24 px-6 relative overflow-hidden">
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
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-leading technologies that power exceptional digital experiences.
          </p>
        </motion.div>

        {/* Marquee Strip */}
        <div className="relative">
          <div className="flex overflow-hidden py-8">
            <motion.div
              className="flex gap-8 pr-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* First set */}
              {technologies.map((tech, index) => (
                <div
                  key={`tech-1-${index}`}
                  className="glass rounded-2xl px-8 py-6 flex items-center justify-center min-w-[200px] hover:glass-strong transition-all cursor-pointer group"
                >
                  <span className="text-xl font-bold group-hover:gradient-text transition-all">
                    {tech}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {technologies.map((tech, index) => (
                <div
                  key={`tech-2-${index}`}
                  className="glass rounded-2xl px-8 py-6 flex items-center justify-center min-w-[200px] hover:glass-strong transition-all cursor-pointer group"
                >
                  <span className="text-xl font-bold group-hover:gradient-text transition-all">
                    {tech}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Tech Categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 gradient-text">Frontend</h3>
            <p className="text-muted-foreground text-sm mb-4">
              React, Next.js, TypeScript, Tailwind CSS for blazing-fast user interfaces.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 gradient-text">Backend</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Node.js, Firebase, MongoDB, PostgreSQL for robust server architecture.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Firebase', 'MongoDB'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 gradient-text">Mobile</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Flutter for cross-platform iOS and Android native experiences.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Dart', 'iOS'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
