export interface Instructor {
  id: number;
  name: string;
  identifier: string;
  designation: string;
  image: string;
  playlist: {
    name: string;
  }[];
}

export interface Item {
  title: string;
  identifier: string;
  description: string;
  link: string;
  instructors: Instructor[];
}

export interface InstructorsCategory {
  web: boolean;
  ai: boolean;
  blockchain: boolean;
}

export interface Video {
  name: string;
}

export interface VideoPlayerProps {
  src: string;
  activeVideoStatus: boolean;
  resetVideo: boolean;
}
