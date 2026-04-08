import re
from bs4 import BeautifulSoup

def _has_msga2(tag):
    return tag.name == "td" and any("msga2" in c for c in tag.get("class", []))

def _fetch_detail(client, url: str) -> dict:
    resp = client.get(url)
    html = resp.text

    image = None
    date = None

    match = re.search(r'https://i\.ss\.lv/gallery[^\s"\']+\.800\.jpg', html)
    if match:
        image = match.group(0)

    soup = BeautifulSoup(html, "html.parser")
    date_td = soup.find("td", string=lambda t: t and "Datums:" in t)
    if date_td:
        date = date_td.text.replace("Datums:", "").strip()

    return {"image": image, "date": date}

def scrape_page(client, url: str) -> list[dict]:
    resp = client.get(url)
    if resp.status_code != 200:
        return []

    # ss.lv redirects non-existent pages silently back to page 1 — detect and stop
    if str(resp.url) != url:
        return []

    soup = BeautifulSoup(resp.text, "html.parser")

    rows = [
        r for r in soup.find_all("tr", id=lambda x: x and x.startswith("tr_"))
        if r.find("td", class_="msg2")
    ]

    # extract listing data
    raw = []
    for row in rows:
        try:
            title_td = row.find("td", class_="msg2")
            title_el = title_td.find("a") if title_td else None
            if not title_el:
                continue

            cols = title_td.find_next_siblings(_has_msga2)
            if len(cols) < 5:
                continue

            href = title_el.get("href", "")
            link = href if href.startswith("http") else "https://www.ss.lv" + href

            raw.append({
                "id": row.get("id"),
                "title": title_el.text.strip(),
                "link": link,
                "model": cols[0].text.strip(),
                "year": cols[1].text.strip(),
                "engine": cols[2].text.strip(),
                "mileage": cols[3].text.strip(),
                "price": cols[4].text.strip(),
            })
        except Exception as e:
            print(f"Skipped row during collection: {e}")

    # fetch image + date from each detail page
    data = []
    for i, car in enumerate(raw):
        try:
            detail = _fetch_detail(client, car["link"])
            car["image"] = detail["image"]
            car["date"] = detail["date"]
            print(f"  [{i + 1}/{len(raw)}] {car['id']} — ok")
        except Exception as e:
            car["image"] = None
            car["date"] = None
            print(f"  [{i + 1}/{len(raw)}] {car['id']} — detail failed: {e}")
        data.append(car)

    return data
