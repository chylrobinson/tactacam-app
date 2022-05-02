import {RouteProp} from '@react-navigation/native';

import {PhotoItem} from './PhotoItem';

export type RootStackParamList = {
  PhotoList: undefined;
  PhotoDetails: {photo: PhotoItem};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
