import { courses } from "@/constants/courses";
import { Instructor } from "@/interfaces";

export const fetchVideos = async (
  instructorName: string,
  courseIdentifier: string
) => {
  try {
    const course = courses.filter((course: any) => {
      if (course.identifier === courseIdentifier) {
        return true;
      }
    });

    let videos: { name: string }[] = [];
    course[0].instructors.forEach((instructor: Instructor) => {
      if (instructor.name === instructorName) {
        videos = instructor.playlist;
      }
    });

    return videos;
  } catch (error) {
    console.log(error);
  }
};
