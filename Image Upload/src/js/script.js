const fileInput = document.getElementById('file-upload');
const browseBtn = document.getElementById('browse-btn');
const previewContainer = document.querySelector('.file-preview-section');
const errorImage = document.querySelector('.error-image');
const uploadArea = document.querySelector('.upload-area');

// Load saved images from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    savedImages.forEach(savedImage => {
        displayUploadedFile(savedImage.name, savedImage.imgSource);
    });
});

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    uploadImage(file);
});

function uploadImage(file) {
    const sizeInBytes = file.size;
    const sizeInMb = sizeInBytes / (1024 * 1024);

    if ((file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/svg+xml' || file.type === 'video/mp4') && (sizeInMb <= 50)) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            const imgSource = this.result;
            const imageName = file.name;
            displayUploadedFile(imageName, imgSource);

            // Save uploaded image to localStorage
            saveImageToLocalStorage(imageName, imgSource);
        });
        reader.readAsDataURL(file);
    } else {
        displayError("File not supported");
    }
}

function displayUploadedFile(name, imgSource) {
    const uploadedFile = document.createElement('div');
    uploadedFile.innerHTML = `
        <div class="file-preview flex items-center justify-between bg-secondary-400 rounded-lg my-4 p-4">
            <div class="flex items-center">
                <img src="${imgSource}" alt="" width="50">
                <p class="text-xl font-medium text-secondary-300 ml-4">${name}</p>
            </div>
            <img src="./assests/close-circle.png" alt="" width="30" class="ml-4 float-end cursor-pointer" onclick="removeFile('${name}')">
        </div>
    `;
    previewContainer.appendChild(uploadedFile);
}

function saveImageToLocalStorage(name, imgSource) {
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    savedImages.push({ name, imgSource });
    localStorage.setItem('uploadedImages', JSON.stringify(savedImages));
}

function removeFile(name) {
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const updatedImages = savedImages.filter(image => image.name !== name);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    // Remove from UI
    document.querySelectorAll('.file-preview').forEach(element => {
        if (element.querySelector('p').innerText === name) {
            element.remove();
        }
    });
}

function displayError(errorMessage) {
    const errorFile = document.createElement('div');
    errorFile.innerHTML = `
        <div class="file-preview flex items-center bg-secondary-400 rounded-lg my-4 p-4">
            <img src="./assests/Error.svg" alt="" width="50">
            <p class="text-xl font-medium text-red-500 ml-4">${errorMessage}</p>
        </div>
    `;
    previewContainer.appendChild(errorFile);
    setTimeout(() => {
        errorFile.remove();
    }, 3000);
}

uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadImage(file);
});
