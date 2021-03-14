var windows_height = window.innerHeight;
var window_width = window.innerWidth;

var config = {
    type: Phaser.AUTO,
    width: window_width,
    height: windows_height,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        aracde: {
            gravity: {
                y: 0,
            },
            fps: 60,
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}


//holds a game instance
var game = new Phaser.Game(config);
var player;

function preload() {
    // loading images
    this.load.image('player', 'public/img/player.png');
    this.load.image('bullet', 'public/img/bullet.png');

}

function create() {
    this.player = new Player(this, 500, 500);
}

function update() {
    this.player.update();
}