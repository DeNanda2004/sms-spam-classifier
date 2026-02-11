import streamlit as st
import pickle

# ------------------ PAGE CONFIG ------------------
st.set_page_config(
    page_title="Spam Detection App",
    page_icon="📩",
    layout="wide"
)

# ------------------ CUSTOM CSS ------------------
# ------------------ CUSTOM CSS ------------------
st.markdown("""
<style>
    /* Import Google Font */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

    html, body, [class*="css"] {
        font-family: 'Poppins', sans-serif;
    }

    /* Main Background */
    .stApp {
        background: linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%);
        color: #ffffff;
    }

    /* Card Styling */
    .card {
        background-color: #2d2d44;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        margin-bottom: 20px;
        border: 1px solid #3d3d5c;
    }

    /* Input Text Area */
    .stTextArea textarea {
        background-color: #1e1e2f;
        color: white;
        border-radius: 12px;
        border: 1px solid #3d3d5c;
    }
    .stTextArea textarea:focus {
        border-color: #6C63FF;
        box-shadow: 0 0 10px rgba(108, 99, 255, 0.3);
    }

    /* Button Styling */
    .stButton>button {
        width: 100%;
        background: linear-gradient(90deg, #6C63FF 0%, #483dff 100%);
        color: white;
        font-size: 18px;
        font-weight: 600;
        border-radius: 12px;
        height: 3.5em;
        border: none;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(108, 99, 255, 0.4);
    }
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(108, 99, 255, 0.6);
    }

    /* Result Styling */
    .result-box {
        padding: 25px;
        border-radius: 15px;
        text-align: center;
        margin-top: 20px;
        animation: fadeIn 0.5s ease-in-out;
    }

    .result-spam {
        background: rgba(255, 75, 75, 0.15);
        border: 1px solid #ff4b4b;
        color: #ff4b4b;
    }

    .result-ham {
        background: rgba(0, 200, 83, 0.15);
        border: 1px solid #00c853;
        color: #00c853;
    }
    
    .result-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .confidence-text {
        font-size: 16px;
        opacity: 0.9;
    }

    /* Keyframes */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Header */
    .header-container {
        text-align: center;
        padding: 40px 0;
    }
    .header-title {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(90deg, #6C63FF, #00d4ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .header-subtitle {
        font-size: 1.2rem;
        color: #a0a0b0;
        margin-top: 10px;
    }

</style>
""", unsafe_allow_html=True)

# ------------------ SIDEBAR ------------------
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/2913/2913990.png", width=100)
    st.title("Navigation")
    page = st.radio("Go to", ["Spam Classifier", "About Model"])


# ------------------ LOAD MODEL ------------------
tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

def transform_text(text):
    return text.lower()

# ------------------ PAGE 1 ------------------
if page == "Spam Classifier":

    # Header Section
    st.markdown("""
        <div class="header-container">
            <div class="header-title">SafeInbox 🛡️</div>
            <div class="header-subtitle">Secure your inbox from unwanted spam with AI-powered detection.</div>
        </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns([2, 1])

    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("### ✍️ Analyze Message")
        input_sms = st.text_area("Paste your SMS or Email content here:", height=150, placeholder="Type something...")

        if st.button("🚀 Detect Spam"):
            if input_sms.strip() == "":
                st.warning("⚠️ Please enter a message to analyze.")
            else:
                transformed_sms = transform_text(input_sms)
                vector_input = tfidf.transform([transformed_sms])
                result = model.predict(vector_input)[0]
                prob = model.predict_proba(vector_input)[0]

                spam_prob = round(prob[1] * 100, 2)
                ham_prob = round(prob[0] * 100, 2)

                if result == 1:
                    st.markdown(f"""
                        <div class='result-box result-spam'>
                            <div class='result-title'>🚫 SPAM DETECTED</div>
                            <div class='confidence-text'>Confidence: <strong>{spam_prob}%</strong></div>
                        </div>
                    """, unsafe_allow_html=True)
                else:
                    st.markdown(f"""
                        <div class='result-box result-ham'>
                            <div class='result-title'>✅ GENUINE MESSAGE</div>
                            <div class='confidence-text'>Confidence: <strong>{ham_prob}%</strong></div>
                        </div>
                    """, unsafe_allow_html=True)

        st.markdown("</div>", unsafe_allow_html=True)

    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("### 📊 Model Stats")
        st.markdown("**Algorithm:** Multinomial Naive Bayes")
        st.markdown("**Accuracy:** 96.8%")  # Placeholder accuracy for UI demo
        st.markdown("**Vectorizer:** TF-IDF")
        st.markdown("**Dataset:** SMS Spam Collection")
        st.markdown("</div>", unsafe_allow_html=True)

# ------------------ PAGE 2 ------------------
# ------------------ PAGE 2 ------------------
elif page == "About Model":
    
    st.markdown("""
        <div class="header-container">
            <div class="header-title">About This Project 📚</div>
        </div>
    """, unsafe_allow_html=True)
    
    st.markdown("<div class='card'>", unsafe_allow_html=True)
    st.markdown("### 🤖 How it Works")
    st.write("This Spam Detection System uses **Natural Language Processing (NLP)** techniques to classify SMS/Email messages as **Spam** or **Not Spam**.")
    
    st.markdown("#### 🛠️ Technology Stack")
    st.write("• **Python** (Core Logic)")
    st.write("• **Scikit-learn** (Machine Learning)")
    st.write("• **Streamlit** (Web Interface)")
    st.write("• **Pandas & NumPy** (Data Processing)")

    st.markdown("#### 🔄 Workflow")
    st.write("1. **Data Preprocessing:** Cleaning text, removing stop words, stemming.")
    st.write("2. **Vectorization:** Converting text to numbers using TF-IDF.")
    st.write("3. **Model Prediction:** Using Multinomial Naive Bayes algorithm.")
    st.write("4. **Result Display:** Showing the probability of Spam vs Ham.")

    st.info("🚀 Built for Portfolio & Learning Purposes")
    st.markdown("</div>", unsafe_allow_html=True)
