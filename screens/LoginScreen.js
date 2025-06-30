import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions, KeyboardAvoidingView, ScrollView, Modal, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useUser } from '../contexts/UserContext';

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { updateAuthData } = useUser();

  const { width } = Dimensions.get('window');
  const isMobile = width < 768;

  const handleLogin = async () => {
    setIsSigningIn(true);
    setLoginError('');
    try {
      const response = await fetch('https://zygpupmeradizrachnqj.supabase.co/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (jsonErr) {}

      if (response.ok && data.access_token) {
        await updateAuthData(
          data.user?.email || email || null,
          data.user?.id || null,
          data.access_token
        );
      } else {
        if (data.error_code === 'invalid_credentials' || data.msg === 'Invalid login credentials') {
          setLoginError('Invalid email or password');
          showAlert('Login Error', 'Invalid email or password');
        } else {
          let errorMsg = data.error_description || data.msg || data.error || 'Login failed.';
          setLoginError(errorMsg);
          showAlert('Login Error', errorMsg);
        }
      }
    } catch (error) {
      setLoginError(error.message || 'An error occurred.');
      showAlert('Login Error', error.message || 'An error occurred.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignup = async () => {
    setIsSigningUp(true);
    try {
      const response = await fetch('https://zygpupmeradizrachnqj.supabase.co/auth/v1/signup', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Success', 'Account created! Please check your email to verify your account.');
        setModalVisible(false);
        setSignupData({ name: '', email: '', phone: '', password: '' });
        navigation.navigate('Landing', { showWelcome: true });
      } else {
        let errorMsg = data.error_description || data.msg || data.error || 'Signup failed.';
        showAlert('Signup Error', errorMsg);
      }
    } catch (error) {
      showAlert('Signup Error', error.message || 'An error occurred.');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.curveWrapper}>
          <Svg height="200" width="100%" viewBox="0 0 1440 320" style={styles.curve}>
            <Path
              fill="#007AFF"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Axzora</Text>
            <View style={styles.logoAccent} />
          </View>

          <View style={[styles.card, isMobile && styles.mobileCard]}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {loginError ? (
              <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{loginError}</Text>
            ) : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isSigningIn}>
              <Text style={styles.loginButtonText}>{isSigningIn ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            <Text style={styles.signupPrompt}>New to Axzora?</Text>
            <TouchableOpacity style={styles.signupButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Axzora. All rights reserved.</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isMobile && styles.mobileModalContent]}>
            <Text style={styles.modalTitle}>Create Account</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              value={signupData.name}
              onChangeText={(text) => setSignupData({ ...signupData, name: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={signupData.email}
              onChangeText={(text) => setSignupData({ ...signupData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone Number"
              value={signupData.phone}
              onChangeText={(text) => setSignupData({ ...signupData, phone: text })}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              value={signupData.password}
              onChangeText={(text) => setSignupData({ ...signupData, password: text })}
              secureTextEntry
            />
            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSignup} disabled={isSigningUp}>
              <Text style={styles.modalSubmitText}>{isSigningUp ? 'Creating Account...' : 'Create Account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)} disabled={isSigningUp}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  curveWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  curve: {
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 1,
  },
  logoAccent: {
    width: 40,
    height: 4,
    backgroundColor: '#00B894',
    borderRadius: 2,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  mobileCard: {
    padding: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupPrompt: {
    color: '#666',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  mobileModalContent: {
    padding: 20,
    marginHorizontal: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalSubmitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  modalSubmitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 