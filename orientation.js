// ジャイロスコープと地磁気をセンサーから取得
function orientation(event) {
    let absolute = event.absolute;
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;
    const needle = document.getElementById("needle");

    let degrees;
    if(os == "iphone") {
        // webkitCompasssHeading値を採用
        degrees = event.webkitCompassHeading;
    } else {
        // deviceorientationabsoluteイベントのalphaを補正
        degrees = compassHeading(alpha, beta, gamma);
    }

    // 初回の角度
    if (typeof orientation.lastDegree === 'undefined') {
        orientation.lastDegree = degrees;
    }

    // 180度以上回転した場合は逆方向に回転させない
    if (Math.abs(degrees - orientation.lastDegree) > 180) {
        orientation.lastDegree = degrees > orientation.lastDegree ? degrees - 360 : degrees + 360;
    }

    // 針を滑らかに新しい角度に回転
    needle.style.transform = `rotate(${degrees}deg)`;

    // 最後の角度を更新
    orientation.lastDegree = degrees;

    // 方向の表示
    updateDirection(degrees);
}

// 方向を表示する関数
function updateDirection(degrees) {
    let direction;
    if (
        (degrees > 337.5 && degrees < 360) ||
        (degrees > 0 && degrees < 22.5)
    ) {
        direction = "N";
    } else if (degrees > 22.5 && degrees < 67.5) {
        direction = "NE";
    } else if (degrees > 67.5 && degrees < 112.5) {
        direction = "E";
    } else if (degrees > 112.5 && degrees < 157.5) {
        direction = "SE";
    } else if (degrees > 157.5 && degrees < 202.5) {
        direction = "S";
    } else if (degrees > 202.5 && degrees < 247.5) {
        direction = "SW";
    } else if (degrees > 247.5 && degrees < 292.5) {
        direction = "W";
    } else if (degrees > 292.5 && degrees < 337.5) {
        direction = "NW";
    }

    document.querySelector("#direction").innerHTML =
        direction + " : " + degrees;
    document.querySelector("#absolute").innerHTML = absolute;
    document.querySelector("#alpha").innerHTML = alpha;
    document.querySelector("#beta").innerHTML = beta;
    document.querySelector("#gamma").innerHTML = gamma;
}

