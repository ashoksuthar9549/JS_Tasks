const form = document.getElementById("formcontainer");
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const submitBtn = document.getElementById("submitBtn");
const error = document.getElementById("error__msg");
const language = document.querySelectorAll('input[name="language"]');
const gender = document.getElementById("gender");
const techstack = document.querySelectorAll('input[name="techstack"]');

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();


    if(!username.value.trim() || !isValidUsername(username.value)) {
        displayError("Please enter a valid username");
        return;
    }

    if(!phone.value.trim() || !isValidPhone(phone.value)) {
        displayError("Please enter a valid phone number");
        return;
    }

    if(!email.value.trim() ||!isValidEmail(email.value)) {
        displayError("Please enter a valid email");
        return;
    }


    if(!password.value.trim() || !isValidPassword(password.value)) {
        displayError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
    }

    if(!cpassword.value.trim() || !isValidCPassword(password.value, cpassword.value)) {
        displayError("Passwords do not match");
        return;
    }

    if(!isDropdownSelected(gender)) {
        displayError("Please select your gender");
        return;
    }

    if(!ischeckboxChecked(language)){
        displayError("Please select at least one language");
        return;
    };

    if(!isRadioButtonSelected(techstack)) {
        displayError("Please select your tech stack");
        return;
    }

    displayError("");
    form.submit();
});

function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

function isValidPhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function isValidCPassword(password, cpassword) {
    return password === cpassword;
}

function ischeckboxChecked(checkbox) {
    let isChecked = false;
    checkbox.forEach((lang) => {
        if(lang.checked){
            isChecked = true;
        }   
    })
    return isChecked;
}

function isDropdownSelected(dropdown) {
    return dropdown.value !== "select";
}

function isRadioButtonSelected(radioButton) {
    let isSelected = false;
    radioButton.forEach((techstack) => {
        if(techstack.checked){
            isSelected = true;
        }   
    })
    return isSelected;
}

function displayError(msg) {
    error.style.display = "block";
    error.innerHTML = msg;
}  