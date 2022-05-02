import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Text} from 'native-base';
import FastImage from 'react-native-fast-image';

import {PhotoItem} from '../types';

export interface PhotoListItemProps {
  item: PhotoItem;
  onPressItem?: (item: PhotoItem) => void;
}

export const PhotoListItem = ({item, onPressItem}: PhotoListItemProps) => {
  const handlePressItem = () => {
    if (onPressItem) {
      onPressItem(item);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePressItem}>
      <Box w="full" height={300} mb={2}>
        <FastImage
          style={styles.image}
          source={{
            uri: item.urls.small || item.urls.regular,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          {item.user && (
            <Box w="full" h="full" bg="#00000044" justifyContent="flex-end">
              <Box flexDirection="row" alignItems="center" ml={3} mb={3}>
                <FastImage
                  style={styles.avatar}
                  source={{
                    uri: item.user.profile_image?.small,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text ml={2} color="white">
                  {item.user.name}
                </Text>
              </Box>
            </Box>
          )}
        </FastImage>
      </Box>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
