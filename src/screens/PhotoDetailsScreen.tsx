import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, IconButton, Text, useToast} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import ImageView from 'react-native-image-viewing';

import {RootRouteProps} from '../types';

const {width} = Dimensions.get('window');

export const PhotoDetailsScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const route = useRoute<RootRouteProps<'PhotoDetails'>>();
  const {photo} = route.params;

  const imageUrl = photo.urls?.raw || photo.urls?.full;
  const [visible, setIsVisible] = useState(false);

  const downloadPhoto = useCallback(async () => {
    if (imageUrl) {
      try {
        const {config, fs} = RNFetchBlob;
        const downloadDir =
          Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        let title = `photo-${Date.now()}.jpg`;
        const options = {
          fileCache: true,
          useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
          notification: false,
          // response data will be saved to this path if it has access right.
          title,
          path: downloadDir + `/${title}`,
        };
        await config(options).fetch('GET', imageUrl);
        toast.show({
          description: 'Successfully downloaded!',
        });
      } catch (error) {
        toast.show({
          description: 'Download failed!',
        });
      }
    }
  }, [imageUrl, toast]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={
            <Ionicons name="arrow-down" size={20} onPress={downloadPhoto} />
          }
        />
      ),
    });
  }, [downloadPhoto, navigation]);

  return (
    <Box>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisible(true)}>
        <Box w="full" height={(width / photo.width) * photo.height}>
          <FastImage
            style={styles.image}
            source={{
              uri: photo.urls?.full || photo.urls?.regular,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Box>
      </TouchableOpacity>
      <Box flexDirection="row" p={3} justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <FastImage
            style={styles.avatar}
            source={{
              uri: photo.user?.profile_image?.small,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text ml={2} color="black">
            {photo.user?.name}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Ionicons name="heart" size={20} color="red" />
          <Text ml={2} color="black">{`${photo.likes}`}</Text>
        </Box>
      </Box>
      {!!imageUrl && (
        <ImageView
          images={[{uri: imageUrl}]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDD',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
