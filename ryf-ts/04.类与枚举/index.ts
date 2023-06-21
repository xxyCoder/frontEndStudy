interface people {
    eat(): void;
}

class Father implements people {
    private name = "father";
    private sex = "男";
    eat() {
        console.log('eat');
    }
}