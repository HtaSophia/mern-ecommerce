import { format, subDays, addDays } from "date-fns";

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

/**
 * Formats a date as a string in the format "YYYY-MM-DD".
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
};

/**
 * Gets an array of the last seven days in the format "YYYY-MM-DD".
 * Ordered from oldest to newest.
 *
 * @returns {string[]} The array of date strings.
 */
export const getLastSevenDays = () => {
    const oneWeekAgoDate = subDays(new Date(), 7);

    const days = [formatDate(oneWeekAgoDate)];

    for (let day = 1; day <= 6; day++) {
        days.push(formatDate(addDays(oneWeekAgoDate, day)));
    }

    return days;
};
