/**
 * Simple JWT parsing function
 * @param {*} token String 
 * @returns Object | null
 */
export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};