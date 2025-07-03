import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Platform } from 'react-native';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const anim = React.useRef(new Animated.Value(0)).current;

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ visible: true, message, type });
    Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    setTimeout(() => {
      Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        setToast({ visible: false, message: '', type });
      });
    }, duration);
  }, [anim]);

  const toastStyle = [
    styles.toast,
    toast.type === 'error' && styles.toastError,
    toast.type === 'success' && styles.toastSuccess,
    { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }) }] },
  ];

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Animated.View style={toastStyle} pointerEvents="none">
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === 'web' ? 32 : 48,
    marginHorizontal: 'auto',
    backgroundColor: '#23272f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
    maxWidth: 400,
    minWidth: 120,
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toastError: {
    backgroundColor: '#d32f2f',
  },
  toastSuccess: {
    backgroundColor: '#388e3c',
  },
}); 