function deleteRow(src) {
  // console.log(src);
  src.parentElement.remove();
}

function addItem() {
  console.dir(document.querySelector("#b-insert"));
  document.querySelector("#b-insert").addEventListener("click", ()=> {
    let div = document.createElement("div");
    div.innerHTML = `<input type="text" class="answer"><button onclick="deleteRow(this)">삭제</button>`;
  document.querySelector("#answers").appendChild(div);
  })
}

function makePoll() {
  //  화면의 요소를 객체로 만들어보자.
  let poll = {};
  poll.question = document.querySelector("#question").value;
  let answerElements = document.querySelectorAll(".answer");
  let answers = [];
  answerElements.forEach(item => {
    answers.push(item.value);
  });
  poll.answers = answers;
  console.log(poll);

  //  local storage에 저장하기
  window.localStorage.setItem("poll", JSON.stringify(poll));

  //  나를 불러준 놈(main.js)의 함수를 호출
  window.opener.updatePoll();
  //  이 창 닫기
  window.close();
}


(function setup() {
  //  추가 버튼 클릭 시 아이템을 추가하기
  addItem();

  document.querySelector("#b-makepoll").addEventListener("click", () => {
    makePoll();
  })

})();