import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Animated, Dimensions, TouchableOpacity, Easing } from 'react-native';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const blogs = [
  {
    id: '1',
    title: 'Axzora has revolutionized how I manage my daily tasks. It\'s truly an all-in-one solution!',
    author: 'Jane Doe',
    date: '2024-06-01',
    summary: 'Discover how Axzora can simplify your daily routine and boost your productivity.',
    content: 'Axzora offers a suite of integrated tools that help you manage your daily tasks, finances, and communications all in one place. With its intuitive interface and powerful features, you can streamline your workflow, set reminders, and stay connected with your team or family. The app\'s smart finance tools help you track expenses and set savings goals, while the secure communication features ensure your conversations remain private. Whether you\'re a busy professional or a multitasking parent, Axzora adapts to your needs and helps you achieve more every day.'
  },
  {
    id: '2',
    title: 'The financial tools are incredibly insightful and easy to use. Highly recommend for personal finance.',
    author: 'John Smith',
    date: '2024-05-28',
    summary: 'Take control of your finances with Axzora\'s smart budgeting and expense tracking features.',
    content: 'Managing personal finances has never been easier. Axzora\'s financial tools provide real-time insights into your spending habits, help you set achievable savings goals, and automate routine transactions. The app\'s user-friendly dashboard gives you a clear overview of your financial health, while customizable alerts keep you on track. Whether you\'re saving for a big purchase or just want to avoid overspending, Axzora empowers you to make informed decisions and reach your financial goals.'
  },
  {
    id: '3',
    title: 'Communication features are seamless. My team and I are more productive than ever before.',
    author: 'Emily White',
    date: '2024-05-20',
    summary: 'Collaborate and communicate securely with Axzora\'s encrypted messaging and calling.',
    content: 'Axzora\'s communication suite is designed for both personal and professional use. Enjoy end-to-end encrypted messaging, high-quality voice and video calls, and easy file sharing. The app integrates with your calendar and task manager, making it simple to schedule meetings and follow up on action items. With Axzora, you can create group chats, assign tasks, and keep everyone in the loop, all while ensuring your data remains secure.'
  },
  {
    id: '4',
    title: 'A beautifully designed app that simplifies complex processes. Axzora is a game-changer.',
    author: 'Michael Brown',
    date: '2024-05-15',
    summary: 'Experience a new level of convenience with Axzora\'s all-in-one platform.',
    content: 'From booking travel to managing home utilities, Axzora brings together a wide range of services under one roof. The app\'s elegant design and intuitive navigation make it easy to find what you need, when you need it. Personalized recommendations and smart automation features save you time and effort, while the responsive support team is always ready to help. Discover how Axzora can transform the way you live and work.'
  },
  {
    id: '5',
    title: 'I love the integrated wellness features; they help me stay on track with my health goals.',
    author: 'Sarah Johnson',
    date: '2024-05-10',
    summary: 'Stay healthy and motivated with Axzora\'s wellness tracking and personalized plans.',
    content: 'Axzora\'s health and wellness tools are designed to support your physical and mental well-being. Track your fitness activities, monitor your health metrics, and access expert advice all in one place. The app offers personalized workout plans, nutrition tips, and mindfulness exercises to help you stay balanced and motivated. With regular progress reports and goal-setting features, Axzora makes it easy to prioritize your health.'
  },
  {
    id: '6',
    title: 'The travel planning tools are excellent. I can organize my entire trip from one place.',
    author: 'David Lee',
    date: '2024-05-05',
    summary: 'Plan, book, and manage your travels effortlessly with Axzora\'s integrated travel tools.',
    content: 'Traveling is stress-free with Axzora. The app lets you search for destinations, book flights and hotels, and create detailed itineraries. You can also find local attractions, read reviews, and get real-time updates on your bookings. Axzora\'s travel assistant helps you stay organized and prepared, whether you\'re traveling for business or leisure. Share your plans with friends or colleagues and enjoy a seamless travel experience.'
  },
  {
    id: '7',
    title: 'Axzora has made my daily routine so much smoother. It\'s truly a super app!',
    author: 'Jessica Taylor',
    date: '2024-05-01',
    summary: 'Discover the convenience of managing all your daily needs with one app.',
    content: 'Axzora brings together essential services like shopping, travel, home management, and more. The app\'s unified interface and smart integrations help you save time and reduce stress. Whether you\'re paying bills, booking appointments, or organizing events, Axzora has you covered. Explore the endless possibilities and see why so many users call it their go-to app for everything.'
  },
];

