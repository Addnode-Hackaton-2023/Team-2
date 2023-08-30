export function randomChoice<T>(list: Array<T>) {
  return list[Math.floor(Math.random() * list.length)];
}
