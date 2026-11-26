
# # # from chunking import chunk_resume, chunk_jd

# # # resume = """
# # # Skills:
# # # Java, Python, React, Node.js

# # # Projects:
# # # Campus-OLX: Built a marketplace using MERN.

# # # Education:
# # # B.Tech Computer Science.
# # # """

# # # jd = """
# # # Required Skills:
# # # JavaScript, React, Node.js

# # # Responsibilities:
# # # Develop REST APIs.

# # # Preferred Skills:
# # # WebRTC
# # # """

# # # print("RESUME CHUNKS:")
# # # for chunk in chunk_resume(resume):
# # #     print(chunk)

# # # print("\nJD CHUNKS:")
# # # for chunk in chunk_jd(jd):
# # #     print(chunk)



# # from embeddings import generate_embeddings

# # resume_chunks = [
# #     {
# #         "text": "Developed REST APIs using Node.js and Express."
# #     },
# #     {
# #         "text": "Built a peer-to-peer file sharing application using WebRTC."
# #     }
# # ]

# # jd_chunks = [
# #     {
# #         "text": "Experience in backend API development."
# #     },
# #     {
# #         "text": "Knowledge of React and frontend development."
# #     }
# # ]

# # # Generate resume embeddings
# # resume_vectors = generate_embeddings(resume_chunks)

# # # Generate JD embeddings
# # jd_vectors = generate_embeddings(jd_chunks)

# # print("Resume embeddings shape:", resume_vectors.shape)
# # print("JD embeddings shape:", jd_vectors.shape)

# # print("\nFirst resume vector:")
# # print(resume_vectors[0][:10])



# from chunking import chunk_resume, chunk_jd
# from embeddings import generate_embeddings
# from similarity import (
#     calculate_similarity,
#     retrieve_relevant_chunks
# )

# resume = """
# Skills:
# Java, Python, React, Node.js, MongoDB

# Projects:
# Developed REST APIs using Node.js and Express.
# Built a peer-to-peer file sharing application using WebRTC.

# Education:
# B.Tech Computer Science Engineering.
# """

# jd = """
# Required Skills:
# Experience in backend API development.
# Knowledge of React frontend development.

# Preferred Skills:
# Experience with WebRTC.
# """

# resume_chunks = chunk_resume(resume)
# jd_chunks = chunk_jd(jd)

# resume_vectors = generate_embeddings(resume_chunks)
# jd_vectors = generate_embeddings(jd_chunks)

# similarity_matrix = calculate_similarity(
#     resume_vectors,
#     jd_vectors
# )

# results = retrieve_relevant_chunks(
#     similarity_matrix,
#     resume_chunks,
#     jd_chunks,
#     top_k=2
# )

# for result in results:
#     print("\nJD:", result["jd_requirement"])

#     for match in result["matches"]:
#         print("Resume:", match["resume_text"])
#         print("Similarity:", match["similarity"])



from gemini_service import generate_resume_analysis

resume_text = """
Skills:
Java, Python, React, Node.js, MongoDB

Projects:
Developed REST APIs using Node.js and Express.
Built a peer-to-peer file sharing application using WebRTC.
"""

jd_text = """
Required Skills:
JavaScript, React, Node.js, MongoDB, Docker

Preferred Skills:
WebRTC, AWS
"""

skill_report = {
    "resume_skills": ["Java", "Python", "React", "Node.js", "MongoDB", "WebRTC"],
    "required_skills": ["JavaScript", "React", "Node.js", "MongoDB", "Docker", "WebRTC", "AWS"],
    "matched_skills": ["React", "Node.js", "MongoDB", "WebRTC"],
    "missing_skills": ["JavaScript", "Docker", "AWS"]
}

retrieval_results = [
    {
        "jd_requirement": "Experience with React",
        "matches": [
            {
                "resume_section": "Skills",
                "resume_text": "Java, Python, React, Node.js, MongoDB",
                "similarity": 0.85
            }
        ]
    }
]

result = generate_resume_analysis(
    resume_text,
    jd_text,
    retrieval_results,
    skill_report
)

print(result)
