const work_session = document.querySelector(".work_session");
const short_break = document.querySelector(".short_break");
const long_break = document.querySelector(".long_break");
const container = document.querySelector(".selected_container");
const minute_ten = document.querySelector(".minute_ten");
const minute_one = document.querySelector(".minute_one");
const second_ten = document.querySelector(".second_ten");
const second_one = document.querySelector(".second_one");
const timer_button = document.querySelector(".timer_button");
const session_count = document.querySelector(".session_count");
const reset_btn = document.querySelector(".reset_timer");
const timer_display = document.querySelector(".timer_display");
const next_session_btn = document.querySelector(".next_session");
const session_list = document.querySelector(".done_sessions");
const alarmSound = document.querySelector("#alarm");
let break_counter = 0;
let seconds, minutes_counter = 0;


function playTimer() {

    if (timer_button.classList.contains("play_timer")) {
        timer_button.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
        timer_button.classList.remove("play_timer");
        timer_button.classList.add("stop_timer");
        timer_button.style.border = "none";

        seconds = setInterval(function () {

            let second = (+second_ten.textContent * 10) + (+second_one.textContent);
            let minute = (+minute_ten.textContent * 10) + (+minute_one.textContent);

            if (minute == 25) {
                printStartTimer();
            }

            if (second > 0)
                second--;
            else {
                if (minute > 0) {
                    minute--;
                    minutes_counter++;
                    second = 59;
                }
                else {

                    clearInterval(seconds);
                    alarmSound.play();
                    if (minutes_counter == 25) {
                        timeEnded();
                        if ((+session_count.textContent % 4) - 1 != 0) {
                            containerOnShortBreak();
                        }
                        else if ((+session_count.textContent % 4) - 1 == 0) {
                            printLongBreak();
                            containerOnLongBreak();
                        }

                    }

                    if (minutes_counter == 5 || minutes_counter == 15)
                        containerOnWork();

                    minutes_counter = 0;
                    return;
                }

            }
            if (second >= 10) {
                second_one.textContent = second.toString()[1];
                second_ten.textContent = second.toString()[0];
            }
            else {
                second_one.textContent = second.toString()[0];
                second_ten.textContent = "0";
            }
            if (minute >= 10) {
                minute_one.textContent = minute.toString()[1];
                minute_ten.textContent = minute.toString()[0];
            }
            else {
                minute_one.textContent = minute.toString()[0];
                minute_ten.textContent = "0";
            }



        }, 1000);
    }
    else {
        timer_button.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
        timer_button.classList.remove("stop_timer");
        timer_button.classList.add("play_timer");
        timer_button.style.borderBottom = "3px solid rgb(194, 0, 0)";
        clearInterval(seconds);
    }

}

function printStartTimer(event) {
    const now = new Date();
    const nowTime = `${String(now.getHours()).padStart(2, "0")} : ${String(now.getMinutes()).padStart(2, "0")} : ${String(now.getSeconds()).padStart(2, "0")}`;
    console.log(nowTime);



    const list_item = `                <li class="history_item history_item_begin">
                    <div class="begin_time begin_time_begin">${nowTime}</div>
                    <div class="session_number session_number_begin">${session_count.textContent}</div>
                    <div class="status status_begin">Session Started</div>
                </li>`;


    session_list.insertAdjacentHTML("afterbegin", list_item);

}
function printTimeEnded(event) {
    const now = new Date();
    const nowTime = `${String(now.getHours()).padStart(2, "0")} : ${String(now.getMinutes()).padStart(2, "0")} : ${String(now.getSeconds()).padStart(2, "0")}`;

    const list_item = `                <li class="history_item history_item_end">
                    <div class="begin_time begin_time_end">${nowTime}</div>
                    <div class="session_number session_number_end">${session_count.textContent}</div>
                    <div class="status status_end">Session Ended</div>
                </li>`;


    session_list.insertAdjacentHTML("afterbegin", list_item);
}

function printLongBreak(event)
{
    const now = new Date();
    const nowTime = `${String(now.getHours()).padStart(2, "0")} : ${String(now.getMinutes()).padStart(2, "0")} : ${String(now.getSeconds()).padStart(2, "0")}`;

break_counter++;

        const list_item = `                <li class="history_item history_item_break">
                    <div class="begin_time begin_time_break">${nowTime}</div>
                    <div class="session_number session_number_break">${break_counter}</div>
                    <div class="status status_break">Long Break</div>
                </li>`;


    session_list.insertAdjacentHTML("afterbegin", list_item);
}


function stopTimer() {
    console.log("timer stoped");

}


function timeEnded() {
    printTimeEnded();
    let count = +session_count.textContent;
    count++;
    if (count > 4) {
        session_count.textContent = 1;
        return;
    }
    session_count.textContent = count;

}


function containerOnWork() {
    container.style.left = "16px";
    minute_ten.textContent = "2";
    minute_one.textContent = "5";
    second_ten.textContent = "0";
    second_one.textContent = "0";
    clearInterval(seconds);
    timer_button.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
    timer_button.classList.remove("stop_timer");
    timer_button.classList.add("play_timer");
    timer_button.style.borderBottom = "3px solid rgb(194, 0, 0)";
    timer_display.classList.remove("longBreak");
    timer_display.classList.remove("shortBreak");
    timer_display.classList.add("work");
    minutes_counter = 0;
}
function containerOnShortBreak() {
    container.style.left = "210px";
    minute_one.textContent = "5";
    minute_ten.textContent = "0";
    second_ten.textContent = "0";
    second_one.textContent = "0";
    clearInterval(seconds);
    timer_button.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
    timer_button.classList.remove("stop_timer");
    timer_button.classList.add("play_timer");
    timer_button.style.borderBottom = "3px solid rgb(194, 0, 0)";
    timer_display.classList.remove("longBreak");
    timer_display.classList.remove("work");
    timer_display.classList.add("shortBreak");
    minutes_counter = 0;
}
function containerOnLongBreak() {
    container.style.left = "405px";
    minute_ten.textContent = "1";
    minute_one.textContent = "5";
    second_ten.textContent = "0";
    second_one.textContent = "0";
    clearInterval(seconds);
    timer_button.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
    timer_button.classList.remove("stop_timer");
    timer_button.classList.add("play_timer");
    timer_button.style.borderBottom = "3px solid rgb(194, 0, 0)";
    timer_display.classList.remove("shortBreak");
    timer_display.classList.remove("work");
    timer_display.classList.add("longBreak");
    minutes_counter = 0;
}

function resetTimer() {


    if (timer_display.classList.contains("work")) {
        containerOnWork();
    }
    else if (timer_display.classList.contains("shortBreak")) {
        containerOnShortBreak();
    }
    else if (timer_display.classList.contains("longBreak")) {
        containerOnLongBreak();
    }
}


function nextSessionHandler() {
    console.log("next");

    if (timer_display.classList.contains("work"))
        containerOnShortBreak();
    else if (timer_display.classList.contains("shortBreak")) {
        containerOnLongBreak();
    }
    else if (timer_display.classList.contains("longBreak")) {
        containerOnWork();
    }
}



next_session_btn.addEventListener("click", nextSessionHandler);
reset_btn.addEventListener("click", resetTimer);
timer_button.addEventListener("click", playTimer);
work_session.addEventListener("click", containerOnWork);
short_break.addEventListener("click", containerOnShortBreak);
long_break.addEventListener("click", containerOnLongBreak);