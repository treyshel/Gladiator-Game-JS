const $ = require('jquery');
const appRoot = $('#app');

function randInt(low_damage, high_damage) {
    return low_damage + Math.floor(Math.random() * (high_damage - low_damage));
}

function Gladiator(name, health, rage, low_damage, high_damage) {
    this.name = name;
    this.health = health;
    this.rage = rage;
    this.low_damage = low_damage;
    this.high_damage = high_damage;
    this.attack = function attack(defender) {
        const d = randInt(this.low_damage, this.high_damage);
        const randomNumber = randInt(1, 100);
        if (this.rage > randomNumber) {
            defender.health -= d * 2;
            this.rage = 0;
        } else {
            defender.health -= d;
            this.rage += 15;
        }
    };
    this.heal = function heal(attacker) {
        if (this.rage >= 10) {
            this.rage = max(this.rage - 10, 0);
            this.health = min(this.health + 5, 100);
        }
    };
    this.isDead = function isDead(attacker) {
        if (this.health <= 0) {
            return true;
        }
        return false;
    };
}

function view() {
    $('<h1>Gladiator</h1>');
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
