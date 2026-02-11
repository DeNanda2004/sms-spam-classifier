import streamlit as st
import pickle

# ------------------ PAGE CONFIG ------------------
st.set_page_config(
    page_title="Spam Detection App",
    page_icon="📩",
    layout="wide"
)

# ------------------ CUSTOM CSS ------------------
st.markdown("""
<style>
.main {
    background-color: #f4f6f9;
}

.card {
    background-color: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stButton>button {
    width: 100%;
    background-color: #6C63FF;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    height: 3em;
}

.result-spam {
    background-color: #ffe6e6;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #cc0000;
}

.result-ham {
    background-color: #e6ffe6;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #008000;
}
</style>
""", unsafe_allow_html=True)

# ------------------ SIDEBAR ------------------
st.sidebar.title("📌 Navigation")
page = st.sidebar.radio("Go to", ["Spam Classifier", "About Model"])

# ------------------ LOAD MODEL ------------------
tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

def transform_text(text):
    return text.lower()

# ------------------ PAGE 1 ------------------
if page == "Spam Classifier":

    st.markdown("<h1 style='text-align:center;'>📩 Smart Spam Detection System</h1>", unsafe_allow_html=True)
    st.write("Enter a message below to check whether it is **Spam or Not Spam**.")

    col1, col2 = st.columns([2, 1])

    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        input_sms = st.text_area("✍️ Enter your message:", height=150)

        if st.button("🔍 Analyze Message"):
            if input_sms.strip() == "":
                st.warning("Please enter a message.")
            else:
                transformed_sms = transform_text(input_sms)
                vector_input = tfidf.transform([transformed_sms])
                result = model.predict(vector_input)[0]
                prob = model.predict_proba(vector_input)[0]

                spam_prob = round(prob[1] * 100, 2)
                ham_prob = round(prob[0] * 100, 2)

                if result == 1:
                    st.markdown("<div class='result-spam'>🚫 SPAM MESSAGE</div>", unsafe_allow_html=True)
                    st.progress(int(spam_prob))
                    st.write(f"Confidence: **{spam_prob}%**")
                else:
                    st.markdown("<div class='result-ham'>✅ NOT SPAM</div>", unsafe_allow_html=True)
                    st.progress(int(ham_prob))
                    st.write(f"Confidence: **{ham_prob}%**")

        st.markdown("</div>", unsafe_allow_html=True)

    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.subheader("📊 Model Info")
        st.write("• Algorithm: Multinomial Naive Bayes")
        st.write("• Vectorizer: TF-IDF")
        st.write("• Built with: Scikit-learn")
        st.write("• Deployment: Streamlit")
        st.markdown("</div>", unsafe_allow_html=True)

# ------------------ PAGE 2 ------------------
elif page == "About Model":
    st.title("📚 About This Project")
    st.write("""
    This Spam Detection System uses Natural Language Processing (NLP)
    techniques to classify SMS/Email messages as Spam or Not Spam.

    Steps involved:
    1. Text preprocessing
    2. TF-IDF vectorization
    3. Model training (Naive Bayes)
    4. Deployment using Streamlit
    """)

    st.success("Built for Portfolio & Learning Purpose 🚀")
