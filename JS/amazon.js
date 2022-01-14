import {amazonSongs} from './database.js';
//compatible with touch screen
const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
if(isMobile){
		const controls=document.querySelectorAll(".control")
		controls.forEach(control=>{
				control.style.display="none"
		})
		const contentsWrapper=document.querySelectorAll(".contents-wrapper")
		contentsWrapper.forEach(content=>{
				content.classList.add("touchable")
		})
}
//constants
const amazonOriginalSongs=document.querySelector(".amazon-original-songs")
const featureThisWeek=document.querySelector(".feature-this-week")
const rediscoverTheArtist=document.querySelector(".rediscover-the-artist")
const topSongs=document.querySelector(".top-songs")
const chevLeft=document.querySelectorAll(".chev-left")
const chevRight=document.querySelectorAll(".chev-right")
const contents=document.querySelectorAll(".contents")
const albumTemplate=document.querySelector("#album-temp")
const singleTemplate=document.querySelector("#single-temp")
const seeAlls=document.querySelectorAll(".see-all")
seeAlls.forEach(element=>{
		let wrapper=element.closest(".wrapper")
		let catName=wrapper.querySelector(".category-name").textContent.toLowerCase()
 let indexOfAlbum=amazonSongs.findIndex(x=>x.parent===catName.toLowerCase())
		if(indexOfAlbum>-1){
				element.href=amazonSongs[indexOfAlbum].url
		}
})
//finding index of each section
let indexOfamazonOriginalSongs=setParentIndex(amazonOriginalSongs)
let indexOffeatureThisWeek=setParentIndex(featureThisWeek)
let indexOfrediscoverTheArtist=setParentIndex(rediscoverTheArtist)
let indexOftopSongs=setParentIndex(topSongs)
//clear the contents
contents.forEach(content=>{
		content.innerHTML=""
})
//set amazon original song section
for(let i=amazonSongs[indexOfamazonOriginalSongs].child.length-1;i>amazonSongs[indexOfamazonOriginalSongs].child.length-11;i--){
		setWrapperContent(albumTemplate,amazonOriginalSongs,amazonSongs[indexOfamazonOriginalSongs].child[i])
}
//change sort of feature This Week database
for(let i=amazonSongs[indexOffeatureThisWeek].child.length-1;i>0;i--){
		let randomI=Math.floor(Math.random()*(i-1))
		let holder=amazonSongs[indexOffeatureThisWeek].child[i]
		amazonSongs[indexOffeatureThisWeek].child[i]=amazonSongs[indexOffeatureThisWeek].child[randomI]
		amazonSongs[indexOffeatureThisWeek].child[randomI]=holder
}
//set feature This Week section
for(let i=amazonSongs[indexOffeatureThisWeek].child.length-1;i>amazonSongs[indexOffeatureThisWeek].child.length-11;i--){
		setWrapperContent(albumTemplate,featureThisWeek,amazonSongs[indexOffeatureThisWeek].child[i])
}
//set rediscover The Artist section
for(let i=amazonSongs[indexOfrediscoverTheArtist].child.length-1;i>amazonSongs[indexOfrediscoverTheArtist].child.length-11;i--){
  setWrapperContent(albumTemplate,rediscoverTheArtist,amazonSongs[indexOfrediscoverTheArtist].child[i])
}
//set top songs section
for(let i=amazonSongs[indexOftopSongs].child.length-1;i>amazonSongs[indexOftopSongs].child.length-16;i--){
		setWrapperContent(singleTemplate,topSongs,amazonSongs[indexOftopSongs].child[i])
}
//overlay & more
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
//left & right button
chevLeft.forEach(chev=>{
		chev.addEventListener("click",(e)=>{
		  const wrapperTemp=e.target.closest(".wrapper")
		  const categoryName=wrapperTemp.querySelector(".category-name").textContent.toLowerCase()
		  let indexHolder=amazonSongs.findIndex(item=>item.parent.toLowerCase()===categoryName)
		  if(indexHolder>-1){
		  const contentsWrapperTemp=wrapperTemp.querySelector(".contents-wrapper")
		  const contentsTemp=contentsWrapperTemp.querySelector(".contents")
		  
		  const contWrapWidth=contentsWrapperTemp.offsetWidth
		  amazonSongs[indexHolder].counter-=contWrapWidth
if(amazonSongs[indexHolder].counter<contWrapWidth){
		amazonSongs[indexHolder].counter=0
		
}
		  contentsTemp.style.transform=`translateX(-${amazonSongs[indexHolder].counter}px)`
		  }

		})
})
chevRight.forEach(chev=>{
		chev.addEventListener("click",(e)=>{
				
				const wrapperTemp=e.target.closest(".wrapper")
				const categoryName=wrapperTemp.querySelector(".category-name").textContent.toLowerCase()
				
		  let indexHolder=amazonSongs.findIndex(item=>item.parent.toLowerCase()===categoryName)
		  if(indexHolder>-1){
		  const contentsWrapperTemp=wrapperTemp.querySelector(".contents-wrapper")
		  const contentsTemp=contentsWrapperTemp.querySelector(".contents")
		  const contWidth=contentsTemp.offsetWidth
		  const contWrapWidth=contentsWrapperTemp.offsetWidth
		  amazonSongs[indexHolder].counter+=contWrapWidth
		  if(amazonSongs[indexHolder].counter>contWidth-contWrapWidth){
		amazonSongs[indexHolder].counter=contWidth-contWrapWidth
    }
		  contentsTemp.style.transform=`translateX(-${amazonSongs[indexHolder].counter}px)`
		  }
		})
})
//set wrapper
function setWrapperContent(template,element,item) {
  const templateEl=document.importNode(template.content,true)
  
  const artThumb=templateEl.querySelector(".artist-thumb")
  artThumb.src=`${item.thumbnail}`
  artThumb.alt=`${item.artist}`
  const artImgUrl=templateEl.querySelector(".content-img")
  artImgUrl.href=`${item.url}`
  const artBtnUrl=templateEl.querySelector(".play")
  artBtnUrl.href=`${item.url}`
  const artName=templateEl.querySelector(".artist-name")
  artName.textContent=`${item.artist}`
  const artSong=templateEl.querySelector(".artist-song")
  artSong.textContent=`${item.album}`
  element.appendChild(templateEl)
}
//set parent index
function setParentIndex(element) {
		const wrapper=element.closest(".wrapper")
		const categoryName=wrapper.querySelector(".category-name").textContent
 let index=amazonSongs.findIndex(item=>item.parent.toLowerCase()===categoryName.toLowerCase())
 return index
}