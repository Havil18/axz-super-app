import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Modal, Animated, Dimensions, FlatList, Easing } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function AnimatedServiceCard({ service, index }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, [animatedValue, index]);

  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
      Platform.OS === 'web' && {
        scale: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05],
        }),
      },
    ].filter(Boolean),
  };

  return (
    <Animated.View style={[styles.serviceCard, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.92}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={[styles.serviceCardContent, { backgroundColor: service.color + '15' }]}
      >
        <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
          <Text style={styles.serviceIconText}>{service.title.charAt(0)}</Text>
        </View>
        <Text style={[styles.serviceTitle, { color: service.color }]}>{service.title}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function AnimatedBlogCard({ post, index, navigation }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, [animatedValue, index]);

  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
      Platform.OS === 'web' && {
        scale: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ].filter(Boolean),
    ...Platform.select({
      web: {
        shadowColor: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['#007AFF', '#007AFF'],
        }),
        shadowOpacity: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.09, 0.2],
        }),
        shadowRadius: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 18],
        }),
        shadowOffset: {
          width: hoverAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
          }),
          height: hoverAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 8],
          }),
        },
        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
        willChange: 'transform, box-shadow',
      },
    }),
  };

  return (
    <Animated.View style={[styles.blogCard, cardStyle, { borderLeftColor: post.color }]}>
      <TouchableOpacity
        activeOpacity={0.92}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <View style={styles.blogMetaRow}>
          <Text style={[styles.blogCategory, { color: post.color }]}>{post.category}</Text>
          <Text style={styles.blogDate}>{post.date}</Text>
        </View>
        <Text style={[styles.blogTitle, { color: post.color }]}>{post.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.blogDescription}>{post.preview}</Text>
        <TouchableOpacity style={[styles.readMoreButton, { backgroundColor: post.color + '22' }]} onPress={() => navigation.navigate('Blog')}> 
          <Text style={[styles.readMoreText, { color: post.color }]}>Read More</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

function AnimatedHero({ theme }) {
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const headlineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, { toValue: 1, duration: 4000, useNativeDriver: false, easing: Easing.inOut(Easing.quad) }),
        Animated.timing(gradientAnim, { toValue: 0, duration: 4000, useNativeDriver: false, easing: Easing.inOut(Easing.quad) }),
      ])
    ).start();
    Animated.spring(pulseAnim, { toValue: 1.08, friction: 2, tension: 80, useNativeDriver: true }).start(() => {
      Animated.spring(pulseAnim, { toValue: 1, friction: 2, tension: 80, useNativeDriver: true }).start();
    });
    Animated.timing(headlineAnim, { toValue: 1, duration: 900, useNativeDriver: true, easing: Easing.out(Easing.exp) }).start();
  }, []);

  const bgColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#007AFF', '#00B894']
  });

  return (
    <Animated.View style={[styles.heroContainer, { backgroundColor: bgColor }]}> 
      <Animated.View style={[styles.heroFloatingShape, { top: 40, left: 60, opacity: 0.18, transform: [{ scale: gradientAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] }]} />
      <Animated.View style={[styles.heroFloatingShape, { top: 120, right: 80, opacity: 0.13, backgroundColor: '#FFD93D', width: 180, height: 180, borderRadius: 90 }]} />
      <Animated.View style={[styles.heroFloatingShape, { bottom: 60, left: 120, opacity: 0.10, backgroundColor: '#E91E63', width: 120, height: 120, borderRadius: 60 }]} />
      <Animated.View style={[styles.heroContent, { opacity: headlineAnim, transform: [{ translateY: headlineAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}> 
        <Animated.Text style={[styles.heroHeadline, { transform: [{ scale: pulseAnim }] }]}>Innovate with Axzora.</Animated.Text>
        <Text style={styles.heroSubheadline}>Your all-in-one super app for modern living.</Text>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

export default function LandingScreen({ navigation, route }) {
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(route?.params?.showWelcome || false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const aboutSectionAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    if (showWelcome) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }

    // Animate About Us section on mount
    Animated.spring(aboutSectionAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: 300, // Small delay after hero section
    }).start();

  }, [showWelcome]);

  const handleCloseWelcome = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowWelcome(false));
  };

  const services = [
    {
      id: '1',
      title: 'Smart Finance',
      description: 'Manage your budgets, track expenses, and achieve financial goals with ease.',
      color: '#007AFF',
    },
    {
      id: '2',
      title: 'Secure Communication',
      description: 'Connect with friends and family through encrypted messaging and calls.',
      color: '#00B894',
    },
    {
      id: '3',
      title: 'Productivity Tools',
      description: 'Boost your efficiency with integrated task management and collaboration features.',
      color: '#FFD93D',
    },
    {
      id: '4',
      title: 'Health & Wellness',
      description: 'Track your fitness, monitor health metrics, and access wellness resources.',
      color: '#FF5722',
    },
    {
      id: '5',
      title: 'Travel & Leisure',
      description: 'Plan trips, book accommodations, and find exciting activities with our integrated travel tools.',
      color: '#9C27B0',
    },
    {
      id: '6',
      title: 'Learning & Development',
      description: 'Access educational content, online courses, and skill-building resources.',
      color: '#E91E63',
    },
    {
      id: '7',
      title: 'Home Management',
      description: 'Manage household chores, utilities, and smart home devices from one place.',
      color: '#607D8B',
    },
    {
      id: '8',
      title: 'Home Management',
      description: 'Manage household chores, utilities, and smart home devices from one place.',
      color: '#607D8B',
    },
  ];

  const blogPosts = [
    {
      id: '1',
      category: 'Technology',
      date: '2023-10-26',
      title: 'The Future of AI in Daily Life',
      preview: 'Explore how artificial intelligence is transforming everyday experiences.',
      color: '#007AFF',
    },
    {
      id: '2',
      category: 'Finance',
      date: '2023-10-20',
      title: '5 Tips for Smart Budgeting',
      preview: 'Learn essential strategies to manage your money effectively.',
      color: '#00B894',
    },
    {
      id: '3',
      category: 'Wellness',
      date: '2023-10-15',
      title: 'Mindfulness in the Modern World',
      preview: 'Discover the benefits of mindfulness and how to practice it daily.',
      color: '#FFD93D',
    },
    {
      id: '4',
      category: 'Productivity',
      date: '2023-10-10',
      title: 'Mastering Your Workflow',
      preview: 'Unlock peak productivity with these proven techniques and tools.',
      color: '#FF5722',
    },
    {
      id: '5',
      category: 'Travel',
      date: '2023-10-05',
      title: 'Hidden Gems: Exploring Lesser-Known Destinations',
      preview: 'Embark on an adventure to unique places off the beaten path.',
      color: '#9C27B0',
    },
    {
      id: '6',
      category: 'Lifestyle',
      date: '2023-09-30',
      title: 'Healthy Habits for a Happier You',
      preview: 'Simple changes to elevate your daily routine and well-being.',
      color: '#E91E63',
    },
    {
      id: '7',
      category: 'Business',
      date: '2023-09-25',
      title: 'Innovating for Impact: Startup Success Stories',
      preview: 'Insights from disruptive startups making a real difference.',
      color: '#607D8B',
    },
  ];

  const aboutSectionAnimatedStyle = {
    opacity: aboutSectionAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: aboutSectionAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: aboutSectionAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  const testimonials = [
    {
      id: '1',
      quote: "Axzora has revolutionized how I manage my daily tasks. It's truly an all-in-one solution!",
      author: 'Jane Doe',
      role: 'Entrepreneur',
    },
    {
      id: '2',
      quote: "The financial tools are incredibly insightful and easy to use. Highly recommend for personal finance.",
      author: 'John Smith',
      role: 'Financial Analyst',
    },
    {
      id: '3',
      quote: "Communication features are seamless. My team and I are more productive than ever before.",
      author: 'Emily White',
      role: 'Team Lead',
    },
    {
      id: '4',
      quote: "A beautifully designed app that simplifies complex processes. Axzora is a game-changer.",
      author: 'Michael Brown',
      role: 'UX Designer',
    },
    {
      id: '5',
      quote: "I love the integrated wellness features; they help me stay on track with my health goals.",
      author: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
    },
    {
      id: '6',
      quote: "The travel planning tools are excellent. I can organize my entire trip from one place.",
      author: 'David Lee',
      role: 'Travel Blogger',
    },
    {
      id: '7',
      quote: "Axzora has made my daily routine so much smoother. It's truly a super app!",
      author: 'Jessica Taylor',
      role: 'Busy Parent',
    },
  ];

  const partners = [
    {
      id: '1',
      name: 'Tech Solutions Inc.',
    },
    {
      id: '2',
      name: 'Global Innovations',
    },
    {
      id: '3',
      name: 'Creative Agency X',
    },
    {
      id: '4',
      name: 'Future Ventures',
    },
    {
      id: '5',
      name: 'Digital Creators',
    },
    {
      id: '6',
      name: 'Innovation Hub',
    },
    {
      id: '7',
      name: 'Strategic Alliance',
    },
    {
      id: '8',
      name: 'Enterprise Connect',
    },
    {
      id: '9',
      name: 'Data Systems Co.',
    },
  ];

  const steps = [
    {
      id: '1',
      number: '1.',
      title: 'Sign Up',
      description: 'Create your free Axzora account in minutes.',
    },
    {
      id: '2',
      number: '2.',
      title: 'Explore Features',
      description: 'Discover a wide range of services tailored for you.',
    },
    {
      id: '3',
      number: '3.',
      title: 'Achieve Goals',
      description: 'Leverage powerful tools to simplify your life.',
    },
  ];

  const faqData = [
    {
      id: '1',
      question: 'What is Axzora Super App?',
      answer: 'Axzora Super App is an all-in-one platform designed to centralize various essential services like finance management, communication, and productivity tools, simplifying your daily digital life.',
    },
    {
      id: '2',
      question: 'How do I create an account?',
      answer: 'You can easily create an account by clicking on the \"Sign Up\" button on the login page and following the simple registration steps.',
    },
    {
      id: '3',
      question: 'Is my data secure with Axzora?',
      answer: 'Yes, we prioritize your data security with advanced encryption and robust privacy protocols to ensure your information is always protected.',
    },
    {
      id: '4',
      question: 'What kind of services does Axzora offer?',
      answer: 'Axzora offers a wide range of services including smart finance management, secure communication, productivity tools, and more, all integrated into a single intuitive app.',
    },
    {
      id: '5',
      question: 'Can I use Axzora on multiple devices?',
      answer: 'Absolutely! Axzora is designed to be fully responsive and accessible across various devices, including smartphones, tablets, and web browsers, ensuring a seamless experience.',
    },
  ];

  const handleScrollLeft = () => {
    if (flatListRef.current && currentServiceIndex > 0) {
      const newIndex = currentServiceIndex - 1;
      setCurrentServiceIndex(newIndex);
      Animated.timing(scrollX, {
        toValue: newIndex * 280,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
      flatListRef.current.scrollToOffset({ offset: newIndex * 280, animated: true });
    }
  };

  const handleScrollRight = () => {
    if (flatListRef.current && currentServiceIndex < services.length - 1) {
      const newIndex = currentServiceIndex + 1;
      setCurrentServiceIndex(newIndex);
      Animated.timing(scrollX, {
        toValue: newIndex * 280,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
      flatListRef.current.scrollToOffset({ offset: newIndex * 280, animated: true });
    }
  };

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}> 
        <Navbar navigation={navigation} />
        <AnimatedHero theme={theme} />
        <View style={[styles.sectionServices, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Services</Text>
          <View style={styles.servicesContainer}>
            <Animated.FlatList
              ref={flatListRef}
              data={services}
              renderItem={({ item, index }) => (
                <AnimatedServiceCard key={item.id} service={item} index={index} />
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.servicesListContainer}
              snapToInterval={280}
              decelerationRate="fast"
              snapToAlignment="start"
              pagingEnabled
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true, listener: (e) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / 280);
                  setCurrentServiceIndex(idx);
                }}
              )}
              scrollEventThrottle={16}
            />
            {Platform.OS === 'web' && (
              <View style={styles.scrollControls}>
                <TouchableOpacity 
                  style={[styles.scrollButton, scrollX._value <= 0 && styles.scrollButtonDisabled]}
                  onPress={handleScrollLeft}
                  disabled={scrollX._value <= 0}
                >
                  <Text style={[styles.scrollButtonText, scrollX._value <= 0 && styles.scrollButtonTextDisabled]}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.scrollButton, scrollX._value >= (services.length - 1) * 280 && styles.scrollButtonDisabled]}
                  onPress={handleScrollRight}
                  disabled={scrollX._value >= (services.length - 1) * 280}
                >
                  <Text style={[styles.scrollButtonText, scrollX._value >= (services.length - 1) * 280 && styles.scrollButtonTextDisabled]}>→</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={[styles.sectionBlog, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Latest Blog Posts</Text>
          <View style={styles.grid}>
            {blogPosts.map((post, index) => (
              <AnimatedBlogCard key={post.id} post={post} index={index} navigation={navigation} />
            ))}
          </View>
        </View>
        <Animated.View style={[styles.sectionAbout, { backgroundColor: theme.card, shadowColor: theme.shadow }, aboutSectionAnimatedStyle]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About Us</Text>
          <Text style={[styles.aboutText, { color: theme.secondary }]}>
            Axzora Super App is your ultimate solution for all your daily needs. 
            We connect you with a wide range of services, from shopping and travel 
            to wedding planning and IT solutions. Our mission is to simplify your life 
            by providing seamless, reliable, and efficient services all in one place.
            Discover a new level of convenience and excellence with Axzora. 
            We are committed to delivering top-notch service and building lasting relationships 
            with our users. Welcome to the future of convenience!
          </Text>
        </Animated.View>
        <Animated.View style={[styles.sectionHowItWorks, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }]}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.howItWorksStepsContainer}>
            {steps.map((step, index) => (
              <AnimatedHowItWorksStep key={step.id} step={step} index={index} />
            ))}
          </View>
        </Animated.View>
        <Animated.View style={[styles.sectionHowItWorks, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }]}>
          <Text style={styles.sectionTitle}>What Our Users Say</Text>
          <FlatList
            data={testimonials}
            renderItem={({ item, index }) => <AnimatedTestimonialCard testimonial={item} index={index} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsListContainer}
            snapToInterval={300}
            decelerationRate="fast"
            snapToAlignment="start"
            pagingEnabled
          />
        </Animated.View>
        <Animated.View style={[styles.sectionCTA, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }]}>
          <Text style={styles.ctaHeadline}>Ready to Simplify Your Life?</Text>
          <Text style={styles.ctaSubheadline}>Join thousands of satisfied users and experience the future of digital convenience with Axzora.</Text>
          <Animated.View
            style={[
              { opacity: aboutSectionAnim },
              {
                transform: [
                  { scale: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
                ],
              },
            ]}
          >
            <TouchableOpacity style={styles.ctaButtonLarge}>
              <Text style={styles.ctaButtonText}>Get Started Today</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.sectionPartners, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }]}>
          <Text style={styles.sectionTitle}>Our Valued Partners</Text>
          <FlatList
            data={partners}
            renderItem={({ item }) => (
              <AnimatedPartnerLogo partner={item} index={item.id} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.partnersListContainer}
          />
        </Animated.View>
        <Animated.View style={[styles.sectionFAQ, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }]}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </Animated.View>
        <Footer />
      </ScrollView>
      <Modal
        visible={showWelcome}
        transparent
        animationType="none"
        onRequestClose={handleCloseWelcome}
      >
        <Animated.View style={[styles.welcomeOverlay, { opacity: fadeAnim }]}> 
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to The Axzora!</Text>
            <Text style={styles.welcomeSubtitle}>Your account has been created successfully.</Text>
            <TouchableOpacity style={styles.welcomeButton} onPress={handleCloseWelcome}>
              <Text style={styles.welcomeButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}

function AnimatedTestimonialCard({ testimonial, index }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, [animatedValue, index]);

  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.timing(hoverAnimatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
      Platform.OS === 'web' && {
        scale: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ].filter(Boolean),
    ...Platform.select({
      web: {
        shadowColor: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['#007AFF', '#007AFF'],
        }),
        shadowOpacity: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.09, 0.2],
        }),
        shadowRadius: hoverAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 18],
        }),
        shadowOffset: {
          width: hoverAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
          }),
          height: hoverAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 8],
          }),
        },
        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
        willChange: 'transform, box-shadow',
      },
    }),
  };

  return (
    <Animated.View style={[styles.testimonialCard, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.92}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Text style={styles.testimonialQuote}>\" {testimonial.quote} \"</Text>
        <Text style={styles.testimonialAuthor}>- {testimonial.author}</Text>
        <Text style={styles.testimonialRole}>{testimonial.role}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6fa',
  },
  heroContainer: {
    minHeight: 380,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    marginBottom: 24,
  },
  heroFloatingShape: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  heroContent: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 60,
    width: '100%',
  },
  heroHeadline: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubheadline: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
    letterSpacing: 0.2,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 8,
  },
  ctaButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  sectionServices: {
    paddingVertical: 24,
    backgroundColor: '#f8fafc',
    marginBottom: 24,
    marginHorizontal: 12,
    borderRadius: 16,
    ...Platform.select({ web: { boxShadow: '0 2px 8px #007aff08' } }),
  },
  sectionBlog: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginBottom: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    marginHorizontal: 8,
    ...Platform.select({ web: { boxShadow: '0 2px 8px #007aff08' } }),
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
    letterSpacing: 0.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
  },
  servicesContainer: {
    position: 'relative',
    marginTop: 20,
  },
  servicesListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  scrollControls: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    transform: [{ translateY: -20 }],
    zIndex: 1,
  },
  scrollButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          backgroundColor: '#fff',
          transform: 'scale(1.1)',
        },
      },
    }),
  },
  scrollButtonDisabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    ...Platform.select({
      web: {
        cursor: 'not-allowed',
        ':hover': {
          transform: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    }),
  },
  scrollButtonText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  scrollButtonTextDisabled: {
    color: '#999',
  },
  serviceCard: {
    width: 260,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-out',
      },
    }),
  },
  serviceCardContent: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 22,
    marginBottom: 16,
    width: '100%',
    maxWidth: 340,
    flexGrow: 1,
    flexBasis: '45%',
    borderLeftWidth: 6,
    shadowColor: '#007AFF',
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#e3eaf2',
    ...Platform.select({ web: { boxShadow: '0 2px 16px #007aff11', transition: 'box-shadow 0.25s, transform 0.25s', willChange: 'box-shadow, transform' } }),
  },
  blogMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  blogCategory: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  blogDate: {
    fontSize: 13,
    color: '#888',
  },
  blogTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  blogDescription: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  readMoreButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.25s, transform 0.25s', willChange: 'background, transform' } }),
  },
  readMoreText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionAbout: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderRadius: 16,
    marginHorizontal: 12,
    shadowColor: '#007AFF',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    ...Platform.select({ web: { boxShadow: '0 4px 16px #007aff18' } }),
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'left',
    maxWidth: 700,
    marginTop: 10,
  },
  welcomeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 36,
    width: 340,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    ...Platform.select({ web: { boxShadow: '0 6px 32px #007aff22' } }),
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 17,
    color: '#23272f',
    marginBottom: 22,
    textAlign: 'center',
  },
  welcomeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 36,
    paddingVertical: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  welcomeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHowItWorks: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginBottom: 24,
    borderRadius: 16,
    marginHorizontal: 12,
    shadowColor: '#007AFF',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    ...Platform.select({ web: { boxShadow: '0 4px 16px #007aff18' } }),
  },
  howItWorksStepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  howItWorksStep: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 20,
  },
  stepNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  testimonialsListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  testimonialCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    padding: 20,
    shadowColor: '#007AFF',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    justifyContent: 'space-between',
  },
  testimonialQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#444',
    marginBottom: 15,
    lineHeight: 24,
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  testimonialRole: {
    fontSize: 13,
    color: '#777',
  },
  sectionCTA: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 16,
    marginHorizontal: 12,
    shadowColor: '#007AFF',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    ...Platform.select({ web: { boxShadow: '0 8px 32px #007aff28' } }),
  },
  ctaHeadline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  ctaSubheadline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    maxWidth: 700,
  },
  ctaButtonLarge: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionPartners: {
    paddingVertical: 24,
    backgroundColor: '#F5F8FA',
    marginBottom: 24,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  partnersListContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
  },
  partnerLogoContainer: {
    width: 150,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  partnerLogoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  sectionFAQ: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: '#F5F8FA',
    marginBottom: 24,
    marginHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  faqItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    width: '95%',
    maxWidth: 800,
    shadowColor: '#007AFF',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswerText: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
    lineHeight: 22,
    marginBottom: 6,
  },
});

function FAQItem({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: expanded ? 1 : 0,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [expanded, animatedValue]);

  const arrowRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <Animated.View style={[styles.faqItemContainer]}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqQuestionContainer}>
        <Text style={styles.faqQuestionText}>{item.question}</Text>
        <Animated.Text style={{ transform: [{ rotate: arrowRotation }], fontSize: 20, color: '#007AFF' }}>▼</Animated.Text>
      </TouchableOpacity>
      {expanded && (
        <Animated.View style={{ opacity: animatedValue, height: heightInterpolate, overflow: 'hidden' }}>
          <Text style={styles.faqAnswerText}>{item.answer}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

function AnimatedHowItWorksStep({ step, index }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: index * 150,
    }).start();
  }, [animatedValue, index]);

  const stepStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.howItWorksStep, stepStyle]}>
      <Text style={styles.stepNumber}>{step.number}</Text>
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDescription}>{step.description}</Text>
    </Animated.View>
  );
}

function AnimatedPartnerLogo({ partner, index }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
      delay: index * 120,
    }).start();
  }, [animatedValue, index]);

  const logoStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.partnerLogoContainer, logoStyle]}>
      <Text style={styles.partnerLogoText}>{partner.name}</Text>
    </Animated.View>
  );
} 