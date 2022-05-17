const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageNames = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Looping through images */
for(let imageName of imageNames){
    let newImage = document.createElement('img');
    let imagePath = "images/" + imageName;
    newImage.setAttribute("src", imagePath);
    newImage.addEventListener("click", function(){
        displayedImage.setAttribute("src", imagePath);
    });
    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", function(){
    let buttonMode = btn.getAttribute("class");
    
    if(buttonMode === "dark"){
        btn.className = "light";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        btn.textContent = "Lighten";
    } 
    else{
        btn.className = "dark";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
        btn.textContent = "Darken";
    }
});