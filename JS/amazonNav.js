//library
const libraryMenu=document.querySelector("#library-menu")
const libraryNav=document.querySelector("#library-nav")
libraryNav.addEventListener("click",()=>{
		libraryMenu.classList.toggle("show")
})
//theme
const configuration=document.querySelector("#configuration")
const setting=document.querySelector(".setting")
const nightEl=document.querySelector("#night")
const halloweenEl=document.querySelector("#halloween")
const dayEl=document.querySelector("#day")
let whichOneIsOn=[
  {
  		theme:"night",
  		condition:true
  },{
  		theme:"halloween",
  		condition:false
  },{
  		theme:"day",
  		condition:false
  }
]
let tempStorage=JSON.parse(localStorage.getItem("brightNess"))
if(tempStorage){
	whichOneIsOn=tempStorage
	setTheme()
}
configuration.addEventListener("click",()=>{
	setting.classList.toggle("show")
})
//night 
nightEl.addEventListener("click",()=>{
  let indexOfTheme=whichOneIsOn.findIndex(item=>item.theme==="night")
  whichOneIsOn.forEach(item=>{
})
  whichOneIsOn.forEach(item=>{
  	item.condition=false
  })
  whichOneIsOn[indexOfTheme].condition=true
	localStorage.setItem("brightNess",JSON.stringify(whichOneIsOn))
	setTheme()
})

//Halloween
halloweenEl.addEventListener("click",()=>{
  let indexOfTheme=whichOneIsOn.findIndex(item=>item.theme==="halloween")
  whichOneIsOn.forEach(item=>{
  	item.condition=false
  })
  whichOneIsOn[indexOfTheme].condition=true
	localStorage.setItem("brightNess",JSON.stringify(whichOneIsOn))
	setTheme()
})
//day
dayEl.addEventListener("click",()=>{
  let indexOfTheme=whichOneIsOn.findIndex(item=>item.theme==="day")
  whichOneIsOn.forEach(item=>{
  		item.condition=false
  })
  whichOneIsOn[indexOfTheme].condition=true
	localStorage.setItem("brightNess",JSON.stringify(whichOneIsOn))
	setTheme()
})
//set theme
function setTheme(){
	whichOneIsOn.forEach(item=>{
		if(item.condition===true){
			document.body.classList.add(item.theme)
			let itemName=item.theme
			switch(itemName){
				case "night":{
					nightEl.classList.add("active")
	       	halloweenEl.classList.remove("active")
          dayEl.classList.remove("active")
				}
				break;
				case "halloween":{
					nightEl.classList.remove("active")
	      	halloweenEl.classList.add("active")
          dayEl.classList.remove("active")
				}
				break;
				case "day":{
					nightEl.classList.remove("active")
	      	halloweenEl.classList.remove("active")
          dayEl.classList.add("active")
				}
				break;
			}
		}else{
			document.body.classList.remove(item.theme)
			}
	})
}