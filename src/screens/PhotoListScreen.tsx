import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Input, Icon, Select, Box, CheckIcon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {startCase} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {LoadingSpinnerOverlay, PhotoListItem} from '../components';
import {useDebounce, usePhotos} from '../hooks';
import {PhotoItem, RootStackParamList} from '../types';
import {PhotoColors, PhotoOrientations} from '../constants';

export const PhotoListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState<string>('office');
  const debouncedQuery = useDebounce<string>(query, 300);
  const [color, setColor] = useState<string>();
  const [orientation, setOrientation] = useState<string>();

  const {loading, loadingMore, data, latestParams, fetchPhotos} = usePhotos();

  useEffect(() => {
    loadPhotos();
  }, [debouncedQuery, color, orientation]);

  const handlePressCell = (photo: PhotoItem) => {
    navigation.navigate('PhotoDetails', {photo});
  };

  const loadPhotos = (loadMore?: boolean) => {
    let params = {
      ...latestParams,
      query: debouncedQuery,
    };
    if (color) {
      params = {
        ...params,
        color,
      };
    }
    if (orientation) {
      params = {
        ...params,
        orientation,
      };
    }
    fetchPhotos(
      {
        ...params,
        page: loadMore ? (latestParams?.page || 0) + 1 : 1,
      },
      loadMore,
    );
  };

  const renderItem = ({item}: {item: PhotoItem}) => {
    return <PhotoListItem item={item} onPressItem={handlePressCell} />;
  };

  return (
    <Box flex={1}>
      <Box bg="gray.100" padding={3}>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg={'#FFF'}
          borderRadius="20"
          py="2"
          px="3"
          borderWidth="0"
          value={query}
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
          onChangeText={value => setQuery(value)}
        />
        <Box flexDirection="row">
          <Box w="1/2" pr={2}>
            <Select
              selectedValue={color}
              bg="white"
              accessibilityLabel="Choose Color"
              placeholder="Choose Color"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={value => setColor(value)}>
              {PhotoColors.map(item => (
                <Select.Item
                  key={`color-${item}`}
                  label={startCase(item)}
                  value={item}
                />
              ))}
            </Select>
          </Box>
          <Box w="1/2">
            <Select
              selectedValue={orientation}
              bg="white"
              accessibilityLabel="Choose Orientation"
              placeholder="Choose Orientation"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={value => setOrientation(value)}>
              {PhotoOrientations.map(item => (
                <Select.Item
                  key={`color-${item}`}
                  label={startCase(item)}
                  value={item}
                />
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <FlatList
        data={data?.results || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => `photo-${index}-${item.id}`}
        onEndReached={() => loadPhotos(true)}
      />

      <LoadingSpinnerOverlay visible={loading && !loadingMore} />
    </Box>
  );
};
