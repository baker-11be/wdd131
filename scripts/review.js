const reviewCountElement = document.getElementById("reviewCount");
const reviewStorageKey = "wdd131-review-count";
const params = new URLSearchParams(window.location.search);
const hasSubmissionData =
  params.has("productName") &&
  params.has("overallRating") &&
  params.has("installDate");

let currentCount = Number.parseInt(localStorage.getItem(reviewStorageKey), 10);

if (Number.isNaN(currentCount)) {
  currentCount = 0;
}

if (hasSubmissionData) {
  currentCount += 1;
  localStorage.setItem(reviewStorageKey, String(currentCount));
}

if (reviewCountElement) {
  reviewCountElement.textContent = String(currentCount);
}
