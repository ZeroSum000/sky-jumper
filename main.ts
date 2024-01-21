namespace SpriteKind {
    export const Finish = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Finish, function (sprite, otherSprite) {
    finish.startEffect(effects.coolRadial, 2000)
    game.gameOver(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(squirrle, 100, 15)
})
info.onCountdownEnd(function () {
    game.gameOver(true)
    effects.clouds.endScreenEffect()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprite.bottom >= otherSprite.top) {
        squirrle.vy += Reduced_Gravity
    } else {
        squirrle.vy = Gravity
    }
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(squirrle, 100, 0)
})
let finish: Sprite = null
let squirrle: Sprite = null
let Reduced_Gravity = 0
let Gravity = 0
let cloud: Sprite = null
effects.blizzard.startScreenEffect(5000)
let current_cloud_one = cloud
scene.setBackgroundColor(9)
Gravity = 0.8
Reduced_Gravity = -1.2
let Friction = 10
let Jump_Strength = 100
squirrle = sprites.create(assets.image`squirrel`, SpriteKind.Player)
squirrle.y = 0
squirrle.setScale(0.75, ScaleAnchor.Middle)
controller.moveSprite(squirrle, 100, 0)
scroller.scrollBackgroundWithSpeed(0, -50)
info.startCountdown(15)
finish = sprites.create(img`
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
    `, SpriteKind.Finish)
finish.setPosition(0, 130)
game.onUpdate(function () {
    squirrle.vy += Gravity
    squirrle.vy = Math.min(squirrle.vy, 100)
})
forever(function () {
    cloud = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, -56)
    cloud.x = randint(20, 100)
    cloud.y = 120
    pause(randint(600, 1500))
})
