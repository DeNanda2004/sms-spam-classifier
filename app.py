import streamlit as st
import pickle

st.title("Email/SMS Spam Classifier")

# LOAD SAVED FILES
tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

def transform_text(text):
    return text.lower()

input_sms = st.text_area("Enter the message")

if st.button("Predict"):
    transformed_sms = transform_text(input_sms)
    vector_input = tfidf.transform([transformed_sms])
    result = model.predict(vector_input)[0]

    if result == 1:
        st.header("Spam 🚫")
    else:
        st.header("Not Spam ✅")
