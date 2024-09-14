/**
 * Compares two dates using the given operator.
 *
 * @param {Date | string} firstDate - The first date to compare.
 * @param {string} operator - The operator to use for comparison.
 *     One of: 'eq', 'gt', 'lt', 'gte', 'lte'.
 * @param {Date | string} secondDate - The second date to compare.
 * @returns {boolean} The result of the comparison.
 */
export const compareDates = (firstDate, operator, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    const resultByOperator = {
        eq: date1.getTime() === date2.getTime(),
        gt: date1.getTime() > date2.getTime(),
        lt: date1.getTime() < date2.getTime(),
        gte: date1.getTime() >= date2.getTime(),
        lte: date1.getTime() <= date2.getTime(),
    };

    return resultByOperator[operator];
};
