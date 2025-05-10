function checkSim(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [];

    for (let i = 0; i <= m; i++) {
        dp[i] = [i];
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[m][n];
}

console.log(levenshtein("kitten", "sitting"));
