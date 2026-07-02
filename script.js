const deals = [
  { deal: "Retail media expansion", bu: "LMFR", platform: "AMS", stage: "strategy", maturity: "idea", owner: "Commerce", region: "EU", value: 120000 },
  { deal: "Marketplace analytics", bu: "LMBR", platform: "CCDP", stage: "Discovery", maturity: "poc", owner: "Marketplace", region: "EU", value: 85000 },
  { deal: "B2B portal renewal", bu: "LMPT", platform: "SCDP", stage: "delivery", maturity: "MVP", owner: "B2B", region: "CIS", value: 210000 },
  { deal: "Loyalty app", bu: "LMES", platform: "PDP", stage: "Launch", maturity: "scale & industrialisation", owner: "Customer", region: "EU", value: 145000 },
  { deal: "Supply forecast", bu: "LMPL", platform: "GTDP", stage: "product life", maturity: "run", owner: "Supply", region: "MENA", value: 320000 },
  { deal: "Partner API", bu: "BMFR", platform: "DP4P", stage: "Discovery", maturity: "poc", owner: "Partners", region: "EU", value: 76000 },
  { deal: "Store operations", bu: "LMIT", platform: "SDP (AHS)", stage: "delivery", maturity: "MVP", owner: "Store operations", region: "CIS", value: 98000 },
  { deal: "Customer 360", bu: "LMRO", platform: "Transversal", stage: "Launch", maturity: "scale & industrialisation", owner: "Customer", region: "MENA", value: 185000 },
  { deal: "Pricing engine", bu: "LMZA", platform: "No platform", stage: "strategy", maturity: "idea", owner: "Pricing", region: "EU", value: 132000 },
  { deal: "Checkout redesign", bu: "WDFR", platform: "PIDP", stage: "product life", maturity: "run", owner: "Commerce", region: "CIS", value: 265000 },
  { deal: "Field sales tablet", bu: "BMIT", platform: "HRDP", stage: "Discovery", maturity: "poc", owner: "Sales", region: "EU", value: 54000 },
  { deal: "Integration hub", bu: "OMPT", platform: "FPDP", stage: "sunset", maturity: "run", owner: "Integration", region: "MENA", value: 228000 },
];

const businessUnits = ["LMGR", "LMBR", "LMFR", "LMPL", "LMPT", "BMES", "LMRO", "LMZA", "BCIT", "Todomo", "BMPL", "LMIT", "BMIT", "BMFR", "WDFR", "LMES", "LMUA", "OMBR", "OMPT"];
const stages = ["strategy", "Discovery", "delivery", "Launch", "product life", "sunset"];
const maturities = ["idea", "poc", "MVP", "scale & industrialisation", "run"];
const platforms = ["CCDP", "SCDP", "PDP", "GTDP", "DP4P", "SDP (AHS)", "Transversal", "No platform", "AMS", "PIDP", "HRDP", "FPDP"];
const ownerColors = ["#126c83", "#cf5b3c", "#5c7a3e", "#5f6fa8", "#a15c38", "#2f6f64", "#8b5d91"];
const state = {
  view: "list",
  editingIndex: null,
  sortKey: "",
  sortDirection: "asc",
};

