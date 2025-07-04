import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Modal, Animated, Dimensions, FlatList, Easing, useWindowDimensions } from 'react-native';
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
  // Parallax values for floating shapes
  const parallax1 = useRef(new Animated.Value(0)).current;
  const parallax2 = useRef(new Animated.Value(0)).current;
  const parallax3 = useRef(new Animated.Value(0)).current;
  // CTA button hover/tap animation
  const ctaScale = useRef(new Animated.Value(1)).current;

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
  }, []);

  const bgColor = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#007AFF', '#00B894']
  });

  // Parallax transforms
  const shape1Style = {
    top: 40,
    left: 60,
    opacity: 0.18,
    transform: [
      { scale: gradientAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) },
      { translateY: parallax1.interpolate({ inputRange: [0, 1], outputRange: [0, 24] }) },
      { translateX: parallax1.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) },
    ],
  };
  const shape2Style = {
    top: 120,
    right: 80,
    opacity: 0.13,
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
    bottom: 60,
    left: 120,
    opacity: 0.10,
    backgroundColor: '#E91E63',
    width: 120,
    height: 120,
    borderRadius: 60,
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
      <Animated.View style={[styles.heroContent, { opacity: headlineAnim, transform: [{ translateY: headlineAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}> 
        <Animated.Text style={[styles.heroTitle, { transform: [{ scale: pulseAnim }] }]}>Innovate with Axzora.</Animated.Text>
        <Text style={styles.heroSubtitle}>Your all-in-one super app for modern living.</Text>
        <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPressIn={handleCTAPressIn}
            onPressOut={handleCTAPressOut}
            {...(Platform.OS === 'web' ? { onMouseEnter: handleCTAMouseEnter, onMouseLeave: handleCTAMouseLeave } : {})}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

function TestimonialCarousel({ testimonials }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [containerWidth, setContainerWidth] = useState(900);
  const scrollViewRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isPaused = useRef(false);

  // Responsive card count and container width
  useEffect(() => {
    function updateLayout() {
      const width = Dimensions.get('window').width;
      setContainerWidth(width);
      if (width < 600) setCardsPerPage(1);
      else if (width < 900) setCardsPerPage(2);
      else if (width < 1200) setCardsPerPage(3);
      else setCardsPerPage(4);
    }
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  // Infinite loop: clone first N cards to end
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, cardsPerPage)];
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const cardWidth = Math.min(340, Math.floor(containerWidth / cardsPerPage) - 24); // 24px gap
  const gap = 24;

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused.current) return;
    autoScrollRef.current = setInterval(() => {
      handleRight();
    }, 5000);
    return () => clearInterval(autoScrollRef.current);
  }, [currentPage, cardsPerPage, testimonials.length]);

  // Pause on hover/touch
  const pauseAutoScroll = () => {
    isPaused.current = true;
    clearInterval(autoScrollRef.current);
  };
  const resumeAutoScroll = () => {
    isPaused.current = false;
    autoScrollRef.current = setInterval(() => {
      handleRight();
    }, 5000);
  };

  // Navigation
  const handleLeft = () => {
    pauseAutoScroll();
    let nextPage = currentPage - 1;
    if (nextPage < 0) {
      nextPage = totalPages - 1;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: (testimonials.length) * (cardWidth + gap), animated: false });
      }
      setTimeout(() => {
        setCurrentPage(nextPage);
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: nextPage * cardsPerPage * (cardWidth + gap), animated: true });
        }
      }, 10);
      return;
    }
    setCurrentPage(nextPage);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: nextPage * cardsPerPage * (cardWidth + gap), animated: true });
    }
  };
  const handleRight = () => {
    pauseAutoScroll();
    let nextPage = currentPage + 1;
    if (nextPage >= totalPages) {
      // Go to the cloned set, then jump back to start
      setCurrentPage(nextPage);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: nextPage * cardsPerPage * (cardWidth + gap), animated: true });
      }
      setTimeout(() => {
        setCurrentPage(0);
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
      }, 400);
      return;
    }
    setCurrentPage(nextPage);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: nextPage * cardsPerPage * (cardWidth + gap), animated: true });
    }
  };

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const onTouchStart = (e) => {
    pauseAutoScroll();
    touchStartX = e.nativeEvent.pageX;
  };
  const onTouchEnd = (e) => {
    touchEndX = e.nativeEvent.pageX;
    const dx = touchEndX - touchStartX;
    if (dx > 40) handleLeft();
    else if (dx < -40) handleRight();
    resumeAutoScroll();
  };

  // Dot navigation
  const goToPage = (page) => {
    pauseAutoScroll();
    setCurrentPage(page);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: page * cardsPerPage * (cardWidth + gap), animated: true });
    }
    setTimeout(resumeAutoScroll, 1000);
  };

  // Ensure only full cards are visible
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: currentPage * cardsPerPage * (cardWidth + gap), animated: true });
    }
  }, [currentPage, cardsPerPage, cardWidth]);

  return (
    <View
      style={{ width: '100%', alignItems: 'center', position: 'relative', marginBottom: 24 }}
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', position: 'relative', justifyContent: 'center' }}>
        {/* Left Arrow */}
        <TouchableOpacity onPress={handleLeft} style={{ zIndex: 2, padding: 8, opacity: 1, marginRight: 8 }}>
          <Text style={{ fontSize: 28, color: '#007AFF', fontWeight: 'bold' }}>{'‹'}</Text>
        </TouchableOpacity>
        {/* Scrollable Cards */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{ flex: 1, maxWidth: '100%' }}
          contentContainerStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', minHeight: 240 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {extendedTestimonials.slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage + cardsPerPage).map((testimonial, idx) => (
            <View
              key={testimonial.id + '-' + idx}
              style={{
                width: cardWidth,
                minHeight: 180,
                height: 220,
                backgroundColor: '#fff',
                borderRadius: 16,
                marginLeft: idx === 0 ? 0 : gap,
                marginRight: idx === cardsPerPage - 1 ? 0 : 0,
                padding: 20,
                shadowColor: '#007AFF',
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
            >
              <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#444', marginBottom: 15, lineHeight: 24 }}>
                " {testimonial.quote} "
              </Text>
              <View style={{ marginTop: 18 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#333' }}>- {testimonial.author}</Text>
                <Text style={{ fontSize: 13, color: '#777' }}>{testimonial.role}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Right Arrow */}
        <TouchableOpacity onPress={handleRight} style={{ zIndex: 2, padding: 8, opacity: 1, marginLeft: 8 }}>
          <Text style={{ fontSize: 28, color: '#007AFF', fontWeight: 'bold' }}>{'›'}</Text>
        </TouchableOpacity>
      </View>
      {/* Dot Indicators */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => goToPage(idx)}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: idx === currentPage ? '#007AFF' : '#e3eaf2',
              marginHorizontal: 5,
              borderWidth: idx === currentPage ? 2 : 1,
              borderColor: idx === currentPage ? '#007AFF' : '#e3eaf2',
              transition: 'background 0.2s, border 0.2s',
            }}
          />
        ))}
      </View>
    </View>
  );
}

