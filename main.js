// @ts-check
import { day1a, day1b } from "./day1.js";
import { day2a, day2b } from "./day2.js";
import { day3a, day3b } from "./day3.js";
import { day4a } from "./day4.js";

/**
 * @param {string} id 
 * @returns {HTMLElement}
 */
function requireElementById(id) {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error("Can't find #" + id);
    }
    return element;
}

const navSelectorForm = requireElementById("nav-list");
const inputDiv = requireElementById('input');
const inputText = requireElementById('input-text');
const outputDiv = requireElementById('output');
const runButton = requireElementById('run-button');


/**
 * @typedef {Object} NavItem
 * @property {string} name
 * @property {string} default_input
 * @property {function()} run_func
 * @property {function()[]} tests
 * 
 * @type {NavItem[]}
 */
const navItems = {
    "day1a": day1a,
    "day1b": day1b,
    "day2a": day2a,
    "day2b": day2b,
    "day3a": day3a,
    "day3b": day3b,
    "day4a": day4a,
};

function getSelectedNavItem() {
    let selectedItem = document.querySelector('input[name="day"]:checked');
    if (selectedItem === null || !(selectedItem instanceof HTMLInputElement)) {
        return "";
    }
    return selectedItem.value;
}

/**
 * @param {HTMLElement} form
 * @param {string} value 
 * @param {string} display 
 */
function addNavRadioButton(form, value, display) {
    // Create a container element
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'nav-item');

    // Create <input> element
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', 'day');
    inputElement.setAttribute('value', value);
    inputElement.setAttribute('id', value);

    // Create <label> element
    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', value);
    labelElement.innerText = display;

    // Wire everything together
    pElement.appendChild(inputElement);
    pElement.appendChild(labelElement);
    form.appendChild(pElement);
}

// Set up left nav list
for (const navItem in navItems) {
    addNavRadioButton(navSelectorForm, navItem, navItems[navItem].name);
}

// Set up event handlers
navSelectorForm.addEventListener('change', function (event) {
    if (event.target == null || !(event.target instanceof HTMLInputElement)) {
        return;
    }
    if (event.target.type == 'radio' && event.target.name == 'day') {
        const navItem = navItems[event.target.value];
        inputText.value = navItem.default_input;
    }
});

runButton.addEventListener('click', function (event) {
    const selectedItem = getSelectedNavItem();
    if (!(selectedItem in navItems)) {
        return;
    }
    const navItem = navItems[selectedItem];
    navItem.run_func(inputText.value, outputDiv);
});

// Run tests
for (const navItem in navItems) {
    for (const test_func of navItems[navItem].tests) {
        const func_name = test_func.name;
        console.log(`Running test: ${func_name}`);
        test_func();
    }
}