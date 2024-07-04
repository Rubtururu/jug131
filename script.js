// script.js

let clickCount = 0;
let totalClicks = 0;
let clickPower = 1;
let clickPowerLevel = 1;
let upgradeCost = 10;
let autoClickerCost = 50;
let autoClickerLevel = 0;
let autoClickerPower = 1;
let autoClickerActive = false;
let prestigePoints = 0;
let prestigeUpgradeCost = 5;
let hamsterLevel = 1;
let characterLevel = 1;
let characterExperience = 0;
let characterExperienceNeeded = 100;
let totalUpgrades = 0;
let houseCost = 500;

// Elementos del DOM
const clickCountElement = document.getElementById('click-count');
const totalClicksElement = document.getElementById('total-clicks');
const upgradeButton = document.getElementById('upgrade-button');
const autoClickerButton = document.getElementById('auto-clicker-button');
const prestigeButton = document.getElementById('prestige-button');
const prestigeInfo = document.getElementById('prestige-info');
const prestigePointsElement = document.getElementById('prestige-points');
const prestigeUpgradeButton = document.getElementById('prestige-upgrade-button');
const upgradeCostElement = document.getElementById('upgrade-cost');
const autoClickerCostElement = document.getElementById('auto-clicker-cost');
const prestigeUpgradeCostElement = document.getElementById('prestige-upgrade-cost');
const clickArea = document.getElementById('click-area');
const hamsterLevelElement = document.getElementById('hamster-level');
const characterLevelElement = document.getElementById('character-level');
const characterExperienceElement = document.getElementById('character-experience');
const characterExperienceNeededElement = document.getElementById('character-experience-needed');
const totalUpgradesElement = document.getElementById('total-upgrades');
const buyHouseButton = document.getElementById('buy-house-button');
const houseCostElement = document.getElementById('house-cost');
const rankingList = document.getElementById('ranking-list');
const clickPowerLevelElement = document.getElementById('click-power-level');
const autoClickerLevelElement = document.getElementById('auto-clicker-level');

// Evento de clic en el área de clic
clickArea.addEventListener('click', () => {
    clickCount += clickPower;
    totalClicks += clickPower;
    characterExperience += clickPower;
    levelUpCharacter();
    updateClickCount();
});

// Evento de clic para mejorar el poder de clic
upgradeButton.addEventListener('click', () => {
    if (clickCount >= upgradeCost) {
        clickCount -= upgradeCost;
        clickPower++;
        clickPowerLevel++;
        upgradeCost = Math.ceil(upgradeCost * 1.5);
        totalUpgrades++;
        updateClickCount();
        updateUpgradeCost();
        updateTotalUpgrades();
        updateClickPowerLevel();
    }
});

// Evento de clic para comprar o mejorar el auto-clicker
autoClickerButton.addEventListener('click', () => {
    if (clickCount >= autoClickerCost) {
        clickCount -= autoClickerCost;
        if (!autoClickerActive) {
            autoClickerActive = true;
            setInterval(() => {
                clickCount += autoClickerPower;
                totalClicks += autoClickerPower;
                characterExperience += autoClickerPower;
                levelUpCharacter();
                updateClickCount();
            }, 1000);
        } else {
            autoClickerPower++;
            autoClickerLevel++;
            autoClickerCost = Math.ceil(autoClickerCost * 1.5);
        }
        updateClickCount();
        updateAutoClickerCost();
        updateAutoClickerLevel();
    }
});

// Evento de clic para prestigiar
prestigeButton.addEventListener('click', () => {
    if (clickCount >= 1000) {
        clickCount = 0;
        clickPower = 1;
        clickPowerLevel = 1;
        upgradeCost = 10;
        autoClickerPower = 1;
        autoClickerLevel = 0;
        autoClickerCost = 50;
        autoClickerActive = false;
        prestigePoints++;
        hamsterLevel = 1;
        characterLevel = 1;
        characterExperience = 0;
        characterExperienceNeeded = 100;
        totalUpgrades = 0;
        updateClickCount();
        updateUpgradeCost();
        updateAutoClickerCost();
        updatePrestigePoints();
        prestigeInfo.style.display = 'block';
        autoClickerButton.disabled = false;
    }
});

// Evento de clic para mejoras de prestigio
prestigeUpgradeButton.addEventListener('click', () => {
    if (prestigePoints >= prestigeUpgradeCost) {
        prestigePoints -= prestigeUpgradeCost;
        clickPower *= 2;
        prestigeUpgradeCost *= 2;
        updatePrestigePoints();
        updatePrestigeUpgradeCost();
    }
});

// Evento de clic para comprar casas
buyHouseButton.addEventListener('click', () => {
    if (clickCount >= houseCost) {
        clickCount -= houseCost;
        houseCost *= 2;
        updateClickCount();
        updateHouseCost();
    }
});

// Función para subir de nivel al personaje
function levelUpCharacter() {
    if (characterExperience >= characterExperienceNeeded) {
        characterExperience -= characterExperienceNeeded;
        characterLevel++;
        characterExperienceNeeded *= 1.5;
        updateCharacterLevel();
    }
}

// Funciones de actualización para diversos elementos
function updateClickCount() {
    clickCountElement.textContent = clickCount;
    totalClicksElement.textContent = totalClicks;
    characterExperienceElement.textContent = characterExperience;
    characterExperienceNeededElement.textContent = characterExperienceNeeded;
}

function updateUpgradeCost() {
    upgradeCostElement.textContent = upgradeCost;
}

function updateAutoClickerCost() {
    autoClickerCostElement.textContent = autoClickerCost;
}

function updatePrestigePoints() {
    prestigePointsElement.textContent = prestigePoints;
}

function updatePrestigeUpgradeCost() {
    prestigeUpgradeCostElement.textContent = prestigeUpgradeCost;
}

function updateHamsterLevel() {
    hamsterLevelElement.textContent = hamsterLevel;
}

function updateCharacterLevel() {
    characterLevelElement.textContent = characterLevel;
}

function updateTotalUpgrades() {
    totalUpgradesElement.textContent = totalUpgrades;
}

function updateHouseCost() {
    houseCostElement.textContent = houseCost;
}

function updateClickPowerLevel() {
    clickPowerLevelElement.textContent = clickPowerLevel;
}

function updateAutoClickerLevel() {
    autoClickerLevelElement.textContent = autoClickerLevel;
}

// Actualizaciones iniciales
updateClickCount();
updateUpgradeCost();
updateAutoClickerCost();
updatePrestigePoints();
updatePrestigeUpgradeCost();
updateHamsterLevel();
updateCharacterLevel();
updateTotalUpgrades();
updateHouseCost();
updateClickPowerLevel();
updateAutoClickerLevel();

const gameMusic = document.getElementById('game-music');

// Pausar la música
function pauseGameMusic() {
    gameMusic.pause();
}

// Reanudar la música
function playGameMusic() {
    gameMusic.play();
}
