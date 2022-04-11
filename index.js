// Import stylesheets
import './style.css';
import 'phaser';

document.getElementById('start-game').addEventListener('click', () => {

document.querySelector('.game-menu').classList.add('hide');

//localStorage.removeItem('highScore');
//localStorage.removeItem('places');

var config = {
  type: Phaser.AUTO,
  width: 400, height: 500,
  physics: { default: 'arcade', 
    arcade: {
     gravity: { y: 500 },
      debug: false
    }},
  scene: { preload, create, update }
 };


 var game = new Phaser.Game(config);

 function preload() {
  this.load.baseURL = 'https://labs.phaser.io/assets/';
  this.load.crossOrigin = 'anonymous';
  this.load.audio('startmusic', 'audio/DOG.mp3');
  this.load.image('grass','skies/grass.jpg');
  this.load.spritesheet('bunny',
  'sprites/wabbit.png',
  { frameWidth: 32, frameHeight: 48 }
  );
  this.load.image('platform', 'sets/objects/platform3.png')
  this.load.image('carrot','sprites/carrot.png');
  this.load.image('belladonna','sprites/purple_ball.png');
  this.load.image('apple','sprites/apple.png');
  this.load.image('watermelon', 'sprites/watermelon.png');
  this.load.image('tree','sets/objects/tree1.png');
  this.load.image('sign', 'sets/objects/sign1.png');
  this.load.image('coin', 'sprites/coin.png');
  this.load.image('hole', 'pics/splat1.png');
  this.load.spritesheet('cat', 'sprites/baddie_cat_1.png', { frameWidth: 16, frameHeight: 16 })
  this.load.spritesheet('kitty', 'sprites/baddie_cat_1.png', { frameWidth: 16, frameHeight: 16 })
 }

 var bunny;
 var cursors;
 var platforms;
 var carrots;
 var belladonna;
 var belladonna1;
 var belladonna2;
 var score = 0;
 var scoreText;
 var gameoverText;
 var apples;
 var watermelons;
 var tree;
 var sign;
 var startMusic;
 var hole;
 var youWon;
 var cat;
 var kitty;
 var podium = [];
 var places;
 var firstPlace;
 var secondPlace;
 var thirdPlace;
 var causeOfDeath;

 function create() {
  startMusic = this.sound.add('startmusic', { loop: true });
  startMusic.play();
  let back = this.add.tileSprite(0, 0, 400, 500, 'grass');
  back.setOrigin(0)
  back.setScrollFactor(0);
  this.cameras.main.setBounds(0, 0, 400, 1500);
  this.physics.world.setBounds(0, 0, 400, 1500);

  //bunny = this.physics.add.sprite(40, 1500, 'bunny');
  bunny = this.physics.add.sprite(40, 10, 'bunny');
  //bunny = this.physics.add.sprite(40, 250, 'bunny');
  bunny.setCollideWorldBounds(true);                       
  bunny.setBounce(0.2);
  bunny.body.gravity.y = 500
  this.cameras.main.startFollow(bunny)

  cursors = this.input.keyboard.createCursorKeys();
   
  platforms = this.physics.add.staticGroup();
  platforms.create(100, 1450, 'platform');
  platforms.create(220, 1380, 'platform');
  platforms.create(30, 1330, 'platform');
  platforms.create(100, 1260, 'platform');
  platforms.create(200, 1170, 'platform'); 
  platforms.create(30, 1090, 'platform');
  platforms.create(230, 1010, 'platform');
  platforms.create(20, 930, 'platform');
  platforms.create(200, 860, 'platform');
  platforms.create(20, 800, 'platform'); 
  platforms.create(100, 710, 'platform');
  platforms.create(200, 650, 'platform');
  platforms.create(30, 575, 'platform');
  platforms.create(230, 500, 'platform');
  platforms.create(20, 420, 'platform');  
  platforms.create(200, 350, 'platform');
  platforms.create(20, 250, 'platform');
  platforms.create(210, 170, 'platform');  
  platforms.create(210, 80, 'platform');
  platforms.create(10, 130, 'platform'); 
  platforms.getChildren().forEach(c => c.setScale(0.3).setOrigin(0).refreshBody())
  this.physics.add.collider(bunny, platforms);

  cat = this.physics.add.sprite(200, 805, 'cat');
  cat.setCollideWorldBounds(true);
  cat.setBounce(0.2);
  this.physics.add.collider(cat, platforms);
  cat.setScale(1.2).setOrigin(0).refreshBody();

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('cat', { start: 2, end: 3 }),
    frameRate: 10,     
    repeat: -1         
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.overlap(bunny, cat, (bunny, cat) => {score-=0.1, scoreText.setText("Score: " + score)}, null, this)

  kitty = this.physics.add.sprite(20, 220, 'kitty');
  kitty.setCollideWorldBounds(true);
  kitty.setBounce(0.2);
  this.physics.add.collider(kitty, platforms);
  kitty.setScale(1.2).setOrigin(0).refreshBody();

  this.anims.create({
    key: 'right1',
    frames: this.anims.generateFrameNumbers('kitty', { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'left1',
    frames: this.anims.generateFrameNumbers('kitty', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.overlap(bunny, kitty, (bunny, kitty) => {score-=0.1, scoreText.setText("Score: " + score)}, null, this)

  tree = this.physics.add.staticGroup();
  tree.create(12,5,'tree');
  this.physics.add.collider(tree, platforms);
  tree.getChildren().forEach(c => c.setScale(0.43).setOrigin(0).refreshBody());

  hole = this.physics.add.staticGroup();
  hole.create(59.3,112, 'hole');
  this.physics.add.collider(hole, platforms);
  hole.getChildren().forEach(c => c.setScale(0.035).setOrigin(0).refreshBody());
  this.physics.add.overlap(bunny, hole, (bunny, hole) => {bunny.disableBody(true, true),  podium = JSON.parse(localStorage.getItem("highScore"))
  places = JSON.parse(localStorage.getItem("places")), checkScore(podium, places, score.toFixed(2)) ,youWon.visible = true, firstPlace.setText("1. " + podium[0]), firstPlace.visible = true, secondPlace.setText("2. " + podium[1]), secondPlace.visible = true, thirdPlace.setText("3. " + podium[2]), thirdPlace.visible = true}, null, this)

  youWon = this.add.text(60, 180, 'NAJLEPSZE WYNIKI' ,{  
    fontSize: "30px",
    fill: "#000",
  })
  youWon.visible = false

  firstPlace = this.add.text(110, 213, 'first', {  
    fontSize: "27px",
    fill: "#000",
  })
  firstPlace.visible = false

  secondPlace = this.add.text(110, 240, 'second', {  
    fontSize: "27px",
    fill: "#000",
  })
  secondPlace.visible = false

  thirdPlace = this.add.text(110, 267, 'third', {  
    fontSize: "27px",
    fill: "#000",
  })
  thirdPlace.visible = false

  sign = this.physics.add.staticGroup();
  sign.create(15,100,'sign');

  this.physics.add.collider(sign, platforms);
  sign.getChildren().forEach(c => c.setScale(0.5).setOrigin(0).refreshBody());
  
  
  carrots = this.physics.add.staticGroup();
  carrots.create(380, 10, 'carrot');
  carrots.create(150, 90, 'carrot');
  carrots.create(120, 200, 'carrot');
  carrots.create(110, 500, 'carrot');
  carrots.create(100, 630, 'carrot');
  carrots.create(100, 880, 'carrot');
  carrots.create(360, 1300, 'carrot');
  carrots.create(150, 1400, 'carrot');

  carrots.getChildren().forEach(c => c.setScale(1.3).setOrigin(0).refreshBody())
  this.physics.add.overlap(bunny, carrots, (bunny, carrot) => {carrot.disableBody(true, true), score+=10, scoreText.setText("Score: " + score)}, null, this)

  apples = this.physics.add.staticGroup();
  apples.create(300, 59, 'apple');
  apples.create(60, 200, 'apple');
  apples.create(100, 400, 'apple');
  apples.create(240, 989, 'apple');
  apples.create(380, 1070, 'apple');
  apples.create(350, 1110, 'apple');
  apples.create(100, 1200, 'apple');
  apples.create(380, 1480, 'apple');

  this.physics.add.overlap(bunny, apples, (bunny, apple) => {apple.disableBody(true, true), score+=5, scoreText.setText("Score: " + score)}, null, this)
  apples.getChildren().forEach(c => c.setScale(0.4).setOrigin(0).refreshBody())

  watermelons = this.physics.add.staticGroup();
  watermelons.create(150, 25, 'watermelon');
  watermelons.create(370, 200, 'watermelon');
  watermelons.create(350, 270, 'watermelon');
  watermelons.create(370, 550, 'watermelon');
  watermelons.create(290, 830, 'watermelon');
  watermelons.create(320, 950, 'watermelon');
  watermelons.create(20, 1000, 'watermelon');
  watermelons.create(20, 1370, 'watermelon');

  this.physics.add.overlap(bunny, watermelons, (bunny, watermelon) => {watermelon.disableBody(true, true), score+=1, scoreText.setText("Score: " + score)}, null, this)
  watermelons.getChildren().forEach(c => c.setScale(0.2).setOrigin(0).refreshBody())


    scoreText = this.add.text(165, 1010, "Score: 0", { 
    fontSize: "32px",
    fill: "#000",
  })

  gameoverText = this.add.text(this.physics.world.bounds.centerX, 250,
    'GAME OVER',
    { font: "40px Arial", fill: "#ffffff", align: "center" });
  gameoverText.setOrigin(0.5);
  gameoverText.visible = false;

  causeOfDeath = this.add.text(this.physics.world.bounds.centerX, 270,
    'CAUSE',
    { font: "25px Arial", fill: "#ffffff", align: "center" });
  causeOfDeath.setOrigin(0.5);
  causeOfDeath.visible = false;

  belladonna = this.physics.add.sprite(Math.floor(Math.random() * (200 - 1)) + 1, Math.floor(Math.random() * (200 - 1)) + 1, 'belladonna'); //200,1
  belladonna.body.velocity.x = 250;
  belladonna.body.velocity.y = -250;
  belladonna.body.bounce.set(1);
  belladonna.setCollideWorldBounds(true);
  this.physics.add.overlap(bunny, belladonna, (bunny, belladonna) => {bunny.disableBody(true, true), gameoverText.y = bunny.body.position.y, gameoverText.visible = true, causeOfDeath.setText("You've been poisoned :("), causeOfDeath.y = bunny.body.position.y + 30, causeOfDeath.visible = true}, null, this)
  this.physics.add.collider(belladonna, platforms);

  belladonna1 = this.physics.add.sprite(Math.floor(Math.random() * (500 - 250)) + 250, Math.floor(Math.random() * (500 - 250)) + 250, 'belladonna'); //250,500
  belladonna1.body.velocity.x = 250;
  belladonna1.body.velocity.y = -250;
  belladonna1.body.bounce.set(1);
  belladonna1.setCollideWorldBounds(true);
  this.physics.add.overlap(bunny, belladonna1, (bunny, belladonna1) => {bunny.disableBody(true, true), gameoverText.y = bunny.body.position.y, gameoverText.visible = true, causeOfDeath.setText("You've been poisoned :("), causeOfDeath.y = bunny.body.position.y + 30, causeOfDeath.visible = true}, null, this)
  this.physics.add.collider(belladonna1, platforms);

  belladonna2 = this.physics.add.sprite(Math.floor(Math.random() * (1000 - 250)) + 250, Math.floor(Math.random() * (1000 - 250)) + 250, 'belladonna'); //250,1000
  belladonna2.body.velocity.x = 250;
  belladonna2.body.velocity.y = -250;
  belladonna2.body.bounce.set(1);
  belladonna2.setCollideWorldBounds(true);
  this.physics.add.overlap(bunny, belladonna2, (bunny, belladonna2) => {bunny.disableBody(true, true), gameoverText.y = bunny.body.position.y, gameoverText.visible = true, causeOfDeath.setText("You've been poisoned :("), causeOfDeath.y = bunny.body.position.y + 30, causeOfDeath.visible = true}, null, this)
  this.physics.add.collider(belladonna2, platforms);

 }


 function update(){

  if (cursors.left.isDown) {
    bunny.body.setVelocityX(-220);
    } else if (cursors.right.isDown) {
    bunny.body.setVelocityX(220);
    }else {
    bunny.body.setVelocityX(0);
    }

    if (cursors.up.isDown && (bunny.body.touching.down || bunny.body.onFloor())) {
      bunny.setVelocityY(-450);
    }

    if(bunny.body.position.y >= 1230){
      scoreText.y = 1010;
    }else if(bunny.body.position.y < 230){
      scoreText.y = 10;
    }else{
      scoreText.y = bunny.body.position.y -220;
    }


      if(cat.body.position.x == 200 && cat.body.position.x < 345){
        cat.setVelocityX(150);
        cat.anims.play('right', true);
      }else if(cat.body.position.x == 345 && cat.body.position.x > 200){
        cat.setVelocityX(-150);
        cat.anims.play('left', true);
      }

      if(kitty.body.position.x == 20 && kitty.body.position.x < 150){
        kitty.setVelocityX(150);
        kitty.anims.play('right1', true);
      }else if(kitty.body.position.x == 150 && kitty.body.position.x > 20){
        kitty.setVelocityX(-150);
        kitty.anims.play('left1', true);
      }

      if(score < 0){
        bunny.disableBody(true, true); 
        gameoverText.y = bunny.body.position.y;
        gameoverText.visible = true;
        causeOfDeath.setText("You've starved to death :(");
        causeOfDeath.y = bunny.body.position.y + 30;
        causeOfDeath.visible = true;
      }
 }

 document.querySelector('.game-scene').style.display = 'flex';
 var btn = document.querySelector('.game-scene');

  btn.onclick = function () {
    document.querySelector('.game-scene').style.display = 'none';
    game.destroy(true, false);
    document.querySelector('.game-menu').classList.remove('hide');
  };

});


function checkScore(podium, places, score){

  if(podium == null){
      var podium = [];
      podium.push(score);
      places = 1;
      localStorage.setItem("places", JSON.stringify(places));
      localStorage.setItem("highScore",JSON.stringify(podium));
  }else if(places >= 3){
  for(var element of podium){

    if(score >= element){
      podium.splice(podium.findIndex(e => e == element),0,score);
      podium.splice(3,1)
      podium.sort(function(a, b){return b-a});
      localStorage.setItem("highScore", JSON.stringify(podium));
      places += 1;
      localStorage.setItem("places", JSON.stringify(places));
      break;
    }
  }
  }else if(podium != null){
    podium.push(score)
    podium.sort(function(a, b){return b-a});
    localStorage.setItem("highScore",JSON.stringify(podium)); 
    places += 1;
    localStorage.setItem("places", JSON.stringify(places));
  }
}

//-------Instrukcja obslugi------
document.getElementById('zobacz').addEventListener('click', () => {
  document.querySelector('.game-menu').classList.add('hide');
  var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 500,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false,
      },
    },
    scene: { preload, create },
  };

  var game = new Phaser.Game(config);

  function preload() {
    this.load.baseURL = 'https://labs.phaser.io/assets/';
    this.load.crossOrigin = 'anonymous';
    this.load.audio('startmusic', 'audio/DOG.mp3');
    this.load.image('grass', 'skies/grass.jpg');
    this.load.spritesheet('bunny', 'sprites/wabbit.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  var bunny;
  var startMusic;
  var gameoverText2;

  function create() {
    startMusic = this.sound.add('startmusic', { loop: true });
    startMusic.play();
    let back = this.add.tileSprite(0, 0, 400, 500, 'grass');
    back.setOrigin(0);
    back.setScrollFactor(0);
    this.cameras.main.setBounds(0, 0, 400, 1500);
    this.physics.world.setBounds(0, 0, 400, 1500);

    bunny = this.physics.add.sprite(40, 1500, 'bunny');
    bunny.setCollideWorldBounds(true);
    this.cameras.main.startFollow(bunny);
    //--TEKST---
    gameoverText2 = this.add.text(25, 1010, 'Instrukcja obsługi', {
      fontSize: '32px',
      fill: '#000',
    });
    gameoverText2 = this.add.text(
      25,
      1110,
      'Jesteś głodnym króliczkiem, który szuka',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1140,
      'smakołyków. W tym celu zbieraj owoce, które',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1170,
      'znajdują się na planszy. Do poruszania się',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );

    gameoverText2 = this.add.text(
      25,
      1200,
      'używaj strzałek. Twój cel to dotarcie',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1230,
      'na sam szczyt, aby schować się w swojej',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1260,
      'norce. Uważaj na spadające wilcze jagody,',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1290,
      'które mogą Cię otruć oraz na koty, które',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
    gameoverText2 = this.add.text(
      25,
      1320,
      'podkradają ci jedzienie. POWODZENIA !!!',
      {
        fontSize: '14px',
        fill: '#000',
      }
    );
  }

  document.querySelector('.game-scene').style.display = 'flex';
  var btn = document.querySelector('.game-scene');
  btn.onclick = function () {
    document.querySelector('.game-scene').style.display = 'none';
    game.destroy(true, false);
    document.querySelector('.game-menu').classList.remove('hide');
  };
});