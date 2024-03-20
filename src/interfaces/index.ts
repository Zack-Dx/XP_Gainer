export interface Instructor {
  id: number;
  name: string;
  designation: string;
  image: string;
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
};