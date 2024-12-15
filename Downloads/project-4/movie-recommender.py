import numpy as np
import pandas as pd
import streamlit as st

import warnings
warnings.filterwarnings('ignore')

st.set_page_config(layout="wide")

@st.cache_data
def load_data():
    base_folder = "C:/Users/asaho/Downloads/data/project-4"
    ratings = pd.read_csv(f'{base_folder}/ratings.dat', sep='::', engine = 'python', header=None)
    ratings.columns = ['UserID', 'MovieID', 'Rating', 'Timestamp']

    movies = pd.read_csv(f'{base_folder}/movies.dat', sep='::', engine = 'python',
                         encoding="ISO-8859-1", header = None)
    movies.columns = ['MovieID', 'Title', 'Genres']

    users = pd.read_csv(f'{base_folder}/users.dat', sep='::', engine = 'python', header = None)
    users.columns = ['UserID', 'Gender', 'Age', 'Occupation', 'Zipcode']

    rating_matrix = pd.read_csv(f'{base_folder}/Rmat.csv', sep=',')
    return (ratings, movies, users, rating_matrix)

@st.cache_data
def get_random_movie_set(n=10):
    movie_set = movies.sample(n)
    return movie_set

@st.cache_data
def build_similarity_matrix_v2():
    normalized_rating_matrix = rating_matrix.subtract(rating_matrix.mean(axis=1), axis='rows')

    cardinality_df = (~normalized_rating_matrix.isna()).astype('int')
    cardinality_df = cardinality_df.T
    cardinality_matrix = cardinality_df @ cardinality_df.T

    normalized_rating_matrix = normalized_rating_matrix.T
    normalized_rating_matrix = normalized_rating_matrix.fillna(0)

    nr = normalized_rating_matrix @ normalized_rating_matrix.T
    squared_normalized_rating_matrix = ((normalized_rating_matrix**2) @ (normalized_rating_matrix != 0).T)
    squared_normalized_rating_matrix = squared_normalized_rating_matrix.apply(np.vectorize(np.sqrt))
    dr = squared_normalized_rating_matrix * squared_normalized_rating_matrix.T
    
    cosine_distance = nr / dr
    S = (1 + cosine_distance) / 2
    
    np.fill_diagonal(S.values, np.nan)
    S[cardinality_matrix < 3] = None
    
    return S

def myIBCF(S, w, n=10):
    S = S.copy()
    S = S.fillna(0)

    w = w.copy()
    identity = (~w.isna()).astype(int)
    w = w.fillna(0)

    reco_movies = w.dot(S) / identity.dot(S)
    reco_movies = reco_movies.sort_values(ascending=False)[0:n]
    
    reco_movies = reco_movies.dropna()
    
    return reco_movies

def get_recommendations():
    movie_set["star"] = np.array(star_list)

    row = S.iloc[0]
    user_ratings = row.copy()
    user_ratings[:] = np.nan

    for i in range(movie_set.shape[0]):
        key = "m" + str(movie_set.iloc[i]["MovieID"])
        value = movie_set.iloc[i]["star"]
        if key in user_ratings:
            user_ratings.loc[key] = value

    reco_movies = myIBCF(S=S, w=user_ratings, n=reco_size)
    reco_movies = movies[movies["MovieID"].isin(reco_movies.index.str.slice(1).astype(int))]
    return reco_movies

(ratings, movies, users, rating_matrix) = load_data()
S = build_similarity_matrix_v2()

st.header("Collaborative Filtering Movie Recommender System")
movie_set_size = st.slider("Movie Set size:", 1, 100, 10)
reco_size = st.slider("Recommendation Set size:", 1, 100, 10)
grid_size = st.slider("Display Grid:", 1, 10, 10, key="ibcf_grid_size")

with st.container(border=True):
    with st.expander("Step 1: Rate as many movies as possible", expanded=True):
        st.info("Step 1: Rate as many movies as possible")
        movie_set = get_random_movie_set(n=movie_set_size)

        cols = st.columns(grid_size)

        star_list = []
        (row, _) = movie_set.shape
        for i in range(row):
            record = movie_set.iloc[i, :]
            with cols[i % grid_size]:
                title = record['Title']
                st.subheader(f"{title}")

                image_url = f'https://liangfgithub.github.io/MovieImages/{record["MovieID"]}.jpg'
                st.image(image_url)

                star = st.slider(f"Rate {title}", 1, 5, 3, key=f"stars_{i}")
                star_list.append(star)

with st.container(border=True):
    st.info("Step 2: Discover movies you might like")

    reco_movies = get_recommendations()
    (row, _) = reco_movies.shape

    cols = st.columns(grid_size)

    for i in range(row):
        record = reco_movies.iloc[i, :]
        with cols[i % grid_size]:
            title = record['Title']
            st.subheader(f"{title}")

            st.text(f"Rank: {i+1}")

            image_url = f'https://liangfgithub.github.io/MovieImages/{record["MovieID"]}.jpg'
            st.image(image_url)
