```
봉투 필요하실까요? 봉투 100원 추가되세요.
할인 있으실까요?
카드 앞에 꽂아주세요.
적립하실까요? 앞에 전화번호 입력해 주세요.
결제되셨습니다. 감사합니다.
```

## 🥖 행뚜둥 Log1
### 요약
<table>
    <tr>
        <th>작업 기간</th>
        <td>2024-04-27</td>
    </tr>
    <tr>
        <th>작업 내역</th>
        <td>주말 근무 냉판 담당자 할당 시스템</td>
    </tr>
</table>

### 모든 일의 시작은...
<img width="200" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/f94dc075-db37-4e7f-ba65-93f21bdcd34a">

- 과도한 냉판 업무로 손목 부상 🤕
- 냉판 담당자를 통해, 공평한 업무 분배

행복한 뚜둥이(이때 뚜둥이는 뚜레쥬르 아르바이트생을 지칭한다) 생활 6개월 차,,,   
시련이 찾아왔다.

주말 오픈 근무자의 주요 업무는 빵 포장이지만,   
부수적으로 꼭 해야하는 업무로 `냉판 업무`가 있다.   
이때 냉판은 빵을 구울 때 쓰는 판으로, 냉판을 다 닦고 유선지 등을 까는 작업까지 해야 한다.

문제는 이 작업을 하면 팔목이 아프다는 점이다.   
아르바이트생들이 기피하는 작업이기에, 눈치 싸움에 참여하기가 싫어서   
매번 냉판 작업을 도맡아 하다 보니 팔목에 무리가 생겨 결국에는 팔목 보호대 신세가 되어버렸다.

아르바이트를 그만두거나 사장님과 딜을 해야할 순간이 찾아왔다고 생각했다.  
사장님은 아르바이트를 그만두기보다는,   
냉판 담당자를 지정해 꼭 돌아가면서 작업하도록 하겠다고 약속할 테니 다시 생각해 봐달라고 말씀하셨다.  

그래서 '냉판 담당자'라는 규칙은 세워졌으니,
내 손목은 내가 지킨다는 마인드로 냉판 담당자 시스템을 직접 만들어 보았다.

### 냉판 담당자 시스템 설계
규칙은 간단하다.
주말 오전 근무자는 총 3명으로, 하루에 두 명씩 담당자가 되어 냉판 업무를 맡는 것이다.   
한 달 동안 최대한 공평하게 업무할 수 있도록 담당자를 할당하는 것이다.

**1. 기술 스택 선정**

<img width="452" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/f2ca028b-da94-4dac-9d8a-ec9e9c50b8d0">

*(피그마로 작업한 프로젝트 와이어프레임 초안)*

사장님과 통화를 마치고 몇 시간 동안 진행한 프로젝트이기 때문에, 소규모로 진행했다.   
따라서 기술 스택 역시 간결하였다.   

최근 app router를 공부하고 있기에 프레임워크로 `Next.js app router`를 선정하였고,(그런데 사실상 정적 페이지라 의미가 없었다...)    
스타일 프레임워크로는 Next.js 공식 문서에도 언급된 `Tailwind`를 채택하였다.   
나머지 라이브러리 및 기술 스택은 필요에 따라 추가하기로 하고 프로젝트를 시작하였다.   

**2. util 함수 효용 극대화**   
위에 언급한 규칙처럼 아주 간단한 프로젝트였다.   
그래도 꼭 챙겨가고 싶었던 것은 ⭐️직관성이 높은 코드⭐️였다.    
**따라서 util 폴더를 두어 별도로 함수를 관리하였다.**

<img width="452" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/d7675222-f75c-4b64-b5f4-0e172b0631f9">

냉판 담당자 할당에 사용한 함수들만 살펴보면,   

`weekendArrayGenerator`   

weekendArrayGenerator로 해당 달의 주말을 배열로 만들어주는 함수를 만들었다.   
달을 매개변수로 넣어주면 { date: 6, person: ['', ''] }와 같은 형식으로 배열을 만들게 하였다.

`assignedWorkers`

그러면 weekendArrayGenerator를 통해 만든 배열에, 주말 배열에 작업자 할당하는 작업을 assignedWorkers 함수를 통해 구현하였다.   

```
export const assignWorkers = (weekendArray: WeekendArray[]): AssignedWorkers[] => {
  const workers = [];
  let luckyPersonId = 0;

  // 주말에 대해 반복
  for (let i = 0; i < weekendArray.length; i++) {
    const date = weekendArray[i].date;
    const worker1 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    const worker2 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    workers.push({ date, workers: [worker1, worker2] });
  }
  return workers;
};
```
luckyPersonId 변수를 이용하여 배열에서 작업자를 선택할 수 있도록 하였다.   
luckyPersonId를 personList.length로 나눈 나머지는 항상 0부터 personList.length - 1까지의 값 중 하나가 되기 때문에,   
luckyPersonId를 personList.length로 나눈 나머지를 인덱스로 사용하여 personList 배열에서 작업자를 선택할 수 있게 하였다.    
그리고 luckyPersonId++을 통해 현재 선택된 작업자가 다음 주말에 선택될 작업자를 가리키도록 변수를 증가시켰다.   

이렇게 하여 매 주말마다 하루에 두 명의 작업자를 할당할 수 있었다.   

### 그렇게 뚜둥이에게는 행복한 나날이 펼쳐졌을까요?   
최소 기능으로 구현 후 사장님께 배포 링크를 공유드렸고,

<img width="322" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/d356df2e-7ff5-4626-81a4-9a11e83cd1c2">

