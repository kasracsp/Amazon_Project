//main constants
const formEl=document.querySelector(".form-el")
const errorHandling=document.querySelector(".error-handling")
const errorsEl=document.querySelector(".errors")
const showingPass=document.querySelector(".showing-pass")
const emailEl=document.querySelector("#email")
const passwordEl=document.querySelector("#password")
const showPassword=document.querySelector("#show-password")
const keepSign=document.querySelector("#keep-sign")
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
let emailIndex
//submiting informations on form
formEl.addEventListener("submit",(e)=>{
		e.preventDefault()
		errorsEl.innerHTML=""
  let emailWarnings=emailErrorCheck(emailEl)
		let passWarnings=passwordErrorCheck(passwordEl)
		if(emailWarnings.length>0){
				setErrors(emailEl,emailWarnings)
		}else{
				emailEl.classList.remove("error")
		}
		if(passWarnings.length>0){
				setErrors(passwordEl,passWarnings)
		}else{
				passwordEl.classList.remove("error")
		}
		if(emailWarnings.length===0&&passWarnings.length===0){
		  errorHandling.classList.remove("show")
				emailEl.classList.remove("error")
				passwordEl.classList.remove("error")
				alert("Welcome dear "+emailEl.value+" to Amazon music")
		}
})
//password checker
passwordEl.addEventListener("input",()=>{
		if(showPassword.checked){
		  if(passwordEl.value===""||passwordEl.value==null){
			   	passwordEl.classList.remove("active")
				  showingPass.classList.remove("active")
		  }else{
			   	passwordEl.classList.add("active")
			   	showingPass.classList.add("active")
				  showingPass.textContent=passwordEl.value
				}
		}else{
				passwordEl.classList.remove("active")
				showingPass.classList.remove("active")
		}
})
//showing password box
showPassword.addEventListener("change",()=>{
		if(passwordEl.value===""||passwordEl.value==null){
				passwordEl.classList.remove("active")
				showingPass.classList.remove("active")
		}else{
				passwordEl.classList.toggle("active")
				showingPass.classList.toggle("active")
				showingPass.textContent=passwordEl.value
		}
})
//checking email errors
function emailErrorCheck(element) {
		let warning=[]
		let elementVal=element.value.toLowerCase()
		if(elementVal==null||elementVal===""){
				warning.push("Please provide your email-address or mobile phone number")
		}else{
 emailIndex=list.findIndex(item=>item.email===elementVal)
				if(emailIndex<0){
						warning.push("Email-address or phone number doesn't exist")
				}
		}
		return warning
}
//checking password errors
function passwordErrorCheck(element) {
		let warning=[]
		let elementVal=element.value
		if(elementVal==null||elementVal===""){
				warning.push("Please enter your password")
		}else{
				 if(emailIndex>-1){
				 let passFound=list[emailIndex].password
        if(passFound!==elementVal){
      		warning.push("Password is wrong")
     		 }
      }
   }
		return warning
}
//set errrors
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