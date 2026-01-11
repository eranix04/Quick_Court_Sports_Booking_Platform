import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { PremiumNavigation } from '../components/PremiumNavigation';
import { useNavigate } from 'react-router-dom';

export const ContactPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            details: 'sujaltalreja04@gmail.com',
            link: 'mailto:sujaltalreja04@gmail.com'
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: '+91 7574021120',
            link: 'tel:+917574021120'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            details: 'India',
            link: '#'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: '24/7 Support Available',
            link: '#'
        }
    ];

    const faqs = [
        {
            question: 'How do I book a facility?',
            answer: 'Simply search for facilities in your area, select your preferred time slot, and confirm your booking with secure payment.'
        },
        {
            question: 'Can I cancel my booking?',
            answer: 'Yes, you can cancel bookings up to 24 hours before the scheduled time for a full refund.'
        },
        {
            question: 'How do I list my facility?',
            answer: 'Sign up as a facility owner, complete your profile, and submit your facility details for verification.'
        },
        {
            question: 'Is my payment information secure?',
            answer: 'Absolutely! We use industry-standard encryption and secure payment gateways to protect your information.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Navigation */}
            <PremiumNavigation
                navigationItems={[
                    { label: 'HOME', href: '/', active: false },
                    { label: 'ABOUT', href: '/about', active: false },
                    { label: 'FEATURES', href: '/features', active: false },
                    { label: 'CONTACT', href: '/contact', active: true }
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
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Touch</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={info.title}
                                href={info.link}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 text-center cursor-pointer"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                                    <info.icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                                <p className="text-gray-300 text-sm">{info.details}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                                        <Send className="text-white" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-300">We'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Send size={20} />
                                        Send Message
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Connect With Us</h2>
                                <p className="text-gray-300 mb-6">
                                    We're here to help and answer any question you might have. We look forward to hearing from you!
                                </p>

                                <div className="flex gap-4">
                                    <motion.a
                                        href="https://discord.gg/HUXVsksx"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-green-500/50 transition-all"
                                    >
                                        <MessageSquare className="text-white" size={24} />
                                    </motion.a>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                                    <p>Sunday: Closed</p>
                                    <p className="text-green-400 mt-4">24/7 Online Support Available</p>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">Quick Response</h3>
                                <p className="text-gray-300">
                                    We typically respond to all inquiries within 24 hours during business days.
                                    For urgent matters, please call us directly.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white text-center mb-12"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                                <p className="text-gray-300">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
