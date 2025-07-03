import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Animated, Dimensions, Easing } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';

const services = [
  {
    id: '1',
    title: 'Smart Finance',
    description: 'Manage your budgets, track expenses, and achieve financial goals with ease.',
    details: 'Get insights, set savings goals, and automate your finances with our smart tools.',
    color: '#007AFF',
  },
  {
    id: '2',
    title: 'Secure Communication',
    description: 'Connect with friends and family through encrypted messaging and calls.',
    details: 'Enjoy private, secure, and fast communication with end-to-end encryption.',
    color: '#00B894',
  },
  {
    id: '3',
    title: 'Productivity Tools',
    description: 'Boost your efficiency with integrated task management and collaboration features.',
    details: 'Organize your tasks, share files, and collaborate in real-time with your team.',
    color: '#FFD93D',
  },
  {
    id: '4',
    title: 'Health & Wellness',
    description: 'Track your fitness, monitor health metrics, and access wellness resources.',
    details: 'Personalized health plans, activity tracking, and expert wellness advice.',
    color: '#FF5722',
  },
  {
    id: '5',
    title: 'Travel & Leisure',
    description: 'Plan trips, book accommodations, and find exciting activities with our integrated travel tools.',
    details: 'Discover destinations, book hotels, and manage your itinerary in one place.',
    color: '#9C27B0',
  },
  {
    id: '6',
    title: 'Learning & Development',
    description: 'Access educational content, online courses, and skill-building resources.',
    details: 'Learn new skills, take courses, and track your progress with our learning hub.',
    color: '#E91E63',
  },
  {
    id: '7',
    title: 'Home Management',
    description: 'Manage household chores, utilities, and smart home devices from one place.',
    details: 'Automate chores, control smart devices, and keep your home running smoothly.',
    color: '#607D8B',
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
        <Text style={styles.heroTitle}>Explore Our Services</Text>
        <Text style={styles.heroSubtitle}>Axzora brings you a suite of powerful, integrated services to simplify and enrich your daily life. Discover what we offer below!</Text>
        <Animated.View style={{ marginTop: 24, transform: [{ scale: ctaScale }] }}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPressIn={handleCTAPressIn}
            onPressOut={handleCTAPressOut}
            {...(Platform.OS === 'web' ? { onMouseEnter: handleCTAMouseEnter, onMouseLeave: handleCTAMouseLeave } : {})}
            onPress={onCTAPress}
          >
            <Text style={styles.ctaButtonText}>Get Started with Axzora</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function AnimatedServiceCard({ service, theme, delay }) {
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
      Platform.OS === 'web' && { scale: hoverAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) },
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
      style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }, cardStyle]}
      {...(Platform.OS === 'web' ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } : {})}
    >
      <View style={[styles.icon, { backgroundColor: service.color }]}> 
        <Text style={styles.iconText}>{service.title.charAt(0)}</Text>
      </View>
      <Text style={[styles.serviceTitle, { color: service.color }]}>{service.title}</Text>
      <Text style={[styles.serviceDescription, { color: theme.text }]}>{service.description}</Text>
      <Text style={[styles.serviceDetails, { color: theme.secondary }]}>{service.details}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: service.color }]}
        onPress={() => { /* navigation to service main page, empty for now */ }}
      >
        <Text style={styles.buttonText}>Go to {service.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function Services({ navigation }) {
  const { theme } = useTheme();
  const serviceRows = chunkArray(services, 4);
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Navbar navigation={navigation} />
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.background }]} 
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.mainContent}>
          <AnimatedHero theme={theme} />
          <View style={styles.gridContainer}>
            {serviceRows.map((row, rowIdx) => (
              <View key={rowIdx} style={styles.gridRow}>
                {row.map(service => (
                  <View key={service.id} style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }]}> 
                    <View style={[styles.icon, { backgroundColor: service.color }]}> 
                      <Text style={styles.iconText}>{service.title.charAt(0)}</Text>
                    </View>
                    <Text style={[styles.serviceTitle, { color: service.color }]}>{service.title}</Text>
                    <Text style={[styles.serviceDescription, { color: theme.text }]}>{service.description}</Text>
                    <Text style={[styles.serviceDetails, { color: theme.secondary }]}>{service.details}</Text>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: service.color }]}
                      onPress={() => { /* navigation to service main page, empty for now */ }}
                    >
                      <Text style={styles.buttonText}>Go to {service.title}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    minHeight: Platform.OS === 'web' ? '100vh' : Dimensions.get('window').height,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 24,
  },
  gridRow: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 24, gap: 24 },
  card: {
    width: 340,
    maxWidth: 340,
    borderRadius: 20,
    padding: 28,
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    backgroundColor: '#fff',
    ...Platform.select({ web: { boxShadow: '0 8px 32px #007aff18', transition: 'box-shadow 0.25s, transform 0.18s',
      ':hover': { boxShadow: '0 12px 40px #007aff22', transform: 'translateY(-4px) scale(1.03)' },
      ':focus': { outline: '2px solid #007AFF', outlineOffset: 2 },
      ':active': { boxShadow: '0 4px 16px #007aff11', transform: 'scale(0.98)' },
    } }),
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: '#e0f2fe',
    ...Platform.select({ web: { transition: 'background 0.18s, transform 0.18s' } }),
  },
  iconText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.18s, transform 0.18s',
      ':hover': { backgroundColor: '#005ecb', transform: 'scale(1.04)' },
      ':active': { backgroundColor: '#003e7e', transform: 'scale(0.97)' },
    } }),
    shadowColor: '#007AFF',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  ctaButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.18s, transform 0.18s',
      ':hover': { backgroundColor: '#005ecb', transform: 'scale(1.04)' },
      ':active': { backgroundColor: '#003e7e', transform: 'scale(0.97)' },
    } }),
    shadowColor: '#007AFF',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
}); 