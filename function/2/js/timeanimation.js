/////////////////////////////////////////////////////////////

let template = {
    transform: {
        rotateX: "rotateX($deg)",
        rotateY: "rotateY($deg)",
        rotateZ: "rotateZ($deg)",
        scale: "scale($)"
    }
};

function calculator(originJson, targetJson, callback) {
    let speedValue = {};
    for (let key in originJson) {
        // console.log(key, originJson[key], typeof originJson[key]);
        if (typeof originJson[key] === "object") {
            speedValue[key] = calculator(originJson[key], targetJson[key], callback);
        }
        else {
            speedValue[key] = callback(originJson[key], targetJson[key]);
        }
    }
    // console.log(speedValue);
    return speedValue;
}

/*
 * el 元素
 * originJson 起始位置
 * targetJson 目标位置
 * time 时间
 * callback 执行完成的回调函数
 */
function move(el, originJson, targetJson, time, callback) {
    // 
    let t0 = new Date();
    let speedValue = calculator(originJson, targetJson, (src, dest)=>(dest - src)/time );
    // console.log(speedValue);

    // let id;
    function run() {
        let t2 = new Date() - t0;
        // console.log(t2);
        let currentJson = calculator(originJson, speedValue, (src, dest)=>(src + dest*t2));
        // console.log(currentJson);
        if (t2 > time) {
            currentJson = calculator(originJson, targetJson, (src, dest)=>dest);
            // console.log(currentJson);
            if (callback) {
                callback();
            }
            // cancelAnimationFrame(id);
        }
        else {
            requestAnimationFrame(run);
            // id = requestAnimationFrame(run);
            // console.log(id);
        }
        render(el, currentJson);
    }
    run();
}

function render(el, currentJson) {
    let c = getComputedStyle(el);
    // console.log(c);
    for (let key in currentJson) {
        // console.log(key, currentJson[key], typeof currentJson[key]);
        if (typeof currentJson[key] === "object") {
            let tmp = "";
            for (let k in currentJson[key]) {
                // console.log(k, currentJson[key][k], template[key][k]);
                tmp += template[key][k].replace("$", currentJson[key][k]) + " ";
            }
            // console.log(tmp);
            el.style[key] = tmp;
        }
        else {
            // el.style[key] = currentJson[key] + "px";
            el.style[key] = c[key].replace(parseFloat(c[key]), currentJson[key]);
        }
    }
}

