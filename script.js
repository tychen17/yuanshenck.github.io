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
 
    // 展示结果
    var resultString = `目前能抽出的命座数: ${constellationsAchievable}\n`;
    resultString += `总共可抽次数: ${totalPullsAvailable}\n`;
    resultString += rechargeNeeded ? `还需充值结晶: ${rechargeAmount}` : "无需额外充值";
 
    // 如果计算出的命座数超过了用户的期望，则调整为用户期望的命座数
    if (constellationsAchievable > desiredConstellations) {
        constellationsAchievable = desiredConstellations;
    }
 
    // 计算剩余的抽数
    var remainingPullsAfterConstellations = totalPullsAvailable - (constellationsAchievable * pullsPerConstellation);
    resultString += `\n实现目标命座后剩余抽数: ${remainingPullsAfterConstellations}`;
 
    // 展示需要多少充值及最优充值档次
    // 假设这些是充值档次对应的结晶数量（按照中国区的信息）
    const rechargeTiers = {
         6480: 648,
         3280: 328,
         1980: 198,
         980: 98,
         300: 30,
         60: 6
    };
 
    // 最优充值方案
    let bestRechargeSolution = {};
    if (rechargeNeeded) {
        // 根据需要充值的金额，找出最优解
        let remainingRechargeAmount = rechargeAmount;
        for (let [crystals, price] of Object.entries(rechargeTiers).sort((a, b) => b[1] - a[1])) {
            let tierCount = Math.floor(remainingRechargeAmount / crystals);
            if (tierCount > 0) {
                bestRechargeSolution[price] = tierCount;
                remainingRechargeAmount -= tierCount * crystals;
            }
            if (remainingRechargeAmount <= 0) break;
        }
    }
 
    // 添加充值方案到结果字符串
    if (Object.keys(bestRechargeSolution).length > 0) {
        resultString += "\n最优充值档次选择:\n";
        for (let [price, count] of Object.entries(bestRechargeSolution)) {
            resultString += `${price}元档次 x ${count}\n`;
        }
    }
 
     // 显示结果
     document.getElementById('output').textContent = resultString;
 }
 
 // 确保DOM加载后再绑定事件
 document.addEventListener('DOMContentLoaded', function () {
     // 可以在这里进一步初始化或者绑定事件
 });
 