import json
import sys
import os
from datetime import datetime

sys.path.insert(0, os.path.dirname(__file__))

from scraper.client import create_client
from scraper.pagination import scrape_all_manufacturers
from scraper.compare import load_existing, diff, has_changes
from config import OUTPUT_PATH


def main():
    client = create_client()

    try:
        fresh = scrape_all_manufacturers(client)
    finally:
        client.close()

    fresh.sort(
        key=lambda c: datetime.strptime(c["date"], "%d.%m.%Y %H:%M") if c.get("date") else datetime.min,
        reverse=True,
    )

    existing = load_existing(OUTPUT_PATH)
    changes = diff(existing, fresh)

    if not has_changes(changes):
        print("No changes detected. JSON not updated.")
        return

    print(f"  Added:   {len(changes['added'])}")
    print(f"  Removed: {len(changes['removed'])}")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(fresh, f, ensure_ascii=False, indent=4)

    print(f"JSON updated — {len(fresh)} cars total.")

if __name__ == "__main__":
    main()
