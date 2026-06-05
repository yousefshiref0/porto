import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, MessageSquare } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { toast } from 'sonner';
import { useProfile } from '../utils/hooks';
import { messagesService } from '../utils/supabaseClient';

export const Contact: React.FC = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Anti-spam field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam protection - honeypot check
    if (formData.honeypot) {
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save message to database
      await messagesService.createMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'No subject',
        message: formData.message,
        is_read: false,
      });

      // TODO: Send email notification to admin
      // This would be implemented via a backend endpoint

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'yousefshirefbusiness@gmail.com',
      href: `mailto:${profile?.email || 'yousefshirefbusiness@gmail.com'}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone || '01555578913',
      href: `tel:${profile?.phone || '01555578913'}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: profile?.linkedin || 'linkedin.com/feed/',
      href: profile?.linkedin || 'https://www.linkedin.com/feed/',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: profile?.github || 'github.com/yousefshiref0',
      href: profile?.github || 'https://github.com/yousefshiref0',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: profile?.phone || '01555578913',
      href: profile?.whatsapp || 'https://wa.me/201555578913',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EC] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            GET IN TOUCH
          </h1>
          <div className="w-32 h-2 bg-[#FF6B35] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>

          {/* Hand-drawn annotation */}
          <div className="handwritten text-2xl text-[#4F46E5] mt-4">
            I'd love to hear from you!
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div
              className="bg-white border-4 border-primary p-8"
              style={{ boxShadow: '12px 12px 0px 0px #111111' }}
            >
              <h2 className="text-3xl font-black mb-6">SEND A MESSAGE</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block mb-2 font-bold">Name *</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-bold">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-bold">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-bold">Message *</label>
                  <Input
                    multiline
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-6">
              <div
                className="bg-primary text-[#F8F5EC] border-4 border-primary p-8"
                style={{ boxShadow: '12px 12px 0px 0px #111111' }}
              >
                <h2 className="text-3xl font-black mb-6">CONTACT INFO</h2>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-[#FF6B35] border-2 border-[#F8F5EC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD93D] transition-colors">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-[#F8F5EC]/80 group-hover:text-[#FFD93D] transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div
                className="bg-[#FFD93D] border-4 border-primary p-8"
                style={{ boxShadow: '12px 12px 0px 0px #111111' }}
              >
                <h3 className="text-2xl font-black mb-4">AVAILABILITY</h3>
                <p className="text-gray-800 mb-4">
                  I typically respond within 24 hours during business days.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Weekend:</span>
                    <span>By appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
