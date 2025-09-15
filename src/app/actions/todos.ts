export async function getRandomTodo() {
  const res = await fetch("https://dummyjson.com/todos/random");
  const data = res.json();
  return data;
}
