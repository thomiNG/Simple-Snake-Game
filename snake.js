function startGame() {
    /**
        * next steps:
        * - add scoreboard
        * - disable moving backwards -> done
        * - add power ups
        * - add entry screen and ending screen
        * - add number on how big the snake is 
        * - add how many apple got eaten
       */


    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let rows = 20;
    let cols = 20;
    let snake = [
        {
            x: 1,
            y: 3
        }
    ];
    let food;
    let foodCollected = false;
    let cellWidth = canvas.width / cols;
    let cellHeight = canvas.height / rows;
    let direction = "RIGHT";

    // draw food on random place
    placeFood();
    // interval to execute function in a given time (ms)
    setInterval(gameLoop, 200);

    // event triggered when arrow keys is used
    document.addEventListener('keydown', keyDown);
    draw();

    function draw() {
        // draw background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw snake
        ctx.fillStyle = 'white';
        snake.forEach(part => add(part.x, part.y));

        // draw food
        ctx.fillStyle = 'red';
        add(food.x, food.y);

        // call draw function permanently
        requestAnimationFrame(draw);

    }


    function gameLoop() {
        testGameOver();
        if (foodCollected == true) {
            snake = [
                {
                    x: snake[0].x,
                    y: snake[0].y
                }, ...snake
            ];

            foodCollected = false;
        }

        shiftSnake();

        // move snake depending on in which direction is set
        if (direction == 'LEFT') {
            snake[0].x--;
        }
        if (direction == 'RIGHT') {
            snake[0].x++;
        }
        if (direction == 'UP') {
            snake[0].y--;
        }
        if (direction == 'DOWN') {
            snake[0].y++;
        }

        // check if snake (first block of it) is in same coordination as food
        if (snake[0].x == food.x && snake[0].y == food.y) {
            // Futter einsammeln
            foodCollected = true;
            // Futter neu zufällig platzieren
            placeFood();
        }

        // begin at start or end if maximum/minimum position is reached
        if (snake[0].x == cols) {
            snake[0].x = 0;
        } else if (snake[0].x < 0) {
            snake[0].x = cols - 1;
        }
        if (snake[0].y == rows) {
            snake[0].y = 0;
        } else if (snake[0].y < 0) {
            snake[0].y = rows - 1;
        }
    }

    function testGameOver() {
        let firstPart = snake[0];
        let restPart = snake.slice(1);

        // suche gleichen X oder Y -> return value: bool
        let crash = restPart.find(part => firstPart.x == part.x && firstPart.y == part.y);

        //reset game
        if (crash) {
            // reset snake and position
            snake = [
                {
                    x: 1,
                    y: 3
                }
            ];
            // place food
            placeFood();
        }
    }

    function placeFood() {
        let randomX = Math.floor(Math.random() * cols);
        let randomY = Math.floor(Math.random() * rows);
        food = { x: randomX, y: randomY };
    }



    function shiftSnake() {
        for (let i = snake.length - 1; i > 0; i--) {
            const part = snake[i];
            const secondPart = snake[i - 1];
            part.x = secondPart.x;
            part.y = secondPart.y;
        }
    }


    // add block
    function add(x, y) {
        // multiplication so rows and columns are used
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
    }

    // key assignments 
    // disable moving backwards 
    function keyDown(e) {
        if (e.keyCode == 37 && direction != "RIGHT") {
            direction = "LEFT";
        }
        if (e.keyCode == 38 && direction != "DOWN") {
            direction = "UP";
        }
        if (e.keyCode == 39 && direction != "LEFT") {
            direction = "RIGHT";
        }
        if (e.keyCode == 40 && direction != "UP") {
            direction = "DOWN";
        }
    }
}