// Publication tag filtering adapted from w-r-s/academic-homepage-template.
const filters = document.querySelector(".tag-filter");
const publications = document.querySelectorAll("#paper-list [data-tags]");

function showCategory(tag) {
  for (const button of filters.querySelectorAll("[data-tag]")) {
    button.setAttribute("aria-pressed", String(button.dataset.tag === tag));
  }
  for (const publication of publications) {
    publication.hidden = !publication.dataset.tags.split(",").includes(tag);
  }
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tag]");
  if (button) showCategory(button.dataset.tag);
});
filters.hidden = false;
showCategory("conference");

// Retain the reader's section and publication filter when switching editions.
const languageSwitch = document.querySelector("[data-lang-switch]");
const currentTag = new URLSearchParams(location.search).get("papers");
if (currentTag === "report") showCategory("report");
languageSwitch.addEventListener("click", () => {
  const destination = new URL(languageSwitch.getAttribute("href"), location.href);
  const reportSelected = filters.querySelector('[data-tag="report"]').getAttribute("aria-pressed") === "true";
  if (reportSelected) destination.searchParams.set("papers", "report");
  else destination.searchParams.delete("papers");
  destination.hash = location.hash;
  languageSwitch.href = destination.href;
});
