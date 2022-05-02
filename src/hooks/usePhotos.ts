import {useState} from 'react';
import {PhotoItem} from '../types';

import {PhotoContentFilter} from '../constants';

export interface PhotosQueryParams {
  query: string;
  page?: number;
  per_page?: number;
  order_by?: string;
  collections?: string[];
  content_filter?: PhotoContentFilter;
  color?: string;
  orientation?: string;
}

export interface PhotosResult {
  total?: number;
  total_pages?: number;
  results?: PhotoItem[];
}

export const usePhotos = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>();
  const [latestParams, setLatestParams] = useState<PhotosQueryParams>({
    query: '',
  });
  const [data, setData] = useState<PhotosResult>();

  const objToQueryString = (obj: any): string => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.join('&');
  };

  const fetchPhotos = async (params: PhotosQueryParams, loadMore?: boolean) => {
    setLoading(true);
    setLoadingMore(loadMore);
    const queryString = objToQueryString(params);
    const apiURL = `https://api.unsplash.com/search/photos?${queryString}`;
    try {
      const res = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Client-ID x7wA5ZcvUqr2pDSYcGDvdpKdKmAv3SNUKk8X0en3VWo',
        },
      });
      const json = (await res.json()) as PhotosResult;
      if (loadMore) {
        setData(prevData => ({
          ...prevData,
          results: (prevData?.results || []).concat(json?.results || []),
        }));
      } else {
        setData(json);
      }
      setLatestParams(params);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadingMore,
    latestParams,
    data,
    fetchPhotos,
  };
};
