const $ = require('jquery');
const appRoot = $('#app');

function randInt(low_damage, high_damage) {
    return low_damage + Math.floor(Math.random() * (high_damage - low_damage));
}

function Gladiator(name, health, rage, low_damage, high_damage) {
    return {
        name: name,
        health: health,
        rage: rage,
        low_damage: low_damage,
        high_damage: high_damage
    };
}

const STATE = {
    gladiator_1: Gladiator(
        $('#glad-1-input').val(),
        150,
        0,
        randInt(0, 15),
        randInt(15, 25)
    ),
    gladiator_2: Gladiator(
        $('#glad-2-input').val(),
        150,
        0,
        randInt(0, 15),
        randInt(15, 25)
    ),
    turn: 1
};

//punch function
function punch(attacker, defender) {
    const d = randInt(attacker.low_damage, attacker.high_damage);
    const randomNumber = randInt(1, 100);
    if (randInt(1, 100) <= attacker.rage) {
        defender.health -= d * 2;
        attacker.rage = 0;
    } else {
        defender.health -= d;
        attacker.rage += 15;
    }
}

//sacraficial stare
function sacraficialStare(attacker, defender) {
    attacker.health -= 25;
    defender.health -= 30;
}

//super kick
function mega_kick(attacker, defender) {
    attacker.rage == 0;
    defender.health -= 50;
}

//Heal function
function heal(gladiator) {
    if (gladiator.rage >= 10) {
        gladiator.rage = max(gladiator.rage - 10, 0);
        gladiator.health = min(gladiator.health + 5, 100);
    }
}

//gladiator is dead function
function isDead(gladiator) {
    if (gladiator.health <= 0) {
        return true;
    }
    return false;
}

//skip turn function
function skip_turn(gladiator) {
    gladiator.rage += 30;
}

function view() {
    return [
        '<button id="attack">Attack</button>',
        '<button id="heal">Heal</button>'
    ];
    draw();
}

function attachHandlers() {
    $('#attack').click(function() {
        this.attack;
        draw();
    });
    $('heal').click(function() {
        this.heal;
        draw();
    });
}

function draw() {
    appRoot.html(view());
    attachHandlers();
}

function main() {
    draw();
}

$(main);
