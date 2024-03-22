"use server";
import fs from "fs/promises";
import { Instructor } from "@/interfaces";

export const fetchVideos = async (
  instructorName: string,
  courseIdentifier: string
) => {
  try {
    const data = await fs.readFile(
      process.cwd() + "/app/data/courses.json",
      "utf8"
    );
    const parsedData = JSON.parse(data);
    const course = parsedData.filter((course: any) => {
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

export const fetchData = async () => {
  try {
    const data = await fs.readFile(
      process.cwd() + "/app/data/courses.json",
      "utf8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
