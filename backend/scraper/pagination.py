from config import MANUFACTURER_PAGE_1, MANUFACTURER_PAGE_N
from scraper.scraper import scrape_page


def scrape_manufacturer_pages(client, manufacturer: dict) -> list[dict]:
    name = manufacturer["name"]
    base = manufacturer["url"]
    all_cars = []
    page = 1

    while True:
        url = MANUFACTURER_PAGE_1.format(base=base) if page == 1 else MANUFACTURER_PAGE_N.format(base=base, page=page)
        print(f"  [{name}] page {page}: {url}")

        cars = scrape_page(client, url)

        if not cars:
            print(f"  [{name}] page {page} empty — stopping.")
            break

        tagged = [{"manufacturer": name, **car} for car in cars]
        all_cars.extend(tagged)
        print(f"  [{name}] page {page}: {len(tagged)} cars (subtotal: {len(all_cars)})")
        page += 1

    return all_cars

def scrape_all_manufacturers(client) -> list[dict]:
    from scraper.manufacturers import scrape_manufacturers

    manufacturers = scrape_manufacturers(client)
    all_cars = []

    for i, manufacturer in enumerate(manufacturers):
        print(f"\n[{i + 1}/{len(manufacturers)}] Scraping {manufacturer['name']}")
        cars = scrape_manufacturer_pages(client, manufacturer)
        all_cars.extend(cars)
        print(f"  → {len(cars)} cars. Total so far: {len(all_cars)}")

    return all_cars
