import json
import os

def load_existing(path: str) -> list[dict]:
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def diff(old: list[dict], new: list[dict]) -> dict:
    old_by_id = {c["id"]: c for c in old}
    new_by_id = {c["id"]: c for c in new}

    added = [c for id, c in new_by_id.items() if id not in old_by_id]
    removed = [c for id, c in old_by_id.items() if id not in new_by_id]

    return {"added": added, "removed": removed}

def has_changes(diff_result: dict) -> bool:
    return bool(diff_result["added"] or diff_result["removed"])
