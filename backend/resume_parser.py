import fitz  # PyMuPDF
import re

def extract_text_from_pdf(file_bytes):
    text = ""
    with fitz.open("pdf", file_bytes) as doc:
        for page in doc:
            text += page.get_text()
    return text

def parse_resume(file_bytes):
    text = extract_text_from_pdf(file_bytes)

    # Name: First non-empty line after "Sample Resume"
    name_match = re.search(r"Sample Resume\s+([A-Z][a-z]+(?: [A-Z][a-z]+)+)", text)

    # Email and Phone
    email_match = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    phone_match = re.findall(r"\+?\d[\d\s\-]{8,15}", text)

    # Skills extraction: use bullet points after "Skills:" section
    skills_section = re.search(r"Skills:\s*(.*?)\n\n", text, re.DOTALL)
    skills_raw = skills_section.group(1) if skills_section else ""
    found_skills = re.findall(r"[a-zA-Z\+\#]+", skills_raw)

    # Education
    education_match = re.findall(r"(B\.?Tech.*?\d{4})", text, re.IGNORECASE)

    # Experience block
    experience_match = re.findall(
    r'(Software Developer Intern.*?)\s*([A-Za-z\s]+)\s*\|\s*(\w+\s+\d{4})\s*-\s*(\w+\s+\d{4})',
    text
)


    # Project titles
    project_match = re.findall(r"- (Smart.*?|Resume.*?)\n", text)

    return {
        "name": name_match.group(1) if name_match else "Unknown",
        "email": email_match[0] if email_match else "Not Found",
        "phone": phone_match[0] if phone_match else "Not Found",
        "skills": list(set([s.lower() for s in found_skills])),
        "education": education_match,
        "experience": experience_match,
        "projects": project_match,
        "text_preview": text[:500]
    }
