//main constants
const formEl=document.querySelector(".form-el")
const errorHandling=document.querySelector(".error-handling")
const errorsEl=document.querySelector(".errors")
const showingPass=document.querySelector(".showing-pass")
const nameEl=document.querySelector("#name")
const emailEl=document.querySelector("#email")
const passwordEl=document.querySelector("#password")
const showPassword=document.querySelector("#show-password")
//submiting informations on form
formEl.addEventListener("submit",(e)=>{
		e.preventDefault()
		errorsEl.innerHTML=""
		let nameWarnings=nameErrorCheck(nameEl)
  let emailWarnings=emailErrorCheck(emailEl)
		let passWarnings=passwordErrorCheck(passwordEl)
		if(nameWarnings.length>0){
				setErrors(nameEl,nameWarnings)
		}else{
				nameEl.classList.remove("error")
		}
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
		if(nameWarnings.length===0&&emailWarnings.length===0&&passWarnings.length===0){
		  errorHandling.classList.remove("show")
		  nameEl.classList.remove("error")
				emailEl.classList.remove("error")
				passwordEl.classList.remove("error")
				alert("Welcome dear "+nameEl.value+" to Amazon music")
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
//checking name errors
function nameErrorCheck(element) {
		let warning=[]
		let elementVal=element.value
		let matches=elementVal.match(/[a-zA-Z]/g)||[]
		if(elementVal==null||elementVal===""){
				warning.push("Please enter your full name")
		}else if(matches.length===0){
				warning.push("Please enter your full name")
		}
		return warning
}
//checking email errors
function emailErrorCheck(element) {
		let warning=[]
		let elementVal=element.value
		if(elementVal==null||elementVal===""){
				warning.push("Please provide an email address")
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
		  if(elementVal.length<6){
     		warning.push("Passwords must be at least 6 characters.")
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