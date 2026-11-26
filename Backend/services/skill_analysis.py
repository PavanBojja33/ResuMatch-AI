
import re

SKILL_ALIASES = {
    "Java": ["java"],
    "Python": ["python"],
    "JavaScript": ["javascript", "js"],
    "React": ["react", "react.js"],
    "Node.js": ["node.js", "nodejs", "node"],
    "Express.js": ["express", "express.js"],
    "MongoDB": ["mongodb"],
    "MySQL": ["mysql"],
    "SQL": ["sql"],
    "REST APIs": ["rest api", "rest apis"],
    "WebRTC": ["webrtc"],
    "Docker": ["docker"],
    "AWS": ["aws", "amazon web services"],
    "Git": ["git"],
    "HTML": ["html"],
    "CSS": ["css"],
    "FastAPI": ["fastapi"],
    "Machine Learning": ["machine learning", "ml"],
}



def extract_skills(text):

    found_skills = []

    text = text.lower()

    for skill, aliases in SKILL_ALIASES.items():

        for alias in aliases:

            pattern = r"(?<!\w)" + re.escape(alias) + r"(?!\w)"

            if re.search(pattern, text):

                found_skills.append(skill)
                break

    return found_skills



def analyze_skills(resume_text, jd_text):

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched_skills = [
        skill for skill in jd_skills
        if skill in resume_skills
    ]

    missing_skills = [
        skill for skill in jd_skills
        if skill not in resume_skills
    ]

    return {
        "resume_skills": resume_skills,
        "required_skills": jd_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }


def build_skill_report(resume_text, jd_text, retrieval_results):

    report = analyze_skills(resume_text, jd_text)

    evidence = {}

    for skill in report["matched_skills"]:

        relevant_chunks = []

        for result in retrieval_results:

            requirement = result["jd_requirement"].lower()

            if skill.lower() in requirement:

                relevant_chunks.extend(
                    result["matches"]
                )

        evidence[skill] = relevant_chunks

    report["skill_evidence"] = evidence

    return report