function AnimatedHero({ theme, onCTAPress }) {
  const gradientAnim = useRef(new Animated.Value(0)).current;
  // Parallax values for floating shapes
  const parallax1 = useRef(new Animated.Value(0)).current;
  const parallax2 = useRef(new Animated.Value(0)).current;
  const parallax3 = useRef(new Animated.Value(0)).current;
  // CTA button animation
  const ctaScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, { toValue: 1, duration: 4000, useNativeDriver: false }),
        Animated.timing(gradientAnim, { toValue: 0, duration: 4000, useNativeDriver: false }),
      ])
    ).start();
    // Parallax floating shapes
    Animated.loop(
      Animated.sequence([
        Animated.timing(parallax1, { toValue: 1, duration: 9000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(parallax1, { toValue: 0, duration: 9000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(parallax2, { toValue: 1, duration: 12000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(parallax2, { toValue: 0, duration: 12000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(parallax3, { toValue: 1, duration: 10000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(parallax3, { toValue: 0, duration: 10000, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    ).start();
    // CTA bounce on mount
    Animated.spring(ctaScale, { toValue: 1.08, friction: 2, tension: 80, useNativeDriver: true }).start(() => {
      Animated.spring(ctaScale, { toValue: 1, friction: 2, tension: 80, useNativeDriver: true }).start();
    });
  }, []);

  const bgColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.primary, theme.accent]
  });

  // Parallax transforms
  const shape1Style = {
    top: 30,
    left: 60,
    opacity: 0.15,
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [
      { translateY: parallax1.interpolate({ inputRange: [0, 1], outputRange: [0, 24] }) },
      { translateX: parallax1.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) },
    ],
  };
  const shape2Style = {
    top: 100,
    right: 80,
    opacity: 0.10,
    backgroundColor: '#FFD93D',
    width: 180,
    height: 180,
    borderRadius: 90,
    transform: [
      { translateY: parallax2.interpolate({ inputRange: [0, 1], outputRange: [0, -18] }) },
      { translateX: parallax2.interpolate({ inputRange: [0, 1], outputRange: [0, 16] }) },
    ],
  };
  const shape3Style = {
    bottom: 40,
    left: 120,
    opacity: 0.10,
    backgroundColor: '#E91E63',
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [
      { translateY: parallax3.interpolate({ inputRange: [0, 1], outputRange: [0, 22] }) },
      { translateX: parallax3.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) },
    ],
  };

  // CTA button handlers
  const handleCTAPressIn = () => {
    Animated.spring(ctaScale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handleCTAPressOut = () => {
    Animated.spring(ctaScale, { toValue: 1.08, friction: 2, tension: 80, useNativeDriver: true }).start(() => {
      Animated.spring(ctaScale, { toValue: 1, friction: 2, tension: 80, useNativeDriver: true }).start();
    });
  };
  const handleCTAMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.spring(ctaScale, { toValue: 1.06, useNativeDriver: true }).start();
    }
  };
  const handleCTAMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true }).start();
    }
  };

  return (
    <Animated.View style={[styles.heroSection, { backgroundColor: bgColor }]}> 
      <Animated.View style={[styles.heroFloatingShape, shape1Style]} />
      <Animated.View style={[styles.heroFloatingShape, shape2Style]} />
      <Animated.View style={[styles.heroFloatingShape, shape3Style]} />
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Welcome to the Axzora Blog</Text>
        <Text style={styles.heroSubtitle}>Insights, tips, and stories to inspire your journey. Explore our latest articles and discover what's new!</Text>
        <Animated.View style={{ marginTop: 24, transform: [{ scale: ctaScale }] }}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPressIn={handleCTAPressIn}
            onPressOut={handleCTAPressOut}
            {...(Platform.OS === 'web' ? { onMouseEnter: handleCTAMouseEnter, onMouseLeave: handleCTAMouseLeave } : {})}
            onPress={onCTAPress}
          >
            <Text style={styles.ctaButtonText}>Read Latest Articles</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function AnimatedBlogCard({ blog, theme, delay }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay,
    }).start();
  }, [animatedValue, delay]);

  const cardStyle = {
    opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    transform: [
      { translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) },
      { scale: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
      Platform.OS === 'web' && { scale: hoverAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }) },
    ].filter(Boolean),
  };

  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    }
  };
  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    }
  };

  return (
    <Animated.View
      style={[styles.blogCard, cardStyle, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
      {...(Platform.OS === 'web' ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } : {})}
    >
      <Text style={[styles.blogTitle, { color: theme.text }]}>{blog.title}</Text>
      <Text style={[styles.blogMeta, { color: theme.secondary }]}>{blog.author} • {blog.date}</Text>
      <Text style={[styles.blogSummary, { color: theme.text }]}>{blog.summary}</Text>
      <Text style={[styles.blogContent, { color: theme.secondary }]}>{blog.content}</Text>
    </Animated.View>
  );
}

export default function Blog({ navigation }) {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Navbar navigation={navigation} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainer}>
        <AnimatedHero theme={theme} />
        <Text style={[styles.pageTitle, { color: theme.primary }]}>Axzora Blog</Text>
        <View style={styles.blogList}>
          {blogs.map((blog, index) => (
            <AnimatedBlogCard key={blog.id} blog={blog} theme={theme} delay={index * 100} />
          ))}
        </View>
        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    minHeight: Platform.OS === 'web' ? '100vh' : 600,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 12,
    textAlign: 'center',
  },
  blogList: {
    width: '100%',
    maxWidth: 900,
    alignItems: 'center',
  },
  blogCard: {
    width: '100%',
    borderRadius: 16,
    padding: 28,
    marginBottom: 32,
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    ...Platform.select({ web: { boxShadow: '0 4px 16px #007aff11' } }),
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogMeta: {
    fontSize: 14,
    marginBottom: 12,
  },
  blogSummary: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  blogContent: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 24,
  },
  footerWrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  heroSection: {
    width: '100%',
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 30,
  },
  heroFloatingShape: {
    position: 'absolute',
    zIndex: 0,
  },
  heroContent: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 700,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.2,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
  },
}); 