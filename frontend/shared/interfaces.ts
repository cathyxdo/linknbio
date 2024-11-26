export interface ListProfile {
  id: number;
  user: number;
  username: string;
  name: string;
  bio: string;
  photo: string;
  profile_photo_url: string;
  profile_font: string;
  profile_font_color: string;
  background_flag: string;
  background_color: string;
  background_image: string;
  link_bubble_style: string;
  link_bubble_color: string;
  link_font: string;
  link_font_color: string;
  social_media_icons_location: string;
  social_media_profiles: SocialMediaProfile[];
  links: Link[];
}

export interface SocialMediaProfile {
  id: number;
  type: string;
  link: string;
  list: number;
}

export interface Link {
  id: number;
  link: string;
  title: string;
  photo: string;
  list: number;
  link_photo_url: string;
}

export interface PageView {
  date: Date;
  count: number;
}

export interface SocialMediaClick {
  date: Date;
  social_media_profile_type: string;
  social_media_profile_url: string;
  count: number;
}

export interface LinkClick {
  date: Date;
  link_title: string;
  link_url: string;
  count: number;
}

export interface AnalyticsData {
  list_id: string;
  list_username: string;
  page_views: PageView[];
  link_clicks: LinkClick[];
  social_media_clicks: SocialMediaClick[];
}
