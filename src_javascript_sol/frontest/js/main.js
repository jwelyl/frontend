window.onload = function () {
  // localStorage에서 진행중인 투표 정보 얻기.
  let question = localStorage.getItem("question");
  let pollBtnDiv = document.querySelector(".content-left-poll-btn");
  let pollViewDiv = document.querySelector(".content-left-poll");

  var pollContent;

  if (question) {
    // 진행중인 투표가 있을경우.
    let answers = localStorage.getItem("answers");
    let answerArr = JSON.parse(answers);
    let poll = `
    <div class="poll-title">[당신의 선택]</div>
    <div class="poll-question">${question}</div>
    <div class="poll-answer">
      <ul>
    `;
    for (let answer of answerArr) {
      poll += `
        <li><label><input type="radio" name="poll-answer" id="" value="${answer}" /> ${answer}</label></li>
        `;
    }
    poll += `
    </ul>
    </div>
    <div class="poll-btn">
      <button id="btn-poll" class="button btn-primary">투표하기</button>
      <button class="button">이전결과보기</button>
    </div>
    <div class="poll-date">투표기간 : 2022.03.01 ~ 2022.03.31</div>
    `;

    // alert(poll);
    pollViewDiv.innerHTML = poll;

    pollBtnDiv.style.display = "none";
    pollViewDiv.style.display = "";
  } else {
    // 진행중인 투표가 없을경우.
    pollContent = `진행 중인 투표가 없습니다!!!`;
    pollViewDiv.innerHTML = pollContent;

    pollBtnDiv.style.display = "";
    pollViewDiv.setAttribute("style", "text-align: center; color: red; display: ");
  }

  // 투표만들기
  document.getElementById("btn-makepoll").onclick = function () {
    window.open("makepoll.html", "poll", "width=420, height=300, top=300, left=400");
  };

  // 투표하기
  document.getElementById("btn-poll").onclick = function () {
    let answers = document.getElementsByName("poll-answer");
    let selVal = "";
    for (let answer of answers) {
      if (answer.checked) {
        selVal = answer.value;
        break;
      }
    }
    // for (let i = 0; i < answers.length; i++) {
    //   if (answers[i].checked) {
    //     selVal = answers[i].value;
    //     break;
    //   }
    // }
    alert(selVal + "를 선택했습니다.");
  };
};
