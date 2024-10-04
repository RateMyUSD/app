import { Course } from '@/types';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;

export enum Collections {
  Courses = 'courses',
  Professors = 'professors',
  ProfessorCourseOveralls = 'professor_course_overalls',
  CourseReviews = 'course_reviews',
}

export async function getCourseIdsFromDB() {
  const courseIds = await client
    .db(process.env.MONGODB_DB)
    .collection<Course>(Collections.Courses)
    .distinct('id');

  return courseIds;
}

export async function getProfessorNamesFromDB() {
  const professorIds = await client
    .db(process.env.MONGODB_DB)
    .collection<Course>(Collections.Professors)
    .aggregate([
      {
        $project: {
          _id: 0,
          full_name: { $concat: ['$first_name', '_', '$last_name'] }
        }
      }
    ])
    .toArray();

  return professorIds.map(({ full_name }) => full_name);
}