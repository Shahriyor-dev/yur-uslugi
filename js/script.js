// const navLink = document.querySelectorAll('.m_scrollspy ul .nav-link');

// for (let i = 0; i < navLink.length; i++) {
//     navLink[i].onclick = () => {
//         // Удаляем класс у всех
//         navLink.forEach(function(el) {
//             el.classList.remove('active');
//         });
//         //Добавляем класс выбранному
//         if (!navLink[i].classList.contains('active')) {
//             navLink[i].classList.add('active')
//         }
//     }
// }
const tabItems = Array.from(document.querySelectorAll('.analys-companies-item'));
const contentItems = Array.from(document.querySelectorAll('.analys-content'));

const clearActiveClass = (element, className = 'is-active') => {
    element.find(item => item.classList.remove(`${className}`))
}

const addActiveClass = (element, index, className = 'is-active') => {
    element[index].classList.add(`${className}`)
}
const checkoutTabs = (item, index) => {
    item.addEventListener('click', () => {
        clearActiveClass(tabItems)
        clearActiveClass(contentItems)

        addActiveClass(tabItems, index)
        addActiveClass(contentItems, index)
    })
}

tabItems.forEach(checkoutTabs)

// const questions = [{
//         question: "Сфера деятельности вашей компании",
//         choices: [
//             "Банковская сфера",
//             " Авиация",
//             "Военно-промышленный комплекс",
//             "Торговля",
//             "Другое",
//         ],
//     },
//     {
//         question: "Каким образом санкции повлияли на вашу финансово-хозяйственную деятельность?",
//         choices: [
//             "Банковская сфера",
//             " Авиация",
//             "Военно-промышленный комплекс",
//             "Торговля",
//             "Другое",
//         ],
//     },
//     {
//         question: "Государсивенное участие в компании?",
//         choices: ["Да", "Нет", "Другое"],
//     },
//     {
//         question: "Под действие санкции каких стран попала ваша компания?",
//         choices: [
//             "Компания не попала под санкции напрямую",
//             "Украина",
//             "Европа",
//             "США",
//             "Другие страны",
//         ],
//     },
//     {
//         question: "Есть ли заблокированные счета за рубежом?",
//         choices: ["Да", "Нет", "Заблокированы счета в Российской Федерации "],
//     },
// ];

// let count = 0;
// const __labels = Array.from(document.querySelectorAll("label span"));
// const __lastBtn = document.querySelector(".last__ques");

// const myInput = document.createElement("input");
// myInput.type = "text";
// myInput.backgroundColor = "red";
// myInput.style.display = "none";
// myInput.classList.add("input-radio");

// const createElements = (elem) => {
//     document.querySelector(".title__main").textContent = `${count + 1}. ${
//     elem[count].question
//   }`;
//     for (let i = 0; i < __labels.length; i++) {
//         __labels[i].textContent = elem[count].choices[i];
//         if (__labels[i].textContent === "") __labels[i].parentElement.remove();
//     }
//     if (count > 0) {
//         __lastBtn.style.display = "block";
//     }
//     const elems = Array.from(document.querySelectorAll(".quez__item"));
//     elems.forEach((e) => {
//         e.textContent.includes("Другое") && e.classList.add("quez__last"),
//             e.addEventListener("click", onOther),
//             e.append(myInput);
//         if (!e.textContent.includes("Другое")) {
//             e.classList.remove("quez__last");
//         }
//         e.textContent.includes("Европа") && e.classList.add("not-width");
//     });
// };

// createElements(questions);

// let k = 5;
// const onLastElements = () => {
//     const inputs = document.querySelectorAll(".inps");
//     inputs.forEach((e) => e.remove());
//     document.querySelector(".text__light").remove();
//     document.querySelector(".btn__sub").remove();
//     const button = document.createElement("button");
//     button.classList.add("btn");
//     button.classList.add("last-btn-elem");
//     button.textContent = "Следующий вопрос";
//     button.addEventListener("click", onNext);
//     document.querySelector(".btn__group").append(button);
//     __labels.forEach(
//         (e, i) => (
//             (e.parentElement.style.display = "block"),
//             console.log(e.parentElement.textContent + i)
//         )
//     );
// };

// const onPrev = () => {
//     count >= 5 && onLastElements();
//     count -= 1;
//     i++;
//     if (i >= 4) {
//         __lastBtn.style.display = "none";
//         k -= 1;
//         last.textContent = k;
//     }
//     last.textContent = i;
//     progress.value -= 20;
//     createElements(questions);
// };
// __lastBtn.addEventListener("click", onPrev);

// const __btn = document.querySelector(".btn");
// let i = questions.length;
// last.textContent = i;

