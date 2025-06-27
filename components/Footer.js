import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function Footer() {
  const socialLinks = [
    { icon: 'facebook', label: 'Facebook', color: '#1877F2' },
    { icon: 'twitter', label: 'Twitter', color: '#1DA1F2' },
    { icon: 'instagram', label: 'Instagram', color: '#E4405F' },
    { icon: 'linkedin', label: 'LinkedIn', color: '#0A66C2' }
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerColumn}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactText}>info@axzora.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>+1 234 567 890</Text>
          </View>
        </View>
        <View style={styles.footerColumn}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.icon}
                style={[styles.socialButton, { backgroundColor: social.color + '22' }]}
                activeOpacity={0.8}
              >
                <Text style={[styles.socialIcon, { color: social.color }]}>{social.label[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.copyright}>© 2024 Axzora. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#23272f',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 32,
    marginBottom: 18,
  },
  footerColumn: {
    flex: 1,
    minWidth: 180,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#00B894',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#fff',
  },
  contactText: {
    color: '#ccc',
    fontSize: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 2,
  },
  socialButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#333',
    ...Platform.select({ web: { cursor: 'pointer', transition: 'background 0.2s' } }),
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },
  copyright: {
    color: '#888',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
}); 