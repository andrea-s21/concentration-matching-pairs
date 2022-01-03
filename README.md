# Concentraion
## Steps
##### This game app allows users to play the game of concentration, or matching pairs by allowing the user to slect and reveal two cards at time in an attempt to try and remember and locate cards(squares) with corresponding symbols.
<br></br>

### 1) Define constants:
##### 1.1) Define a colors object with keys of 'null' (when the square is not selected), and player 1. The value assigned to each key represents the color to display for an unselected square (null) and player 1
<p></p>

##### 1.2) Define the 4 possible winning combinations or pairs, each containing two indexes of the board that make a winner
<p></p>

##### 1.3)Define the 6 possible winning combinations or pairs, each containing two indexes of the board that make a winner
<br></br>

### 2) Define required variables used to track the state of the game:

##### 2.1) Use a board array to represent the squares for level 1 and 2
##### 2.2) Use a turn variable to remember when selected squares are flipped back over prior to turn
##### 2.3) Use a winner variable to represent winnning or finding all matches
<br></br>

### 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
##### 3.1) Store the 8(level 1) and 12(level2) elements that represent the squares on the page
<br></br>

### 4)Upon loading the app should:</h4>
##### 4.1) Initialize the state variables:
##### 4.2) Render those state variables to the page:
##### 4.3) Wait for the user to click start button
##### 4.3) Wait for the user to click two squares
<br></br>

### 5)Handle a player clicking the next level button:
##### 5.1) Obtain the index of the two squares
##### 5.2) Set amount of time of play to review selected squares and return board to original state 
##### 5.3) If 'null' (no match) - return board to original state 
##### 5.3) If match) - remove the idx of those cards from array
<br></br> 

### 6)Handle a player clicking the next level button:
##### 6.1)Do steps 4.1 (initialize the state variables) and 4.2 (render)
<br></br> 

### 7)Handle a player clicking the replay button:
##### 7.1)Do steps 5.1 - and 5.3 (render)