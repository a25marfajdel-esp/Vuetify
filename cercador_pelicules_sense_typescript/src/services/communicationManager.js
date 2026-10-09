const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=6f83b461&"
export async function cercarpelicula(text){
    const url = `${URL}s=${text}`
    const resposta = await fetch(url)
    const dades = await resposta.json()
    console.log(dades)

    return dades.Search
}

export async function cercarPeliculaInfo(id){
    const url = `https://www.omdbapi.com/?i=${id}&apikey=6f83b461`
    const resposta = await fetch(url)
    const dades = await resposta.json()

    return dades
}