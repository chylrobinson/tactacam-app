import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export interface LoadingSpinnerOverlayProps {
  visible: boolean;
  size?: number | 'small' | 'large';
  color?: string;
}

export const LoadingSpinnerOverlay = ({
  visible,
  size = 'large',
  color = '#FFFFFF',
}: LoadingSpinnerOverlayProps) => {
  return (
    <React.Fragment>
      {visible && (
        <View style={styles.overlay}>
          <View style={styles.activityContainer}>
            <ActivityIndicator size={size} color={color} />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000044',
  },
  activityContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
