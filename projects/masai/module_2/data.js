
 async function details(){
            
    try{
        var val= localStorage.getItem("id")
var data = await fetch(`http://www.omdbapi.com/?i=${val}&apikey=c2b57a4d`)
var data2 =await data.json()
console.log(data2)

var main = document.getElementById("detail1")
var main1 = document.getElementById("detail2")

if(data2.Poster == "N/A"){
    data2.Poster = "http://via.placeholder.com/310x446"
}


main.innerHTML = `
<img class="mt-3" src="${data2.Poster}"/>
<h5 class="mt-2">${data2.Title}</h5>
<p><b>Release year: ${data2.Year}</b><p>
<a href="api.html">get back</button>
`
main1.innerHTML = `
<h5 class="mt-3">${data2.Title}</h5>
<p><b>Release on: ${data2.Released}</b><p>
<h6>Director : ${data2.Director}</h6>
<h6>Actors : ${data2.Actors}</h6>
<p>Plot: ${data2.Plot}</p>
<p>Language : ${data2.Language}</p>
<p>Imdb rating: ${data2.imdbRating}</p>
<a href="https://www.imdb.com/title/${data2.imdbID}">IMDB page</a>



`
    }catch(error){
        console.log(error)
    }
}



details()
