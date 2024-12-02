import { day1, test1 } from "./day1.js";

const appDivElement = document.getElementById("app");

const navItems = [
    { name: "Day 1a", func: () => day1() }
];

const navUlElement = document.getElementById("nav-list");
for (const item of navItems) {
    let itemElement = document.createElement('li');
    itemElement.textContent = item.name;
    itemElement.addEventListener('click', item.func);
    navUlElement.appendChild(itemElement);
}

test1();
