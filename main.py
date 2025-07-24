from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import parse_resume
import openai
import uvicorn
import os
from dotenv import load_dotenv

# Load OpenAI API key from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow frontend to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Optional: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CareerPilot AI is running"}

# ✅ 1. Resume Analysis Route
@app.post("/analyze-resume/")
async def analyze_resume(file: UploadFile = File(...)):
    file_bytes = await file.read()
    parsed = parse_resume(file_bytes)
    return parsed  # Includes name, email, phone, skills, etc.

# ✅ 2. Match Jobs Based on Skills
@app.post("/match-jobs/")
async def match_jobs(skills: list[str]):
    job_db = [
        {"id": 1, "title": "Python Developer", "required_skills": ["Python", "Django", "API"]},
        {"id": 2, "title": "Frontend Engineer", "required_skills": ["HTML", "CSS", "JavaScript", "React"]},
        {"id": 3, "title": "Data Analyst", "required_skills": ["Excel", "SQL", "Python", "Tableau"]}
    ]

    matched_jobs = []
    for job in job_db:
        match_score = len(set(job["required_skills"]) & set(skills))
        if match_score > 0:
            matched_jobs.append({
                "job": job,
                "match_score": match_score,
                "matched_skills": list(set(job["required_skills"]) & set(skills))
            })

    job_titles = [job["job"]["title"] for job in matched_jobs]
    return {"recommended_jobs": job_titles}

# ✅ 3. Smart Career Insights using OpenAI GPT
@app.post("/smart-insights/")
async def smart_insights(data: dict = Body(...)):
    skills = data.get("skills", [])
    experience = data.get("experience", [])
    projects = data.get("projects", [])

    prompt = f"""
    Candidate Profile:
    Skills: {', '.join(skills)}
    Experience: {', '.join(experience)}
    Projects: {', '.join(projects)}

    Provide:
    1. Best-fit job roles
    2. Career growth suggestions
    3. Resume improvement tips
    4. Technology areas to focus on
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use "gpt-4" if enabled
            messages=[
                {"role": "system", "content": "You are a career advisor and resume coach."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        return {"insights": response.choices[0].message["content"]}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
