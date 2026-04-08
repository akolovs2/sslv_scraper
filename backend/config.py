import os

CATEGORIES_URL = "https://www.ss.lv/lv/transport/cars/"

MANUFACTURER_PAGE_1 = "{base}sell/"
MANUFACTURER_PAGE_N = "{base}sell/page{page}.html"

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "data", "cars.json")

PAGE_SIZE = 20
