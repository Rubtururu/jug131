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
let prestigeUpgradeCost = 100000; // Ajustado según las instrucciones
let characterLevel = 1;
let characterExperience = 0;
let characterExperienceNeeded = 100;
let totalUpgrades = 0;
let houseCost = 500;
let idleGold = 0;
let unlockedCharacters = 0; // Contador de personajes desbloqueados

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
const characterLevelElement = document.getElementById('character-level');
const characterExperienceElement = document.getElementById('character-experience');
const characterExperienceNeededElement = document.getElementById('character-experience-needed');
const totalUpgradesElement = document.getElementById('total-upgrades');
const buyHouseButton = document.getElementById('buy-house-button');
const houseCostElement = document.getElementById('house-cost');
const rankingList = document.getElementById('ranking-list');
const clickPowerLevelElement = document.getElementById('click-power-level');
const autoClickerLevelElement = document.getElementById('auto-clicker-level');
const idleGoldElement = document.getElementById('idle-gold');
const newCharactersList = document.getElementById('characters-list'); // Nuevo elemento para la lista de personajes

// Función para formatear números en formato abreviado (K, M, B, T)
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
}

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
            autoClickerLevel = 1; // Aseguramos que al comprar el primer auto-clicker sea nivel 1
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
    if (clickCount >= 100000) { // Requerimiento de prestigio cambiado a 100000
        clickCount = 0;
        clickPower = 1;
        clickPowerLevel = 1;
        upgradeCost = 10;
        autoClickerPower = 1;
        autoClickerLevel = 0;
        autoClickerCost = 50;
        autoClickerActive = false;
        prestigePoints++;
        characterLevel = 1;
        characterExperience = 0;
        characterExperienceNeeded = 100;
        totalUpgrades = 0;
        unlockedCharacters++; // Incrementa el contador de personajes desbloqueados
        updateClickCount();
        updateUpgradeCost();
        updateAutoClickerCost();
        updatePrestigePoints();
        prestigeInfo.style.display = 'block';
        autoClickerButton.disabled = false;

        // Desbloquear nuevo personaje si hay disponibles
        unlockNewCharacter();

        // Actualizar la lista de personajes
        updateCharactersList();
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

// Función para desbloquear un nuevo personaje
function unlockNewCharacter() {
    // Aquí puedes definir la lógica para desbloquear nuevos personajes con cada prestigio
    // Por ejemplo, podrías tener un array de objetos con características de cada personaje
    // y usar el contador unlockedCharacters para determinar cuál desbloquear
}

// Función para actualizar la lista de personajes en el HTML
function updateCharactersList() {
    // Aquí actualizas dinámicamente la lista de personajes en el HTML
    // Puedes usar innerHTML o createElement para agregar nuevos elementos a characters-list
}

// Funciones de actualización para diversos elementos
function updateClickCount() {
    clickCountElement.textContent = formatNumber(clickCount);
    totalClicksElement.textContent = formatNumber(totalClicks);
    characterExperienceElement.textContent = formatNumber(characterExperience);
    characterExperienceNeededElement.textContent = formatNumber(Math.ceil(characterExperienceNeeded)); // Redondea la experiencia necesaria
}

function updateUpgradeCost() {
    upgradeCostElement.textContent = formatNumber(upgradeCost);
}

function updateAutoClickerCost() {
    autoClickerCostElement.textContent = formatNumber(autoClickerCost);
}

function updatePrestigePoints() {
    prestigePointsElement.textContent = formatNumber(prestigePoints);
}

function updatePrestigeUpgradeCost() {
    prestigeUpgradeCostElement.textContent = formatNumber(prestigeUpgradeCost);
}

function updateTotalUpgrades() {
    totalUpgradesElement.textContent = formatNumber(totalUpgrades);
}

function updateHouseCost() {
    houseCostElement.textContent = formatNumber(houseCost);
}

function updateClickPowerLevel() {
    clickPowerLevelElement.textContent = clickPowerLevel;
}

function updateAutoClickerLevel() {
    autoClickerLevelElement.textContent = autoClickerLevel;
}

// Variables globales y estado del juego (como se tenía antes)

// Función para guardar la partida
function saveGame() {
    let gameData = {
        clickCount: clickCount,
        totalClicks: totalClicks,
        clickPower: clickPower,
        clickPowerLevel: clickPowerLevel,
        upgradeCost: upgradeCost,
        autoClickerCost: autoClickerCost,
        autoClickerLevel: autoClickerLevel,
        autoClickerPower: autoClickerPower,
        autoClickerActive: autoClickerActive,
        prestigePoints: prestigePoints,
        prestigeUpgradeCost: prestigeUpgradeCost,
        characterLevel: characterLevel,
        characterExperience: characterExperience,
        characterExperienceNeeded: characterExperienceNeeded,
        totalUpgrades: totalUpgrades,
        houseCost: houseCost,
        idleGold: idleGold,
        charactersUnlocked: charactersUnlocked  // Asegúrate de incluir cualquier otra variable relevante
    };

    localStorage.setItem('idleClickerGameData', JSON.stringify(gameData));
    console.log('Game saved.');
}

// Función para cargar la partida guardada
function loadGame() {
    let savedGameData = JSON.parse(localStorage.getItem('idleClickerGameData'));

    if (savedGameData) {
        clickCount = savedGameData.clickCount;
        totalClicks = savedGameData.totalClicks;
        clickPower = savedGameData.clickPower;
        clickPowerLevel = savedGameData.clickPowerLevel;
        upgradeCost = savedGameData.upgradeCost;
        autoClickerCost = savedGameData.autoClickerCost;
        autoClickerLevel = savedGameData.autoClickerLevel;
        autoClickerPower = savedGameData.autoClickerPower;
        autoClickerActive = savedGameData.autoClickerActive;
        prestigePoints = savedGameData.prestigePoints;
        prestigeUpgradeCost = savedGameData.prestigeUpgradeCost;
        characterLevel = savedGameData.characterLevel;
        characterExperience = savedGameData.characterExperience;
        characterExperienceNeeded = savedGameData.characterExperienceNeeded;
        totalUpgrades = savedGameData.totalUpgrades;
        houseCost = savedGameData.houseCost;
        idleGold = savedGameData.idleGold;
        charactersUnlocked = savedGameData.charactersUnlocked;

        // Actualizar la interfaz con los datos cargados
        updateClickCount();
        updateUpgradeCost();
        updateAutoClickerCost();
        updateAutoClickerLevel();
        updatePrestigePoints();
        updatePrestigeUpgradeCost();
        updateCharacterLevel();
        updateTotalUpgrades();
        updateHouseCost();
        updateIdleGold();

        console.log('Game loaded.');
    } else {
        console.log('No saved game data found.');
    }
}

// Evento para guardar la partida cuando sea necesario, por ejemplo al cerrar la página
window.addEventListener('beforeunload', saveGame);

// Evento para cargar la partida al cargar la página
window.addEventListener('load', loadGame);


// Actualizaciones iniciales
updateClickCount();
updateUpgradeCost();
updateAutoClickerCost();
updatePrestigePoints();
updatePrestigeUpgradeCost();
updateCharacterLevel();
updateTotalUpgrades();
updateHouseCost();
updateClickPowerLevel();
updateAutoClickerLevel();

