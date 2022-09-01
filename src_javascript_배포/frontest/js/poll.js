window.onload = function () {
    //  추가 버튼 누르면 할 일
    document.querySelector("#btn-add").addEventListener("click", function () {
        // console.log("추가 버튼 클릭");
        
        //  divElement 추가할 poll-answer-list
        let listDiv = document.querySelector("#poll-answer-list");
        
        //  div에 추가 내용 적을 input과 삭제 button 넣어서 div 추가
        let divElement = document.createElement("div");  //  div 생성
        divElement.setAttribute("class", "poll-answer-item");    //  div에 class 적용

        let inputElement = document.createElement("input"); //  input 생성
        inputElement.setAttribute("type", "text");  //  type 설정
        inputElement.setAttribute("name", "answer");  //  name 설정

        let buttonElement = document.createElement("button");   //  button 생성
        buttonElement.setAttribute("type", "button");   //  type 설정, 눌렀을 때 삭제하기 위해(default는 submit(전송))
        buttonElement.setAttribute("class", "button");  //  class 적용
        buttonElement.appendChild(document.createTextNode("삭제")); //  "삭제"를 텍스트 노드로 만들어서 button의 child element로 추가
    
        //  삭제 버튼 눌렀을 때 삭제 가능하도록 EventListener 버튼에 추가
        buttonElement.addEventListener("click", function () {
            //  삭제 버튼의 부모가 삭제하고 싶은 divElement임
            let parentElement = this.parentElement; //  화살표 함수 아니므로 this가 버튼 자기자신 가리킴
            //  삭제 버튼의 부모 삭제
            listDiv.removeChild(parentElement);
        });

        //  div에 input, button 추가
        divElement.appendChild(inputElement);
        divElement.appendChild(buttonElement);
        
        //  버튼 누를 때마다 poll-answer-list에 divElement 추가 
        listDiv.appendChild(divElement);
    });

    //  투표 생성 버튼 누르면(투표 만들어지면) 투표 생성 대신 만들어진 투표 보여야 함
    document.querySelector("#btn-make").addEventListener("click", function () {
        //  유효성 검사(질문 있는지 확인)
        //  안에 입력된 문자열 = valuse
        // console.log("투표 생성 클릭");
        let question = document.querySelector("#question").value;
        // console.log(question);
        //  질문을 누락할 경우
        if(!question) {
            alert("질문을 반드시 입력하세요.");
            return;
        }

        //  answer라는 이름 가진 답 목록 가져오기
        //  answer이라는 tag가 아니라 name 속성이 answer인 input tag 가져오기
        let answers = document.querySelectorAll("[name=answer]");
        // console.log(answers);
    
        for(let answer of answers) {
            // console.log(answer.value);
            if(!answer.value) {
                alert("답변을 입력하세요.");
                return;
            }
        }

        //  답변 저장할 배열
        let answerArr = [];

        for(let answer of answers) {
            answerArr.push(answer.value); //  ["서울", ... , "부울경"]
        }

        //  localStorage에 저장
        localStorage.setItem("question", question);
        
        // localStorage.setItem("answers", answerArr);  //  문자열만 저장 가능
        localStorage.setItem("answers", JSON.stringify(answerArr)); //  직렬화
       
        //  confirm : yes면 true, 아니면 false
        if(confirm("투표를 생성하시겠습니까?")) {   //  yes 눌렀을 경우
            //  opener: 부모 투표 생성하기 창
            //  opener 창 새로고침
            opener.location.reload();
            self.close();   //  현재 열려 있는 투표 생성하기 창 닫기
        }
    });
};


