import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your API key - in production, this should be in environment variables
// You can get a key from https://makersuite.google.com/app/apikey
const API_KEY = "AIzaSyBGvWoKV0uBiZhES03ZhCWG4GMX5biKwCw"; 

// Create a new Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);

// This model is available in the free tier
const MODEL_NAME = "gemini-1.5-pro"; 

/**
 * Gets course recommendations based on user interests
 * 
 * @param {Array} interests - Array of user selected interests
 * @param {Array} availableCourses - Array of available courses to recommend from
 * @returns {Promise<Array>} - Array of recommended courses
 */
export const getRecommendations = async (interests, availableCourses) => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Create a prompt that explains what we want
    const prompt = `
      I have a learning management system with courses. I want to recommend courses to a user based on their interests.
      
      User interests: ${interests.join(', ')}
      
      Available courses (in JSON format):
      ${JSON.stringify(availableCourses, null, 2)}
      
      Please analyze the user's interests and recommend the most relevant courses from the available courses.
      Return your response as a JSON array of course IDs only, with the most relevant courses first.
      Only include courses that are actually relevant to at least one of the user's interests.
      Response format example: ["course1_id", "course2_id", "course3_id"]
    `;

    // Generate content from Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON array from the response
    const courseIdsMatch = text.match(/\[(.*)\]/s);
    if (!courseIdsMatch) {
      throw new Error("Failed to parse AI response");
    }
    
    try {
      // Parse the JSON array
      const courseIds = JSON.parse(courseIdsMatch[0]);
      
      // Filter and order the available courses based on the recommended IDs
      const recommendedCourses = courseIds
        .map(id => availableCourses.find(course => course._id === id))
        .filter(Boolean); // Remove any undefined values
        
      return recommendedCourses;
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI recommendations");
    }
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    throw error;
  }
};

/**
 * Fallback function when AI recommendations fail
 * 
 * @param {Array} interests - Array of user selected interests
 * @param {Array} availableCourses - Array of available courses
 * @returns {Array} - Array of filtered courses based on tags matching
 */
export const getFallbackRecommendations = (interests, availableCourses) => {
  return availableCourses.filter(course => {
    const tags = course.tags || [];
    return tags.some(tag => 
      interests.some(interest => 
        tag.toLowerCase().includes(interest.toLowerCase()) || 
        interest.toLowerCase().includes(tag.toLowerCase())
      )
    );
  });
};