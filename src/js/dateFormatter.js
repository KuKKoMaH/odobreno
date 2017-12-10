/**
 *
 * @param {[Number, Number, Number]} dateArray
 */
export default (dateArray) => {
  return `${dateArray[2] < 10 ? '0' : ''}${dateArray[2]}.${dateArray[1] < 10 ? '0' : ''}${dateArray[1]}.${dateArray[0]}`;
}