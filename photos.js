class Image {
    constructor(element) {
        this.element = document.getElementById(element);
        this.posX = this.element.getBoundingClientRect().left;
        this.posX_width = this.element.getBoundingClientRect().width;
        this.posY = this.element.getBoundingClientRect().top;
        this.posY_height = this.element.getBoundingClientRect().height;
        this.dirX = 1;
        this.dirY = 1;
        this.posDiffX = this.posX;
        this.posDiffY = this.posY;
    }

    updatePosition = () => {
        this.posX = this.element.getBoundingClientRect().left;
        this.posX_width = this.element.getBoundingClientRect().right;
        this.posY = this.element.getBoundingClientRect().top;
        this.posY_height = this.element.getBoundingClientRect().bottom;
    }

    move = () => {
        this.element.style.top = (Number(this.element.style.top.split('p')[0]) + this.dirX) + 'px';
        this.element.style.left = (Number(this.element.style.left.split('p')[0]) + this.dirY) + 'px';
        this.updatePosition();
    }

    setInitialPosition = (x, y) => {
        if ((x - this.posDiffX) + this.element.clientWidth >= max_width)
            x = Math.abs(max_width - (Math.abs(x - this.posDiffX)));
        if ((y - this.posDiffY) + this.element.clientHeight >= max_height)
            y = (max_height - (Math.abs(y - this.posDiffY)));
        this.element.style.top = Math.abs(y - this.posDiffY) + 'px';
        this.element.style.left = Math.abs(x - this.posDiffX) + 'px';
    }

    setDirection = (x, y) => {
        this.dirX = x;
        this.dirY = y;
    }

    display = () => {
        console.log(this.element);
        console.log("Top PX :" + this.element.style.top + "Left PX :" + this.element.style.left + "Possition Diff X" + this.posDiffX + "Possition Diff Y" + this.posDiffY);
        console.log("Left :" + (this.posX) + " Top :" + (this.posY) + " Width :" + (this.posX_width) + " Height :" + (this.posY_height));
        console.log("Left :" + (this.element.clientLeft) + " Top :" + (this.element.clientTop));
    }

    isColliding = (image) => {
        if ((Math.abs(this.posX - image.posX_width) <= 1 && (Math.abs(this.posY - image.posY) <= Math.abs(this.posY_height - this.posY))) ||
            (Math.abs(this.posY - image.posY_height) <= 1 && (Math.abs(this.posX - image.posX) <= Math.abs(this.posX_width - this.posX))) ||
            (Math.abs(image.posX - this.posX_width) <= 1 && (Math.abs(this.posY - image.posY) <= Math.abs(this.posY_height - this.posY))) ||
            (Math.abs(image.posY - this.posY_height) <= 1) && (Math.abs(this.posX - image.posX) <= Math.abs(this.posX_width - this.posX)))
            return true;
        return false;
    }
}

const max_width_clientRect = document.querySelector('#court').getBoundingClientRect().width;
const max_height_clientRect = document.querySelector('#court').getBoundingClientRect().height;
const max_width = document.querySelector('#court').clientWidth;
const max_height = document.querySelector('#court').clientHeight;
const height_diff = document.querySelector('#court').getBoundingClientRect().top;
console.log(max_width);

move_objects = () => {
    // debugger;
    wall_collision();
    collision_check();
    img1.move();
    img2.move();
    img3.move();
    img4.move();
    img5.move();
}

collision_check = () => {
    let arr = [img1, img2, img3, img4, img5];
    arr.forEach(arrx => {
        for (let i = arr.indexOf(arrx) + 1; i < (arr.length); i++) {
            if (arrx.isColliding(arr[i])) {
                change_direction(arr[i], arrx);
            }
        }
    })
}

wall_collision = () => {
    let arr = [img1, img2, img3, img4, img5];
    arr.forEach(arrx => {
        if (max_width - arrx.posX_width <= 1 || arrx.posX <= 1)
            arrx.dirY = -1 * arrx.dirY;
        if (max_height + height_diff - arrx.posY_height <= 1 || arrx.posY <= height_diff)
            arrx.dirX = -1 * arrx.dirX;
    });
}

change_direction = (image1, image2) => {
    let dx = image1.dirX, dy = image1.dirY;
    image1.setDirection(image2.dirX, image2.dirY);
    image2.setDirection(dx, dy);
}

startup = () => {
    console.log(max_width, max_height, max_width_clientRect, max_height_clientRect);
    img1 = new Image('image1');
    img2 = new Image('image2');
    img3 = new Image('image3');
    img4 = new Image('image4');
    img5 = new Image('image5');

    let arr = [img1, img2, img3, img4, img5];
    arr.forEach(arrx => {
        let x_init = getRandomizedValue(max_width - arrx.posX_width), y_init = getRandomizedValue(max_height - arrx.posY_height), x_dir = getRandomizedValue(4, [-2, -1, 1, 
            2]), y_dir = getRandomizedValue(4, [-2, -1, 1, 2]);
        console.log(x_init, y_init, x_dir, y_dir);
        arrx.display();
        arrx.setInitialPosition(x_init, y_init);
        arrx.setDirection(x_dir, y_dir);
        arrx.updatePosition();
    });
}

getRandomizedValue = (limiter, array = []) => {
    if (array.length == 0)
        return Math.abs(Math.floor(Math.random() * limiter));
    return array[Math.abs(Math.floor(Math.random() * array.length))];
}

let img1, img2, img3, img4, img5, bool;

initialize = () => {
    startup();
    let n = [...Array(100000).keys()];
    // while (true) {
    n.forEach(i => {
        setTimeout(() => {
            if (bool)
                move_objects();
        }, (10 * i))
    });
    // }
}

resumeAction = (event) => {
    bool = !bool;
}