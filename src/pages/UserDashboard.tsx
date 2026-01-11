import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  Calendar,
  User,
  MapPin,
  Star,
  Clock,
  Filter,
  Heart,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatCard } from '../components/StatCard';
import { PremiumCard } from '../components/PremiumCard';
import { PremiumButton } from '../components/PremiumButton';
import { useFacilities } from '../context/FacilityContext';
import {
  mockBookings as initialMockBookings,
  mockCourts,
  indoorGames,
  outdoorGames,

} from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { NotificationContainer, NotificationProps } from '../components/Notification';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [bookings, setBookings] = useState(initialMockBookings);

  const navigate = useNavigate();
  useAuth();
  const { approvedFacilities, refreshFacilities, isRefreshing } = useFacilities();

  // Track previous approved facilities count to show notifications for new ones
  const [prevApprovedCount, setPrevApprovedCount] = useState(approvedFacilities.length);

  // Notification functions
  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = `notification_${Date.now()}`;
    const notification: NotificationProps = {
      id,
      type,
      title,
      message,
      duration: 5000,
      onClose: removeNotification
    };
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Show notification when new facilities become available
  useEffect(() => {
    if (approvedFacilities.length > prevApprovedCount) {
      const newFacilities = approvedFacilities.slice(0, approvedFacilities.length - prevApprovedCount);
      newFacilities.forEach(facility => {
        addNotification(
          'info',
          'New Facility Available! 🎾',
          `"${facility.name}" in ${facility.location} is now available for booking.`
        );
      });
      setPrevApprovedCount(approvedFacilities.length);
    }
  }, [approvedFacilities.length, prevApprovedCount]);

  // Update last update time when facilities change
  useEffect(() => {
    setLastUpdateTime(new Date());
  }, [approvedFacilities]);

  // Handle manual refresh
  const handleRefresh = () => {
    refreshFacilities();

    // Load bookings from localStorage or use initial mock data
    const savedBookings = localStorage.getItem('quickcourt_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    addNotification('info', 'Refreshing...', 'Updating facility list and bookings...');
  };

  // Booking cancellation functionality removed as requested

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('quickcourt_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Initialize localStorage with mock bookings if not exists
      localStorage.setItem('quickcourt_bookings', JSON.stringify(initialMockBookings));
    }
  }, []);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search Venues', icon: Search },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderSidebar = () => (
    <nav className="mt-8">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveTab(item.id);
          }}
          className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-300 font-semibold ${activeTab === item.id
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-r-4 border-yellow-400 shadow-lg shadow-green-500/50'
              : 'text-white hover:text-green-400 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:border-r-4 hover:border-green-500/50'
            }`}
        >
          <item.icon size={22} />
          <span className="text-base">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Sports-Themed Hero Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-64 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Background Image */}
              <img
                src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sports Action"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 via-emerald-500/80 to-blue-500/90" />

              {/* Animated Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`
              }} />

              {/* Content */}
              <div className="relative h-full flex items-center justify-between px-8">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2"
                  >
                    GAME ON! 🏆
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/90 font-semibold"
                  >
                    Ready to dominate the court?
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-sm text-white/70 mt-2"
                  >
                    Last updated: {lastUpdateTime.toLocaleTimeString()}
                  </motion.p>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="hidden md:flex flex-col gap-3"
                >
                  <button
                    onClick={() => setActiveTab('search')}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                  >
                    🎯 BOOK NOW
                  </button>
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all font-bold shadow-lg ${isRefreshing
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:scale-105'
                      }`}
                  >
                    <RefreshCw
                      size={18}
                      className={isRefreshing ? 'animate-spin' : ''}
                    />
                    <span>{isRefreshing ? 'UPDATING...' : '⚡ REFRESH'}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid - Scoreboard Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Total Bookings',
                  value: '24',
                  icon: Calendar,
                  color: 'from-green-500 to-emerald-600',
                  trend: { value: 12, isUp: true },
                },
                {
                  title: 'Favorite Venues',
                  value: '8',
                  icon: Heart,
                  color: 'from-orange-500 to-red-500',
                },
                {
                  title: 'Hours Played',
                  value: '156',
                  icon: Clock,
                  color: 'from-blue-500 to-cyan-500',
                  trend: { value: 8, isUp: true },
                },
              ].map((stat, index) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  trend={stat.trend}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Available Venues Count - Sports Theme */}
            <div className="rounded-2xl border-2 border-green-500/50 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-md p-6 shadow-2xl shadow-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">🏟️ Available Venues</h2>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  {approvedFacilities.length}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                {isRefreshing ? '⚡ Updating venue list...' : '✅ Real-time updates enabled'}
              </p>
            </div>

            {/* Popular Venues - Sports Theme */}
            <div className="rounded-2xl border-2 border-blue-500/50 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-md p-6 shadow-2xl shadow-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  ⚡ FEATURED COURTS
                </h2>
                {isRefreshing && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <RefreshCw size={18} className="animate-spin" />
                    <span className="text-sm font-bold">UPDATING...</span>
                  </div>
                )}
              </div>

              {approvedFacilities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No venues available yet</div>
                  <button
                    onClick={handleRefresh}
                    className="text-green-400 hover:text-green-300 underline font-semibold"
                  >
                    Click here to refresh
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {approvedFacilities.slice(0, 6).map((facility, index) => (
                      <motion.div
                        key={facility.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="cursor-pointer"
                      >
                        <PremiumCard
                          image={facility.images[0]}
                          title={facility.name}
                          subtitle={facility.location}
                          badge={`₹${facility.pricePerHour}/hr`}
                          badgeColor="green"
                          onClick={() => navigate(`/facility/${facility.id}`)}
                          className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-green-500/30 backdrop-blur-md hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50">
                              <Star className="text-yellow-400 fill-current" size={16} />
                              <span className="text-sm font-bold ml-1 text-yellow-300">{facility.rating}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {facility.sports.slice(0, 2).map((sport: string) => (
                                <span key={sport} className="px-2 py-1 bg-gradient-to-r from-green-500/30 to-blue-500/30 text-green-300 text-xs font-bold rounded-full border border-green-500/50">
                                  {sport}
                                </span>
                              ))}
                            </div>
                          </div>

                          <PremiumButton
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => navigate(`/facility/${facility.id}`)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 font-bold"
                          >
                            🎯 BOOK NOW
                          </PremiumButton>
                        </PremiumCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div className="text-center mt-8">
                <PremiumButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setActiveTab('search')}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8"
                >
                  ```
                </PremiumButton>
              </div>
            </div>

            {/* Recent Bookings - Sports Theme */}
            <div className="rounded-2xl border-2 border-orange-500/50 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-md p-6 shadow-2xl shadow-orange-500/20">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-6">
                📅 RECENT BOOKINGS
              </h2>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => {
                  const facility = approvedFacilities.find(f => f.id === booking.facilityId);
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 border-2 border-green-500/30 rounded-lg bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm hover:border-green-500 transition-all duration-300"
                    >
                      <div>
                        <h3 className="font-bold text-white text-lg">{facility?.name || 'Unknown Facility'}</h3>
                        <p className="text-sm text-gray-300">📅 {booking.date} • ⏰ {booking.timeSlot}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-green-400 text-xl">₹{booking.totalPrice}</p>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${booking.status === 'confirmed' ? 'bg-green-500/30 text-green-300 border-2 border-green-500' :
                          booking.status === 'cancelled' ? 'bg-red-500/30 text-red-300 border-2 border-red-500' :
                            'bg-gray-500/30 text-gray-300 border-2 border-gray-500'
                          }`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Find Sports Venues</h1>
                <p className="text-gray-300 mt-1">Discover and book the perfect court for your game</p>
                <p className="text-sm text-gray-400 mt-1">
                  {approvedFacilities.length} venues available
                </p>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isRefreshing
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? 'animate-spin' : ''}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>

            {/* Search Filters */}
            <div className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md p-6 shadow-2xl">
              <div className="grid md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Enter location or venue name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const value = e.target.value as 'all' | 'indoor' | 'outdoor';
                      setCategory(value);
                      setSelectedSport('');
                    }}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                  >
                    <option value="all">All</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                  >
                    {(() => {
                      const allSports = Array.from(new Set([...indoorGames, ...outdoorGames]));
                      const currentSports =
                        category === 'indoor'
                          ? ['All Indoor Games', ...indoorGames]
                          : category === 'outdoor'
                            ? ['All Outdoor Games', ...outdoorGames]
                            : ['All Sports', ...allSports];

                      return currentSports.map((sport, index) => (
                        <option key={sport} value={index === 0 ? '' : sport}>{sport}</option>
                      ));
                    })()}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                  >
                    <option value="">Any Price</option>
                    <option value="0-25">₹0 - ₹25</option>
                    <option value="25-50">₹25 - ₹50</option>
                    <option value="50+">₹50+</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Filter size={16} className="mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const allSports = Array.from(new Set([...indoorGames, ...outdoorGames]));
                const currentSports =
                  category === 'indoor'
                    ? ['All Indoor Games', ...indoorGames]
                    : category === 'outdoor'
                      ? ['All Outdoor Games', ...outdoorGames]
                      : ['All Sports', ...allSports];

                const filteredFacilities = approvedFacilities.filter((facility) => {
                  const matchesSearch =
                    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    facility.location.toLowerCase().includes(searchTerm.toLowerCase());

                  const matchesSport = selectedSport
                    ? facility.sports.includes(selectedSport)
                    : true;

                  let matchesPrice = true;
                  if (priceRange === '0-25') {
                    matchesPrice = facility.pricePerHour <= 25;
                  } else if (priceRange === '25-50') {
                    matchesPrice = facility.pricePerHour > 25 && facility.pricePerHour <= 50;
                  } else if (priceRange === '50+') {
                    matchesPrice = facility.pricePerHour > 50;
                  }

                  const matchesCategory =
                    category === 'all'
                      ? true
                      : mockCourts.some(
                        (court) => court.facilityId === facility.id && court.environment === category
                      );

                  return matchesSearch && matchesSport && matchesPrice && matchesCategory;
                });

                if (filteredFacilities.length === 0) {
                  return (
                    <div className="col-span-full text-center py-12">
                      <div className="text-gray-400 mb-4">No venues match your search criteria</div>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedSport('');
                          setPriceRange('');
                          setCategory('all');
                        }}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  );
                }

                return filteredFacilities.map((facility, index) => (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={facility.images[0]}
                        alt={facility.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjc0MjQyIi8+CjxwYXRoIGQ9Ik0xMDAgMTUwTDIwMCAxMDBMMzAwIDE1MEwyMDAgMjAwTDEwMCAxNTBaIiBmaWxsPSIjM0I4MjFGIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iMjAiIGZpbGw9IiM2M0YzNjQiLz4KPGNpcmNsZSBjeD0iMjUwIiBjeT0iMTIwIiByPSIyMCIgZmlsbD0iIzYzRjM2NCIvPgo8L3N2Zz4K';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{facility.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm text-gray-300">{facility.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {facility.sports.map((sport: string) => (
                          <span key={sport} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                            {sport}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm font-medium ml-1 text-white">{facility.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">(120 reviews)</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">₹{facility.pricePerHour}/hr</span>
                      </div>

                      <button
                        onClick={() => navigate(`/facility/${facility.id}`)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Showing {(() => {
                const allSports = Array.from(new Set([...indoorGames, ...outdoorGames]));
                const currentSports =
                  category === 'indoor'
                    ? ['All Indoor Games', ...indoorGames]
                    : category === 'outdoor'
                      ? ['All Outdoor Games', ...outdoorGames]
                      : ['All Sports', ...allSports];

                const filteredFacilities = approvedFacilities.filter((facility) => {
                  const matchesSearch =
                    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    facility.location.toLowerCase().includes(searchTerm.toLowerCase());

                  const matchesSport = selectedSport
                    ? facility.sports.includes(selectedSport)
                    : true;

                  let matchesPrice = true;
                  if (priceRange === '0-25') {
                    matchesPrice = facility.pricePerHour <= 25;
                  } else if (priceRange === '25-50') {
                    matchesPrice = facility.pricePerHour > 25 && facility.pricePerHour <= 50;
                  } else if (priceRange === '50+') {
                    matchesPrice = facility.pricePerHour > 50;
                  }

                  const matchesCategory =
                    category === 'all'
                      ? true
                      : mockCourts.some(
                        (court) => court.facilityId === facility.id && court.environment === category
                      );

                  return matchesSearch && matchesSport && matchesPrice && matchesCategory;
                });

                return filteredFacilities.length;
              })()} of {approvedFacilities.length} venues</p>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">My Bookings</h1>
                <p className="text-gray-300 mt-1">Manage your court reservations</p>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isRefreshing
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? 'animate-spin' : ''}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md shadow-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex space-x-4">
                  <h3 className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    All Bookings
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => {
                      const facility = approvedFacilities.find(f => f.id === booking.facilityId);
                      const court = mockCourts.find(c => c.id === booking.courtId);

                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={facility?.images[0]}
                                alt={facility?.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <div className="text-sm font-semibold text-white">{facility?.name}</div>
                                <div className="text-xs text-blue-300 mb-1">
                                  {court?.name} ({court?.sport})
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <Calendar size={14} className="mr-1" />
                                  {booking.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock size={14} className="mr-1" />
                                  <span className="text-sm text-gray-300">{booking.timeSlot}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-white">₹{booking.totalPrice}</p>
                              <span className={`text-xs px-3 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                booking.status === 'cancelled' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                  'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                                }`}>
                                {booking.status}
                              </span>
                              {/* Cancel button removed as requested */}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">No bookings found</div>
                      <button
                        onClick={() => navigate('/dashboard/user/search')}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        Browse venues to make a booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Profile</h1>
                <p className="text-gray-300 mt-1">Manage your account settings</p>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isRefreshing
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? 'animate-spin' : ''}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>

            <div className="bg-black/40 rounded-xl shadow-2xl border border-white/20 p-6 backdrop-blur-md">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-xl">
                      U
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                      <User size={12} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">User</h2>
                    <p className="text-gray-300">user@example.com</p>
                    <p className="text-sm text-gray-400">Member</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                      onChange={(e) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(e.target.value) && e.target.value !== '') {
                          e.target.setCustomValidity('Please enter a valid email address');
                        } else {
                          e.target.setCustomValidity('');
                        }
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Favorite Sports</label>
                    <div className="flex flex-wrap gap-2">
                      {['Badminton', 'Tennis', 'Football', 'Basketball', 'Cricket'].map(sport => (
                        <label key={sport} className="flex items-center text-white">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">{sport}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Page not found</h2>
            <p className="text-gray-400 mb-4">The requested tab does not exist</p>
            <button
              onClick={() => setActiveTab('home')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Go to Home
            </button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout sidebar={renderSidebar()} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} showChatbot={true}>
      {renderContent()}

      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </DashboardLayout>
  );
};