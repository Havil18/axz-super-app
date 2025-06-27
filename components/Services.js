import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Animated, Dimensions } from 'react-native';
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

function AnimatedHero({ theme }) {
  const gradientAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, { toValue: 1, duration: 4000, useNativeDriver: false }),
        Animated.timing(gradientAnim, { toValue: 0, duration: 4000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const bgColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.primary, theme.accent]
  });

  return (
    <Animated.View style={[styles.heroSection, { backgroundColor: bgColor }]}> 
      <Animated.View style={[styles.heroFloatingShape, { top: 30, left: 60, opacity: 0.15, backgroundColor: '#fff', width: 120, height: 120, borderRadius: 60 }]} />
      <Animated.View style={[styles.heroFloatingShape, { top: 100, right: 80, opacity: 0.10, backgroundColor: '#FFD93D', width: 180, height: 180, borderRadius: 90 }]} />
      <Animated.View style={[styles.heroFloatingShape, { bottom: 40, left: 120, opacity: 0.10, backgroundColor: '#E91E63', width: 100, height: 100, borderRadius: 50 }]} />
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Explore Our Services</Text>
        <Text style={styles.heroSubtitle}>Axzora brings you a suite of powerful, integrated services to simplify and enrich your daily life. Discover what we offer below!</Text>
      </View>
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
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    ...Platform.select({ web: { boxShadow: '0 4px 16px #007aff11' } }),
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  serviceDescription: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDetails: {
    fontSize: 15,
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
}); 