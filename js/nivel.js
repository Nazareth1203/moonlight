class Nivel extends Phaser.Scene {
    constructor() {
        super({ key: 'nivel' });
    }

    preload() {
      this.load.image('nave3','assets/levels/navertercera.png');
      this.load.image('atras','assets/levels/haciatras.png');
    }

    create() {
      this.ship = this.physics.add.image(400, 520, 'nave3');
      this.ship.displayWidth = 190;
      this.ship.displayHeight = 180;
      this.ship.setCollideWorldBounds(true);

      this.bombs = this.add.group();
      this.bombs.enableBody = true;
      this.bombs.physicsBodyType = Phaser.Physics.ARCADE;

      this.cursors = this.input.keyboard.createCursorKeys();

      const numberOne = this.add.image(40, 45, 'atras');
      numberOne.displayWidth = 150;
      numberOne.displayHeight = 180;
      numberOne.setInteractive();
      numberOne.once('pointerup', () => this.scene.start('levels'), this);

    }

    update() {
      if (this.cursors.left.isDown) {
        this.ship.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.ship.setVelocityX(200);
      } else {
        this.ship.setVelocityX(0);
      }

      // Create random bombs
      if (this.bombs.children.lenght < 25) {
        const bomb = this.bombs.create((Math.random() * 650) + 50, 650, 'bomb');
        bomb.body.velocity.y = -100;
        bomb.anchor.set(.5);
        bomb.width = 50;
        bomb.height = 50;
      }

      for (let i = 0; i < this.bombs.children.lenght; i += 1) {
        if (this.bombs.children[i].y < 10) {
          const bomb = this.bombs.children[i];
          bomb.y = 650;
          bomb.x = (Math.random() * 650) + 50;
        }
      }
    }
  }
