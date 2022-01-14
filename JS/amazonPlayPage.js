import {amazonSongs} from './database.js';

const parentAlbum=getParameterByName('parent')
let childAlbum=getParameterByName('child')
//following code is just in case that we have & in our sending params,so we send @ instead of & and change it here
if(childAlbum.indexOf("@")>-1){
	childAlbum=childAlbum.replace(/@/g,"&")
}
//constants  
let parentIndex=amazonSongs.findIndex(item=>item.parent===parentAlbum)
let albumIndex=amazonSongs[parentIndex].child.findIndex(item=>
		item.album===childAlbum
)
let isPlaying=false
let isMuted=false
let isShuffle=false
let songIndex=0
const overlay=document.querySelector(".overlay")
const trackEl=document.querySelector("#track-el")
const currentPoint=document.querySelector("#current-point")
const endPoint=document.querySelector("#end-point")
const rangeEl=document.querySelector("#range-el")
const holderMore=document.querySelector(".holderMore")
const moreTemp=document.querySelector("#more-temp")
const albumPlay=document.querySelector(".album-play")
const albumShuffle=document.querySelector(".album-shuffle")
const playPause=document.querySelector("#play-pause")
const playPauseText=document.querySelector("#play-pause-text")
const albumControls=document.querySelector(".album-controls")
const albumShffle=document.querySelector(".album-shuffle")
const progressBar=document.querySelector(".progress-bar")
const songsEl=document.querySelector(".songs")
const songTemp=document.querySelector("#song-temp")
const albumThumb=document.querySelector("#album-thumb")
const albumType=document.querySelector("#album-type")
const albumName=document.querySelector("#album-name")
const albumArtist=document.querySelector("#album-artist")
const albumNumber=document.querySelector("#album-number")
const albumDuration=document.querySelector("#album-duration")
const albumRelease=document.querySelector("#album-release")
//set track
setTrack()
//set main contents(album)
document.body.style.background="url("+ amazonSongs[parentIndex].child[albumIndex].thumbnail +")"
document.body.style.backgroundPosition="top center"
document.body.style.backgroundSize="cover"
document.body.style.backgroundRepeat="no-repeat"
albumThumb.src=amazonSongs[parentIndex].child[albumIndex].thumbnail
albumType.textContent=amazonSongs[parentIndex].child[albumIndex].type
albumName.textContent=amazonSongs[parentIndex].child[albumIndex].album
albumArtist.textContent=amazonSongs[parentIndex].child[albumIndex].artist
albumNumber.textContent=(amazonSongs[parentIndex].child[albumIndex].songs.length>1)?amazonSongs[parentIndex].child[albumIndex].songs.length+" songs":amazonSongs[parentIndex].child[albumIndex].songs.length+" song"
albumRelease.textContent=amazonSongs[parentIndex].child[albumIndex].release
albumDuration.textContent=setAlbumDuration()
//set main contents(songs)
songsEl.innerHTML=""
amazonSongs[parentIndex].child[albumIndex].songs.forEach((item,index)=>{
	 const temp=document.importNode(songTemp.content,true)
	 const songIndex=temp.querySelector(".song-index")
	 songIndex.textContent=index+1
	 const songThumb=temp.querySelector(".song-thumb")
	 songThumb.src=amazonSongs[parentIndex].child[albumIndex].thumbnail
  const songName=temp.querySelector(".song-name")
	 songName.textContent=item.name
  const songDuration=temp.querySelector(".song-duration")
	 songDuration.textContent=item.duration
	 songsEl.appendChild(temp)
})
const songPlays=document.querySelectorAll(".song-play")
const songMores=document.querySelectorAll(".song-more")
//song play button
songPlays.forEach(songPlay=>{
		songPlay.addEventListener("click",(e)=>{
				const song=e.target.closest(".song")
				const songName=song.querySelector(".song-name").textContent
				let indexFound=amazonSongs[parentIndex].child[albumIndex].songs.findIndex(song=>song.name.toLowerCase()===songName.toLowerCase())
				songIndex=indexFound
     setTrack()
   	 	setMusicPlay()
				
						const songEls=document.querySelectorAll(".song")
						songEls.forEach(songEl=>{
								songEl.classList.remove("active")
						})
				  song.classList.add("active")
		})
})
//more
songMores.forEach(more=>{
		more.addEventListener("click",(e)=>{
		
		holderMore.innerHTML=""
				let x=e.pageX
				let y=e.pageY
				let bodyH=document.documentElement.scrollHeight
				x=x-320
				if(y+150>bodyH){
						y=y-120
				}
				const temp=document.importNode(moreTemp.content,true)
				const moreOpt=temp.querySelector(".more-option")
				moreOpt.style.left=`${x}px`
				moreOpt.style.top=`${y}px`
				moreOpt.classList.toggle("show")
		  holderMore.appendChild(temp)
		  overlay.classList.toggle("show")
		})
})
//overlay
overlay.addEventListener("click",()=>{
		overlay.classList.remove("show")
		const moreOpts=document.querySelectorAll(".more-option")
		moreOpts.forEach(opt=>{
				opt.classList.remove("show")
		})
})
//shuffle
albumShuffle.addEventListener("click",()=>{
  if(isShuffle){
		 albumShuffle.classList.remove("active")
   isShuffle=false
  }else if(trackEl.paused){
   		albumShuffle.classList.add("active")
	   	shuffleIndex()
	   	setTrack()
    isShuffle=true
  }else{
   		albumShuffle.classList.add("active")
	  	 shuffleIndex()
    isShuffle=true
  }
})
albumPlay.addEventListener("click",()=>{
  if(isPlaying){
    setMusicStop()
  }else{
    setMusicPlay()
  }
})
//volume
const volumeEl=document.querySelector("#volume")
const volumeControll=document.querySelector('#volume-controll')
//volume buuton
volumeEl.addEventListener("click",()=>{
  if(isMuted){
   trackEl.muted=false
   volumeEl.textContent="volume_up"
   volumeControll.value=trackEl.volume
  		isMuted=false
  }else{
  	volumeEl.textContent="volume_off"
		trackEl.muted=true
    volumeControll.value=0
  	isMuted=true
  }
})
//volume range
volumeControll.addEventListener("input",()=>{
  		if(volumeControll.value==0){
  		volumeEl.textContent="volume_off"
  		trackEl.volume=volumeControll.value
  		trackEl.muted=true
  		isMuted=true
   }else{
  	  	volumeEl.textContent="volume_up"
  	  	trackEl.volume=volumeControll.value
  	  	trackEl.muted=false
  	  	isMuted=false
   }
})
//song range
rangeEl.addEventListener("change",()=>{
		trackEl.currentTime=rangeEl.value
		currentPoint.textContent=setTimeReadable(trackEl.currentTime)
})
//set track
function setTrack() {
		trackEl.src=amazonSongs[parentIndex].child[albumIndex].songs[songIndex].src
   setInterval(configTime,500)
}
//config time
function configTime() {
  rangeEl.max=trackEl.duration
  rangeEl.value=trackEl.currentTime
		currentPoint.textContent=setTimeReadable(trackEl.currentTime)
		endPoint.textContent=setTimeReadable(trackEl.duration)
		if(trackEl.ended){
		  if(isShuffle){
		  		shuffleIndex()
		  }else{
		  		songIndex++
    	}	
			if(songIndex<amazonSongs[parentIndex].child[albumIndex].songs.length){
   		  setTrack()
   	   	setMusicPlay()
				}
		}
}
//set album duration
function setAlbumDuration() {
	let sum=0
		let minute=0
	let second=0
		amazonSongs[parentIndex].child[albumIndex].songs.forEach(item=>{
			var splitTime=item.duration.split(':')
			minute = parseInt(parseInt(splitTime[0])+parseInt(minute))
			second = parseInt(parseInt(splitTime[1])+parseInt(second));
	})
	sum=(minute*60)+second
	let time=setTimeReadable(sum)
	let finalTrim=time.split(':')
	return finalTrim[0]+" minutes"
}
//set Time Readable
function setTimeReadable(input) {
		let minute=Math.floor(input/60)
		let second=Math.floor(((input/60)-minute)*60)
		if(second<10){
     				second=`0${second}`
     }
     return `${minute}:${second}`
}
//set Music Stop
function setMusicStop() {
	   	playPause.textContent="play_arrow"
    playPauseText.style.display="flex"
    playPause.classList.remove("active")
	   	progressBar.classList.remove("show")
	   	albumControls.classList.remove("show")	   
	   	trackEl.pause()	
	   	isPlaying=false
}
//set Music Play
function setMusicPlay() {
		playPause.textContent="pause"
    playPauseText.style.display="none"
    playPause.classList.add("active")
	   	progressBar.classList.add("show")
	   	albumControls.classList.add("show")
     trackEl.play()
     const currentSong=amazonSongs[parentIndex].child[albumIndex].songs[songIndex].name.toLowerCase()
     const songEls=document.querySelectorAll(".song")
     songEls.forEach(songEl=>{
     		const songName=songEl.querySelector(".song-name").textContent
     		if(songName.toLowerCase()===currentSong){
     				songEl.classList.add("active")
     		}else{
     				songEl.classList.remove("active")
     		}
     })
	   	isPlaying=true
}
//shuffle index
function shuffleIndex(){
		let randomIndex=Math.floor(Math.random()*amazonSongs[parentIndex].child[albumIndex].songs.length)
		songIndex=randomIndex
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