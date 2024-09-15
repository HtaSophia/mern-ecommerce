/**
 * Generates a random string of the given length.
 * @param {number} [length=8] The length of the string to generate.
 * @return {string} The generated random string.
 */
export const generateRandomString = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
}
