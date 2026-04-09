---
title: Testing
description: Testing
date: 2025-11-20
tags:
  - ttrpg
ttrpg: testing
link: https://testing.com
---

::callout-box{type="info" title="Example Components"}
This is a **block component** - it takes up the full width. You can also use :badge{text="inline components" color="blue"} within your text, or :highlight{color="#ffeb3b"}[highlighted text] like this!
::

i wake up, in a prison cell. the door unlocked, and my :badge{text="weapon" color="red"} right by my side.

i walk up the stairs, to find a shitty dining room, with a wooden goblin, setting the table.

i roll for perception: :DiceRoll{notation="2d6kh" :rolls="[3, 5]" :target="4"}

i roll for stealth (need to roll under): :DiceRoll{notation="2d6kh" :rolls="[2, 4]" :target="5" compareType="under"}
