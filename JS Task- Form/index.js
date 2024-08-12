const tab = document.querySelectorAll('.tab__item');
const content = document.querySelectorAll('.content__item');
const prevBtn = document.querySelector('.tab__button--prev');
const nextBtn = document.querySelector('.tab__button--next');
const submitBtn = document.querySelector('.tab__button--submit');
const tabIndicator = document.querySelectorAll('.tab__indicator');
const tabLineLeft = document.querySelectorAll('.tab__line__left');
const tabLineRight = document.querySelectorAll('.tab__line__right');
const uploadBtn = document.querySelectorAll('.file__upload__wrapper');
const fileInput = document.querySelectorAll('input[type="file"]');
const permanentDetailsCheck = document.querySelector('#permanent__checkbox');
const permanentDetailsWrapper = document.querySelector('.permanent__details .form__wrapper');
const toaster = document.querySelector('.toaster');
let pageCount = 1;
let isFormValid = false;

permanentDetailsCheck.addEventListener('click', () => {
    if(permanentDetailsCheck.checked) {
        permanentDetailsWrapper.classList.add('hidden');
    } else {
        permanentDetailsWrapper.classList.remove('hidden');
    }
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isGotoNextStep = validation();
    console.log(isGotoNextStep);
    if(isGotoNextStep) {
        nextStep();
    }

    // nextStep();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevStep();
});

// tab click navigation code here
// tab.forEach((item) => {
//     item.addEventListener('click', function () {

//         tab.forEach((item) => {
//             item.classList.remove('tab__item--active');
//         })
//         this.classList.add('tab__item--active');


//         content.forEach((item) => {
//             item.classList.remove('content__item--active');
//         })
//         const element = document.getElementById(`tab__content-${this.dataset.tab}`);
//         element.classList.add('content__item--active');
//     })
// });

function nextStep() {
    if(pageCount < 4) {
        console.log("next button clicked");
        prevBtn.classList.remove('hidden');
        tab.forEach((item) => {
            item.classList.remove('tab__item--active');
        })
        tab[pageCount].classList.add('tab__item--active');
        
        content.forEach((item) => {
            item.classList.remove('content__item--active');
        })
        const element = document.getElementById(`tab__content-${pageCount + 1}`);
        element.classList.add('content__item--active');

        tabIndicator[pageCount].classList.add('tab__indicator--active');
        tabLineRight[pageCount - 1].classList.add('tab__line--active');
        if(pageCount < 3) {
            tabLineLeft[pageCount].classList.add('tab__line--active');
        }

        pageCount++;

        if(pageCount === 4) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    }
}

function prevStep() {
    if(pageCount > 1) {
        console.log("prev button clicked");
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
        tab.forEach((item) => {
            item.classList.remove('tab__item--active');
        })
        tab[pageCount - 2].classList.add('tab__item--active');

        content.forEach((item) => {
            item.classList.remove('content__item--active');
        })
        const element = document.getElementById(`tab__content-${pageCount - 1}`);
        element.classList.add('content__item--active');

        tabIndicator[pageCount - 1].classList.remove('tab__indicator--active');
        tabLineRight[pageCount - 2].classList.remove('tab__line--active');
        if(pageCount < 4) {
            tabLineLeft[pageCount - 1].classList.remove('tab__line--active');
        }

        pageCount--;

        if(pageCount === 1) {
            prevBtn.classList.add('hidden');
        }
    }
}

