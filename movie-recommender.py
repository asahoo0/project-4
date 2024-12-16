import numpy as np
import pandas as pd
import streamlit as st

import warnings
warnings.filterwarnings('ignore')

st.set_page_config(layout="wide")

@st.cache_data
def load_data():
    data_folder = "data"
    user_ratings = pd.read_csv(f'{data_folder}/ratings.dat', sep='::', engine='python', header=None)
    user_ratings.columns = ['UserID', 'MovieID', 'Rating', 'Timestamp']

    film_data = pd.read_csv(f'{data_folder}/movies.dat', sep='::', engine='python',
                            encoding="ISO-8859-1", header=None)
    film_data.columns = ['MovieID', 'Title', 'Genres']

    demographic_data = pd.read_csv(f'{data_folder}/users.dat', sep='::', engine='python', header=None)
    demographic_data.columns = ['UserID', 'Gender', 'Age', 'Occupation', 'Zipcode']

    rating_matrix = pd.read_csv(f'{data_folder}/Rmat.csv', sep=',')
    return (user_ratings, film_data, demographic_data, rating_matrix)

@st.cache_data
def get_random_movie_sample(n=10):
    sample_set = film_data.sample(n)
    return sample_set

@st.cache_data
def create_similarity_matrix():
    normalized_ratings = rating_matrix.subtract(rating_matrix.mean(axis=1), axis='rows')

    presence_df = (~normalized_ratings.isna()).astype('int')
    presence_df = presence_df.T
    presence_matrix = presence_df @ presence_df.T

    normalized_ratings = normalized_ratings.T
    normalized_ratings = normalized_ratings.fillna(0)

    rating_dot_product = normalized_ratings @ normalized_ratings.T
    squared_rating_matrix = ((normalized_ratings**2) @ (normalized_ratings != 0).T)
    squared_rating_matrix = squared_rating_matrix.apply(np.vectorize(np.sqrt))
    rating_norm = squared_rating_matrix * squared_rating_matrix.T
    
    cosine_similarity = rating_dot_product / rating_norm
    similarity_matrix = (1 + cosine_similarity) / 2
    
    np.fill_diagonal(similarity_matrix.values, np.nan)
    similarity_matrix[presence_matrix < 3] = None
    
    return similarity_matrix

def myIBCF(S, w, n=10):
    S = S.copy()
    S = S.fillna(0)

    w = w.copy()
    identity_matrix = (~w.isna()).astype(int)
    w = w.fillna(0)

    recommendations = w.dot(S) / identity_matrix.dot(S)
    recommendations = recommendations.sort_values(ascending=False)[0:n]
    
    recommendations = recommendations.dropna()
    
    return recommendations

def generate_movie_recommendations():
    sample_set["star"] = np.array(star_ratings)

    user_ratings = similarity_matrix.iloc[0]
    user_ratings[:] = np.nan

    for i in range(sample_set.shape[0]):
        movie_key = "m" + str(sample_set.iloc[i]["MovieID"])
        movie_value = sample_set.iloc[i]["star"]
        if movie_key in user_ratings:
            user_ratings.loc[movie_key] = movie_value

    recommended_movies = myIBCF(S=similarity_matrix, w=user_ratings, n=reco_size)
    recommended_movies = film_data[film_data["MovieID"].isin(recommended_movies.index.str.slice(1).astype(int))]
    return recommended_movies

(user_ratings, film_data, demographic_data, rating_matrix) = load_data()
similarity_matrix = create_similarity_matrix()

st.header("Collaborative Filtering Movie Recommender System")
sample_size = st.slider("Movie Sample Size:", 1, 100, 10)
reco_size = st.slider("Recommendation Size:", 1, 100, 10)
grid_size = st.slider("Display Grid:", 1, 10, 10, key="ibcf_grid_size")

with st.container(border=True):
    with st.expander("Step 1: Rate as many movies as possible", expanded=True):
        st.info("Step 1: Rate as many movies as possible")
        sample_set = get_random_movie_sample(n=sample_size)

        columns = st.columns(grid_size)

        star_ratings = []
        (num_movies, _) = sample_set.shape
        for i in range(num_movies):
            movie_record = sample_set.iloc[i, :]
            with columns[i % grid_size]:
                movie_title = movie_record['Title']
                st.subheader(f"{movie_title}")

                image_url = f'https://liangfgithub.github.io/MovieImages/{movie_record["MovieID"]}.jpg'
                st.image(image_url)

                rating = st.slider(f"Rate {movie_title}", 1, 5, 3, key=f"stars_{i}")
                star_ratings.append(rating)

with st.container(border=True):
    st.info("Step 2: Discover movies you might like")

    recommended_movies = generate_movie_recommendations()
    (num_reco, _) = recommended_movies.shape

    columns = st.columns(grid_size)

    for i in range(num_reco):
        movie_record = recommended_movies.iloc[i, :]
        with columns[i % grid_size]:
            movie_title = movie_record['Title']
            st.subheader(f"{movie_title}")

            st.text(f"Rank: {i+1}")

            image_url = f'https://liangfgithub.github.io/MovieImages/{movie_record["MovieID"]}.jpg'
            st.image(image_url)
