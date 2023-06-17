interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat : Cat) {
    return (cat as any as Fish);    // 直接as Fish会报错，因为类型互不兼容
}