// const onModal = (e) => {
//     e.preventDefault();
//     const elems = Array.from(document.querySelector(".quez").childNodes);
//     elems.forEach((el) => el.remove());
//     const h = document.createElement("h2");
//     h.textContent =
//         "Спасибо, мы получили всю необходимую информацию. План вывода компании из кризиса будет направлен вам по указанному адресу.";
//     h.classList.add("title");
//     h.classList.add("thanks");
//     document.querySelector(".quez").append(h);
//     const btnEl = document.createElement("button");
//     btnEl.type = "button";
//     btnEl.classList.add("btn");
//     btnEl.classList.add("btn__again");
//     btnEl.textContent = "Пройти заново";
//     btnEl.classList.add("btn__after");
//     document.querySelector(".btn__group").appendChild(btnEl);
//     document.querySelector(".quez").style.gap = "60px";
//     document.querySelector(".quez").style.justifyContent = "center";
//     document.querySelector(".quez").style.alignItems = "center";
//     document.querySelector(".quez").appendChild(btnBlock);
//     document.querySelector(".btn__again").onclick = () => {
//         window.location.reload();
//     };
// };

// const contacts = () => {
//     if (document.querySelector(".btn").classList.contains("last-btn-elem")) {
//         document.querySelector(".last-btn-elem").remove();
//     }
//     document.querySelector(".title__main").textContent = "Ваши контактные данные";
//     __labels.forEach((el) => {
//         el.parentElement.style.display = "none";
//     });
//     const list = ["Как к вам обращаться", "Ваш номер телефона", "Ваш E-mail*"];
//     for (let i = 0; i < 3; i += 1) {
//         const inp = document.createElement("input");
//         inp.type = "text";
//         inp.classList.add("qeuz__input");
//         inp.classList.add("inps");
//         inp.required = true;
//         inp.placeholder = list[i];
//         document.querySelector(".quez__form").appendChild(inp);
//     }

//     const elDiv = document.createElement("p");
//     elDiv.classList.add("text__light");
//     elDiv.textContent = "*Поля со звездочкой обыязятельны для заполнения";
//     document.querySelector(".quez__form").appendChild(elDiv);
//     __btn.remove();
//     const butEl = document.createElement("button");
//     butEl.type = "submit";
//     butEl.textContent = "Отправить";
//     butEl.classList.toggle("btn");
//     butEl.classList.toggle("btn__sub");
//     butEl.style.order = 1;
//     butEl.addEventListener("click", onModal);
//     __lastBtn.style.order = 2;
//     document.querySelector(".btn__group").style.marginTop = "-10px";
//     document.querySelector(".btn__group").style.gap = "0px";
//     document.querySelector(".btn__group").append(butEl);
//     document.querySelector(".btn__group").style.order = 2;
// };

// const onNext = (e) => {
//     e.preventDefault();
//     i -= 1;
//     count++;
//     last.textContent = i;
//     if (i >= 5) i--;
//     progress.value += 20;
//     if (count >= 5) {
//         contacts();
//         return;
//     }
//     createElements(questions);
// };

// __btn.addEventListener("click", onNext);

// function onOther() {
//     const otherElems = Array.from(document.querySelectorAll(".quez__item"));
//     otherElems.forEach((e) => {
//         e.style.backgroundColor = "#1A191F";
//         e.style.color = "#fff";
//     });
//     try {
//         if (document.querySelector(".quez__last .quez__radio").checked) {
//             document.querySelector(".quez__last").style.backgroundColor = "#FFE99C";
//             document.querySelector(".quez__last span").style.display = "none";
//             document.querySelector(".input-radio").style.display = "block";
//         } else {
//             document.querySelector(".quez__last span").style.display = "inline";
//             document.querySelector(".input-radio").style.display = "none";
//         }
//     } catch {
//         return;
//     }
// }

// document.querySelector(".quez__last").addEventListener("change", onOther);

// const __radios = Array.from(document.querySelectorAll(".quez__radio"));
// const onToggle = ({ target }) => {
//     if (target.parentElement.getAttribute("for") === "rad5") {
//         target.parentElement.addEventListener("click", onOther);
//     }
//     for (let i = 0; i < __radios.length; i++) {
//         if (__radios[i].checked) {
//             __radios[i].parentElement.style.backgroundColor = "#ffe99c";
//             __radios[i].parentElement.style.color = "#111";
//         } else {
//             __radios[i].parentElement.style.color = "#fff";
//             __radios[i].parentElement.style.backgroundColor = "#1A191F";
//         }
//     }
//     try {
//         document.querySelector(".quez__last span").style.display = "inline";
//         document.querySelector(".quez__last .input-radio").style.display = "none";
//     } catch {
//         return;
//     }
// };
// const __items = Array.from(document.querySelectorAll(".quez__item"));
// __items.forEach((el) => {
//     el.addEventListener("change", onToggle);
//     el.textContent.includes("Другое") &&
//         el.removeEventListener("change", onToggle);
// });