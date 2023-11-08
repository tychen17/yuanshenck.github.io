function calculate() {
    // 获取用户输入的值
    var crystals = parseInt(document.getElementById('crystals').value) || 0;
    var primogems = parseInt(document.getElementById('primogems').value) || 0;
    var paddedPulls = parseInt(document.getElementById('padded-pulls').value) || 0; // 玩家已经投入到卡池的抽数
    var existingPulls = parseInt(document.getElementById('existing-pulls').value) || 0; // 已有抽数（已经用原石换成的抽数）
    var desiredConstellations = parseInt(document.getElementById('desired-constellations').value) || 0;
    var expectedPulls = parseInt(document.getElementById('expected-pulls').value) || 0;

    // 定义一些基础常量
    const pullsPerConstellation = 160; // 每个命座所需的抽数
    const primogemsPerPull = 160; // 每次抽卡所需的原石数

    // 计算当前原石可以抽卡的次数
    var totalPrimogems = primogems + (crystals * 160); // 结晶转换为原石
    var totalPullsAvailable = Math.floor(totalPrimogems / primogemsPerPull) + existingPulls;

    // 确定目标抽数
    var targetPulls = expectedPulls > 0 ? expectedPulls : desiredConstellations * pullsPerConstellation + paddedPulls;
    var pullsNeeded = targetPulls - totalPullsAvailable;

    // 如果需要的抽数小于0，说明不需要充值
    if (pullsNeeded <= 0) {
        pullsNeeded = 0;
    }

    // 计算需要的原石和结晶
    var primogemsNeeded = pullsNeeded * primogemsPerPull;
    var crystalsNeeded = Math.ceil((primogemsNeeded - primogems) / 160); // 结晶转换为原石

    // 充值档次对应的结晶数量
    const rechargeTiers = {
        648: 8080,
        328: 3880,
        198: 2240,
        98: 1090,
        30: 330,
        6: 60
    };

    // 计算最优充值方案
    let bestRechargeSolution = {};
    let remainingCrystals = crystalsNeeded;
    Object.keys(rechargeTiers).sort((a, b) => b - a).forEach(tier => {
        if (remainingCrystals > 0) {
            bestRechargeSolution[tier] = Math.floor(remainingCrystals / rechargeTiers[tier]);
            remainingCrystals -= bestRechargeSolution[tier] * rechargeTiers[tier];
        }
    });

    // 如果还有剩余结晶需要充值，选择最小档次补足
    if (remainingCrystals > 0) {
        bestRechargeSolution[Object.keys(rechargeTiers).pop()] = 1;
    }

    // 输出结果
    var resultString = `目前能抽出的命座数: ${Math.floor((totalPullsAvailable - paddedPulls) / pullsPerConstellation)}<br>`;
    resultString += `总共可抽次数: ${totalPullsAvailable}<br>`;
    resultString += `还需充值结晶: ${crystalsNeeded > 0 ? crystalsNeeded : 0}<br>`;

    // 只有当需要充值时才显示充值方案
    if (crystalsNeeded > 0) {
        resultString += '充值方案: <br>';
        Object.keys(bestRechargeSolution).forEach(tier => {
            if (bestRechargeSolution[tier] > 0) {
                resultString += `${tier}元档次 x ${bestRechargeSolution[tier]}<br>`;
            }
        });
    } else {
        resultString += '无需额外充值<br>';
    }

    document.getElementById('output').innerHTML = resultString;
}
