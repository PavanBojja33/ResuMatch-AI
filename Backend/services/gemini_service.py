
import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()


def generate_resume_analysis(
    resume_text,
    jd_text,
    retrieval_results,
    skill_report
):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY is missing from .env")

    model_name = "gemini-3.5-flash-lite"

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are an expert resume reviewer.
Analyze the candidate's resume against the job description.

RESUME:
{resume_text[:12000]}

JOB DESCRIPTION:
{jd_text[:8000]}

SKILL ANALYSIS:
{json.dumps(skill_report)}

RETRIEVED RESUME EVIDENCE:
{json.dumps(retrieval_results[:20])}

RULES:
1. Base every observation on the supplied resume and job description.
2. Never invent skills, experience, projects, achievements, or numbers.
3. Do not claim a skill is present unless the resume provides evidence.
4. Clearly identify missing required skills.
5. Suggest improvements without changing the candidate's actual experience.
6. If evidence is insufficient, say so.
7. Treat the match score as an estimate, not an official ATS score.

Return JSON with exactly these fields:
{{
    "overall_match_score": 0,
    "summary": "Short overall assessment",
    "strengths": [],
    "matched_skills": [],
    "missing_skills": [],
    "improvement_suggestions": [
        {{
            "original_bullet": "Existing resume statement",
            "suggested_bullet": "Improved version using only existing facts",
            "reason": "Why this is better"
        }}
    ],
    "recommendations": []
}}

The overall_match_score must be an integer from 0 to 100.
Return only valid JSON.
"""

    response = client.models.generate_content(
        model=model_name,
        contents=prompt,
        config={
            "response_mime_type": "application/json"
        }
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response")

    return json.loads(response.text)
