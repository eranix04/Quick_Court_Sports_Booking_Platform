import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Heart, Zap } from 'lucide-react';
import { PremiumNavigation } from '../components/PremiumNavigation';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Active Facilities', value: '500+', icon: Award },
        { label: 'Happy Users', value: '10K+', icon: Users },
        { label: 'Bookings Made', value: '50K+', icon: TrendingUp },
        { label: 'Cities Covered', value: '25+', icon: Target }
    ];

    const team = [
        {
            name: 'Sujal Kishore Kumar Talreja',
            role: 'Lead Developer',
            email: 'sujaltalreja04@gmail.com',
            phone: '7574021120'
        },
        {
            name: 'Krutik Soni',
            role: 'Full Stack Developer',
            email: 'sonikrutik393@gmail.com',
            phone: '+91 90672 95247'
        },
        {
            name: 'Hitanshu Dineshkumar Patel',
            role: 'Frontend Developer',
            email: 'hitanshupatel01@gmail.com',
            phone: '9925607120'
        }
    ];

    const values = [
        {
            icon: Heart,
            title: 'User-Centric',
            description: 'We prioritize user experience in every feature we build'
        },
        {
            icon: Zap,
            title: 'Fast & Reliable',
            description: 'Lightning-fast bookings with 99.9% uptime guarantee'
        },
        {
            icon: Award,
            title: 'Quality First',
            description: 'Only verified, high-quality facilities on our platform'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Navigation */}
            <PremiumNavigation
                navigationItems={[
                    { label: 'HOME', href: '/', active: false },
                    { label: 'ABOUT', href: '/about', active: true },
                    { label: 'FEATURES', href: '/features', active: false },
                    { label: 'CONTACT', href: '/contact', active: false }
                ]}
                ctaText="GET STARTED"
                ctaAction={() => navigate('/')}
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">QuickCourt</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
                    >
                        Your Local Sports Booking Hub - Making sports accessible to everyone, one court at a time.
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-300 mb-4">
                                QuickCourt was born from a simple idea: sports should be accessible to everyone.
                                We're on a mission to connect sports enthusiasts with the best facilities in their area,
                                making booking as easy as a few clicks.
                            </p>
                            <p className="text-lg text-gray-300">
                                Whether you're a casual player looking for a weekend game or a facility owner wanting
                                to maximize your bookings, QuickCourt is here to make it happen.
                            </p>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Sports facility"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white text-center mb-16"
                    >
                        Our Impact
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                                    <stat.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white text-center mb-16"
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                                    <value.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                                <p className="text-gray-300">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white text-center mb-16"
                    >
                        Meet Our Team
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 text-center"
                            >
                                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Users className="text-white" size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-green-400 mb-4">{member.role}</p>
                                <p className="text-gray-400 text-sm mb-1">{member.email}</p>
                                <p className="text-gray-400 text-sm">{member.phone}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
