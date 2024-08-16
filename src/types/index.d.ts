export type Course = {
  credit_hours: number;
  description: string;
  id: string;
  number: string;
  subject: string;
  title: string;
};

export type Professor = {
  first_name: string;
  last_name: string;
  profile_icon?: string;
  email?: string;
};

export type BaseProfessorCourseRating = {
  /**
   * first_last
   */
  professor: string;
  /**
   * course id
   */
  course: string;
};

export enum RatingMetric {
  EASINESS = 'easiness',
  WORKLOAD = 'workload',
  CLARITY = 'clarity',
  HELPFULNESS = 'helpfulness',
}

export type ProfessorCourseRatingOverall = BaseProfessorCourseRating & {
  metrics: Record<RatingMetric, number>;
  overall: number;
  tags: string[];
};

export type ProfessorCourseReview = BaseProfessorCourseRating & {
  author: string;
  body: string;
  metrics: Record<RatingMetric, number>;
  term: string;
  grade?: string;
  date: Date;
};
