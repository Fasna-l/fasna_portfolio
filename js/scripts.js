(() => {
    "use strict";
    
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const submitSuccessMessage = document.getElementById("submitSuccessMessage");
    const submitErrorMessage = document.getElementById("submitErrorMessage");

    contactForm.addEventListener('submit',event => {
        //Reset the message(custom validation message)
        nameInput.setCustomValidity("");
        phoneInput.setCustomValidity("");

        //custom name validation
        if (/\d/.test(nameInput.value)){
            nameInput.setCustomValidity("Name should not contain numbers.");
        }
        //Custom phone number validation
        if(!/^\+?\d{10,15}$/.test(phoneInput.value)){
            phoneInput.setCustomValidity("Phone number is not valid.");
        }

        if (!contactForm.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
        } else{
            event.preventDefault();

            //create emailjs accound.and get service id,templete id,and private key.message comes to email

            emailjs
             .sendForm("service_um45l1t","template_w1o5l15","#contactForm")
             .then(
                (Response)=>{
                    //show success message
                    submitSuccessMessage.style.display="block";

                    //reset contact form(when it become success)
                    contactForm.reset();
                    contactForm.classList.remove("was-validated");

                    //Hide success message after 3 seconds
                    setTimeout(function(){
                        submitSuccessMessage.style.display="none";
                    },3000);

                    console.log("success!",Response.status,Response.text);
                },
                (error)=>{
                    //show error message
                    submitErrorMessage.style.display="block";

                    //Hide error message after 3 seconds
                    setTimeout(function(){
                        submitErrorMessage.style.display="none";
                    },3000);
                    
                    console.log("FAILED...",error);
                }
            );
        }
        
        contactForm.classList.add("was-validated");
    },
    false
);

})();