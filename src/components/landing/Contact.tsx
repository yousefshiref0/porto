import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDetails: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll get back to you soon.');
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Large CTA */}
        <motion.div
          className="glass rounded-3xl p-16 text-center mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle at center, #00F0FF 0%, #7B61FF 50%, transparent 70%)',
            }}
          />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              Ready to Scale Your <span className="gradient-text">Business?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's turn your vision into a powerful digital solution. Get in touch today.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="glass rounded-3xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm text-muted-foreground">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl glass border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-muted-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl glass border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="project" className="block mb-2 text-sm text-muted-foreground">
                  Project Details
                </label>
                <Textarea
                  id="project"
                  placeholder="Tell us about your project..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="min-h-32 rounded-xl glass border-border focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-xl gradient-bg text-white hover:opacity-90 group"
              >
                Send Message
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email Us</div>
                    <div className="text-muted-foreground text-sm">contact@servtopiya.com</div>
                    <div className="text-muted-foreground text-sm">support@servtopiya.com</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="font-semibold mb-4">Follow Us</div>
                  <div className="flex gap-3">
                    {[
                      { icon: Github, label: 'GitHub' },
                      { icon: Linkedin, label: 'LinkedIn' },
                      { icon: Twitter, label: 'Twitter' },
                    ].map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.button
                          key={social.label}
                          className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:glass-strong transition-all group"
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h4 className="font-bold mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