const elements = {
  buFilter: document.querySelector("#buFilter"),
  platformFilter: document.querySelector("#platformFilter"),
  stageFilter: document.querySelector("#stageFilter"),
  maturityFilter: document.querySelector("#maturityFilter"),
  ownerFilter: document.querySelector("#ownerFilter"),
  regionFilter: document.querySelector("#regionFilter"),
  minValueFilter: document.querySelector("#minValueFilter"),
  maxValueFilter: document.querySelector("#maxValueFilter"),
  searchInput: document.querySelector("#searchInput"),
  listViewButton: document.querySelector("#listViewButton"),
  chartViewButton: document.querySelector("#chartViewButton"),
  mapViewButton: document.querySelector("#mapViewButton"),
  resetButton: document.querySelector("#resetButton"),
  tableHead: document.querySelector("thead"),
  tableBody: document.querySelector("#tableBody"),
  chart: document.querySelector("#chart"),
  chartHint: document.querySelector("#chartHint"),
  maturityMap: document.querySelector("#maturityMap"),
  mapHint: document.querySelector("#mapHint"),
  totalValue: document.querySelector("#totalValue"),
  totalCount: document.querySelector("#totalCount"),
  listView: document.querySelector("#listView"),
  chartView: document.querySelector("#chartView"),
  mapView: document.querySelector("#mapView"),
  emptyState: document.querySelector("#emptyState"),
  addUseCaseButton: document.querySelector("#addUseCaseButton"),
  initiativeForm: document.querySelector("#initiativeForm"),
  buInput: document.querySelector("#buInput"),
  platformInput: document.querySelector("#platformInput"),
  stageInput: document.querySelector("#stageInput"),
  maturityInput: document.querySelector("#maturityInput"),
  submitUseCaseButton: document.querySelector("#submitUseCaseButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  csvInput: document.querySelector("#csvInput"),
  importStatus: document.querySelector("#importStatus"),
};

function uniqueValues(key) {
  return [...new Set(deals.map((deal) => deal[key]))].sort((a, b) => a.localeCompare(b));
}

function fillSelect(select, values, label = "All", selectedValue = "") {
  select.innerHTML = [
    `<option value="">${label}</option>`,
    ...values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`),
  ].join("");
  select.value = selectedValue;
}

function formatValue(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function refreshFilterOptions() {
  const selected = {
    bu: elements.buFilter.value,
    platform: elements.platformFilter.value,
    stage: elements.stageFilter.value,
    maturity: elements.maturityFilter.value,
    owner: elements.ownerFilter.value,
    region: elements.regionFilter.value,
  };

  fillSelect(elements.buFilter, businessUnits, "All", selected.bu);
  fillSelect(elements.platformFilter, platforms, "All", selected.platform);
  fillSelect(elements.stageFilter, stages, "All", selected.stage);
  fillSelect(elements.maturityFilter, maturities, "All", selected.maturity);
  fillSelect(elements.ownerFilter, uniqueValues("owner"), "All", selected.owner);
  fillSelect(elements.regionFilter, uniqueValues("region"), "All", selected.region);
  refreshBuInputOptions();
  refreshStageInputOptions();
  refreshMaturityInputOptions();
  refreshPlatformInputOptions();
}

function refreshBuInputOptions(selectedValue = "") {
  fillSelect(elements.buInput, businessUnits, "Select BU", selectedValue);
}

function refreshPlatformInputOptions(selectedValue = "") {
  fillSelect(elements.platformInput, platforms, "Select platform", selectedValue);
}

function refreshStageInputOptions(selectedValue = "") {
  fillSelect(elements.stageInput, stages, "Select lifecycle", selectedValue);
}

function refreshMaturityInputOptions(selectedValue = "") {
  fillSelect(elements.maturityInput, maturities, "Select maturity", selectedValue);
}

function getFilteredDeals() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const minValue = Number(elements.minValueFilter.value) || 0;
  const maxValue = Number(elements.maxValueFilter.value) || Infinity;

  return deals.filter((deal) => {
    const fieldValues = Object.values(deal).join(" ").toLowerCase();

    return (
      (!elements.buFilter.value || deal.bu === elements.buFilter.value) &&
      (!elements.platformFilter.value || deal.platform === elements.platformFilter.value) &&
      (!elements.stageFilter.value || deal.stage === elements.stageFilter.value) &&
      (!elements.maturityFilter.value || deal.maturity === elements.maturityFilter.value) &&
      (!elements.ownerFilter.value || deal.owner === elements.ownerFilter.value) &&
      (!elements.regionFilter.value || deal.region === elements.regionFilter.value) &&
      deal.value >= minValue &&
      deal.value <= maxValue &&
      (!query || fieldValues.includes(query))
    );
  });
}

function compareDeals(left, right, key) {
  if (key === "value") {
    return left.value - right.value;
  }

  return String(left[key] || "").localeCompare(String(right[key] || ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getSortedDeals(filteredDeals) {
  if (!state.sortKey) {
    return filteredDeals;
  }

  return [...filteredDeals].sort((left, right) => {
    const result = compareDeals(left, right, state.sortKey);
    return state.sortDirection === "asc" ? result : -result;
  });
}

function updateSortButtons() {
  document.querySelectorAll("[data-sort-key]").forEach((button) => {
    const isActive = button.dataset.sortKey === state.sortKey;
    button.classList.toggle("active", isActive);
    button.dataset.direction = isActive ? state.sortDirection : "";
    button.setAttribute("aria-sort", isActive ? (state.sortDirection === "asc" ? "ascending" : "descending") : "none");
  });
}

function renderTable(filteredDeals) {
  const sortedDeals = getSortedDeals(filteredDeals);

  updateSortButtons();
  elements.tableBody.innerHTML = sortedDeals
    .map(
      (deal) => `
        <tr>
          <td>${escapeHtml(deal.deal)}</td>
          <td>${escapeHtml(deal.bu)}</td>
          <td>${escapeHtml(deal.platform)}</td>
          <td><span class="stage-pill">${escapeHtml(deal.stage)}</span></td>
          <td><span class="stage-pill">${escapeHtml(deal.maturity)}</span></td>
          <td>${escapeHtml(deal.owner)}</td>
          <td>${escapeHtml(deal.region)}</td>
          <td class="numeric">${formatValue(deal.value)}</td>
          <td><button class="action-button" type="button" data-edit-index="${deals.indexOf(deal)}">Edit</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderChart(filteredDeals) {
  const totals = stages.map((stage) => ({
    stage,
    value: filteredDeals
      .filter((deal) => deal.stage === stage)
      .reduce((sum, deal) => sum + deal.value, 0),
  }));
  const max = Math.max(...totals.map((item) => item.value), 1);

  elements.chart.innerHTML = totals
    .map((item, index) => {
      const width = Math.max((item.value / max) * 100, item.value > 0 ? 3 : 0);
      const color = index % 3 === 0 ? "var(--accent)" : index % 3 === 1 ? "var(--accent-2)" : "var(--accent-3)";

      return `
        <div class="bar-row">
          <div class="bar-label">${item.stage}</div>
          <div class="bar-track">
            <div class="bar" style="width: ${width}%; background: ${color}"></div>
          </div>
          <div class="bar-value">${formatValue(item.value)}</div>
        </div>
      `;
    })
    .join("");
}

function renderMaturityMap(filteredDeals) {
  const owners = uniqueValues("owner");
  const maxValue = Math.max(...filteredDeals.map((deal) => deal.value), 1);
  const grouped = new Map();

  filteredDeals.forEach((deal) => {
    const key = [deal.deal, deal.owner, deal.maturity].join("|");
    const current = grouped.get(key) || {
      index: deals.indexOf(deal),
      deal: deal.deal,
      owner: deal.owner,
      stage: deal.stage,
      maturity: deal.maturity,
      value: 0,
      buSet: new Set(),
      regionSet: new Set(),
    };

    current.value = Math.max(current.value, deal.value || 0);
    current.buSet.add(deal.bu);
    current.regionSet.add(deal.region);
    grouped.set(key, current);
  });

  const bubbles = [...grouped.values()]
    .map((initiative, index) => {
      const ownerIndex = Math.max(owners.indexOf(initiative.owner), 0);
      const maturityIndex = Math.max(maturities.indexOf(initiative.maturity), 0);
      const valueRatio = initiative.value > 0 ? initiative.value / maxValue : 0;
      const x = 8 + valueRatio * 84;
      const y = 86 - (maturityIndex / Math.max(maturities.length - 1, 1)) * 72;
      const buCount = initiative.buSet.size;
      const size = Math.min(74, 42 + buCount * 8);
      const jitter = ((index % 5) - 2) * 1.6;
      const color = ownerColors[ownerIndex % ownerColors.length];
      const noValueClass = initiative.value > 0 ? "" : " no-value";

      return `
        <div
          class="bubble-point"
          style="--x: ${Math.min(94, Math.max(6, x + jitter))}%; --y: ${Math.min(90, Math.max(10, y - jitter))}%; --size: ${size}px; --bubble-color: ${color};"
        >
          <button
            class="maturity-bubble${noValueClass}"
            type="button"
            data-edit-index="${initiative.index}"
            aria-label="${escapeHtml(initiative.deal)}, ${formatValue(buCount)} BU, ${escapeHtml(initiative.owner)}"
            title="${escapeHtml(initiative.deal)} | ${escapeHtml(initiative.owner)} | ${escapeHtml(initiative.maturity)} | ${formatValue(initiative.value)} value"
          >
            ${formatValue(buCount)}
          </button>
          <span class="bubble-label">${escapeHtml(initiative.deal)}</span>
        </div>
      `;
    })
    .join("");

  const legend = owners
    .map(
      (owner, index) => `
        <span class="legend-item">
          <i style="background: ${ownerColors[index % ownerColors.length]}"></i>
          ${escapeHtml(owner)}
        </span>
      `,
    )
    .join("");

  const yTicks = maturities
    .map((maturity, index) => {
      const y = 86 - (index / Math.max(maturities.length - 1, 1)) * 72;
      return `<span class="maturity-tick" style="--y: ${y}%">${escapeHtml(maturity)}</span>`;
    })
    .join("");

  elements.maturityMap.innerHTML = `
    <div class="bubble-plot">
      <div class="axis-label y-axis">Maturite</div>
      <div class="axis-label x-axis">Value</div>
      <div class="plot-grid">
        ${yTicks}
        ${bubbles}
      </div>
      <div class="x-ticks">
        <span>No value</span>
        <span>${formatValue(Math.round(maxValue / 2))}</span>
        <span>${formatValue(maxValue)}</span>
      </div>
    </div>
    <div class="map-legend">
      ${legend}
      <span class="legend-item"><i class="outline-dot"></i>no value</span>
    </div>
  `;
}

function render() {
  const filteredDeals = getFilteredDeals();
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);

  elements.totalValue.textContent = formatValue(totalValue);
  elements.totalCount.textContent = formatValue(filteredDeals.length);
  elements.chartHint.textContent = `${formatValue(filteredDeals.length)} records`;
  elements.mapHint.textContent = `${formatValue(filteredDeals.length)} records`;

  renderTable(filteredDeals);
  renderChart(filteredDeals);
  renderMaturityMap(filteredDeals);

  const hasRows = filteredDeals.length > 0;
  elements.emptyState.classList.toggle("hidden", hasRows);
  elements.listView.classList.toggle("hidden", state.view !== "list" || !hasRows);
  elements.chartView.classList.toggle("hidden", state.view !== "chart" || !hasRows);
  elements.mapView.classList.toggle("hidden", state.view !== "map" || !hasRows);
}

function setView(view) {
  state.view = view;
  elements.listViewButton.classList.toggle("active", view === "list");
  elements.chartViewButton.classList.toggle("active", view === "chart");
  elements.mapViewButton.classList.toggle("active", view === "map");
  elements.listViewButton.setAttribute("aria-selected", String(view === "list"));
  elements.chartViewButton.setAttribute("aria-selected", String(view === "chart"));
  elements.mapViewButton.setAttribute("aria-selected", String(view === "map"));
  render();
}

function resetFilters() {
  [
    elements.buFilter,
    elements.platformFilter,
    elements.stageFilter,
    elements.maturityFilter,
    elements.ownerFilter,
    elements.regionFilter,
    elements.minValueFilter,
    elements.maxValueFilter,
    elements.searchInput,
  ].forEach((field) => {
    field.value = "";
  });
  state.sortKey = "";
  state.sortDirection = "asc";
  render();
}

function handleSortClick(event) {
  const sortButton = event.target.closest("[data-sort-key]");

  if (!sortButton) {
    return;
  }

  const nextSortKey = sortButton.dataset.sortKey;

  if (state.sortKey === nextSortKey) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = nextSortKey;
    state.sortDirection = "asc";
  }

  render();
}

function normalizeDeal(rawDeal) {
  const deal = {
    deal: String(rawDeal.deal || "").trim(),
    bu: String(rawDeal.bu || "").trim(),
    platform: String(rawDeal.platform || "").trim(),
    stage: String(rawDeal.stage || "").trim(),
    maturity: String(rawDeal.maturity || "").trim(),
    owner: String(rawDeal.owner || rawDeal.domain || rawDeal.owning_domain || "").trim(),
    region: String(rawDeal.region || "").trim(),
    value: Number(String(rawDeal.value || "").replace(/[^\d.-]/g, "")),
  };

  if (
    !deal.deal ||
    !deal.bu ||
    !deal.platform ||
    !deal.stage ||
    !deal.maturity ||
    !deal.owner ||
    !deal.region ||
    !Number.isFinite(deal.value)
  ) {
    return null;
  }

  if (!stages.includes(deal.stage)) {
    stages.push(deal.stage);
  }

  if (!maturities.includes(deal.maturity)) {
    maturities.push(deal.maturity);
  }

  if (!platforms.includes(deal.platform)) {
    platforms.push(deal.platform);
  }

  if (!businessUnits.includes(deal.bu)) {
    businessUnits.push(deal.bu);
  }

  return deal;
}

function addDeals(newDeals) {
  if (!newDeals.length) {
    elements.importStatus.textContent = "No valid use cases found.";
    return;
  }

  deals.push(...newDeals);
  refreshFilterOptions();
  render();
  elements.importStatus.textContent = `${formatValue(newDeals.length)} use case${newDeals.length === 1 ? "" : "s"} added.`;
}

function showManualForm() {
  state.editingIndex = null;
  elements.initiativeForm.classList.remove("hidden");
  elements.initiativeForm.reset();
  elements.submitUseCaseButton.textContent = "Save use case";
  elements.importStatus.textContent = "";
  elements.initiativeForm.querySelector("#dealInput").focus();
}

function hideEntryForm() {
  state.editingIndex = null;
  elements.initiativeForm.classList.add("hidden");
  elements.initiativeForm.reset();
  elements.submitUseCaseButton.textContent = "Save use case";
}

function populateForm(deal) {
  elements.initiativeForm.elements.deal.value = deal.deal;
  refreshBuInputOptions(deal.bu);
  refreshPlatformInputOptions(deal.platform);
  refreshStageInputOptions(deal.stage);
  refreshMaturityInputOptions(deal.maturity);
  elements.initiativeForm.elements.owner.value = deal.owner;
  elements.initiativeForm.elements.region.value = deal.region;
  elements.initiativeForm.elements.value.value = deal.value;
}

function startEdit(index) {
  const deal = deals[index];

  if (!deal) {
    return;
  }

  state.editingIndex = index;
  elements.initiativeForm.classList.remove("hidden");
  elements.submitUseCaseButton.textContent = "Update use case";
  elements.importStatus.textContent = "Editing selected use case.";
  populateForm(deal);
  elements.initiativeForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
}

function parseCsv(text) {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine);

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) => header.toLowerCase());
  const aliases = {
    usecase: "deal",
    "use case": "deal",
    initiative: "deal",
    businessunit: "bu",
    "business unit": "bu",
    owning_bu: "bu",
    owningbu: "bu",
    owning_platform: "platform",
    owningplatform: "platform",
    platform: "platform",
    domain: "owner",
    owning_domain: "owner",
    owningdomain: "owner",
    owner_domain: "owner",
    ownerdomain: "owner",
    owner: "owner",
    lifecycle: "stage",
    stage: "stage",
    maturite: "maturity",
    maturité: "maturity",
  };

  return rows
    .slice(1)
    .map((row) => {
      const rawDeal = {};
      headers.forEach((header, index) => {
        const normalizedHeader = aliases[header] || header;
        rawDeal[normalizedHeader] = row[index] || "";
      });
      return normalizeDeal(rawDeal);
    })
    .filter(Boolean);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.initiativeForm);
  const newDeal = normalizeDeal(Object.fromEntries(formData.entries()));

  if (!newDeal) {
    elements.importStatus.textContent = "Fill in all fields before adding a use case.";
    return;
  }

  if (state.editingIndex !== null) {
    deals[state.editingIndex] = newDeal;
    state.editingIndex = null;
    refreshFilterOptions();
    render();
    elements.importStatus.textContent = "Use case updated.";
  } else {
    addDeals([newDeal]);
  }

  elements.initiativeForm.reset();
  elements.initiativeForm.classList.add("hidden");
}

