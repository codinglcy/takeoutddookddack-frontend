<div align="center"> <h1>🍽️ 포장뚝딱 🍽️</h1> 

  
   <h3>길거리 포장마차도 일반 가게들처럼 미리 주문해두고 시간 맞춰 픽업할수 있도록 <br>
   포장마차를 위한 포장주문 앱을 제작해보았습니다.</h3>
<h4>서비스 링크: http://ec2-15-165-21-12.ap-northeast-2.compute.amazonaws.com/</h3>

<h4>프로젝트 소개 및 시연영상 링크: https://codinglcy.notion.site/4cf398e12d624469a290453e4fb5d32e</h3>

</div>

<br>

***
<br>

## 프로젝트 정보
> @codinglcy 개인 프로젝트<br>
> 개발 기간: 2023.02 ~ 2023.05

<br><br>

## 스택
### 환경
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=flat-square&logo=IntelliJ IDEA&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<br>
### 배포
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=GitHub Actions&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/>
<br>
### 프론트엔드
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<br>
### 백엔드
<img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=OpenJDK&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>

<br>
<br>

## 화면 구성
<img width="32%" alt="가게 목록 페이지 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/6b8e42f3-507d-424c-ba4d-740c2c134c2d"> <img width="32%" alt="가게 페이지 (주문자용) 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/3b709538-e242-4efe-9da8-067858ef48a8"> <img width="32%" alt="주문 페이지 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/bbb4591d-1442-49cd-adf2-6289369e93e5"><br><img width="32%" alt="가게 페이지 (판매자용) 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/dabda188-6ceb-40da-8e12-6da1f113b8aa"> <img width="32%" alt="가게 정보 폼 페이지 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/8d3c3629-8f1f-4d6f-bc90-9b72f18e915c"> <img width="32%" alt="회원 정보 폼 페이지 화면 캡쳐 이미지" src="https://github.com/codinglcy/takeoutddookddack-frontend/assets/107927270/062b5221-2072-4714-83d0-f5d352d05250">


<br>
<br>

## 디렉토리 구조

```
📦frontend
 ┣ 📂build
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂Components
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┣ 📜BuypageList.css
 ┃ ┃ ┃ ┣ 📜CardList.css
 ┃ ┃ ┃ ┣ 📜HeaderButton.css
 ┃ ┃ ┃ ┣ 📜Login.css
 ┃ ┃ ┃ ┣ 📜Menu.css
 ┃ ┃ ┃ ┣ 📜OrderBox.css
 ┃ ┃ ┃ ┣ 📜OrderCard.css
 ┃ ┃ ┃ ┣ 📜OrderForm.css
 ┃ ┃ ┃ ┣ 📜PwdEmail.css
 ┃ ┃ ┃ ┣ 📜Register.css
 ┃ ┃ ┃ ┣ 📜SearchByAddress.css
 ┃ ┃ ┃ ┣ 📜SellingSituation.css
 ┃ ┃ ┃ ┣ 📜SellPageForm.css
 ┃ ┃ ┃ ┣ 📜ShopInfo.css
 ┃ ┃ ┃ ┗ 📜StatusType.css
 ┃ ┃ ┣ 📜BuypageList.jsx
 ┃ ┃ ┣ 📜CardList.jsx
 ┃ ┃ ┣ 📜HeaderButton.jsx
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜Menu.jsx
 ┃ ┃ ┣ 📜OrderBox.jsx
 ┃ ┃ ┣ 📜OrderCard.jsx
 ┃ ┃ ┣ 📜OrderForm.jsx
 ┃ ┃ ┣ 📜PwdEmail.jsx
 ┃ ┃ ┣ 📜Register.jsx
 ┃ ┃ ┣ 📜SearchByAddress.jsx
 ┃ ┃ ┣ 📜SellingSituation.jsx
 ┃ ┃ ┣ 📜SellPageForm.jsx
 ┃ ┃ ┣ 📜ShopInfo.jsx
 ┃ ┃ ┗ 📜StatusType.jsx
 ┃ ┣ 📂Pages
 ┃ ┃ ┣ 📜BuyPage.jsx
 ┃ ┃ ┣ 📜BuypageListPage.jsx
 ┃ ┃ ┣ 📜OrderPage.jsx
 ┃ ┃ ┣ 📜SellPage.jsx
 ┃ ┃ ┣ 📜SellpageFormPage.jsx
 ┃ ┃ ┗ 📜UserFormPage.jsx
 ┃ ┣ 📂Util
 ┃ ┃ ┣ 📜api.js
 ┃ ┃ ┣ 📜checkAccessToken.js
 ┃ ┃ ┣ 📜debounce.js
 ┃ ┃ ┗ 📜useDidMountEffect.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.jsx
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
 ```
