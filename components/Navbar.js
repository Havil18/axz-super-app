import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal, Animated, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState('');
  const [walletInfo, setWalletInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState('');
  const [sortLatest, setSortLatest] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const menuAnim = new Animated.Value(0);
  const { width } = Dimensions.get('window');
  const isMobile = width < 768;
  const { userEmail, userId, accessToken, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(menuAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  useEffect(() => {
    if (walletModalVisible && userId) {
      setWalletLoading(true);
      setWalletError('');
      setWalletInfo(null);
      setTransactions([]);
      setTransactionsLoading(true);
      setTransactionsError('');
      fetch(`https://zygpupmeradizrachnqj.supabase.co/rest/v1/wallets?user_id=eq.${userId}&is_active=eq.true`, {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setWalletInfo(data[0]);
          } else {
            setWalletError('No active wallet found.');
          }
        })
        .catch(() => setWalletError('Failed to fetch wallet info.'))
        .finally(() => setWalletLoading(false));
      fetch(`https://zygpupmeradizrachnqj.supabase.co/rest/v1/transactions?user_id=eq.${userId}`, {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setTransactions(data);
          } else {
            setTransactionsError('Failed to fetch transactions.');
          }
        })
        .catch(() => setTransactionsError('Failed to fetch transactions.'))
        .finally(() => setTransactionsLoading(false));
      setSortLatest(false);
    }
  }, [walletModalVisible, userId, accessToken]);

  const handleLogout = async () => {
    await logout();
    // No need to navigate - the Navigation component will handle it
  };

  const handleSortToggle = () => {
    setTransactionsLoading(true);
    setTransactionsError('');
    let url = `https://zygpupmeradizrachnqj.supabase.co/rest/v1/transactions?user_id=eq.${userId}`;
    let nextSortLatest = !sortLatest;
    if (nextSortLatest) {
      url = `https://zygpupmeradizrachnqj.supabase.co/rest/v1/transactions?user_id=eq.${userId}&order=created_at.desc`;
    }
    fetch(url, {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTransactions(data);
          setSortLatest(nextSortLatest);
        } else {
          setTransactionsError('Failed to fetch transactions.');
        }
      })
      .catch(() => setTransactionsError('Failed to fetch transactions.'))
      .finally(() => setTransactionsLoading(false));
  };

  const renderMobileMenu = () => {
    if (!isMobile) return null;

    return (
      <Animated.View style={[styles.mobileMenu, { opacity: menuAnim }]}>
        {['Home', 'Services', 'Blog'].map((link) => (
          <TouchableOpacity 
            key={link} 
            style={styles.mobileMenuItem} 
            onPress={() => {
              setMenuVisible(false);
              if (link === 'Home') navigation.navigate('Landing');
              else if (link === 'Services') navigation.navigate('Services');
              else if (link === 'Blog') navigation.navigate('Blog');
            }}
          >
            <Text style={styles.mobileMenuText}>{link}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.mobileLogoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.mobileLogoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[
      styles.navbarWrapper,
      { backgroundColor: theme.card, shadowColor: theme.shadow },
      Platform.OS === 'web' && { position: 'sticky', top: 0, zIndex: 100 }
    ]}>
      <View style={[styles.navbar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        {isMobile ? (
          <>
            <TouchableOpacity 
              style={styles.hamburgerButton} 
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Text style={styles.hamburgerIcon}>☰</Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Axzora</Text>
              <View style={styles.logoAccent} />
            </View>
          </>
        ) : (
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Axzora</Text>
            <View style={styles.logoAccent} />
          </View>
        )}
        
        {!isMobile && (
          <View style={styles.linksContainer}>
            <TouchableOpacity key="Home" style={styles.linkButton} activeOpacity={0.8} onPress={() => navigation.navigate('Landing')}>
              <Text style={[styles.linkText, { color: theme.text }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity key="Services" style={styles.linkButton} activeOpacity={0.8} onPress={() => navigation.navigate('Services')}>
              <Text style={[styles.linkText, { color: theme.text }]}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity key="Blog" style={styles.linkButton} activeOpacity={0.8} onPress={() => navigation.navigate('Blog')}>
              <Text style={[styles.linkText, { color: theme.text }]}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.themeToggleIcon} onPress={toggleTheme}>
            <Text style={{ fontSize: 22 }}>
              {theme.mode === 'light' ? '🌙' : '☀️'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileIcon} onPress={() => setModalVisible(v => !v)}>
            <Text style={styles.profileIconText}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderMobileMenu()}

      {modalVisible && (
        <Animated.View style={[styles.slideContent, { opacity: fadeAnim }]}>
          <Text style={styles.modalTitle}>Profile Details</Text>
          <Text style={styles.modalText}>Email: {userEmail || 'Not logged in'}</Text>
          <TouchableOpacity
            style={styles.walletSection}
            onPress={() => {
              setModalVisible(false);
              setWalletModalVisible(true);
            }}
          >
            <Text style={styles.walletSectionText}>HC wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalLogoutButton} onPress={handleLogout}>
            <Text style={styles.modalLogoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Modal
        visible={walletModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setWalletModalVisible(false)}
      >
        <View style={styles.walletModalOverlay}>
          <View style={styles.walletModalModernContent}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletIcon}>💳</Text>
              <Text style={styles.walletHeaderTitle}>HC Wallet</Text>
            </View>
            <View style={styles.walletDivider} />
            {walletLoading ? (
              <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 32 }} />
            ) : walletError ? (
              <Text style={{ color: 'red', textAlign: 'center', marginVertical: 24 }}>{walletError}</Text>
            ) : walletInfo ? (
              <View style={{ alignItems: 'center', width: '100%' }}>
                {/* Balance Overview */}
                <View style={{ marginBottom: 18, width: '100%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.primary, marginBottom: 4 }}>
                    <Text style={{ fontWeight: 'bold', color: '#FFB300', fontSize: 24 }}>HC</Text> {walletInfo.balance?.toFixed(2) ?? '0.00'}
                  </Text>
                  <Text style={{ color: theme.secondary, fontSize: 15, marginBottom: 2 }}>Wallet Balance</Text>
                  <Text style={{ color: theme.text, fontSize: 13 }}>Wallet ID: <Text style={{ fontWeight: 'bold' }}>{walletInfo.id}</Text></Text>
                  <Text style={{ color: walletInfo.status === 'active' ? 'green' : 'red', fontSize: 13, marginTop: 2 }}>
                    {walletInfo.status === 'active' ? 'Active' : 'Inactive'}
                  </Text>
                </View>
                {/* Sort Button */}
                <View style={{ width: '100%', alignItems: 'flex-end', paddingRight: 16, marginBottom: 4 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16 }}
                    onPress={handleSortToggle}
                    disabled={transactionsLoading}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
                      {sortLatest ? 'Sort by Oldest' : 'Sort by Latest'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Transactions Table - Redesigned */}
                <View style={{ width: '100%', backgroundColor: theme.card, borderRadius: 16, padding: 0, boxShadow: '0 2px 8px #0001', marginBottom: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#f2f2f2' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 0, color: theme.text, padding: 16, paddingBottom: 8 }}>Recent Transactions</Text>
                  {transactionsLoading ? (
                    <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 16 }} />
                  ) : transactionsError ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 16 }}>{transactionsError}</Text>
                  ) : transactions.length === 0 ? (
                    <Text style={{ color: theme.secondary, textAlign: 'center', marginVertical: 16 }}>No transactions found.</Text>
                  ) : (
                    <ScrollView style={{ maxHeight: 320 }}>
                      {transactions.map((txn, idx) => {
                        // Determine credit or debit
                        const isCredit =
                          txn.transaction_type === 'transfer_in' ||
                          txn.transaction_type === 'credit' ||
                          txn.transaction_type === 'deposit';
                        const isDebit =
                          txn.transaction_type === 'transfer_out' ||
                          txn.transaction_type === 'debit' ||
                          txn.transaction_type === 'withdrawal';
                        return (
                          <View
                            key={txn.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: 14,
                              paddingHorizontal: 16,
                              backgroundColor: idx % 2 === 0 ? '#fafbfc' : '#fff',
                              borderBottomWidth: idx === transactions.length - 1 ? 0 : 1,
                              borderBottomColor: '#f2f2f2',
                            }}
                          >
                            {/* Icon */}
                            <View style={{ width: 32, alignItems: 'center', marginRight: 10 }}>
                              {isCredit ? (
                                <Text style={{ fontSize: 18, color: 'green' }}>↑</Text>
                              ) : (
                                <Text style={{ fontSize: 18, color: 'red' }}>↓</Text>
                              )}
                            </View>
                            {/* Date & Description */}
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontSize: 14, color: theme.text, fontWeight: 'bold' }}>{txn.description}</Text>
                              <Text style={{ fontSize: 12, color: theme.secondary }}>
                                {txn.created_at ? new Date(txn.created_at).toLocaleDateString() : ''}
                              </Text>
                            </View>
                            {/* Amount */}
                            <View style={{ minWidth: 90, alignItems: 'flex-end' }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 15, color: isCredit ? 'green' : 'red' }}>
                                {isCredit ? '+' : '-'}<Text style={{ color: '#FFB300', fontWeight: 'bold' }}>HC</Text>{Math.abs(txn.amount).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>
              </View>
            ) : null}
            <TouchableOpacity style={styles.walletModernCloseButton} onPress={() => setWalletModalVisible(false)}>
              <Text style={styles.walletModernCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarWrapper: {
    backgroundColor: '#fff',
    ...Platform.select({ web: { boxShadow: '0 2px 12px #007aff11' } }),
    shadowColor: '#007AFF',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 1,
    marginBottom: 2,
  },
  logoAccent: {
    width: 32,
    height: 4,
    backgroundColor: '#00B894',
    borderRadius: 2,
    marginTop: 2,
    marginLeft: 2,
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkButton: {
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.25s, color 0.25s' } }),
  },
  linkText: {
    fontSize: 17,
    color: '#23272f',
    fontWeight: '500',
    letterSpacing: 0.2,
    ...Platform.select({ web: { transition: 'color 0.25s' } }),
  },
  logoutButton: {
    marginLeft: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    minWidth: 56,
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.2s' } }),
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  profileIcon: {
    marginLeft: 20,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  profileIconText: {
    fontSize: 20,
  },
  slideContent: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalLogoutButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  modalLogoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
    zIndex: 1,
  },
  hamburgerIcon: {
    fontSize: 24,
    color: '#007AFF',
  },
  mobileMenu: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  mobileMenuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileMenuText: {
    fontSize: 16,
    color: '#23272f',
    fontWeight: '500',
  },
  mobileLogoutButton: {
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  mobileLogoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  walletSection: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  walletSectionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  walletModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  walletModalModernContent: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 16,
    width: '95%',
    maxWidth: 540,
    alignItems: 'center',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  walletIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  walletHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletDivider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 10,
  },
  walletModernCloseButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  walletModernCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  themeToggleIcon: { marginRight: 12, padding: 4, borderRadius: 16, backgroundColor: 'transparent' },
}); 