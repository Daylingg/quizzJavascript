export const obtQuestions = async () => {
  //recuperamos de una api...en este caso de localhost y hacemos un fetch
  const res = await fetch('http://localhost:5173/data.json')
  const json = await res.json() //convertimos la respuesta en json

  return json
}
