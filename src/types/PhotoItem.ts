import {User} from './User';
import {ImageURL} from './ImageURL';
import {Links} from './Links';

export interface PhotoItem {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  current_user_collections?: any[];
  urls: ImageURL;
  links: Links;
}
