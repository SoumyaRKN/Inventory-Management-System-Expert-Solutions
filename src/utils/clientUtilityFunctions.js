"use client"

/**
 * Utility function to make a request to the provided URL.
 * @param {String} url - Full URL string of the API. Example: http://127.0.0.1/api/user
 * @param {Object} [options={}] - Object containing fetch API configs. Default is an empty object.
 * @returns {Promise<Object>} - Resolved to an object with status and data or error message.
 */
export const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) return { status: false, error: res.statusText || 'Unknown error occurred!' };

    const response = await res.json();

    return response;
  } catch (error) {
    console.log(error);
    return { status: false, error: error.message || 'Something went wrong!' };
  }
};