
var items = []
var val
var input = document.getElementById("input")
const debounce = (func, delay)=>{
   let timer
   return function(){
   clearTimeout(timer)
   timer = setTimeout(()=>func.apply(this),delay)
   }
}
let count = 0
const mainData = async ()=>{

var data = await fetch(`http://www.omdbapi.com/?s=${val}&apikey=c2b57a4d`)
var data2 =await data.json()
// console.log(data2)
items = data2.Search
console.log(items)

if(data2.Response == "False"){
   count++
   if(count==1){
       error()
   }else{

   }
}

console.log(data2.Search)
console.log(data2.Search[0].Title)
console.log(data2.Search[0].Poster)
console.log(data2.Search[0].Year)
console.log(data2.Search[0].imdbID)


var listElement = document.getElementById("list")
var paging = document.getElementById("pagenumbers")

var currentPage = 1
var row = 6



function displayPage(items,page,rowPerPage,divElement){
divElement.innerHTML = ""
page--

let start = rowPerPage * page
let end = start + rowPerPage

let pageItems = items.slice(start,end)
console.log(pageItems)

// iterating with each array item and getting data as per requiment
for(let i=0; i<pageItems.length; i++){
   let item = pageItems[i]
   console.log(pageItems[i])

   let itemEle = document.createElement("div")
   
   if(item.Poster == "N/A"){
       item.Poster = "http://via.placeholder.com/310x446"
   }

   itemEle.setAttribute("class","col-12 col-sm-6 offset-sm-3 offset-md-0 col-md-6 col-lg-4 box")
   itemEle.innerHTML = `
  <img class="" src="${item.Poster}"/>
   <h5 class="mt-2">${item.Title}</h5>
   <p><b>Release year: ${item.Year}</b><p>
   `
   let p = document.createElement("p")
   let button = document.createElement("a")
   button.setAttribute("href","details.html")

   button.innerHTML = "More details"

   itemEle.append(button,p)
   divElement.append(itemEle)

   button.addEventListener("click",function(){
       localStorage.setItem("id",`${item.imdbID}`)

   })

   
}
}
// no of button as per item array
function setPage(items,rowPerPage,divElement){
   divElement.innerHTML = ""

   let pageCount = Math.ceil(items.length/rowPerPage)
   for(let i=1; i<pageCount+1; i++){
   let btns =  pageButton(i,items)
   divElement.append(btns)
   }
}
// paging button
function pageButton(page,items){
   let btn = document.createElement("button")
   // btn.setAttribute("id","btn")
   btn.innerHTML = page

   if(currentPage == page){
       btn.setAttribute("class","active")
   }
   btn.addEventListener("click",()=>{
       currentPage = page
       displayPage(items,currentPage,row,listElement)

       let activeButton = document.querySelector(".paging button.active")
       activeButton.removeAttribute("class","active")
       btn.setAttribute("class","active")

   })
   return btn

}


setPage(items,row,paging)
displayPage(items,currentPage,row,listElement)


}

input.addEventListener("keyup",debounce(mainData,400))
input.addEventListener("keyup",function(){
// console.log(event.target.value)
val = event.target.value
})


const error =()=>{
alert("Movie not found")

}
