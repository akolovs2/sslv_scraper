import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import OUTPUT_PATH, PAGE_SIZE

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cars/all")
def get_all_cars():
    with open(OUTPUT_PATH, encoding="utf-8") as f:
        return json.load(f)


@app.get("/cars")
def get_cars(page: int = Query(1, ge=1)):
    with open(OUTPUT_PATH, encoding="utf-8") as f:
        all_cars = json.load(f)

    total = len(all_cars)
    total_pages = (total + PAGE_SIZE - 1) // PAGE_SIZE

    if page > total_pages:
        raise HTTPException(status_code=404, detail=f"Page {page} does not exist. Total pages: {total_pages}")

    start = (page - 1) * PAGE_SIZE
    end = start + PAGE_SIZE

    return {
        "page": page,
        "per_page": PAGE_SIZE,
        "total": total,
        "total_pages": total_pages,
        "data": all_cars[start:end],
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("routes:app", host="0.0.0.0", port=8000, reload=True)
