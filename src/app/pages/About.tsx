import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../components/Card';
import { useProfile } from '../utils/hooks';

export const About: React.FC = () => {
  const { profile } = useProfile();

  const education = [
    {
      degree: 'CS & AI Student',
      school: 'Pharos University in Alexandria (PUA)',
      year: '2025',
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
            ABOUT ME
          </h1>
          <div className="w-32 h-2 bg-[#FF6B35] mx-auto"></div>
        </motion.div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="w-full aspect-square bg-gradient-to-br from-[#FF6B35] to-[#4F46E5] border-8 border-primary flex items-center justify-center"
                style={{ boxShadow: '16px 16px 0px 0px #111111' }}
              >
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover border-4 border-primary rounded-full"
                  />
                ) : (
                  <div className="w-64 h-64 bg-white border-4 border-primary rounded-full flex items-center justify-center">
                    <div className="text-8xl font-black text-primary">YS</div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-6">MY JOURNEY</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  {profile?.bio || 'My name is Yousef Shiref Alassal, I am a 20-year-old engineering student at Pharos University in Alexandria (PUA), specializing in Computer Science & Artificial Intelligence.'}
                </p>
                {!profile?.bio && (
                  <>
                    <p>
                      I am a multidisciplinary engineer with experience in hardware development, software engineering (web & mobile applications), and IoT systems.
                    </p>
                    <p>
                      My work focuses on bridging the gap between physical systems and software solutions, from designing electronic circuits and PCB systems to building scalable full-stack web applications and mobile apps.
                    </p>
                    <p>
                      I am passionate about creating practical, efficient, and well-structured solutions that combine both hardware and software to solve real-world problems.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-8">EDUCATION</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <Card key={index} hover>
                  <div className="bg-[#FFD93D] text-primary px-3 py-1 inline-block border-2 border-primary font-bold text-sm mb-3">
                    {edu.year}
                  </div>
                  <h3 className="text-xl font-black mb-2">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-8">CORE VALUES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Precision',
                  description: 'Every detail matters in engineering excellence.',
                },
                {
                  icon: '💡',
                  title: 'Innovation',
                  description: 'Pushing boundaries and exploring new possibilities.',
                },
                {
                  icon: '🤝',
                  title: 'Collaboration',
                  description: 'Great solutions come from great teamwork.',
                },
              ].map((value, index) => (
                <Card key={index} hover>
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-black mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
