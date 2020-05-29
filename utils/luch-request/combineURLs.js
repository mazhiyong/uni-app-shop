'use strict'
/**
 * @param {Object} baseURL
 * @param {Object} relativeURL
 */
export default function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}
