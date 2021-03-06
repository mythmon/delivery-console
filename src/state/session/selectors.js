/* eslint import/prefer-default-export: "off" */

export function getSessionHistory(state, category, count = 5) {
  return state.session.history
    .filter(item => item && item.get('category') === category)
    .take(count);
}
