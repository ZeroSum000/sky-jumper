def on_a_pressed():
    if cloud:
        # If on a cloud, jump off
        squirrle.vy = -150 - Jump_Strength
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_countdown_end():
    game.game_over(True)
info.on_countdown_end(on_countdown_end)

def on_on_overlap(sprite, otherSprite):
    global cloud
    global current_cloud_one
        
    if sprite.bottom >= otherSprite.top:
        cloud = current_cloud_one
        sprite.bottom = otherSprite.top
        squirrle.vy += Reduced_Gravity
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap)

cloud: Sprite = None
current_cloud_one: Sprite = cloud
squirrle: Sprite = None
Jump_Strength = 0
Reduced_Gravity = 0
scene.set_background_color(9)
Gravity = 1
Reduced_Gravity = -0.5
Friction = 10
Jump_Strength = 100
squirrle = sprites.create(img("""
        . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f f f f d d d d d e e f . . 
            . f d d d d f 4 4 4 e e f . . . 
            . f b b b b f 2 2 2 2 f 4 e . . 
            . f b b b b f 2 2 2 2 f d 4 . . 
            . . f c c f 4 5 5 4 4 f 4 4 . . 
            . . . f f f f f f f f . . . . . 
            . . . . . f f . . f f . . . . .
    """),
    SpriteKind.player)
controller.move_sprite(squirrle, 100, 10)
scroller.scroll_background_with_speed(0, -50)
info.start_countdown(15)

def on_on_update():
    squirrle.vy += Gravity
    squirrle.vy = min(squirrle.vy, 100)
game.on_update(on_on_update)

def on_forever():
    global cloud
    cloud = sprites.create_projectile_from_side(img("""
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
        """),
        0,
        -56)
    cloud.x = randint(20, 100)
    cloud.y = 120
    pause(500)
forever(on_forever)