function validation() {
    const currentPageData = content[pageCount - 1];
    // const allInput = currentPageData.querySelectorAll('input[type="text"], input[type="number"]');
    const allInput = currentPageData.querySelectorAll('[data-input="text"], input[type="number"]');
    const allRadio = currentPageData.querySelectorAll('.radio');
    const allDropdown = currentPageData.querySelectorAll('select');
    const allDateInput = currentPageData.querySelectorAll('input[type="date"]');
    const allFileInput = currentPageData.querySelectorAll('input[type="file"]');
    let isValid = true;

    allInput.forEach((item) => {
        if (!permanentDetailsWrapper.classList.contains('hidden') || !item.closest('.permanent__details')) {
            const errorElement = item.nextElementSibling;
            const errorMessage = item.previousElementSibling.textContent;

            if (item.value === '') {
                errorElement.textContent = `Please enter ${errorMessage}`;
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        }
    });

    allRadio.forEach((item) => {
        const errorElement = item.parentElement.lastElementChild;
        const errorMessage = item.querySelector('label').textContent;
        const checkedRadio = item.querySelector('input[type="radio"]:checked');
        
        if (!checkedRadio) {
            errorElement.textContent = `Please select ${errorMessage}`;
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    allDropdown.forEach((item) => {
        if (!permanentDetailsWrapper.classList.contains('hidden') || !item.closest('.permanent__details')) {
            const errorElement = item.parentElement.parentElement.parentElement.lastElementChild;
            const errorMessage = item.parentElement.previousElementSibling.textContent;

            if(item.value === '') {
                errorElement.textContent = `Please select ${errorMessage}`;
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        }
    });

    allDateInput.forEach((item) => {
        const errorElement = item.nextElementSibling;
        const errorMessage = item.previousElementSibling.textContent;
        if(item.value === '') {
            errorElement.textContent = `Please enter ${errorMessage}`;
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    allFileInput.forEach((item) => {
        console.log(item.parentElement.parentElement);
        const errorElement = item.parentElement.parentElement.querySelector('.error');
        const errorMessage = item.parentElement.parentElement.querySelector('label').textContent;
        if(item.value === '') {
            errorElement.textContent = `Please upload ${errorMessage}`;
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    return isValid;
}

uploadBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
        fileInput[index].click();
    });

    fileInput[index].addEventListener('change', () => {
        clearUploadedFile(fileInput[index]);

        const isValidFile = fileValidation(fileInput[index]);
        if(isValidFile) {
            filePreview(fileInput[index]);
        }
    });
});

submitBtn.addEventListener('click', (e) => {
    console.log(e.target.value);
});

function filePreview(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // fileValidation(input);
        const image = input.parentElement.querySelector('.upload__image');
        const imageName = input.parentElement.parentElement.querySelector('.filename');
        const imageRemove = input.parentElement.querySelector('.image__remove');
        const errorMessage = input.parentElement.querySelector('.error');
        const imagePreview = input.parentElement.querySelector('.image__preview');

        if(input.getAttribute('accept') === 'application/pdf'){
            image.src = './assests/PDF-file-icon.png';
        } else{
            image.src = reader.result;
        }
        imageName.textContent = file.name;
        imageRemove.style.display = 'inline-block';
        image.style.display = 'block';
        imagePreview.style.display = 'none';

        imageRemove.addEventListener('click', (e) => {
            e.stopPropagation();
            image.src = '';
            imageRemove.style.display = 'none';
            image.style.display = 'none';
            imagePreview.style.display = 'block';
            imageName.textContent = '';
        });
    }
}

function fileValidation(input) {
    let isValidFile = true;
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const errorMessage = input.parentElement.parentElement.querySelector('.error');
    const fileUploadType = input.getAttribute('accept');
    const fileSizeInKB = Math.round(file.size / 1024);

    switch(fileUploadType) {
        case 'image/jpg':
            if((file.type !== 'image/jpg' && !(fileSizeInKB >= 10 && fileSizeInKB <= 100))) {
                errorMessage.textContent = 'Please upload image file between 10KB and 100KB only';
                isValidFile = false;
            } 
            break;

        case 'application/pdf':
            if((file.type !== 'application/pdf' || !(fileSizeInKB >= 10 && fileSizeInKB <= 200))) {
                errorMessage.textContent = 'Please upload PDF file between 10KB and 200KB only';
                isValidFile = false;
            }
            break;
    }

    return isValidFile;
}

function clearUploadedFile(input) {
    console.log(input);
    const image = input.parentElement.querySelector('.upload__image');
    const imageName = input.parentElement.parentElement.querySelector('.filename');
    const imageRemove = input.parentElement.querySelector('.image__remove');
    const errorMessage = input.parentElement.parentElement.querySelector('.error');
    const imagePreview = input.parentElement.querySelector('.image__preview');

    console.log(image);

    image.src = '';
    imageName.textContent = '';
    imageRemove.style.display = 'none';
    image.style.display = 'none';
    imagePreview.style.display = 'block';
    errorMessage.textContent = '';
}

const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formElements = form.elements;
    const formData = {};
    // console.log(formData)
    const id = Math.floor(Math.random() * 1000000) + 1;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.id && element.type !== 'submit') {
            if (element.type === 'radio') {
                if (element.checked) {
                    formData[element.name] = element.value;
                }
            } else {
                formData[element.name] = element.value;
            }
        }
    }
    // Add the generated ID to the form data
    formData.id = id;
    const existingFormData = JSON.parse(localStorage.getItem('formData')) || [];
    existingFormData.push(formData);
    const combinedFormDataString = JSON.stringify(existingFormData);
    localStorage.setItem('formData', combinedFormDataString);

    form.reset();
    submitBtn.classList.add('disabled');

    toaster.style.display = 'block';
    toaster.children[1].textContent = 'Form submitted successfully!';
    setTimeout(() => {
        toaster.style.display = 'none';
    }, 5000);

    showData(id);
});

function showData(id) {
    const data = localStorage.getItem('formData');
    const parsedData = JSON.parse(data);

    // console.log(parsedData);

    if (parsedData) {
        const dataWrapper = document.querySelector('.data__wrapper');
        const successView = document.querySelector('.success__view');
        dataWrapper.style.display = 'block';
        successView.style.display = 'none';
        
        // Clear previous data before appending new data
        dataWrapper.innerHTML = '';
        
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        let tableId = 1;

        // Create table header
        tableHead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
        `;
        table.appendChild(tableHead);

        // Create table body rows for each set of data
        parsedData.forEach(formData => {
            console.log(formData);
            console.log(formData.male);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tableId}</td>
                <td>${formData.name}</td>
                <td>${formData.gender}</td>
                <td>${formData.dob}</td>
                <td>${formData.category}</td>
                <td>
                    <button type="button" class="delete__btn btn" id="delete__btn${formData.id}" onclick="deleteData(${formData.id})"><img width="20" src="./assests/delete-data.png" alt="delete"></button>
                    <button type="button" class="edit__btn btn" id="edit__btn${formData.id}"><img width="20" src="./assests/edit.png" alt="delete" onclick="editData(${formData.id})"></button>
                    <button type="button" class="view__btn btn" id="view__btn${formData.id}" onclick="viewModal(${formData.id})"><img width="20" src="./assests/view.png" alt="delete"></button>
                </td>
            `;
            tableBody.appendChild(row);
            tableId++;
        });

        table.appendChild(tableBody);
        dataWrapper.appendChild(table);
    } else {
        console.log('No form data found in local storage.');
    }
}

