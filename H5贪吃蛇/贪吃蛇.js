class Snake {
    constructor() {
        this.snake = document.querySelector('.snake')
        this.food = document.querySelector('.food')
        this.bodys = document.querySelectorAll('.body')
        this.top = 0
        this.left = 100
        this.lastTop = '' //记录蛇身体最后一段的top
        this.lastLeft = '' //记录蛇身体最后一段的top
        this.lastBody = null //蛇的最后一段，没吃到食物为null
        this.snakeMoveByAuto = null
        this.init()
    }
    // 初始化
    init () {
        this.snake.style.top = this.top + 'px'
        this.snake.style.left = this.left + 'px'
        this.foodAppearByRandom()
        // 监听键盘的事件
        document.querySelector('body').onkeydown = (e) => {
            clearInterval(this.snakeMoveByAuto)
            switch (e.keyCode) {
                case 87:
                    this.snakeMoveByAuto = setInterval(() => this.snakeMove(-50, 0), 500)
                    break;
                case 65:
                    this.snakeMoveByAuto = setInterval(() => this.snakeMove(0, -50), 500)
                    break;
                case 83:
                    this.snakeMoveByAuto = setInterval(() => this.snakeMove(50, 0), 500)
                    break;
                case 68:
                    this.snakeMoveByAuto = setInterval(() => this.snakeMove(0, 50), 500)
                    break;
            }
        }
    }
    // 食物随机出现
    foodAppearByRandom () {
        let length = this.bodys.length
        this.food.style.top = Math.floor(Math.random() * 20) * 50 + 'px'
        this.food.style.left = Math.floor(Math.random() * 20) * 50 + 'px'
        // 防止食物刷新在同一位置
        if (this.snake.style.top === this.food.style.top && this.snake.style.left === this.food.style.left) {
            this.foodAppearByRandom()
        }
        // 防止食物刷新在蛇身上
        for (var i = 0; i < length; i++) {
            if (this.food.style.top === this.bodys[i].style.top && this.food.style.left === this.bodys[i].style.left) {
                this.foodAppearByRandom()
            }
        }
    }
    // 移动蛇位置
    snakeMove (top, left) {
        let newTop = parseInt(this.snake.style.top.slice(0, -2)) + top
        let newLeft = parseInt(this.snake.style.left.slice(0, -2)) + left
        let length = this.bodys.length

        // 阻止蛇走出方框
        // 因为盒子的宽高是50px,就各自减50
        if (newTop < 0 || newTop > 950 || newLeft < 0 || newLeft > 950) {
            clearInterval(this.snakeMoveByAuto)
            alert('gg')
            window.location.reload()
            return
        }


        // 让蛇身体后一个跟着前一个移动
        for (var i = 0; i < length - 1; i++) {
            console.log(this.bodys[i + 1].style.left)
            this.bodys[i].style.left = this.bodys[i + 1].style.left
            this.bodys[i].style.top = this.bodys[i + 1].style.top
        }

        // 让蛇身体的最后部分跟着蛇的头移动
        this.bodys[length - 1].style.top = this.snake.style.top
        this.bodys[length - 1].style.left = this.snake.style.left


        // 让蛇的头部移动
        this.snake.style.top = newTop + 'px'
        this.snake.style.left = newLeft + 'px'


        // 蛇吃到食物
        if (this.snake.style.top === this.food.style.top && this.snake.style.left === this.food.style.left) {
            this.lastTop = this.bodys[0].style.top
            this.lastLeft = this.bodys[0].style.left
            this.foodAppearByRandom()
            this.snakeChangeBig()
        }

        // 循环判断蛇有没有撞到自己的身体
        for (var i = 0; i < length; i++) {
            if (this.snake.style.top === this.bodys[i].style.top && this.snake.style.left === this.bodys[i].style.left) {
                clearInterval(this.snakeMoveByAuto)
                alert('gg')
                window.location.reload()
            }
        }
    }
    // 蛇吃到食物变大
    snakeChangeBig () {
        // 创建蛇身体最后一段
        this.lastBody = document.createElement('div')
        this.lastBody.className = 'body'
        this.lastBody.style.top = this.lastTop
        this.lastBody.style.left = this.lastLeft
        document.querySelector('.box').prepend(this.lastBody)
        // 因为添加了蛇的最后一段，所以要更新this.bodys
        this.bodys = document.querySelectorAll('.body')
    }
}

var snake = new Snake()