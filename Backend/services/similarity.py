import numpy as np 

def calculate_similarity(resume_vectors,jd_vectors) :

    similarity_matrix = np.dot(
        jd_vectors,
        resume_vectors.T
    )

    return similarity_matrix


def retrieve_relevant_chunks(similarity_matrix, resume_chunks, jd_chunks, top_k=2 ) :
    results = []

    for jd_index,scores in enumerate(similarity_matrix) :
        
        top_indices = np.argsort(scores)[::-1][:top_k]

        matches = []

        for index in top_indices :
            matches.append({

                "resume_section" : resume_chunks[index].get(
                    "section" , "General"
                ),
                "resume_text" : resume_chunks[index]["text"],
                "similarity" : round(float(scores[index]),4)
            })


        results.append({
            "jd_requirement": jd_chunks[jd_index]["text"],
            "matches": matches
        })
    
    return results