function AboutUsSection({ theme, aboutSectionAnimatedStyle }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  // Modern, human-centric SVG illustration (from Undraw, e.g. 'Collaboration')
  const Illustration = () => (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: isMobile ? 180 : 260, maxWidth: 400, borderRadius: 32, boxShadow: Platform.OS === 'web' ? '0 8px 32px #007aff18' : undefined, background: 'transparent', filter: Platform.OS === 'web' ? 'drop-shadow(0 4px 24px #007aff18)' : undefined }}
      aria-label="People collaborating illustration"
    >
      <rect width="800" height="600" fill="none" />
      <ellipse cx="400" cy="570" rx="320" ry="30" fill="#e0f2fe" />
      {/* Main device */}
      <rect x="250" y="180" width="300" height="200" rx="32" fill="#fff" stroke="#bae6fd" strokeWidth="4" />
      <rect x="270" y="210" width="260" height="140" rx="18" fill="#f9fbfd" />
      {/* Person 1 */}
      <ellipse cx="340" cy="340" rx="32" ry="32" fill="#38bdf8" />
      <ellipse cx="340" cy="330" rx="16" ry="16" fill="#fff" />
      <rect x="320" y="355" width="40" height="60" rx="16" fill="#bae6fd" />
      {/* Person 2 */}
      <ellipse cx="460" cy="340" rx="32" ry="32" fill="#34d399" />
      <ellipse cx="460" cy="330" rx="16" ry="16" fill="#fff" />
      <rect x="440" y="355" width="40" height="60" rx="16" fill="#a7f3d0" />
      {/* Person 3 (center, sitting) */}
      <ellipse cx="400" cy="370" rx="28" ry="28" fill="#fbbf24" />
      <ellipse cx="400" cy="362" rx="13" ry="13" fill="#fff" />
      <rect x="385" y="390" width="30" height="40" rx="12" fill="#fde68a" />
      {/* Devices and UI */}
      <rect x="320" y="220" width="160" height="20" rx="8" fill="#e0f2fe" />
      <rect x="320" y="250" width="80" height="16" rx="6" fill="#bae6fd" />
      <rect x="410" y="250" width="60" height="16" rx="6" fill="#a7f3d0" />
      <rect x="320" y="280" width="150" height="12" rx="5" fill="#e0f2fe" />
      {/* Chat bubble */}
      <rect x="500" y="200" width="80" height="32" rx="12" fill="#fff" stroke="#bae6fd" strokeWidth="2" />
      <ellipse cx="540" cy="216" rx="8" ry="8" fill="#38bdf8" />
      <rect x="510" y="210" width="40" height="8" rx="4" fill="#e0f2fe" />
    </svg>
  );

  return (
    <Animated.View
      style={[
        aboutSectionAnimatedStyle,
        {
          backgroundColor: '#f9fbfd',
          borderRadius: 32,
          margin: 16,
          padding: isMobile ? 28 : 56,
          boxShadow: Platform.OS === 'web' ? '0 12px 40px #007aff18' : undefined,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 340,
        },
      ]}
      accessible accessibilityLabel="About Us section"
    >
      {/* Abstract blurred background shapes */}
      {Platform.OS === 'web' && (
        <svg style={{ position: 'absolute', top: -60, left: -80, zIndex: 0 }} width="300" height="300" viewBox="0 0 300 300">
          <ellipse cx="150" cy="150" rx="120" ry="80" fill="#bae6fd" opacity="0.4" filter="blur(20px)" />
        </svg>
      )}
      {Platform.OS === 'web' && (
        <svg style={{ position: 'absolute', bottom: -40, right: -60, zIndex: 0 }} width="220" height="220" viewBox="0 0 220 220">
          <ellipse cx="110" cy="110" rx="90" ry="60" fill="#a7f3d0" opacity="0.3" filter="blur(16px)" />
        </svg>
      )}
      {/* Left: Text */}
      <View
        style={{
          flex: 1,
          zIndex: 1,
          alignItems: isMobile ? 'center' : 'flex-start',
          justifyContent: 'center',
          paddingRight: isMobile ? 0 : 40,
          maxWidth: isMobile ? '100%' : 480,
        }}
      >
        <Text
          style={{
            fontSize: isMobile ? 28 : 38,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 22,
            letterSpacing: 0.3,
            textAlign: isMobile ? 'center' : 'left',
            lineHeight: isMobile ? 36 : 48,
            textShadowColor: Platform.OS === 'web' ? 'rgba(0,0,0,0.04)' : undefined,
            textShadowOffset: Platform.OS === 'web' ? { width: 0, height: 2 } : undefined,
            textShadowRadius: Platform.OS === 'web' ? 8 : undefined,
            ...Platform.select({ web: { transition: 'color 0.18s' } }),
          }}
        >About Us</Text>
        <Text
          style={{
            fontSize: isMobile ? 17 : 21,
            color: theme.secondary,
            lineHeight: isMobile ? 27 : 34,
            maxWidth: 480,
            textAlign: isMobile ? 'center' : 'left',
            marginBottom: 0,
            letterSpacing: 0.1,
            opacity: 0.92,
            ...Platform.select({ web: { transition: 'color 0.18s' } }),
          }}
        >
          Axzora Super App is your ultimate solution for all your daily needs. We connect you with a wide range of services, from shopping and travel to wedding planning and IT solutions. Our mission is to simplify your life by providing seamless, reliable, and efficient services all in one place. Discover a new level of convenience and excellence with Axzora. We are committed to delivering top-notch service and building lasting relationships with our users. Welcome to the future of convenience!
        </Text>
      </View>
      {/* Right: Illustration */}
      <View
        style={{
          flex: 1,
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? 36 : 0,
          width: '100%',
        }}
        accessible accessibilityLabel="About Us illustration"
      >
        <Illustration />
      </View>
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
        <AboutUsSection theme={theme} aboutSectionAnimatedStyle={aboutSectionAnimatedStyle} />
        <Animated.View style={[styles.sectionHowItWorks, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }], backgroundColor: '#f9fbfd', borderRadius: 28, boxShadow: Platform.OS === 'web' ? '0 8px 32px #007aff10' : undefined, marginTop: 24, marginBottom: 32, paddingVertical: 40, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' }]}> 
          {/* Soft background accent shape */}
          {Platform.OS === 'web' && (
            <svg style={{ position: 'absolute', top: -60, left: -80, zIndex: 0 }} width="300" height="300" viewBox="0 0 300 300">
              <ellipse cx="150" cy="150" rx="120" ry="80" fill="#bae6fd" opacity="0.18" filter="blur(20px)" />
            </svg>
          )}
          <Text style={[styles.sectionTitle, { fontSize: 32, color: '#007AFF', marginBottom: 32, letterSpacing: 0.5, textAlign: 'center', fontWeight: '900', textShadowColor: Platform.OS === 'web' ? '#bae6fd' : undefined, textShadowOffset: Platform.OS === 'web' ? { width: 0, height: 2 } : undefined, textShadowRadius: Platform.OS === 'web' ? 8 : undefined }]}>How It Works</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 10, zIndex: 1 }}>
            {steps.map((step, index) => (
              <AnimatedHowItWorksStep key={step.id} step={step} index={index} />
            ))}
          </View>
        </Animated.View>
        <Animated.View style={[styles.sectionHowItWorks, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }], backgroundColor: '#f9fbfd', borderRadius: 28, boxShadow: Platform.OS === 'web' ? '0 8px 32px #007aff10' : undefined, marginTop: 0, marginBottom: 32, paddingVertical: 40, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' }]}> 
          {/* Soft background accent shape for testimonials */}
          {Platform.OS === 'web' && (
            <svg style={{ position: 'absolute', top: -60, right: -80, zIndex: 0 }} width="300" height="300" viewBox="0 0 300 300">
              <ellipse cx="150" cy="150" rx="120" ry="80" fill="#a7f3d0" opacity="0.13" filter="blur(20px)" />
            </svg>
          )}
          <Text style={[styles.sectionTitle, { fontSize: 32, color: '#007AFF', marginBottom: 32, letterSpacing: 0.5, textAlign: 'center', fontWeight: '900', textShadowColor: Platform.OS === 'web' ? '#a7f3d0' : undefined, textShadowOffset: Platform.OS === 'web' ? { width: 0, height: 2 } : undefined, textShadowRadius: Platform.OS === 'web' ? 8 : undefined }]}>What Our Users Say</Text>
          <TestimonialCarousel testimonials={testimonials} />
        </Animated.View>
        <Animated.View style={[styles.sectionCTA, { opacity: aboutSectionAnim, transform: [{ translateY: aboutSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }], backgroundColor: '#007AFF', borderRadius: 28, boxShadow: Platform.OS === 'web' ? '0 8px 32px #007aff28' : undefined, marginTop: 0, marginBottom: 36, paddingVertical: 56, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' }]}> 
          {/* Soft animated background accent for CTA */}
          {Platform.OS === 'web' && (
            <svg style={{ position: 'absolute', top: -60, left: -80, zIndex: 0 }} width="300" height="300" viewBox="0 0 300 300">
              <ellipse cx="150" cy="150" rx="120" ry="80" fill="#bae6fd" opacity="0.18" filter="blur(20px)" />
            </svg>
          )}
          <Text style={[styles.ctaHeadline, { fontSize: 38, color: '#fff', fontWeight: '900', marginBottom: 18, letterSpacing: 0.5, textAlign: 'center', textShadowColor: '#bae6fd', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }]}>Ready to Simplify Your Life?</Text>
          <Text style={[styles.ctaSubheadline, { fontSize: 20, color: 'rgba(255,255,255,0.92)', marginBottom: 36, textAlign: 'center', letterSpacing: 0.2 }]}>Join thousands of satisfied users and experience the future of digital convenience with Axzora.</Text>
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
            <TouchableOpacity style={[styles.ctaButtonLarge, { backgroundColor: '#fff', shadowColor: '#007AFF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 18, elevation: 8, borderRadius: 32, marginTop: 8, ...Platform.select({ web: { transition: 'background 0.18s, transform 0.18s', cursor: 'pointer' } }) }]} activeOpacity={0.85}>
              <Text style={[styles.ctaButtonText, { color: '#007AFF', fontWeight: 'bold', fontSize: 20, letterSpacing: 0.5 }]}>Get Started Today</Text>
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
    <Animated.View style={[{
      alignItems: 'center',
      width: 320,
      minHeight: 180,
      margin: 16,
      backgroundColor: '#fff',
      borderRadius: 22,
      padding: 32,
      shadowColor: '#007AFF',
      shadowOpacity: 0.10,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
      zIndex: 2,
      ...Platform.select({ web: { boxShadow: '0 8px 32px #007aff13', transition: 'box-shadow 0.25s, transform 0.25s' } }),
    }, stepStyle]}>
      <Text style={{ fontSize: 38, fontWeight: '900', color: '#007AFF', marginBottom: 12, textShadowColor: '#bae6fd', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }}> {step.number} </Text>
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#23272f', marginBottom: 8, textAlign: 'center', letterSpacing: 0.2 }}>{step.title}</Text>
      <Text style={{ fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 24 }}>{step.description}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6fa',
  },
  heroSection: {
    width: '100%',
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 36,
    borderRadius: 28,
    ...Platform.select({ web: { boxShadow: '0 8px 32px #007aff18', transition: 'box-shadow 0.25s' } }),
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
    paddingTop: 56,
    paddingBottom: 56,
    width: '100%',
    maxWidth: 700,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    ...Platform.select({ web: { transition: 'color 0.18s' } }),
  },
  heroSubtitle: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.2,
    maxWidth: 600,
    marginBottom: 24,
    ...Platform.select({ web: { transition: 'color 0.18s' } }),
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 44,
    paddingVertical: 20,
    borderRadius: 32,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 4,
    marginTop: 12,
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.18s, transform 0.18s',
      ':hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.04)' },
      ':active': { backgroundColor: '#bae6fd', transform: 'scale(0.97)' },
    } }),
  },
  ctaButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 20,
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
    paddingRight: 32,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
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