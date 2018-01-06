/**
 * Sets the state attribute to the current timestamp, ignoring action.type and previous state
 * @return {number}
 */
export default function lastActionTimestampReducer() {
  return Date.now();
}
