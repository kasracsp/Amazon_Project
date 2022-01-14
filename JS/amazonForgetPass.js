//main constants
const formEl=document.querySelector(".form-el")
const errorsEl=document.querySelector(".errors")
const errorHandling=document.querySelector(".error-handling")
const emailEl=document.querySelector("#email")
//example database list
const list=[
		{
		email:"kasra@gmail.com",
		password:"kasraCSP"
		},
		{
				email:"koosha@gmail.com",
		password:"kooshaCSP"
		}
]
//set characters that we need to gender a new pass
const upperChar=setChar(65,90)
const lowerChar=setChar(97,122)
const numberChar=setChar(48,57)
const specialChar=setChar(33,47).concat(setChar(58,64))
const allChar=upperChar.concat(lowerChar).concat(numberChar).concat(specialChar)
//recieving a new pass
formEl.addEventListener("submit",(e)=>{
		e.preventDefault()
		errorsEl.innerHTML=""
		let warnings=checkError()
		if(warnings.length>0){
				setErrors(emailEl,warnings)
		}else{
		  let newPass=passGenerator()
		  errorHandling.classList.remove("show")
				emailEl.classList.remove("error")
				alert(`Your new password is ${newPass}`)
		}
})
//check errors
function checkError() {
		let warning=[]
		let emailVal=emailEl.value.toLowerCase()
		if(emailVal==null||emailVal===""){
				warning.push("Please provide your email-address or mobile phone number")
		}else{
 let emailIndex=list.findIndex(item=>item.email===emailVal)
				if(emailIndex<0){
						warning.push("Email-address or phone number doesn't exist")
				}
		}
		return warning
}
//set errors
function setErrors(element,list) {
		 list.forEach(warn=>{
						let li=document.createElement("li")
						li.classList.add("error")
						li.textContent=warn
       errorsEl.appendChild(li)
				})
				errorHandling.classList.add("show")
				element.classList.add("error")
}
//this function make an array for pass character
function setChar(low,high){
  let charHolder=[]
		for(let i=low;i<=high;i++){
				charHolder.push(i)
		}
		return charHolder
}
//password generator
function passGenerator() {
  let newPassHolder=""
		for(let i=0;i<10;i++){
				let randomIndex=Math.floor(Math.random()*allChar.length)
				newPassHolder+=String.fromCharCode(allChar[randomIndex])
		}
		return newPassHolder
}