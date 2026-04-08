const lv = {
  header: {
    listings: "{{count}} sludinājumi",
  },
  filters: {
    title: "Filtri",
    active: "aktīvs",
    clear: "Notīrīt",
    sortBy: "Kārtot pēc",
    asc: "Augoši",
    desc: "Dilstoši",
    manufacturer: "Ražotājs",
    fuel: "Degviela",
    price: "Cena (€)",
    year: "Gads",
    mileageMax: "Maks. nobraukums (km)",
    all: "Visi",
    from: "No",
    to: "Līdz",
    min: "Min",
    max: "Maks",
    placeholder: {
      mileage: "piem. 150000",
    },
    fuel_options: {
      petrol: "Benzīns",
      diesel: "Dīzelis",
      electric: "Elektro",
      hybrid: "Hibrīds",
    },
    sort_options: {
      date: "Datums",
      price: "Cena",
      year: "Izlaiduma gads",
      mileage: "Nobraukums",
      manufacturer: "Ražotājs",
    },
  },
  card: {
    noImage: "Nav attēla",
  },
  pagination: {
    prev: "← Iepriekšējā",
    next: "Nākamā →",
    page: "Lapa {{current}} no {{total}}",
  },
  footer: {
    source: "Dati iegūti no",
    ownership: "Visi sludinājumi un saturs pieder to attiecīgajiem īpašniekiem.",
    disclaimer: "Tikai informatīviem nolūkiem — nav saistīts ar ss.lv",
  },
  states: {
    loadError: "Neizdevās ielādēt sludinājumus",
    noResults: "Neviens sludinājums neatbilst filtriem.",
    clearFilters: "Notīrīt filtrus",
  },
} as const;

export default lv;