다행히 사장님께서는 긍정적으로 받아들여 주셨다.   
그리고 매 달마다 1번, 2번, 3번 뚜둥이를 지정해 주시기로 했다.

**[완성 화면]**   
배포 링크 : touslesjours-admin.netlify.app/

<div>
  <img width="200" height="400" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/114342ed-fa44-4a3a-8d8d-5a8cfa842b58">
  <img width="200" height="400" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/5a40b5d7-c1e0-4ddb-aa44-6ecb775e6d0b">
</div>

### To be continued...   
**추가 기능 1.**    
불가피하게 아르바이트를 빠지는 경우 역시 존재한다.   
그렇게 되면 위 시스템은 공평하지 않게 될 수밖에 없다.   
따라서 본래의 담당자가 변경되는 상황이 발생하면,    
해당 날짜 이후로 새롭게 담당자가 할당되게 하는 기능을 추가할 예정이다.    

**추가 기능 2.**    
샌드위치의 경우, 요일 스티커를 붙인다.   
현재 수작업으로 해당 날짜의 요일 스티커를 표시하는데, 이를 자동화하는 기능을 추가할 예정이다.  
(주, 녹, 흰 이렇게 스티커가 매일 돌아가면서 붙여지는데, 현재는 해당 날짜의 스티커가 무슨 색인지 매일 동그라미로 체크하면서 운영되고 있다.)   

## 🥖 행뚜둥 Log2
### 요약
<table>
    <tr>
        <th>작업 기간</th>
        <td>2024-05-04~05, 05-12</td>
    </tr>
    <tr>
        <th>작업 내역</th>
        <td>UI 변경 및 Supabase 추가</td>
    </tr>
</table>

### 1. Accordian을 이용한 UI 변경

![ui](https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/bce784d9-20c1-45dd-9e1d-09f53f1cc0b1)

이전에는 내용을 모두 노출시키는 UI였다면,   
Accordian을 사용하여 유저로 하여금 확인하고 싶은 내용을 선택할 수 있게 변경하였다.   
이때 Accordian을 공통 컴포넌트로 설계하여 사용하였다.

```
interface AccordianProps {
  title: string;
  children: ReactNode;
  isAccordianOpen: boolean;
  onClick: () => void;
}
```
interface의 경우, 위와 같이 설계하였는데   
Accordian 안에 담기는 내용은 children으로 담아 보이게 하였다.   
이렇게 하면 자유로운 장점은 있지만, 조금 더 구체적으로 설계해도 괜찮지 않았을까 하는 생각이 남는다.   

### 2. Supabase 사용

![change](https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/e4d2d8bb-eefe-419d-a165-131d2da49e33)

[Supabase](https://supabase.com/)를 사용하여 데이터를 관리하고자 하였다.   
이전까지는 정적 렌더링 웹 사이트였다면, 할당된 작업자 수정을 통해 동적 웹 사이트로 변경되었다.   

Firebase를 사용할 지 아니면 Supabase를 사용할 지 고민하다가,   
**관계형데이터베이스의 스키마와 join을 사용한다는 측면에서** Supabase가 더 좋겠다는 판단 하에 supabase를 채택했다.

## 🥖 행뚜둥 Log3
### 요약
<table>
    <tr>
        <th>작업 기간</th>
        <td>2024-06-09, 11</td>
    </tr>
    <tr>
        <th>작업 내역</th>
        <td>샌드위치 페이지 완성, 로그인 기능 추가</td>
    </tr>
</table>

🎉행뚜둥 Log1에서 언급한 추가 기능을 모두 구현하였다.🎉

### 1. 샌드위치 스티커
![2024-06-1111 13 17-ezgif com-video-to-gif-converter](https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/df70a0a8-5e3b-4478-a94a-f4929b456bd8)

오늘의 샌드위치 스티커 색상을 항상 전날 스티커 색상을 보고 직접 표시하다보니, 실수가 발생한 경우가 종종 있었다.    
내가 샌드위치 재고 관리를 주로 맡기 때문에, 스티커 색상이 꼬이면 부수적인 작업이 생긴다.   
스티커 색상 표시할 때 정신 차려서 하라고 말 할 수도 있지만, 손님이 많아서 정신이 없거나 실수는 생길 수 밖에 없다고 본다.    
따라서 **사람의 능력에 의지하기 보다는, 시스템을 만들어서 실수를 막는 것이 필요하다고 생각하였다.**
그 생각에서 만든게 바로 샌드위치 스티커 화면이다.

해당 페이지에서 중요한 것은 바로 `SandwichTable` 컴포넌트이다.   
🤔 샌드위치 스티커 색상을 변경했는데, 화면에 반영이 안 되었어요   
🤔 주 기준으로 데이터가 안 불러와져요    
🤔 전 날 스티커를 바탕으로, 오늘 샌드위치 스티커 색상을 어떻게 자동으로 채울까요?    
...

이전 작업들과 달리, 많은 이슈들이 있었다.    
특히 '🤔 샌드위치 스티커 색상을 변경했는데, 화면에 반영이 안 되었어요'의 경우 컴포넌트 설계에 대해 다시 한 번 생각하게 된 계기가 되었다.

### 2. 로그인 기능 추가 (feat. NextAuth.js)
<img width="740" alt="image" src="https://github.com/anonymousRecords/touslesjours-admin/assets/97885933/20d3faa1-fc49-4f56-ad52-294d4dad6ea9">

실제로 운영을 하는 웹 사이트이기 때문에, 아무나 들어와서 데이터를 변경하는 것을 막아야 했다.   
따라서 [NextAuth](https://next-auth.js.org/) 를 통해 로그인 기능을 추가하였다.
