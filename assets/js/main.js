const vm = new Vue({
    el: '#app',
    data: {
        playGame: false,
        inputName: '',
        userName: '',
        showName: null,
        points: null,
        maxSpeed: 10,
        limit: 10,
        fishesTypes: ['squid', 'sponge', 'star'],
        fishesOnBoard: [],
        leaderBoard: [],
        areaSize: [],
        timer: 12312,
        catchFishes: 0,
    },

    mounted() {
        this.setArea();
    },


    methods: {

        growSpeed() {
            this.maxSpeed += 10;
        },

        randInt(max, min = 0) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },

        setArea() {
            this.areaSize = ({'width': this.$refs.area.clientWidth, 'height': this.$refs.area.clientHeight})
        },

        setUsername() {
            if (this.inputName !== '') {
                this.userName = this.inputName;
                this.inputName = '';
            }
        },

        startGame() {
            this.playGame = true;
            this.timerStart();
        },

        timerStart() {
            let time = setInterval(() => {
                this.timer = this.timer - 1

                if (this.randInt(2) && this.fishesOnBoard.length <= this.limit) {
                    this.spawnFish()
                }

                if (this.timer === 0) {
                    this.endGame(time)
                }

            }, 1000);

        },

        spawnFish() {
            let fish = {
                id: this.catchFishes,
                type: this.fishesTypes[this.randInt(this.fishesTypes.length)],
                top: this.randInt((this.areaSize.height - 100), 100),
                left: this.randInt(this.areaSize.width - 100, 100),
                speed: this.randInt(this.maxSpeed, 10),
                edged: this.randInt(1),

            }
            if (fish.type === 'squid') {
                fish.height = 100;
                fish.width = 40;
                fish.points = this.randInt(fish.speed);
            }

            if (fish.type === 'sponge') {
                fish.height = 50;
                fish.width = 60;
                fish.points = this.randInt(fish.speed);
            }

            if (fish.type === 'star') {
                fish.height = 80;
                fish.width = 80;
                fish.points = this.randInt(fish.speed);
            }

            // setTimeout(() => fish.transition = `0.25s`, 10);
            // setTimeout(() => fish.width = fish.width * 2, 10);
            // setTimeout(() => fish.height = fish.height * 2, 10);
            // setTimeout(() => fish.transition = `0.1s`, 250);

            this.catchFishes++;
            this.fishesOnBoard.push(fish)
            // this.moveFish(fish)
        },


        clickFish(index) {
            if (this.timer !== 0) {
                this.points += this.fishesOnBoard[index].points;
                setTimeout(() => this.fishesOnBoard.splice(index, 1), 100);
                this.growSpeed();
            }
            return false;
            // setTimeout(() => this.fishesOnBoard[index].img = `url('assets/img/bubbles.png')`, 10);
        },

        // moveFish(fish) {
        //     setInterval(() => {
        //         if (fish.left === 0) {
        //             fish.coup = false
        //         }
        //         if (fish.left === this.fishesOnBoard.width - fish.width) {
        //             fish.coup = true
        //         }
        //         (fish.coup) ? fish.left -= 1 : fish.left += 1
        //     }, fish.speed)
        // },

        endGame(interval) {
            this.playGame = false;
            clearInterval(interval);
        },


        restart() {
            this.playGame = false;
            this.inputName = '';
            this.userName = '';
            this.showName = null;
            this.points = null;
            this.leaderBoard = [];
            this.areaSize = [];
            this.timer = 5;
            this.timerActive = '';
        }
    }
});
