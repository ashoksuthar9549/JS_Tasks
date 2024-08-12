let i = 0;

async function getImage(){
	const url = 'https://dummyjson.com/products';
	const response = await fetch(url);
	if(!response.ok) throw new Error('Network response was not ok');
	const data = await response.json();
	
	const products = data.products;

	if(i < products.length) {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();

		img.addEventListener("load", (e) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height); 
			ctx.drawImage(img, 0, 0);
		});
		img.src = products[i].thumbnail;
		i++;
	}

	else {
		alert("No more images");
		const tryIt = document.getElementById('getImage');
		tryIt.style.display = "none";
	}

}
