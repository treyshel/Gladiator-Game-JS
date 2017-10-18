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

//skip turn function
function skip_turn(gladiator) {
    gladiator.rage += 30;
}

//transform function
function transform(gladiator) {
    (gladiator.high_damage && gladiator.low_damage) + 25;
}

//gladiator is dead function
function isDead(gladiator) {
    if (gladiator.health <= 0) {
        return true;
    }
    return false;
}

//show gladiator helper
function setupGladiator(gladiator) {
    return (
        '-|-' +
        'Gladiator ' +
        gladiator.name +
        '-|-' +
        '-|-' +
        gladiator.health +
        ' Health' +
        '-|-' +
        gladiator.rage +
        ' Rage' +
        '-|-' +
        gladiator.low_damage +
        ' Low Damage' +
        '-|-' +
        gladiator.high_damage +
        ' High Damage' +
        '-|-'
    );
}

//show gladiator 1 && 2
function showGladiator1(gladiator) {
    var glad = setupGladiator(gladiator);
    $('#glad_1').html(glad);
}

function showGladiator2(gladiator) {
    var glad = setupGladiator(gladiator);
    $('#glad_2').html(glad);
}

function view() {
    return [
        '<br><br><button id="punch" style="font-size:18px;height:50px;width:100px">Punch</button>&nbsp;&nbsp;',
        '<button id="heal" style="font-size:18px;height:50px;width:100px">Heal</button>&nbsp;&nbsp;',
        '<button id="stare" style="font-size:18px;height:50px;width:100px">Stare</button><br><br>',
        '<button id="kick" style="font-size:18px;height:50px;width:100px">Kick</button>&nbsp;&nbsp;',
        '<button id="skip" style="font-size:18px;height:50px;width:100px">Skip</button>&nbsp;&nbsp;',
        '<button id="transform" style="font-size:18px;height:50px;width:100px">Transform</button>&nbsp;&nbsp;<br><br>'
    ];
    draw();
}

function showView() {
    appRoot.html(view());
}

function attachHandlers() {
    $('#punch').click(function() {
        this.punch;
        draw();
    });
    $('heal').click(function() {
        this.heal;
        draw();
    });
    $('stare').click(function() {
        this.stare;
        draw();
    });
    $('kick').click(function() {
        this.kick;
        draw();
    });
    $('skip').click(function() {
        this.skip;
        draw();
    });
    $('transform').click(function() {
        this.transform;
        draw();
    });
}

function draw() {
    appRoot.html(view());
    attachHandlers();
}

function main() {
    $('#fight').click(function() {
        STATE.gladiator_1.name = $('#glad1input').val();
        STATE.gladiator_2.name = $('#glad2input').val();
        showGladiator1(STATE.gladiator_1);
        showGladiator2(STATE.gladiator_2);
        draw();
    });
}

$(main);
