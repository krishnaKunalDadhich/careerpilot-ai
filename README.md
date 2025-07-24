<h1 align="center">🎯 CareerPilot.AI</h1>
<p align="center">An AI-powered career assistant that analyzes resumes, answers career questions, and recommends personalized job opportunities.</p>

---

## 🚀 About the Project

**CareerPilot.AI** is a smart, AI-powered platform designed for students and professionals to:
- Get instant feedback on their resumes
- Ask career-related questions to an LLM-powered assistant
- Discover job roles that match their skills
- Track progress via a dashboard

It's not just a chatbot — it's a complete AI Career Support System.

---

## 🧠 Features

- 🧾 **Resume Analyzer**: Upload your resume PDF to get insights, extracted skills, and improvement suggestions using NLP.
- 🤖 **Career Q&A Bot**: Ask career-related questions powered by LangChain + OpenAI/GPT-4.
- 🎯 **Job Matching Algorithm**: Recommends job titles that match your skills (using cosine similarity or vector embeddings).
- 📊 **Career Dashboard**: Track resume score, job match %, and get personalized growth tips.

---

## ⚙️ Tech Stack

| Layer            | Tools/Tech Used                     |
|------------------|--------------------------------------|
| Frontend         | React.js / Next.js, TailwindCSS     |
| Backend          | FastAPI (Python)                    |
| AI/NLP Layer     | LangChain, spaCy, OpenAI API        |
| Database         | MongoDB / Firebase / PostgreSQL     |
| DevOps & Hosting | Railway, Vercel, GitHub Actions     |

---

## 🛠️ Folder Structure

```bash
careerpilot-ai/
├── backend/
│   ├── main.py
│   ├── resume_parser.py
│   ├── chat_engine.py
│   └── job_matcher.py
├── frontend/
│   ├── pages/
│   ├── components/
│   └── styles/
├── README.md
└── requirements.txt

---

## 🧪 Running Locally

### ▶️ Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload



### ▶️ Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
📸 Screenshots (Add later)

- Resume Upload Page
- Job Recommendations
- Chatbot UI
- Dashboard
🌐 Live Links (Coming soon)

Frontend: https://careerpilot.vercel.app  
Backend API: https://careerpilot-api.railway.app
📈 Future Scope

- Career roadmap generator using AI
- Cover letter writer using prompt chaining
- ATS resume checker
- Chat memory using LangChain
- LinkedIn profile analyzer
- Skill gap visualizer

---

## 👨‍💻 Author

Krishna Kunal Dadhich  
GitHub: https://github.com/krishnakunaldadhich  
Portfolio: https://krishnakunaldadhich.github.io/portfolio
⭐ If you liked this project:

- Star the repo
- Fork the repo
- Share with others