function deleteData(id) {
    const data = JSON.parse(localStorage.getItem('formData'));
    const newData = data.filter((item) => {
        console.log(item.id, id);
        return item.id !== id;
    });
    localStorage.setItem('formData', JSON.stringify(newData));
    showData(id);
}

function editData(id) {
    debugger;
    const data = JSON.parse(localStorage.getItem('formData'));
    const formData = data.find((item) => item.id === id);
    console.log(formData);
    const form = document.querySelector('form');
    const formElements = form.elements;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.id && element.type !== 'submit') {
            if (element.type === 'radio') {
                if (formData[element.name] === element.value) {
                    element.checked = true;
                }
            }
            else {
                if(!(element.type === 'file')) {
                    element.value = formData[element.name];
                }
            }
        }
    }
    
    prevBtn.click();
    prevBtn.click();
    prevBtn.click();
    submitBtn.classList.remove('disabled');
    submitBtn.textContent = 'Update Data';

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const updatedFormData = { ...formData };
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.id && element.type !== 'submit') {
                if (element.type === 'radio') {
                    if (element.checked) {
                        updatedFormData[element.name] = element.value;
                    }
                } else {
                    updatedFormData[element.name] = element.value;
                }
            }
        }
        updateData(id, updatedFormData); 
    });
}

function updateData(id, updatedFormData) {
    const data = JSON.parse(localStorage.getItem('formData'));
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data[index] = updatedFormData;
        localStorage.setItem('formData', JSON.stringify(data));
        toaster.style.display = 'block';
        toaster.children[1].textContent = 'Form data updated successfully!';
        setTimeout(() => {
            toaster.style.display = 'none';
        }, 5000);
        showData();
    } else {
        toaster.style.display = 'block';
        toaster.children[1].textContent = 'Form data not found for update!';
        setTimeout(() => {
            toaster.style.display = 'none';
        }, 5000);
    }
    submitBtn.classList.add('disabled');
    submitBtn.textContent = 'Submit';
}

function viewModal(id) {
    const data = JSON.parse(localStorage.getItem('formData'));
    const formData = data.find((item) => item.id === id);
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal__overlay', 'active');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    modalHeader.innerHTML = `
                        <h3 class="modal__title">Form Data</h3>
                        <button type="button" class="modal__close" data-dismiss="modal" onclick="closeModal()">Close</button>
    `;

    modalContent.innerHTML = `
                            <div class="modal__data">
                                <div class="form__group">
                                    <span class="label">ID:</span>
                                    <span class="value">${id}</span>
                                </div>
                                <div class="form__group">
                                    <span class="label">Name:</span>
                                    <span class="value">${formData.name}</span>
                                </div>
                                <div class="form__group">
                                    <span class="label">Gender:</span>
                                    <span class="value">${formData.gender}</span>
                                </div>
                                <div class="form__group">
                                    <span class="label">Date of Birth:</span>
                                    <span class="value">${formData.dob}</span>
                                </div>
                                <div class="form__group">
                                    <span class="label">Category:</span>
                                    <span class="value">${formData.category}</span>
                                </div>
                            </div>
                        `;

    modal.appendChild(modalHeader);
    modal.appendChild(modalContent);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal__overlay');
    modalOverlay.classList.remove('active');
    modal.remove();
    modalOverlay.remove();
}

    const dropdownWraps = document.querySelectorAll('.dropdown__wrap');

    dropdownWraps.forEach(dropdownWrap => {
      const input = dropdownWrap.querySelector('input[type="text"]');
      const dropdownList = dropdownWrap.querySelector('.dropdown__list');
      const options = dropdownList.querySelectorAll('span');

      input.addEventListener('input', () => {
        const filter = input.value.toUpperCase();
        options.forEach(option => {
          const txtValue = option.textContent || option.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option.style.display = "";
          } else {
            option.style.display = "none";
          }
        });
        dropdownList.style.display = "block";
      });

      input.addEventListener('click', event => {
        event.stopPropagation();
        dropdownList.style.display = "block";
      });

      document.addEventListener('click', () => {
        dropdownList.style.display = "none";
      });

      dropdownList.addEventListener('click', event => {
        const target = event.target;
        if (target.tagName === 'SPAN') {
          input.value = target.textContent;
          input.setAttribute('data-value', target.getAttribute('value')); 
          dropdownList.style.display = "none";
        }
      });
    });