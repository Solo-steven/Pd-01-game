/**
 *   --------  Init variable  --------
 */

  // Init Canvas and backCanvas
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
  // Init text color 
const textColors=['#50A0BF', '#337AA6', '#144673'];
  // Init RainFall color
const rainDropColor = 'rgba(101, 206, 40, 0.808)';
const rainBackColor = 'rgba(0,0,0,.1)'
  // Init Animation object
let textAnimation = new TextAnimation(canvas , ctx , 'IMS Lab' , textColors);
let fadeAnimation = new FadeAnimation(canvas , ctx , 10, 10 ,0.15 ,0); 
let rainfallAnimation = new RainFallAnimation(canvas , ctx ,1000 ,rainDropColor ,rainBackColor);
  // Init html event varibale
const heading = document.getElementById('heading');

/**
 *   ------  Init function ------- 
 */

function onPushEnter(){
   heading.className = 'text-wrap-active';
   heading.children[4].className= 'text-active'
   fadeAnimation.init();
   requestAnimationFrame(animateManager);
}

function animateBack(){
  if(fadeAnimation.end())
    return ;
  setTimeout(()=>{
    rainfallAnimation.animate();
    requestAnimationFrame (animateBack)}
    , 25);
}

function animateManager() {
    fadeAnimation.animate();
    if(fadeAnimation.end()){
        heading.style.display="none";
        fadeAnimation.destroy();
        textAnimation.animate();
    }
    requestAnimationFrame(animateManager);
}

/**
 *   Set up 
 */
heading.addEventListener('click', onPushEnter);   
rainfallAnimation.init();
textAnimation.init();
requestAnimationFrame(animateBack);