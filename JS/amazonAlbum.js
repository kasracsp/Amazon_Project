import {amazonSongs} from './database.js';
//constants
const parentAlbum=getParameterByName('parent')
const parentType=document.querySelector("#parent-type")
const albumWrapper=document.querySelector(".album-wrapper")
const albumTemp=document.querySelector("#album-temp")
const podcastEl=document.querySelector("#podcast-el")
const libraryNav=document.querySelector("#library-nav")
const pagination=document.querySelector(".pagination")
 let lengthOfChilds=0
 let numberOfPagination=0
 let choosenPag=1
 let tempAmazonList=[]
//if sending params be podcast we need some changes
if(parentAlbum.toLowerCase()==="podcast"){
		podcastEl.classList.add("active")
	  libraryNav.classList.remove("active")
}
//set contents 
if(parentAlbum.toLowerCase()==="all category"){
  parentType.textContent=parentAlbum
  tempAmazonList=amazonSongs.flatMap(parent=>{
		return parent.child
	})
	pagination.innerHTML=""
  lengthOfChilds=tempAmazonList.length
  numberOfPagination=Math.ceil(lengthOfChilds/20)
  if(numberOfPagination>1){
    paginationGender(numberOfPagination,choosenPag)
    renderPage(tempAmazonList)
  	}else{
    renderPage(tempAmazonList)
		}
	}else{
		let parentIndex=amazonSongs.findIndex(item=>item.parent===parentAlbum)
		parentType.textContent=amazonSongs[parentIndex].parent
		tempAmazonList=amazonSongs[parentIndex].child
		pagination.innerHTML=""
		lengthOfChilds=tempAmazonList.length
		numberOfPagination=Math.ceil(lengthOfChilds/20)
		
		if(numberOfPagination>1){
			paginationGender(numberOfPagination,choosenPag)
			renderPage(tempAmazonList)
		}else{
			renderPage(tempAmazonList)
		}
}
//overlay and more
moreAndOverlay()
function moreAndOverlay(){
	const overlayEl=document.querySelector(".overlay")
	const holderMine=document.querySelector(".holderMine")
	const tempMore=document.querySelector("#moreO")
	const moreEls=document.querySelectorAll(".more")
//more
	moreEls.forEach(moreEl=>{
		moreEl.addEventListener("click",(e)=>{
		holderMine.innerHTML=""
		  let x=e.pageX
		  let y=e.pageY
		  let bodyH=document.documentElement.scrollHeight
				if(y+300>bodyH){
						y=y-260
				}
		  let windowW=window.innerWidth/2
				const content=e.target.closest(".content")
				
				const morey=document.importNode(tempMore.content,true) 
				const mory=morey.querySelector(".more-option")
				if(x>windowW){
				x=x-320
		  		mory.style.top=`${y}px`
				mory.style.left=`${x}px`
		  }else{
		  		mory.style.top=`${y}px`
				mory.style.left=`${x}px`
		  }
				
				const artistName=content.querySelector(".artist-name").textContent
				const moreArtistName=mory.querySelector(".more-artist-name")
				moreArtistName.textContent=artistName
		
		mory.classList.toggle("show")
		holderMine.appendChild(morey)
		overlayEl.classList.toggle("show")
		})
	})
//overlay
	overlayEl.addEventListener("click",()=>{
		overlayEl.classList.remove("show")
		const moreOpts=document.querySelectorAll(".more-option")
		moreOpts.forEach(opt=>{
				opt.classList.remove("show")
		})
	})
}
//get parameter from another page
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//gender pagination index
function paginationGender(pagLength,index) {
  if(index>1){
  	let li=document.createElement("li")
  	li.classList.add("pag-index","pag-btn")
  	li.textContent="Prev"
  	li.addEventListener("click",renderPageByPrevBtn)
  	pagination.appendChild(li)
  }
  if(index>2){
  	let li=document.createElement("li")
 	  li.classList.add("pag-index")
 	  li.textContent="1"
 	  li.addEventListener("click",renderPageByPag)
 	  pagination.appendChild(li)
 		if(index>3){
 			let li=document.createElement("li")
 		  li.classList.add("pag-index","pag-dots")
 		  li.textContent="..."
 	    pagination.appendChild(li)
 	  }
  }
	for(let i=index-1;i<=index+1;i++){
		if(i==0){
				i++
		}
		if(i<=pagLength) {
			let li=document.createElement("li")
 		  li.classList.add("pag-index")
 	   	if(i===index){
 			  li.classList.add("active")
 	   	}
 		  li.textContent=i
 		  li.addEventListener("click",renderPageByPag)
 		  pagination.appendChild(li)
		}
  }
  if(index<pagLength-1){
 	  if(index<pagLength-2){
 			let li=document.createElement("li")
 		  li.classList.add("pag-index","pag-dots")
 			li.textContent="..."
 	    pagination.appendChild(li)
 	  }
 	  let li=document.createElement("li")
 	  li.classList.add("pag-index")
 	  li.textContent=pagLength
 	  li.addEventListener("click",renderPageByPag)
 	  pagination.appendChild(li)
  }
  if(index<pagLength){
  	let li=document.createElement("li")
  	li.classList.add("pag-index","pag-btn")
  	li.textContent="Next"
  	li.addEventListener("click",renderPageByNextBtn)
  	pagination.appendChild(li)
  }
}
function renderPageByPag(e) {
	choosenPag=parseInt(e.target.textContent)
	pagination.innerHTML=""
	paginationGender(numberOfPagination,choosenPag)
	albumWrapper.innerHTML=""
	renderPage(tempAmazonList)
	moreAndOverlay()
}
//render page
function renderPage(list) {
	for(let i=((choosenPag-1)*20);i<(choosenPag*20);i++){
		if(i>=list.length){
			return
		}
		const temp=document.importNode(albumTemp.content,true)
		const artistThumb=temp.querySelector(".artist-thumb")
		artistThumb.src=list[i].thumbnail
		const artistSong=temp.querySelector(".artist-song")
		artistSong.textContent=list[i].album
		const artistName=temp.querySelector(".artist-name")
		artistName.textContent=list[i].artist
		const contentImg=temp.querySelector(".content-img")
		contentImg.href=list[i].url
		const play=temp.querySelector(".play")
		play.href=list[i].url
		albumWrapper.appendChild(temp)
	}
}
//render page by clicking on previous btn
function renderPageByPrevBtn(){
	choosenPag--
	pagination.innerHTML=""
	paginationGender(numberOfPagination,choosenPag)
	albumWrapper.innerHTML=""
	renderPage(tempAmazonList)
	moreAndOverlay()
}
//render page by clicking on next btn
function renderPageByNextBtn(){
	choosenPag++
	pagination.innerHTML=""
	paginationGender(numberOfPagination,choosenPag)
	albumWrapper.innerHTML=""
	renderPage(tempAmazonList)
	moreAndOverlay()
}