function handleCsvImport(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const importedDeals = parseCsv(String(reader.result || ""));
    addDeals(importedDeals);
    elements.csvInput.value = "";
  });
  reader.readAsText(file);
}

function init() {
  refreshFilterOptions();

  [
    elements.buFilter,
    elements.platformFilter,
    elements.stageFilter,
    elements.maturityFilter,
    elements.ownerFilter,
    elements.regionFilter,
    elements.minValueFilter,
    elements.maxValueFilter,
    elements.searchInput,
  ].forEach((field) => field.addEventListener("input", render));

  elements.listViewButton.addEventListener("click", () => setView("list"));
  elements.chartViewButton.addEventListener("click", () => setView("chart"));
  elements.mapViewButton.addEventListener("click", () => setView("map"));
  elements.resetButton.addEventListener("click", resetFilters);
  elements.tableHead.addEventListener("click", handleSortClick);
  elements.addUseCaseButton.addEventListener("click", showManualForm);
  elements.cancelEditButton.addEventListener("click", hideEntryForm);
  elements.initiativeForm.addEventListener("submit", handleFormSubmit);
  elements.csvInput.addEventListener("change", handleCsvImport);
  elements.tableBody.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-index]");

    if (editButton) {
      startEdit(Number(editButton.dataset.editIndex));
    }
  });
  elements.maturityMap.addEventListener("click", (event) => {
    const bubbleButton = event.target.closest("[data-edit-index]");

    if (bubbleButton) {
      startEdit(Number(bubbleButton.dataset.editIndex));
    }
  });

  render();
}

init();
