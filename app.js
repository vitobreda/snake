document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [1,0] //so the div in our gird being 2 (for the HEAD), and 0 being the end (TAIL, with all 1's being the body from now on)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval =0
    let HeadAtLastComand = 0;

    //to start, and restart the game
    function startGame() {
       currentSnake.forEach(index => squares[index].classList.remove('snake'))
       squares[appleIndex].classList.remove('apple')
       clearInterval(interval)
       score = 0
       randomApple()
       direction = 1
       scoreDisplay.innerText = score
       intervalTime = 1000
       currentSnake = [1,0]
       currentIndex = 0
       currentSnake.forEach(index => squares[index].classList.add('snake'))
       interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with ALL the over outcomes of the snake
    function moveOutcomes() {
        //deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            (squares[currentSnake[0] + direction].classList.contains('snake')) //if snake goes into itself 
        ) {
            return clearInterval(interval) //this will clear the interval if any of the above happen
        }

        const tail = currentSnake.pop() //remove last item of the array and show it
        squares[tail].classList.remove('snake') //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head
        

        //deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')

            squares[tail].classList.add('snake')
            currentSnake.push(tail)   
            
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        } 

        squares[currentSnake[0]].classList.add('snake')
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)    
        } while(squares[appleIndex].classList.contains('snake')) //make sure apples do not appears in the snake body
        squares[appleIndex].classList.add('apple')
    }
    
    //assing function to keycodes
    function control(e) {
        HeadAtLastComand = currentSnake[0];
        if ((e.keyCode === 39) && (direction != -1)) {
            direction = 1 //if we press the right arrow on our keybord the snake will go right one
        } else if ((e.keyCode === 38) && (direction != 10)) {
            direction = -width //if we press the up arrow, the snake will go back ten divs, appering to go up
        } else if ((e.keyCode === 37) && (direction != 1)){
            direction = -1 //if we press left, the snake will go left one div
        } else if ((e.keyCode === 40) && (direction != -10)) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs form were you are now
        }
    }

    function handleControl(e) {

        // make sure to move snake head before get a new command 
        if (HeadAtLastComand != currentSnake[0]) {
            control(e);
        }
    }

    document.addEventListener('keyup', handleControl)
    startBtn.addEventListener('click', startGame)
})