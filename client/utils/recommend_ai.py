import pandas as pd
import numpy as np
import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("/mnt/data/udemy_courses.csv")

num_users = 10
user_enrollments = {f'user_{i}': random.sample(list(df['course_id']), 5) for i in range(1, num_users+1)}

def get_course_details(course_ids):
    return df[df['course_id'].isin(course_ids)][['course_id', 'course_title', 'num_reviews', 'num_subscribers']]

vectorizer = TfidfVectorizer(stop_words='english')
df['combined_features'] = df['course_title'] + ' ' + df['subject']
vectorized_data = vectorizer.fit_transform(df['combined_features'])

def recommend_courses(user_id, num_recommendations=15):
    enrolled_courses = user_enrollments[user_id]
    enrolled_indices = df[df['course_id'].isin(enrolled_courses)].index
    
    similarities = cosine_similarity(vectorized_data, vectorized_data[enrolled_indices]).mean(axis=1)
    df['similarity'] = similarities
    
    recommendations = df[~df['course_id'].isin(enrolled_courses)]
    recommendations = recommendations.sort_values(by=['similarity', 'num_reviews', 'num_subscribers'], ascending=[False, False, False])
    return recommendations[['course_id', 'course_title', 'num_reviews', 'num_subscribers']].head(num_recommendations)

def search_courses(user_id, search_query, num_recommendations=15):
    search_vector = vectorizer.transform([search_query])
    similarities = cosine_similarity(vectorized_data, search_vector).flatten()
    df['search_similarity'] = similarities
    
    recommendations = df.sort_values(by=['search_similarity', 'num_reviews', 'num_subscribers'], ascending=[False, False, False])
    return recommendations[['course_id', 'course_title', 'num_reviews', 'num_subscribers']].head(num_recommendations)

def trending_courses(num_recommendations=10):
    trending = df.sort_values(by=['num_subscribers'], ascending=False)
    return trending[['course_id', 'course_title', 'num_reviews', 'num_subscribers']].head(num_recommendations)


user_id = 'user_1'
print("Recommended Courses for Exploration:")
print(recommend_courses(user_id))

search_query = "Python"
print("Recommended Courses for Search Query:")
print(search_courses(user_id, search_query))

print("Trending Courses:")
print(trending_courses())