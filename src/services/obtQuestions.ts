export const obtQuestions = async () => {
  //recuperamos de una api...en este caso de localhost y hacemos un fetch
  const res = await fetch('http://localhost:5173/data.json')
  const json = await res.json() //convertimos la respuesta en json

  return json
}

export async function obtQuestionsApi(url: string) {
  const token = '7iDXlF2pDscewTsPD3OySNtmlI4mAo4byQW41Kig'
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        //'Content-Type': 'application/json',
        'X-Api-Key': `${token}`,
      },
      // body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      )
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    throw error // Re-lanzar el error para que pueda ser capturado por el código que llama a esta función
  }
}
