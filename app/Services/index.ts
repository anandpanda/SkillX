import request, { gql } from "graphql-request";

const MASTER_URL =
    "https://ap-south-1.cdn.hygraph.com/content/cm987eu8f0a2k07wd462bhf94/master";

const getCourseList = async (level: string) => {
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
                banner {
                    url
                }
                chapters {
                    id
                }
            }
        }
    `;

    const data = await request(MASTER_URL, query);
    console.log("Data : ", data);
    return data;
};

export default getCourseList;
