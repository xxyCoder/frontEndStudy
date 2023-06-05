async function an() {
    const d1 = await new Promise(resolve => {
        setTimeout(() => {
            console.log(1);
            resolve(1);
        }, 1000);
    });
    console.log("d1:", d1);
    const d2 = await new Promise(resolve => {
        console.log(2);
        resolve(2);
    }, 500);
    console.log("d2:", d2);
    return "success";
}

an();