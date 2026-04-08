const en = {
  header: {
    listings: "{{count}} listings",
  },
  filters: {
    title: "Filters",
    active: "active",
    clear: "Clear",
    sortBy: "Sort by",
    asc: "Ascending",
    desc: "Descending",
    manufacturer: "Manufacturer",
    model: "Model",
    fuel: "Fuel",
    price: "Price (€)",
    year: "Year",
    mileageMax: "Max mileage (km)",
    ratingMin: "Min rating",
    all: "All",
    from: "From",
    to: "To",
    min: "Min",
    max: "Max",
    placeholder: {
      mileage: "e.g. 150000",
    },
    fuel_options: {
      petrol: "Petrol",
      diesel: "Diesel",
      electric: "Electric",
      hybrid: "Hybrid",
    },
    sort_options: {
      date: "Date listed",
      price: "Price",
      year: "Release year",
      mileage: "Mileage",
      manufacturer: "Manufacturer",
      rating: "Rating",
    },
  },
  card: {
    noImage: "No image",
    tooltip: {
      year: "Year",
      mileage: "Mileage",
      price: "Price",
      mileageMissing: "Not listed — suspicious",
      featuresBonus: "bonus · Features: {{count}}",
    },
  },
  pagination: {
    prev: "← Prev",
    next: "Next →",
    page: "Page {{current}} of {{total}}",
  },
  footer: {
    source: "Data sourced from",
    ownership: "All listings and content are the property of their respective owners.",
    disclaimer: "For informational purposes only — not affiliated with ss.lv",
  },
  cookies: {
    message: "We use cookies to save your language and theme preferences.",
    learnMore: "Learn more",
    accept: "Accept",
    decline: "Decline",
  },
  states: {
    loadError: "Failed to load listings",
    noResults: "No listings match your filters.",
    clearFilters: "Clear filters",
  },
} as const;

export default en;
