from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile,File
from fastapi import HTTPException
import fitz
from fastapi import Body
from fastapi import UploadFile, File, Form, HTTPException
import fitz

from services.chunking import chunk_resume, chunk_jd
from services.embeddings import generate_embeddings
from services.similarity import (calculate_similarity,retrieve_relevant_chunks)
from services.skill_analysis import build_skill_report
from services.gemini_service import generate_resume_analysis


app = FastAPI(title="ResuMatch-AI ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home() : 
    return {"message":"Welcome to ResuMatch-AI"}




@app.post("/upload-resume")
async def upload_resume(resume : UploadFile = File(...)) :

    if not resume.filename.lower().endswith(".pdf") :
        raise HTTPException(
            status_code = 400,
            detail = "Only PDF files are allowed" 
        )

    contents = await resume.read()

    if not contents.startswith(b"%PDF-"):
        raise HTTPException(
            status_code = 400,
            detail = "Invalid pdf file" 
        )
    
    try : 

        pdf_file = fitz.open(stream = contents,filetype="pdf")

        extracted_text = ""

        for page in pdf_file :
            extracted_text += page.get_text() + "\n"

        total_pages = len(pdf_file)
        pdf_file.close()

        if not extracted_text.strip() :
            raise HTTPException(
                status_code = 400,
                detail = "no text found"
            )

        return {
            "filename" : resume.filename,
            "total_pages" : total_pages,
            "content" : extracted_text,
            "total_character" : len(extracted_text)
        }

    except HTTPException :
        raise 

    except Exception :
        raise HTTPException(
            status_code = 400,
            detail = "Unable to process the PDF"
        )

    return {    
        "filename" : resume.filename,
        "content_type" : resume.content_type,
        "message" : "File uploaded successfully"
    }




@app.post("/process-jd")
async def process_jd(jd_text : str = Body(...,embed=True)) :
    
    if not jd_text or not jd_text.strip() :
        raise HTTPException(
            status_code = 400,
            detail = "Provided JD is empty"
        )

    lines = [
        line.strip()
        for line in jd_text.splitlines()
    ]

    cleaned_lines = [
        line for line in lines if line
    ]

    cleaned_text = "\n".join(cleaned_lines)

    return {
        "original_character" : len(cleaned_text),
        "cleaned_character" : len(cleaned_text),
        "processed_jd" : cleaned_text
    }
    


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    jd_text: str = Form(...)
):

    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    if not jd_text or not jd_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty"
        )

    contents = await file.read()

    if not contents.startswith(b"%PDF-"):
        raise HTTPException(
            status_code=400,
            detail="Invalid PDF file"
        )

    try:
        pdf = fitz.open(stream=contents, filetype="pdf")

        resume_text = "\n".join(
            page.get_text() for page in pdf
        )

        pdf.close()

        if not resume_text.strip():
            raise HTTPException(
                status_code=422,
                detail="No readable text found in PDF"
            )

        
        resume_chunks = chunk_resume(resume_text)
        jd_chunks = chunk_jd(jd_text)

        if not resume_chunks or not jd_chunks:
            raise HTTPException(
                status_code=422,
                detail="Unable to process resume or job description"
            )

        
        resume_vectors = generate_embeddings(resume_chunks)
        jd_vectors = generate_embeddings(jd_chunks)


        similarity_matrix = calculate_similarity(
            resume_vectors,
            jd_vectors
        )

        retrieval_results = retrieve_relevant_chunks(
            similarity_matrix,
            resume_chunks,
            jd_chunks
        )

        
        skill_report = build_skill_report(
            resume_text,
            jd_text,
            retrieval_results
        )

        
        ai_report = generate_resume_analysis(
            resume_text,
            jd_text,
            retrieval_results,
            skill_report
        )

        return {
            "filename": file.filename,
            "skill_analysis": skill_report,
            "retrieval_results": retrieval_results,
            "ai_analysis": ai_report
        }

    except HTTPException:
        raise

    except Exception as e:
        print("Analysis error:", str(e))
        raise HTTPException(
            status_code=500,
            detail="Failed to analyze resume"
        )
