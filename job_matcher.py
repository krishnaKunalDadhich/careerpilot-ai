def match_jobs(skills):
    # Dummy matching logic
    job_titles = {
        "Python": "Data Analyst",
        "SQL": "Business Analyst",
        "Communication": "Customer Success Executive"
    }
    matches = [job_titles.get(skill, "Generalist") for skill in skills]
    return list(set(matches))
