var Father = /** @class */ (function () {
    function Father() {
        this.name = "father";
        this.sex = "男";
    }
    Father.prototype.eat = function () {
        console.log('eat');
    };
    return Father;
}());
