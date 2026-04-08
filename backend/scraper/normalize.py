import re


def normalize_mileage(value: str) -> int | None:
    """
    '300 tūkst.'  → 300000
    '150 000'     → 150000
    '50000'       → 50000
    ''            → None
    """
    if not value:
        return None

    v = value.lower()

    # Extract leading number (may have spaces as thousands separator)
    match = re.search(r'[\d\s]+', v)
    if not match:
        return None

    number = int(match.group(0).replace(" ", ""))

    if "tūkst" in v or "tkst" in v:
        number *= 1000

    return number


def normalize_price(value: str) -> float | None:
    """
    '13 990 €'   → 13990.0
    '1 500.00 €' → 1500.0
    ''           → None
    """
    if not value:
        return None

    match = re.search(r'[\d\s.,]+', value)
    if not match:
        return None

    raw = match.group(0).strip().replace(" ", "").replace(",", ".")
    # Handle European format where . is thousands separator: 1.500 → 1500
    parts = raw.split(".")
    if len(parts) == 2 and len(parts[1]) == 3:
        raw = "".join(parts)

    try:
        return float(raw)
    except ValueError:
        return None


def normalize_year(value: str) -> int | None:
    match = re.search(r'\d{4}', value)
    return int(match.group(0)) if match else None
