window.onload = function () {
  // 답변 항목 추가 버튼 클릭.
  document.querySelector("#btn-add").addEventListener("click", function () {
    let pollAnswerListDiv = document.querySelector("#poll-answer-list");

    let divEl = document.createElement("div");
    divEl.setAttribute("class", "poll-answer-item");

    let inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "answer");

    let buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("class", "button");
    buttonEl.appendChild(document.createTextNode("삭제"));
    // 삭제버튼 이벤트 등록
    buttonEl.addEventListener("click", function () {
      let parentEl = this.parentNode;
      pollAnswerListDiv.removeChild(parentEl);
    });

    divEl.appendChild(inputEl);
    divEl.appendChild(buttonEl);
    pollAnswerListDiv.appendChild(divEl);
  });

  // 투표 생성 버튼 클릭
  document.querySelector("#btn-make").addEventListener("click", function () {
    let question = document.querySelector("#question").value;
    if (!question) {
      alert("질문을 입력하세요!!!");
      return;
    }

    // let answers = document.querySelectorAll("input[name='answer']");
    let answers = document.getElementsByName("answer");
    // for (let i = 0; i < answers.length; i++) {
    //   alert(answers[i].value);
    // }
    for (let answer of answers) {
      // for ... in : 객체의 모든 열거 가능한 속성에 대해 반복.
      //   alert(answer.value);
      if (!answer.value) {
        alert("답변 항목을 입력하세요!!!");
        return;
      }
    }

    let answerArr = [];
    for (let answer of answers) {
      answerArr.push(answer.value);
    }

    localStorage.setItem("question", question);
    localStorage.setItem("answers", JSON.stringify(answerArr));
    // JSON.stringify() : JavaScript 객체를 JSON 문자열로 변환.
    // JSON.parse() : JSON 문자열을 JavaScript 객체로 변환.

    if (confirm("투표를 생성하시겠습니까?")) {
      opener.location.reload();
      self.close();
    }
  });
};
