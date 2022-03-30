// global variables
let mainurl = 'https://api.github.com/users/';
const themediv = document.querySelector('.theme');
const themeimg = document.querySelector('.themebtn');
const themename = document.querySelector('.themename')
const mainbody = document.querySelector('body');
const userinput = document.querySelector('.maininput');
const usersearchbtn = document.querySelector('.searchbtn');
const firstname = document.querySelector('.mainname');
const gitusername = document.querySelector('.username');
const mainbio = document.querySelector('.biosection');
const gitfollowers = document.querySelector('.followers');
const gitfollowing = document.querySelector('.following');
const gitrepos = document.querySelector('.repos');
const avatar = document.querySelector('.mainpfp');
let sunsvg = `./assets/icon-sun.svg`;
let moonsvg = `./assets/icon-moon.svg`
let toggle = true;




//event listener
themediv.addEventListener('click', ()=>{
  themebtnactivity();
});


gitusername.addEventListener('click', () => {
  let targetting = gitusername.getAttribute('href');
  if(targetting){
    window.open(`${targetting}`)
  } else
  {
    alert('search a dev');
  }
})

usersearchbtn.addEventListener('click', () => {
  let inputname = userinput.value;

  finduser(inputname).then((maindata) => {
    datashow(maindata);
  }).catch((erroring) => {
    alert(erroring);
  })
})



/////////////////////




//functions
//theme functions////////////////////////////////
function themebtnactivity() {

  if(toggle == true){
    iconname(sunsvg,`light`)
    toggle = false;
  }else if (toggle == false) {
   iconname(moonsvg,`dark`);
    toggle = true;
  }



}

function iconname(svg,name) {
   themeimg.src = svg;
    themename.textContent = name;
     mainbody.classList.toggle('darktheme');


    if(svg == sunsvg){
      mainbody.style.background = `#141d2e`;
    }else{
      mainbody.style.background = `#fff`;
    }

}


//searchuser functions

function finduser(parameter1) {
    return new Promise((resolve,reject)=>{
      fetch(mainurl + `${parameter1}`).then((ifresolve)=>{
        if (ifresolve.ok)
        {
          return ifresolve.json();
        } else
        {
          reject('invalid name');
        }


      }).then((maindata)=>{
        resolve(maindata);
      })
    })
}



function datashow(catchedarray){
  console.log(catchedarray);
   firstname.textContent = catchedarray.name;
   gitusername.textContent =  `@${catchedarray.login}`;
   gitfollowers.innerHTML =`<h2 class="followers"><span>${catchedarray.followers}</span> followers</h2>`
  gitfollowing.innerHTML =`<h2 class="following"><span>${catchedarray.following}</span> followings</h2>`
   gitrepos.innerHTML =   `<h2 class="repos"><span>${catchedarray.repos_url.length}</span> repos</h2>`;
  avatar.src = catchedarray.avatar_url;
  

   if(catchedarray.bio == null){
     mainbio.textContent = `this profile has no bio`
   } else
   {
     mainbio.textContent = catchedarray.bio;
  }
  
  gitusername.setAttribute('href', `${catchedarray.html_url}`);
}


///////


















/////////////////////////////////////////////