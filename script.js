function calculate() {
    // Get user input values
    var crystals = parseInt(document.getElementById('crystals').value) || 0;
    var primogems = parseInt(document.getElementById('primogems').value) || 0;
    var paddedPulls = parseInt(document.getElementById('padded-pulls').value) || 0;
    var existingPulls = parseInt(document.getElementById('existing-pulls').value) || 0;
    var desiredConstellations = parseInt(document.getElementById('desired-constellations').value) || 0;
    var expectedPulls = parseInt(document.getElementById('expected-pulls').value) || 0;

    // Constants
    const primogemsPerPull = 160; // Primogems needed per pull
    const pullsPerConstellation = 160; // Pulls needed per constellation

    // Total primogems available (crystals are equal to primogems)
    var totalPrimogems = crystals + primogems;
    var totalPullsAvailable = Math.floor(totalPrimogems / primogemsPerPull) + existingPulls;

    // Calculate target pulls based on desired constellations or expected pulls
    var targetPulls = desiredConstellations > 0 ? (desiredConstellations * pullsPerConstellation) + paddedPulls : expectedPulls;

    // Calculate pulls needed to reach the target
    var pullsNeeded = Math.max(targetPulls - totalPullsAvailable, 0);

    // Calculate primogems needed for the remaining pulls
    var primogemsNeeded = pullsNeeded * primogemsPerPull;

    // Calculate the best recharge solution
    const rechargeTiers = {
        648: 8080,
        328: 3880,
        198: 2240,
        98: 1090,
        30: 330,
        6: 60
    };

    let bestRechargeSolution = {};
    let remainingPrimogems = primogemsNeeded;
    Object.keys(rechargeTiers).sort((a, b) => b - a).forEach(tier => {
        bestRechargeSolution[tier] = 0;
        while (remainingPrimogems >= rechargeTiers[tier]) {
            bestRechargeSolution[tier]++;
            remainingPrimogems -= rechargeTiers[tier];
        }
    });

    // Output results
    var resultString = `目前能抽出的命座数: ${Math.floor((totalPullsAvailable - paddedPulls) / pullsPerConstellation)}<br>`;
    resultString += `总共可抽次数: ${totalPullsAvailable}<br>`;
    resultString += `还需充值结晶: ${primogemsNeeded}<br>`;

    // Only show the recharge plan if additional primogems are needed
    if (primogemsNeeded > 0) {
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
