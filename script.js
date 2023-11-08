function calculate() {
    // 获取用户输入的值
    var crystals = parseInt(document.getElementById('crystals').value) || 0;
    var primogems = parseInt(document.getElementById('primogems').value) || 0;
    var paddedPulls = parseInt(document.getElementById('padded-pulls').value) || 0;
    var existingPulls = parseInt(document.getElementById('existing-pulls').value) || 0;
    var desiredConstellations = parseInt(document.getElementById('desired-constellations').value) || 0;
    var desiredPulls = parseInt(document.getElementById('desired-pulls').value) || 0;

    // 如果两个都填了，或者两个都没填，给出错误提示
    if ((desiredConstellations > 0 && desiredPulls > 0) || (desiredConstellations === 0 && desiredPulls === 0)) {
        alert('请只输入“需要命座”或者“期望抽数”中的一个值。');
        return;
    }

    // 定义一些基础常量
    const pullsPerConstellation = 160; // 每个命座所需的抽数
    const primogemsPerPull = 160; // 每次抽卡所需的原石数
    const crystalsPerPrimogem = 1; // 结晶兑换原石的比例

    // 如果用户输入了期望抽数，我们将使用它来计算需要的命座数
    if (desiredPulls > 0) {
        desiredConstellations = Math.ceil((desiredPulls - paddedPulls) / pullsPerConstellation);
    }

    // 计算当前原石可以抽卡的次数
    var totalPrimogems = primogems + (crystals * crystalsPerPrimogem);
    var totalPullsAvailable = Math.floor(totalPrimogems / primogemsPerPull) + existingPulls;

    // 计算可以实现的命座数量
    var constellationsAchievable = Math.floor((totalPullsAvailable - paddedPulls) / pullsPerConstellation);

    // 计算还需要多少抽数来实现目标命座数
    var pullsNeededForDesiredConstellations = (desiredConstellations * pullsPerConstellation) + paddedPulls - existingPulls;
    var primogemsNeeded = pullsNeededForDesiredConstellations * primogemsPerPull - primogems;

    // 检查是否需要充值以及充值的金额
    var rechargeNeeded = primogemsNeeded > 0;
    var rechargeAmount = Math.ceil(primogemsNeeded / crystalsPerPrimogem);

    // 更新充值档次对应的结晶数量
    const rechargeTiers = {
        8080: 648,
        3880: 328,
        2240: 198,
        1090: 98,
        330: 30,
        60: 6
    };

    // 其余的代码将根据这些新的输入和常量进行相同的逻辑处理……
    // 确定最优充值档次，更新结果显示等
}
// 请继续使用上面的逻辑来计算最优充值档次，并将结果显示在页面上。
