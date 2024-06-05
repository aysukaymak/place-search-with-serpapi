import { getJson } from "serpapi";

getJson({
  engine: "google_maps",
  q: "pizza",
  ll: "@40.7455096,-74.0083012,15.1z",
  type: "search",
  api_key: "c8ee9205d74b180c569192152996a97e89b34333ecbfd52556b325edfcce1f5a"
}, (json) => {
  console.log(json["local_results"]);
});
