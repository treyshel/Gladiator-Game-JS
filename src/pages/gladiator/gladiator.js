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

function gladiatorTurn() {
    if (STATE.turn === 1) {
        return STATE.gladiator_1;
    } else {
        return STATE.gladiator_2;
    }
}

function oppositeOponent() {
    if (STATE.turn === 1) {
        return STATE.gladiator_2;
    } else {
        return STATE.gladiator_1;
    }
}

function oppositeOponentTurn() {
    if (STATE.turn === 1) {
        STATE.turn = 2;
    } else {
        STATE.turn = 1;
    }
}
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
    if ((attacker.health -= 25)) {
        attacker.rage += 5;
        defender.health -= 30;
    } else {
        $('#stare').prop(disabled, true);
    }
}

//super kick
function mega_kick(attacker, defender) {
    if (attacker.rage >= 50) {
        attacker.rage == 0;
        defender.health -= 50;
    } else {
        $('#kick').prop(disabled, true);
    }
}

//Heal function
function heal(gladiator) {
    if (gladiator.rage >= 10) {
        gladiator.rage = Math.max(gladiator.rage - 10, 0);
        gladiator.health = Math.min(gladiator.health + 5, 150);
    } else {
        $('#heal').prop(disabled, true);
    }
}

//skip turn function
function skip_turn(gladiator) {
    gladiator.rage += 30;
}

//transform function
function transform(gladiator) {
    if (gladiator.rage >= 100) {
        gladiator.low_damage += 25;
        gladiator.high_damage += 25;
        gladiator.rage -= 100;
    } else {
        $('#transform').prop(disabled, true);
    }
}

//gladiator is dead function
function isDead(gladiator, other) {
    if (gladiator.health <= 0) {
        gladiator.health = Math.max(0);
        showWinner(other.name);
        disableButtons();
    }
}

function presentWinner(gladiator) {
    return [
        '<h1>||| Winner: Gladiator ' + gladiator + '|||</h1>',
        '<button id="restart" onclick="document.location.reload()">RESTART</button>'
    ];
}

function showWinner(gladiator) {
    var winner = presentWinner(gladiator);
    $('#winner').html(winner);
}

//show gladiator helper
function setupGladiator(gladiator) {
    return (
        '|-|-|' +
        'Gladiator ' +
        gladiator.name +
        '|-|-|' +
        gladiator.health +
        ' Health' +
        '|-|-|' +
        gladiator.rage +
        ' Rage' +
        '|-|-|' +
        gladiator.low_damage +
        ' Low Damage' +
        '|-|-|' +
        gladiator.high_damage +
        ' High Damage' +
        '|-|-|'
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
        '<h2>Gladiator turn: ' + gladiatorTurn().name + '</h2>',
        '<br><br><button id="punch">Punch</button>&nbsp;&nbsp;',
        '<button id="heal">Heal</button>&nbsp;&nbsp;',
        '<button id="stare">Stare</button><br><br>',
        '<button id="kick">Kick</button>&nbsp;&nbsp;',
        '<button id="skip">Skip</button>&nbsp;&nbsp;',
        '<button id="transform">Transform</button>&nbsp;&nbsp;'
    ];
    draw();
}

function disableButtons() {
    $('#punch').prop(disabled, true);
    $('#heal').prop(disabled, true);
    $('#stare').prop(disabled, true);
    $('#kick').prop(disabled, true);
    $('#skip').prop(disabled, true);
    $('#transform').prop(disabled, true);
}

function showView() {
    appRoot.html(view());
}

function attachHandlers() {
    $('#punch').click(function() {
        punch(gladiatorTurn(), oppositeOponent());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
    $('#heal').click(function() {
        heal(gladiatorTurn());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
    $('#stare').click(function() {
        sacraficialStare(gladiatorTurn(), oppositeOponent());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
    $('#kick').click(function() {
        mega_kick(gladiatorTurn(), oppositeOponent());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
    $('#skip').click(function() {
        skip_turn(gladiatorTurn());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
    $('#transform').click(function() {
        transform(gladiatorTurn());
        isDead(oppositeOponent(), gladiatorTurn());
        oppositeOponentTurn();
        draw();
    });
}

function draw() {
    appRoot.html(view());
    showGladiator1(STATE.gladiator_1);
    showGladiator2(STATE.gladiator_2);
    attachHandlers();
}

function main() {
    $('#fight').click(function() {
        STATE.gladiator_1.name = $('#glad1input').val();
        STATE.gladiator_2.name = $('#glad2input').val();
        draw();
    });
}

$(main);
