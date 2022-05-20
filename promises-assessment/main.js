const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: "forwards"
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");


/*Method 1: Using successive callbacks (CALLBACK HELL!!!!!)*/

/*Method 2: Using promise chaining*/
//animateAlicesPromiseChaining();
function animateAlicesPromiseChaining() {
  const anim1Promise = alice1.animate(aliceTumbling, aliceTiming).finished;
  anim1Promise.then(() => {
    const anim2Promise = alice2.animate(aliceTumbling, aliceTiming).finished;
    anim2Promise.then(() => {
      alice3.animate(aliceTumbling, aliceTiming);
    });
  });
}

/*Method 3: Using async and await*/
animateAlicesAsync();
async function animateAlicesAsync(){
  await alice1.animate(aliceTumbling, aliceTiming).finished;
  await alice2.animate(aliceTumbling, aliceTiming).finished;
  alice3.animate(aliceTumbling, aliceTiming);
}