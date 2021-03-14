class Shot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, angle) {
        super(scene, x, y, "bullet");

        // render
        scene.add.existing(this);

        // physics rendering
        scene.physics.add.existing(this);

        // set angle
        this.setAngle(angle);

        this.bullet_speed = 800;

        // layer depth
        this.depth = 0;

        // Deg to rad
        angle = angle * (Math.PI / 180);

        this.vx = this.bullet_speed * Math.cos(angle);
        this.vy = this.bullet_speed * Math.sin(angle);

        this.setVelocity(this.vx, this.vy);

    }
}