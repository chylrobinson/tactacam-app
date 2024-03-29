import {ImageURL} from './ImageURL';
import {Links} from './Links';

export interface User {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username?: string;
  twitter_username?: string;
  portfolio_url?: string;
  profile_image?: ImageURL;
  links?: Links;
}
