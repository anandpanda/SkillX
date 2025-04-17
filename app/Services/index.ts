import request, { gql } from "graphql-request";

const MASTER_URL =
    "https://ap-south-1.cdn.hygraph.com/content/cm987eu8f0a2k07wd462bhf94/master";

export const getCourseList = async (level: string) => {
    const query = gql`
        query CourseList {
            courses(where: { level: ${level} }) {
                id
                name
                level
                price
                tags
                time
                author
                description{
                    markdown
                }
                banner {
                    url
                }
                chapters {
                    content{
                        heading
                        description{
                            markdown
                        }
                        output{
                            markdown
                        }
                    }
                    title
                    id
                }
            }
        }
    `;

    const data = await request(MASTER_URL, query);
    return data;
};

export const enrollCourse = async (courseId: string, userEmail: string) => {
    const mutationQuery = gql`
        mutation MyMutation {
            createUserEnrolledCourse(
                data: {
                    courseId: "${courseId}"
                    userEmail: "${userEmail}"
                    course: { connect: { id: "${courseId}" } }
                }
            ) {
                id
            }
            publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `;

    const data = await request(MASTER_URL, mutationQuery);
    return data;
};

export const getUserEnrolledCourse = async (
    courseId: string,
    userEmail: string
) => {
    const query = gql`
        query GetUserEnrolledCourse {
            userEnrolledCourses(where: { userEmail: "${userEmail}", courseId: "${courseId}" }) {
                courseId
                id
                completedChapter {
                    chapterId
                }
            }
        }
    `;

    const data = await request(MASTER_URL, query);
    console.log(data, "getUserEnrolledCourse data");
    return data;
};