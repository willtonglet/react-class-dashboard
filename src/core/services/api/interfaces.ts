export interface UserParams {
  id?: number;
  name: string;
  darkTheme: boolean;
}

export interface CourseParams {
  id?: number;
  name: string;
  slug: string;
}

export interface ClassParams {
  id?: number;
  courseId: number;
  order: number;
  title: string;
  module: number;
  description: string;
  video: string;
}

export interface RatingParams {
  id?: number;
  userId: number;
  classId: number;
  rating: number;
}

export interface CommentParams {
  id?: number;
  userId: number;
  classId: number;
  comment: string;
  date: string;
}

export interface CheckedParams {
  id?: number;
  classId: number;
  courseId: number;
  userId: number;
  checked: boolean;
}

export interface ClassWithCheckParams extends ClassParams, CheckedParams {}
