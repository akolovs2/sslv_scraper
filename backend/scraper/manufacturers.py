from bs4 import BeautifulSoup
from config import CATEGORIES_URL

def scrape_manufacturers(client) -> list[dict]:
    resp = client.get(CATEGORIES_URL)
    soup = BeautifulSoup(resp.text, "html.parser")

    # first <td> contains manufacturer links; second has special categories (ignored)
    first_td = soup.find("td", attrs={"width": "75%"})
    if not first_td:
        print("Could not find manufacturer list")
        return []

    links = first_td.find_all("a", class_="a_category")

    manufacturers = []
    for link in links:
        href = link.get("href", "")
        name = link.text.strip()
        if href and name:
            url = href if href.startswith("http") else "https://www.ss.lv" + href
            manufacturers.append({"name": name, "url": url})

    print(f"Found {len(manufacturers)} manufacturers")
    return manufacturers
