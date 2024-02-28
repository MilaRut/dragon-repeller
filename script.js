let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["прутик"];

const body = document.querySelector('body');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'прутик', power: 5 },
  { name: 'кинжал', power: 30 },
  { name: 'двойной топор', power: 50 },
  { name: 'меч с огромным хуищем', power: 100 }
];
const monsters = [
  {
    name: "гигантский слизень",
    level: 2,
    health: 15
  },
  {
    name: "клыкастый монстр",
    level: 8,
    health: 60
  },
  {
    name: "дракон",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    image: "url('./img/square.jpg')",
    "button text": ["В лавку", "В пещеру", "Бить дракона!"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Ты находишься на городской площади. Ты видишь вывеску \"Лавка\"."
  },
  {
    name: "store",
    image: "url('./img/store.jpg')",
    "button text": ["Купить 10 здоровья (10 монет)", "Купить оружие (30 монет)", "Идти на площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ты зашел в лавку."
  },
  {
    name: "cave",
    image: "url('./img/cave.jpg')",
    "button text": ["Бить слизня", "Бить клыкастого монстра", "Идти на площадь"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Ты зашел в пещеру. Фу, чем тут воняет? Ты видишь несколько монстров."
  },
  {
    name: "fight",
    image: ["url('./img/slime.jpg')", "url('./img/beast.jpg')","url('./img/dragon.jpg')"],
    "button text": ["Атаковать", "Уклониться", "Сбежать (позорно)"],
    "button functions": [attack, dodge, goTown],
    text: "Битва с монстром началась."
  },
  {
    name: "kill monster",
    image: "url('./img/cave.jpg')",
    "button text": ["Идти на площадь", "Идти на площадь", "Идти на площадь"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Монстр заорал "Аргх!" и помер. Ты заработал очки опыта и нашел голду.'
  },
  {
    name: "lose",
    image: "url('./img/lose.jpg')",
    "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"],
    "button functions": [restart, restart, restart],
    text: "Ты мертв (лох). &#x2620;"
  },
  { 
    name: "win", 
    image: "url('./img/win.jpg')",
    "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"], 
    "button functions": [restart, restart, restart], 
    text: "Ты сразил дракона! ТЫ ПОБЕДИЛ В ИГРЕ! Красава! &#x1F389;" 
  },
  {
    name: "easter egg",
    image: "url('./img/easter-egg.jpg')",
    "button text": ["2", "8", "Забить и идти на площадь"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Ты нашел секретную игру. Выбери число сверху. Случайным образом будут выбраны десять чисел от 0 до 10. Если выбранное тобой число совпадает с одним из случайных чисел, ты выиграешь!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  body.style.backgroundImage = locations[0].image;
  update(locations[0]);
}

function goStore() {
  body.style.backgroundImage = locations[1].image;
  update(locations[1]);
}

function goCave() {
  body.style.backgroundImage = locations[2].image;
  update(locations[2]);
}

function buyHealth() {
  body.style.backgroundImage = 'url("./img/health.jpg")';
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У тебя недостаточно денег, чтобы купить здоровье, нищеброд.";
  }
}

function buyWeapon() {
  body.style.backgroundImage = 'url("./img/weapon.jpg")';
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Теперь у тебя есть " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " У тебя в инвентаре: " + inventory;
    } else {
      text.innerText = "У тебя недостаточно денег, чтобы купить оружие, нищеброд.";
    }
  } else {
    text.innerText = "У тебя уже и так самое мощное оружие, что тебе еще надо, собака сутулая!";
    button2.innerText = "Продать оружие за 15 голды";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ты продал " + currentWeapon + ".";
    text.innerText += " У тебя в инвентаре: " + inventory;
  } else {
    text.innerText = "Не продавай свое единственное оружие, ты чо!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  body.style.backgroundImage = locations[3].image[fighting];
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " атакуе.";
  text.innerText += " Ты взял свой " + weapons[currentWeapon].name + " и атакуешь.";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Ты промазал (лох).";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Твой " + inventory.pop() + " сломался.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Ты уклонился. " + monsters[fighting].name + " не нанес тебе урона.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  body.style.backgroundImage = locations[5].image;
  update(locations[5]);
}

function winGame() {
  body.style.backgroundImage = locations[6].image;
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["прутик"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  body.style.backgroundImage = locations[7].image;
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Ты выбрал " + guess + ". Вот рандомные номера:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + " ";
  }
  if (numbers.includes(guess)) {
    text.innerText += "\nУгадал! Ты выиграл 20 голды!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "\nНе угадал (лох)! Потеряй 10 здоровья!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}