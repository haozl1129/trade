/**
 * 
 * 票面金额a，贴现日期b，到期日c，计息天数d，月利率e，年利率f，调整天数g，每十万手续费h，每十万扣款i，贴现利息j，贴现金额k
 * 
 * 费率算法
 * 
票面金额a，每十万贴息b，贴现日期c，到期日d，调整天数e，计息天数f，年利率g，月利率h，贴现利息i，贴现金额j
b\c\d\e手填，
f=d-c    （算头不算尾）
d=c+半年/一年
g=b/a*10000*360/（f+e）
h=g/12
i=b*(a/10)
j=a*10000-i（或以万为单位：a-i/10000）

 */
export default {
    // 参数 月利率 返回月，年 利率
    getRateByMonth(mRate) {
        return {
            mRate,
            yRate: mRate * 12
        };
    },
    // 参数 年利率  返回月，年 利率
    getRateByYear(yRate) {
        return {
            yRate,
            mRate: yRate / 12
        };
    },
    /**
     * 
     * @param {*} money 票面金额
     * @param {*} startDate 贴现日期
     * @param {*} endDate 到期日
     * @param {*} yRate 年利率
     * @param {*} days 调整天数
     * @param {*} tenCost 每十万手续费
     * @param {*} cdays 计息天数
     * @param {*} cashInterest  贴现利息
     * @param {*} expcLntrt 每十万扣款/每十万贴息
     * @param {*} discountAmount 贴现金额
     * @param {*} tenDeduct 每十万贴息
     * isRate : true 年化率
     * tenCost = 0, 
     */
    rate(
        money,
        startDate,
        endDate,
        yRate = 0,
        expcLntrt = 0,
        days = 0,
        isRate = true
    ) {
        money = money * 10000;
        startDate = parseInt((startDate || 0) / (1000 * 60 * 60 * 24));
        endDate = parseInt((endDate || 0) / (1000 * 60 * 60 * 24));
        let discountAmount = 0;
        let mRate = 0;
        let cdays = 0;
        let cashInterest = 0;
        if (startDate !== 0 && endDate !== 0) {
            cdays = endDate - startDate + days * 1;
            if (isRate) {
                cashInterest = (money * yRate * cdays / 360).toFixed(2);
                expcLntrt = (cdays * yRate / 360 * 100000).toFixed(2);
            } else {
                yRate = (expcLntrt / (cdays / 360 * 100000)).toFixed(4);
                cashInterest = (money * yRate * cdays / 360).toFixed(2);
            }
            discountAmount = (money - cashInterest).toFixed(2);
            mRate = yRate / 12 * 100;
        }
        yRate = (yRate * 100).toFixed(2);
        return {
            cdays,
            expcLntrt,
            cashInterest,
            discountAmount,
            yRate: yRate,
            mRate
        };
    },
    // ----
    tenthousand(money, startDate, endDate, tenDeduct = 0, days = 0, yRate = 0) {
        startDate = parseInt((startDate || 0) / (1000 * 60 * 60 * 24));
        endDate = parseInt((endDate || 0) / (1000 * 60 * 60 * 24));
        const cdays = endDate - startDate + days * 1;
        //const yRate = (tenDeduct / money * 10000 * 360 / cdays) / (100 * 10000);
        console.log(yRate, tenDeduct, yRate && yRate !== 0 && tenDeduct === 0);
        if (yRate && yRate !== 0 && (tenDeduct === 0 || tenDeduct == '')) {
            tenDeduct = yRate * money * 10 / money;
        } else {
            yRate = tenDeduct * money / 10 / money;
        }
        const cashInterest = tenDeduct * (money / 10);
        const discountAmount = money * 10000 - cashInterest;
        const mRate = yRate / 12;
        return { cdays, cashInterest, discountAmount, yRate, mRate, tenDeduct };
    }
};
// 票面金额a（单位万元），每十万贴息b，贴现日期c，到期日d，调整天数e，计息天数f，年利率g，月利率h，贴现利息i，贴现金额j
// b\c\d手填
// e（可手改）
// f=d-c    （算头不算尾）
// d=c+半年/一年
// g=(b*a/10)/a
// h=g/12
// i=b*(a/10)
// j=a*10000-i
