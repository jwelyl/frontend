//  상황에 맞게 pre-login, post-login의 상태를 변경해주는 함수를 만들어보자.
function handleLogin(isLogin) {
  //  pre-login 요소들을 데려와보자. 배열
  let preLogins = document.querySelectorAll(".pre-login");

  // //  isLogin에 따라서 보이고 숨기고를 설정해보자.
  // //  속성(index)를 가져옴(객체의 속성을 파악하기 위한 용도, 배열에서는 속성이 index, map에서는 key)
  // for(let key in preLogins) {

  // }

  // //  전통적인 for문
  // for(let i = 0; i < preLogins.length; i++) {

  // }

  // //  value를 가져옴 - java의 advanced for
  // for(let val of preLogins) {

  // }

  preLogins.forEach((item) => {
    // console.log(item);
    item.style.display = isLogin ? "none" : 'inline-block';
  });

  //  post-login 처리해보기
  let postLogins = document.querySelectorAll(".post-login");

  postLogins.forEach((item) => {
    item.style.display = isLogin ? "inline-block" : "none";
  })

}


function doLogin() {
  let id = window.prompt("아이디는?");
  if(id === "ssafy") {
    let pass = window.prompt("비밀번호는?");
    if(pass === "1234") {
      handleLogin(true);
      alert("로그인되었습니다.");
      return;
    }
  }
  alert("로그인 실패");
}

//  idx : 아이템 번호, display
function collapseArea(idx, display) {
  //  index에 해당하는 sub
  let target = document.querySelectorAll(".store_item_sub")[idx];
  
  //  js에서 boolean이 필요한 곳에서는 boolean으로 평가된다.
  //  boolean으로 평가될 때 false인 것은? false, 0, null, undefined
  
  //  지정된 값이 오면 그걸 사용 : block or none
  if(display) {
    target.style.display = display; //  block or none(어쨋든 값이 옴)
  } else {  //  undefined, 아니면 toggle
    // console.log("메롱!");
    target.style.display = (target.style.display=="block" || target.style.display=="") ? "none":"block";
    // target.style.display = target.style.display==(""|"block")?"none":"block";
  }
}

function handleArea() {
  //  .store_area 요소를 가져와 본다...
  let areas = document.querySelectorAll(".store_area");
  //  각 요소에 eventlistener를 등록한다. --> collapseArea를 호출하도록 처리
  for(let i = 0; i < areas.length; i++) {
    areas[i].addEventListener("click", () => {
      collapseArea(i);
    });
  }
}

function doLogout() {
  handleLogin(false);
  alert("로그아웃되었습니다.");
}

//  전국 매장 모두 접음
function handleAllStoreCollapse(type) {
  let len = document.querySelectorAll(".store_item_sub").length;
  for(let i = 0; i < len; i++) {
    collapseArea(i, type);
  }
}

function handleAllStoreToggle() {
  //  1. store_display 요소들 가져오기
  let storeDisplays = document.querySelectorAll(".store_display");
  // console.log(storeDisplays);

  //  0번째 클릭시 -> 1번째를 켜고 0번째는 끄고, 전국 매장은 켜고
  storeDisplays[0].addEventListener("click", () => {
    storeDisplays[0].style.display = "none";
    storeDisplays[1].style.display = "block";
    handleAllStoreCollapse("block");
  });

  //  1번째 클릭시 -> 0번째를 켜고 1번째는 끄고, 전국 매장은 끄고
  storeDisplays[1].addEventListener("click", () => {
    storeDisplays[1].style.display = "none";
    storeDisplays[0].style.display = "block";
    handleAllStoreCollapse("none");
  });
}

function updatePoll() {
  console.log("update poll");
  makePoll();
}

function makePoll() {
  let poll = localStorage.getItem("poll");  //  string
  let pollObj = JSON.parse(poll); //  string --> object
  console.log(pollObj, "메롱");
  document.querySelector(".vote_question").innerHTML = pollObj.question;
  document.querySelector(".vote_answer>ul").innerHTML = "";
  pollObj.answers.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="vote_answer" id="${item}" />
    <label for="${item}">${item}</label>`;
    document.querySelector(".vote_answer>ul").appendChild(li);
  })
}

//  즉시 실행 함수
(function setup() {
  //  초기 화면은 logout 상태
  handleLogin(false);

  //  로그인 버튼에 이벤트 등록
  document.querySelector("#a-login").addEventListener("click", () => {
    doLogin();
  });

  //  로그아웃 버튼에 이벤트 등록
  document.querySelector("#a-logout").addEventListener("click", () => {
    doLogout();
  });

  // collapseArea(1, "none");
  handleArea();

  handleAllStoreToggle();
  //  초기에는 모든 매장이 닫혀있는 상태
  handleAllStoreCollapse("none");

  //  투표만들기 처리
  document.querySelector("#a-admin").addEventListener("click", () => {
    //  sub창 열기
    window.open("./poll.html", "poll", "width=500, height=200");
  });

  //  투표 상황 업데이트
  let poll = localStorage.getItem("poll");  //  string
  if(poll) {
    makePoll();
  } else {
    document.querySelector(".vote_question").innerHTML = "현재 진행 중인 투표가 없음";
    document.querySelector(".vote_answer>ul").innerHTML = "";
  }

})();

// setup();