from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer
import os

app = FastAPI()

# CORS
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    # "https://your-frontend.onrender.com"
   "https://translator-app-8wf3.onrender.com"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Translation API
class TranslateRequest(BaseModel):
    text: str
    src_lang: str
    tgt_lang: str

model_cache = {}
tokenizer_cache = {}

def get_model_and_tokenizer(src_lang: str, tgt_lang: str):
    model_name = f"Helsinki-NLP/opus-mt-{src_lang}-{tgt_lang}"
    if model_name not in model_cache:
        tokenizer_cache[model_name] = MarianTokenizer.from_pretrained(model_name)
        model_cache[model_name] = MarianMTModel.from_pretrained(model_name)
    return model_cache[model_name], tokenizer_cache[model_name]

@app.post("/translate")
async def translate(request: TranslateRequest):
    src = request.src_lang.lower()
    tgt = request.tgt_lang.lower()
    text = request.text

    try:
        model, tokenizer = get_model_and_tokenizer(src, tgt)
    except Exception as e:
        return {"translated_text": f"Error loading model for {src} -> {tgt}: {e}"}

    batch = tokenizer([text], return_tensors="pt")
    translated = model.generate(**batch)
    translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

    return {"translated_text": translated_text}

# -------------------
# Serve Angular frontend
# -------------------
frontend_path = os.path.join(os.path.dirname(__file__), "static")

# Serve static files under /static
if os.path.exists(frontend_path):
    # app.mount("/static", StaticFiles(directory=frontend_path), name="static") caused white screen maybe 
      app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

# # Catch-all for Angular routing                this also suspicious for causing white screeen so did  this 
# @app.get("/{full_path:path}")
# async def serve_angular(full_path: str):
#     index_file = os.path.join(frontend_path, "index.html")
#     if os.path.exists(index_file):
#         return FileResponse(index_file)
#     return {"message": "Frontend not found"}







# local
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from transformers import MarianMTModel, MarianTokenizer

# app = FastAPI()

# # CORS settings to allow Angular frontend
# origins = ["http://localhost:4200"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request body model
# class TranslateRequest(BaseModel):
#     text: str
#     src_lang: str  # e.g., 'en'
#     tgt_lang: str  # e.g., 'hi'

# # Cache models to avoid loading each time
# model_cache = {}
# tokenizer_cache = {}

# def get_model_and_tokenizer(src_lang: str, tgt_lang: str):
#     """Load MarianMT model and tokenizer for the language pair."""
#     model_name = f"Helsinki-NLP/opus-mt-{src_lang}-{tgt_lang}"
#     if model_name not in model_cache:
#         tokenizer_cache[model_name] = MarianTokenizer.from_pretrained(model_name)
#         model_cache[model_name] = MarianMTModel.from_pretrained(model_name)
#     return model_cache[model_name], tokenizer_cache[model_name]

# @app.post("/translate")
# async def translate(request: TranslateRequest):
#     src = request.src_lang.lower()
#     tgt = request.tgt_lang.lower()
#     text = request.text

#     try:
#         model, tokenizer = get_model_and_tokenizer(src, tgt)
#     except Exception as e:
#         return {"translated_text": f"Error loading model for {src} -> {tgt}: {e}"}

#     # Tokenize input
#     batch = tokenizer([text], return_tensors="pt")
#     # Generate translation
#     translated = model.generate(**batch)
#     translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

#     return {"translated_text": translated_text}
