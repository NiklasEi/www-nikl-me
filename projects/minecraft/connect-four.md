---
title: "Connect Four"
date: 2021-05-04
spigot: 40134
github: https://github.com/NiklasEi/connectfour-for-gamebox
tags:
- Minecraft
- Gamebox
- Multiplayer
---

Minecraft inventory game for two players competing in connecting four of their tokens. Connections can be created vertical, horizontal or diagonal.

The game is played with chips in an 6x9 inventory. At the beginning of the game each player gets a random chip out of a configured set of chips. Chips can be entered into the game by clicking and will fall until they hit the bottom of the inventory or another chip.

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        {% include inline_image.html resize="600x600" file="projects/minecraft/connect-four/won.png" alt="Won connect four game" max-width="100%" %}
    </div>
</div>
<br>
By default the inventory title indicates which players turn it is and will announce a winner or a draw when a game finishes. Rows of four or more will be marked with glow and will stop the game. As in all the other <a href="../GameBox/">GameBox</a> games statistics can be turned on and all game modes are completely configurable.
