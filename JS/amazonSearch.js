import {amazonSongs} from './database.js';
//constants
const wrapper=document.querySelector(".wrapper")
const searchConstantList=document.querySelector("#search-constant-list")
const searchSuggestionList=document.querySelector("#search-suggestion-list")
const searchOut=document.querySelector("#search-out")
const mainSearch=document.querySelector(".main-search")
const mainSearchInput=document.querySelector("#main-search-input")
const mainSearchButton=document.querySelector("#main-search-button")
const deleteSearchButton=document.querySelector("#delete-search-text")
//mapping the information we need from the database
const amazonMappingInfo=amazonSongs.flatMap(item=>{
	return item.child.map(children=>{
   return {
						artist:children.artist,
						album:children.album,
						url:children.url,
						songs:children.songs
				}
		})
})
const amazonMappingSongs=amazonMappingInfo.flatMap(item=>{
	return item.songs.map(children=>{
   return {
						url:item.url,
						name:children.name
				}
		})
})
//set main contents
setWrapperContent()
searchOut.addEventListener("click",()=>{
		mainSearch.classList.remove("hide")
		mainSearchInput.focus()
		setWrapperContent()
})
//main search button
mainSearchButton.addEventListener("click",()=>{
		mainSearch.classList.add("hide")
		setWrapperContent()
})
//delete search botton
deleteSearchButton.addEventListener("click",()=>{
		mainSearchInput.value=""
		mainSearchInput.focus()
		setWrapperContent()
})
//set datas by every change in input
mainSearchInput.addEventListener("input",()=>{
		if(mainSearchInput.value==null||mainSearchInput.value===""){
				setWrapperContent()
		}else{
				setSuggestionContent()
		}
})
//set main content function
function setWrapperContent() {
  wrapper.innerHTML=""
		const searchTempList=document.importNode(searchConstantList.content,true)
		wrapper.appendChild(searchTempList)
}
//suggestion contents
function setSuggestionContent() {
  wrapper.innerHTML=""
  const searchTempList=document.importNode(searchSuggestionList.content,true)
  let sugUl=searchTempList.querySelector("#suggestion-list")
		sugUl.innerHTML=""
  
  		const tempArtistList=amazonMappingInfo.filter(item=>{
  let itemIndex=item.artist.toLowerCase().indexOf(mainSearchInput.value.toLowerCase())
  if(itemIndex>-1){
  		return item
  		}
  })
  
  const tempAlbumList=amazonMappingInfo.filter(item=>{
  let itemIndex=item.album.toLowerCase().indexOf(mainSearchInput.value.toLowerCase())
  if(itemIndex>-1){
  		return item
  		}
  })
  
    const tempSongList=amazonMappingSongs.filter(item=>{
  let itemIndex=item.name.toLowerCase().indexOf(mainSearchInput.value.toLowerCase())
  if(itemIndex>-1){
  		return item
  		}
  })
 
  tempAlbumList.forEach(item=>{
  		let li=document.createElement("li")
  		li.classList.add("suggestion-item")
  		let a=document.createElement("a")
  		a.textContent=item.album.toLowerCase()
  		a.href=item.url
  		li.appendChild(a)
  		sugUl.appendChild(li)
  })
  tempArtistList.forEach(item=>{
  		let li=document.createElement("li")
  		li.classList.add("suggestion-item")
  		let a=document.createElement("a")
  		a.textContent=item.artist.toLowerCase()
  		a.href=item.url
  		li.appendChild(a)
  		sugUl.appendChild(li)
  })
  tempSongList.forEach(item=>{
  		let li=document.createElement("li")
  		li.classList.add("suggestion-item")
  		let a=document.createElement("a")
  		a.textContent=item.name.toLowerCase()
  		a.href=item.url
  		li.appendChild(a)
  		sugUl.appendChild(li)
  })
		wrapper.appendChild(searchTempList)
}