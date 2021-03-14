class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");

        // render
        scene.add.existing(this);

        // physics rendering
        scene.physics.add.existing(this);

        this.playerSpeed = 600;
        this.depth = 5;

        // holds scene
        this.scene = scene;

        this.setInteractive();
        this.setCollideWorldBounds(true);

        self = this;

        // input handlers
        this.keyUp = scene.input.keyboard.addKey('W');
        this.keyDown = scene.input.keyboard.addKey('S');
        this.keyLeft = scene.input.keyboard.addKey('A');
        this.keyRight = scene.input.keyboard.addKey('D');

        // 
        scene.input.on("pointermove", function (pointer) {
            this.angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
            this.setAngle(this.angle);
        }, this);

        scene.input.keyboard.on('keydown-F', function () {
            //player method shoot
            var a = new Shot(self.scene, self.x, self.y, self.angle);
        });

        this.old_x = this.x;
        this.old_y = this.y;
        this.old_angle = this.angle;

    }
    update() {
        this.setVelocity(0, 0);

        if (this.keyUp.isDown) {
            this.setVelocityY(this.playerSpeed * -1)
        } else if (this.keyDown.isDown) {
            this.setVelocityY(this.playerSpeed);
        }

        if (this.keyRight.isDown) {
            this.setVelocityX(this.playerSpeed)
        } else if (this.keyLeft.isDown) {
            this.setVelocityX(this.playerSpeed * -1);
        }
        var x = this.x;
        var y = this.y;
        var angle = this.angle;

        if(x != this.old_x || y != this.old_y || angle != this.old_angle) {
           // send socket to server
           this.scene.io.emit('player_move', {x: x, y: y, angle: angle});
           this.old_x = x;
           this.old_y = y;
           this.old_angle = angle;
        }
    }
}