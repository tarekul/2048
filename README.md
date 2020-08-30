# 2048

## 2048 Game Demo/Web Link

[2048 Game](https://tarekul.github.io/2048/index.html)
![](https://github.com/tarekul/2048/blob/master/2048game.gif)

### 2048 Game functions
* getGrid
  * createBoard
    * generate
  
  * control
    * keyLeft
      * moveLeft(twice - once after combineRow)
      * combineRow
      * generate
      * saveGrid
    * keyUp
      * moveUp(twice - once after combineColumnUp)
      * combineColumnUp
      * generate
      * saveGrid
    * keyRight
      * moveRight(twice - once after combineRow)
      * combineRow
      * generate
      * saveGrid
    * keyDown
      * moveDown(twice - once after combineColumnDown)
      * combineColumnDown
      * generate
      * saveGrid
   * checkForWin
   * checkForGameOver
  


### Javascript built in functions, and Web APIs used to build the game
* Document.querySelector
* Document.getElementById
* Document.addEventListener
* Append child
* Arrays
* Math.random()
* parseInt
* Array Filter
* Array Concat
* Array Fill
* SetTimeout
* ClearInterval
* SetInterval
* LocalStorage

