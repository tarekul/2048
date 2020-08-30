# 2048

## 2048 Game Demo/Web Link

[2048 Game](https://tarekul.github.io/2048/index.html)
![](https://github.com/tarekul/2048/blob/master/2048game.gif)

### 2048 Game Algorithm
#### createGrid function
Initially localStorage is accessed to retrieve an existing array of grid values.
Based on the response from localStorage the grid is built from either the array from long storage or it is built as a new grid.
In the case of building new grid a for loop is used to create *square* div elements with innerHtml set to zero to indicate empty square.
Each square is than appended to the parent element in the html called *grid* and pushed to an array called *squares*.
Than generate function is called twice to place two *2* values in a random empty square

#### generate function
A random number is chosen from 0-15 and that number is used as an index in *squares* array to check if the elements innerHTMl is zero
If the value is zero than the algorithm replaces the zero with a 2, and calls the checkForGameOver function
Otherwise if the value is not zero indicating that the current square is not empty, the generate function is called again.

#### control function
At this point their is a grid with atleast two values greater than zero,however the game is not playable. 
A eventListener is added at the document level to check for key presses. 
Four key presses to look out for are arrow left, arrow up, arrow right, and arrow down
The control function checks the keyCode of any key pressed for 37,38,39,40.
For each keyCode in the list 37,38,39,40 the following functions are called respectively, keyLeft, keyUp, keyRight,keyDown

#### keyLeft function
The bulk of the game logic lies here. Here the game logic is broken up to 4 steps.
The first step is to move all values **greater than zero** to the left and all zeros trail to the right
This insures that all the non-zero numbers are to the left
The second step loops over all the squares and checks if any two adjacent squares have the same value.
If two squares have the same value than the current square gets an updated value of 2 * its original value and second square is set to zero
Setting the adjacent square to zero prevents more than two squares combining at any given time
The third step is to move all values **greater than zero** to the left and all zeros trail to the right again.
The reason for invoking the moveLeft function again is because their are zeros in between non-zero numbers after combining numbers.
The fourth step is to invoke the generate function to place a random number in an empty square
Lastly the grid is saved in localStorage to retrieve the game in case user refreshes or closes the game
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

