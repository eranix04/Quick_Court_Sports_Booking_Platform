import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Search,
    CreditCard,
    Bell,
    BarChart3,
    Shield,
    Clock,
    MapPin,
    Users,
    Building2,
    Smartphone,
    Zap
} from 'lucide-react';
import { PremiumNavigation } from '../components/PremiumNavigation';
import { useNavigate } from 'react-router-dom';

export const FeaturesPage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Search,
            title: 'Smart Search',
            description: 'Find the perfect facility with advanced filters for sport type, location, price, and amenities.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Calendar,
            title: 'Real-Time Booking',
            description: 'Book courts instantly with live availability updates and instant confirmation.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: CreditCard,
            title: 'Secure Payments',
            description: 'Multiple payment options with industry-standard security and encryption.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Bell,
            title: 'Smart Notifications',
            description: 'Get timely reminders for bookings, special offers, and facility updates.',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Track bookings, revenue, and customer insights with powerful analytics.',
            color: 'from-indigo-500 to-blue-500'
        },
        {
            icon: Shield,
            title: 'Verified Facilities',
            description: 'All facilities are verified and reviewed to ensure quality and safety.',
            color: 'from-teal-500 to-green-500'
        },
        {
            icon: Clock,
            title: '24/7 Availability',
            description: 'Book anytime, anywhere with our always-available platform.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: MapPin,
            title: 'Location-Based',
            description: 'Discover facilities near you with integrated map and distance tracking.',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: Smartphone,
            title: 'Mobile Friendly',
            description: 'Fully responsive design works perfectly on all devices.',
            color: 'from-cyan-500 to-blue-500'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Optimized performance ensures quick loading and smooth experience.',
            color: 'from-violet-500 to-purple-500'
        }
    ];

    const roleFeatures = [
        {
            icon: Users,
            role: 'For Players',
            benefits: [
                'Browse hundreds of verified facilities',
                'Compare prices and amenities',
                'Book courts in seconds',
                'Track booking history',
                'Rate and review facilities',
                'Get personalized recommendations'
            ],
            color: 'blue'
        },
        {
            icon: Building2,
            role: 'For Facility Owners',
            benefits: [
                'List your facilities for free',
                'Manage bookings efficiently',
                'Set custom pricing and availability',
                'Track revenue and analytics',
                'Reach thousands of players',
                'Automated notifications and reminders'
            ],
            color: 'green'
        },
        {
            icon: Shield,
            role: 'For Administrators',
            benefits: [
                'Oversee all platform activities',
                'Approve and manage facilities',
                'Monitor user activities',
                'Generate comprehensive reports',
                'Ensure quality standards',
                'Handle disputes and support'
            ],
            color: 'orange'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Navigation */}
            <PremiumNavigation
                navigationItems={[
                    { label: 'HOME', href: '/', active: false },
                    { label: 'ABOUT', href: '/about', active: false },
                    { label: 'FEATURES', href: '/features', active: true },
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
                        Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Features</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
                    >
                        Everything you need to book, manage, and enjoy sports facilities in one platform.
                    </motion.p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-6`}>
                                    <feature.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role-Based Features */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white text-center mb-16"
                    >
                        Built for Everyone
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {roleFeatures.map((role, index) => (
                            <motion.div
                                key={role.role}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${role.color}-500 rounded-full mb-6`}>
                                    <role.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6">{role.role}</h3>
                                <ul className="space-y-3">
                                    {role.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-green-400 mr-2">✓</span>
                                            <span className="text-gray-300">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of users already enjoying seamless sports facility bookings.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg px-12 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                        >
                            Start Booking Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
