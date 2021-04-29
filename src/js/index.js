import "bootstrap";
import "../sass/style.scss";
import { routes } from "./routes";
import { PageList } from "./PageList";


var pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  
  
  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());


let btnSearch = document.getElementById("btnSearch").addEventListener("click", PageList);

let backHome = document.getElementById("title-home").addEventListener("click", PageList);
