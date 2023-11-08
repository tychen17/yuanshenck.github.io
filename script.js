function calculate() {
    // 获取用户输入的值
    var crystals = parseInt(document.getElementById('crystals').value) || 0;
    var primogems = parseInt(document.getElementById('primogems').value) || 0;
    var paddedPulls = parseInt(document.getElementById('padded-pulls').value) || 0;
    var existingPulls = parseInt(document.getElementById('existing-pulls').value) || 0;
    var desiredConstellations = parseInt(document.getElementById('desired-constellations').value) || 0;
    var expectedPulls = parseInt(document.getElementById('expected-pulls').value) || 0;

    // 定义一些基础常量
    const pullsPerConstellation = 160; // 每个命座所需的抽数
    const primogemsPerPull = 160; // 每次抽卡所需的原石数
    const crystalsPerPrimogem = 1; // 结晶兑换原石的比例

    // 计算当前原石可以抽卡的次数
    var totalPrimogems = primogems + (crystals * crystalsPerPrimogem);
    var totalPullsAvailable = Math.floor(totalPrimogems / primogemsPerPull) + existingPulls;

    // 计算可以实现的命座数量或期望抽数
    var targetPulls = desiredConstellations > 0 ? desiredConstellations * pullsPerConstellation : expectedPulls;
    var pullsNeeded = targetPulls + paddedPulls - totalPullsAvailable;

    // 计算需要的原石和结晶
    var primogemsNeeded = pullsNeeded * primogemsPerPull;
    var crystalsNeeded = primogemsNeeded - totalPrimogems;

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
    let bestRechargeSolution = [];
    if (crystalsNeeded > 0) {
        let sortedTiers = Object.keys(rechargeTiers).sort((a, b) => b - a);
        for (let tier of sortedTiers) {
            let tierCrystals = rechargeTiers[tier];
            let tierPrice = parseInt(tier);
            while (crystalsNeeded >= tierCrystals) {
                bestRechargeSolution.push(tierPrice);
                crystalsNeeded -= tierCrystals;
            }
        }
        // 如果还有剩余结晶需要充值，选择最小档次补足
        if (crystalsNeeded > 0) {
            bestRechargeSolution.push(sortedTiers[sortedTiers.length - 1]);
        }
    }

    // 输出结果
    var resultString = `目前能抽出的命座数: ${Math.floor(totalPullsAvailable / pullsPerConstellation)}<br>`;
    resultString += `总共可抽次数: ${totalPullsAvailable}<br>`;
    resultString += `还需充值结晶: ${primogemsNeeded > 0 ? primogemsNeeded : 0}<br>`;
    resultString += `充值方案: ${bestRechargeSolution.join('元, ') + (bestRechargeSolution.length > 0 ? '元' : '')}`;

    document.getElementById('output').innerHTML = resultString;
}
