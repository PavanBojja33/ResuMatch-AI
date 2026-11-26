import re

def chunk_resume(text) : 
    chunks=[]

    section_pattern = re.compile(
        r"(?im)^(skills|technical skills|"
        r"projects|experience|work experience|"
        r"education|certifications|summary|"
        r"achievements"
        r"languages"
        r"professional summary)\s*:?\s*$"
    )

    current_section = "General"
    current_content = []

    lines = text.splitlines()

    for line in lines :

        line = line.strip()

        if not line:
            continue

        match = section_pattern.match(line)

        if match:

            if current_content:
                chunks.append({
                    "section" : current_section,
                    "text" : "\n".join(current_content)
                })

            current_section = match.group(1).title()
            current_content = []
        
        else :
            current_content.append(line)
        
    if current_content :
        chunks.append({
            "section" : current_section,
            "text" : "\n".join(current_content)
        })

    return chunks


def chunk_jd(text) :
    lines = text.splitlines()
    chunks = []
    for line in lines :

        line = line.strip()

        if not line :
            continue
            
        line = re.sub(r"^\s*[•▪●○◦\-*–—]\s*","",line)

        if line.lower().rstrip(":") in [
            "requirements",
            "required skills",
            "responsibilities",
            "qualifications",
            "preferred skills"
        ] :
            continue
            
        chunks.append({
            "text" : line
        })
    
    return chunks