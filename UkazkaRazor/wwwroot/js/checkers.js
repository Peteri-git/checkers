let foo = document.getElementsByClassName("box");
let board = [];
let players = [];
let roomName
class player {
    constructor(colors, id) {
        this.colors = colors;
        this.id = id;
    }
}
class box {
    constructor(index, div, func,hasFunc) {
        this.index = index;
        this.div = div;
        this.func = func;
        this.hasFunc = hasFunc;
    }
}
function RemoveFunc(box) {
    box.div.removeEventListener("click", box.func);
    box.func = null;
}
function Turn() {
    for (let i = 0; i < board.length; i++) {
        if (board[i].hasFunc == true) {
            board[i].div.removeEventListener("click",board[i].func);
            board[i].hasFunc = false;
        }
        else if (board[i].hasFunc == false) {
            board[i].div.addEventListener("click",board[i].func);
            board[i].hasFunc = true;
        }
    }
}
function SelectFigurine(position) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].hasFunc == true && board[i].index != position) {
            board[i].div.removeEventListener("click", board[i].func);
            board[i].hasFunc = false;
        }
    }
}
function ReturnTurn(color) {
    for (let i = 0; i < board.length; i++) {
        if (color == "white"||color =="white_s") {
            if (board[i].div.hasChildNodes() == true && board[i].div.childNodes[0].className == "white_checker" || board[i].div.hasChildNodes() == true && board[i].div.childNodes[0].className == "white_s") {
                board[i].div.addEventListener("click", board[i].func);
                board[i].hasFunc = true;
            }
        }
        if (color == "black" || color == "black_s") {
            if (board[i].div.hasChildNodes() == true && board[i].div.childNodes[0].className == "black_checker" || board[i].div.hasChildNodes() == true && board[i].div.childNodes[0].className == "black_s") {
                board[i].div.addEventListener("click", board[i].func);
                board[i].hasFunc = true;
            }
        }
    }
}
function ReplaceFunc(box, func) {
    box.div.removeEventListener("click", box.func);
    box.func = func;
    box.div.addEventListener("click", func);
}
function getBoard(name, playerO,playerT) {
    for (let i = 0; i < foo.length; i++) {
        board.push(new box(i, foo[i], null));
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i].div.hasChildNodes() == true) {
            if (board[i].div.childNodes[0].className == "black_checker") {
                let func = function () {
                    showMoves(i, "black",false)
                }
                board[i].div.addEventListener("click", func);
                board[i].func = func;
                board[i].hasFunc = true;
            }
            if (board[i].div.childNodes[0].className == "white_checker") {
                let func = function () {
                    showMoves(i, "white",false)
                };
                board[i].func = func;
                board[i].hasFunc = false;
            }
        }
    }
    players.push(new player(["black","black_s"], playerO))
    players.push(new player(["white","white_s"], playerT))
    roomName = name
}
let check = false;
let count = 0;
function showMoves(boardPosition, color,combo) {
    if (board[boardPosition].div.hasChildNodes() == true) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].div.hasChildNodes() == false && board[i].func != null) {
                RemoveFunc(board[i]);
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[i].div.style.backgroundColor == "red") {
                board[i].div.style.backgroundColor = "";
            }
        }
        if (color == "black" && (boardPosition + 9) <= 63) {
            if (combo !=true) {
                if (board[boardPosition + 7].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + 7].div).backgroundColor != "rgb(68, 26, 3)") {
                    board[boardPosition + 7].div.style.backgroundColor = "red"
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition + 7, color, false, 7,count);
                    }
                    board[boardPosition + 7].div.addEventListener("click", func);
                    board[boardPosition + 7].func = func;
                }
                if (board[boardPosition + 9].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + 9].div).backgroundColor != "rgb(68, 26, 3)") {
                    board[boardPosition + 9].div.style.backgroundColor = "red"
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition + 9, color, false, 9,count);
                    }
                    board[boardPosition + 9].div.addEventListener("click", func);
                    board[boardPosition + 9].func = func;
                }
            }
            if ((boardPosition +14) <= 63) {
                if (board[boardPosition + 7].div.hasChildNodes() == true && board[boardPosition + 14].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + 14].div).backgroundColor != "rgb(68, 26, 3)" && (board[boardPosition + 7].div.childNodes[0].className != "black_checker" && board[boardPosition + 7].div.childNodes[0].className != "black_s")) {
                    board[boardPosition + 14].div.style.backgroundColor = "red"
                    if (combo==true) {
                        count++;
                    }
                    let numb = count;
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition + 14, color, true, -7, numb);
                    }
                    board[boardPosition + 14].div.addEventListener("click", func);
                    board[boardPosition + 14].func = func;
                    if (combo == true) {
                        check = true;
                    }
                }
            }
            if ((boardPosition + 18) <= 63) {
                if (board[boardPosition + 9].div.hasChildNodes() == true && board[boardPosition + 18].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + 18].div).backgroundColor != "rgb(68, 26, 3)" && (board[boardPosition + 9].div.childNodes[0].className != "black_checker" && board[boardPosition + 9].div.childNodes[0].className != "black_s")) {
                    board[boardPosition + 18].div.style.backgroundColor = "red"
                    if (combo ==true) {
                        count++;
                    }
                    let numb = count;
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition + 18, color, true, -9, numb);
                    }
                    board[boardPosition + 18].div.addEventListener("click", func);
                    board[boardPosition + 18].func = func;
                    if (combo ==true) {
                        check = true;
                    }
                }
            }
        }
        if (color == "white" && (boardPosition - 9) >= 0) {
            if (combo !=true) {
                if (board[boardPosition - 7].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - 7].div).backgroundColor != "rgb(68, 26, 3)") {
                    board[boardPosition - 7].div.style.backgroundColor = "red"
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition - 7, color, false, -7,count);
                    }
                    board[boardPosition - 7].div.addEventListener("click", func);
                    board[boardPosition - 7].func = func;
                }
                if (board[boardPosition - 9].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - 9].div).backgroundColor != "rgb(68, 26, 3)") {
                    board[boardPosition - 9].div.style.backgroundColor = "red"
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition - 9, color, false, -9,count);
                    }
                    board[boardPosition - 9].div.addEventListener("click", func);
                    board[boardPosition - 9].func = func;
                    
                }
            }
            if ((boardPosition -14) >= 0) {
                if (board[boardPosition - 7].div.hasChildNodes() == true && board[boardPosition - 14].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - 14].div).backgroundColor != "rgb(68, 26, 3)" && (board[boardPosition - 7].div.childNodes[0].className != "white_checker" && board[boardPosition - 7].div.childNodes[0].className != "white_s")) {
                    board[boardPosition - 14].div.style.backgroundColor = "red"
                    if (combo==true) {
                        count++;
                    }
                    let numb = count;
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition - 14, color, true, 7, numb);
                    }
                    board[boardPosition - 14].div.addEventListener("click", func);
                    board[boardPosition - 14].func = func;
                    if (combo==true) {
                        check = true;
                    }
                }
            }
            if ((boardPosition -18) >=0) {
                if (board[boardPosition - 9].div.hasChildNodes() == true && board[boardPosition - 18].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - 18].div).backgroundColor != "rgb(68, 26, 3)" && (board[boardPosition - 9].div.childNodes[0].className != "white_checker" && board[boardPosition - 9].div.childNodes[0].className != "white_s")) {
                    board[boardPosition - 18].div.style.backgroundColor = "red"
                    if (combo==true) {
                        count++;
                    }
                    let numb = count;
                    let func = function () {
                        connection.invoke("SendMove", roomName, boardPosition, boardPosition - 18, color, true, 9, numb);
                    }
                    board[boardPosition - 18].div.addEventListener("click", func);
                    board[boardPosition - 18].func = func;
                    if (combo==true) {
                        check = true;
                    }
                }
            }
        }
        let faggot = 0;
        let fgt = 0;
        let fagg = 0;
        let fak = 0;
        if (color == "white_s") {
            for (let i = 1; i <= 6; i++) {
                if (faggot != null)
                    faggot = 9 * i;
                if (fgt != null)
                    fgt = 7 * i;
                if (fagg != null)
                    fagg = 9 * i;
                if (fak != null)
                    fak = 7 * i;
                if ((boardPosition + faggot) <= 63) {
                    if (board[boardPosition + faggot].div.hasChildNodes() == true && faggot != null  ) {
                        if ((boardPosition + faggot + 9) <= 63 && getComputedStyle(board[boardPosition + faggot + 9].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition + faggot + 9].div.hasChildNodes() == false && board[boardPosition + faggot].div.firstChild.className != "white_checker" && board[boardPosition + faggot].div.firstChild.className != "white_s") {
                                board[boardPosition + faggot + 9].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition + faggot + 9;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, -9,count);
                                }
                                board[boardPosition + faggot + 9].div.addEventListener("click", func);
                                board[boardPosition + faggot + 9].func = func;
                                check = true;
                            }
                        }
                        faggot = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition + faggot].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + faggot].div).backgroundColor != "rgb(68, 26, 3)" && faggot != null) {
                            board[boardPosition + faggot].div.style.backgroundColor = "red"
                            let nextPos = boardPosition + faggot;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, 9, count);
                            }
                            board[boardPosition + faggot].div.addEventListener("click", func);
                            board[boardPosition + faggot].func = func;
                        }
                    }
                }
                if ((boardPosition + fgt) <= 63) {
                    if (board[boardPosition + fgt].div.hasChildNodes() == true && fgt != null ) {
                        if ((boardPosition + fgt + 7) <= 63 && getComputedStyle(board[boardPosition + fgt + 7].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition + fgt + 7].div.hasChildNodes() == false && board[boardPosition + fgt].div.firstChild.className != "white_checker" && board[boardPosition + fgt].div.firstChild.className != "white_s") {
                                board[boardPosition + fgt + 7].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition + fgt + 7;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, -7,count);
                                }
                                board[boardPosition + fgt + 7].div.addEventListener("click", func);
                                board[boardPosition + fgt + 7].func = func;
                                check = true;
                            }
                        }
                        fgt = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition + fgt].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + fgt].div).backgroundColor != "rgb(68, 26, 3)" && fgt != null) {
                            board[boardPosition + fgt].div.style.backgroundColor = "red"
                            let nextPos = boardPosition + fgt;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, 7,count);
                            }
                            board[boardPosition + fgt].div.addEventListener("click", func);
                            board[boardPosition + fgt].func = func;
                        }
                    }
                }
                if ((boardPosition - fagg) >= 0) {
                    if (board[boardPosition - fagg].div.hasChildNodes() == true  && fagg != null ) {
                        if ((boardPosition - fagg - 9) >= 0 && getComputedStyle(board[boardPosition - fagg - 9].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition - fagg - 9].div.hasChildNodes() == false && board[boardPosition - fagg].div.firstChild.className != "white_checker" && board[boardPosition - fagg].div.firstChild.className != "white_s") {
                                board[boardPosition - fagg - 9].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition - fagg - 9;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, 9,count);
                                }
                                board[boardPosition - fagg - 9].div.addEventListener("click", func);
                                board[boardPosition - fagg - 9].func = func;
                                check = true;
                            }
                        }
                        fagg = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition - fagg].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - fagg].div).backgroundColor != "rgb(68, 26, 3)" && fagg != null) {
                            board[boardPosition - fagg].div.style.backgroundColor = "red"
                            let nextPos = boardPosition - fagg;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, -9, count);
                            }
                            board[boardPosition - fagg].div.addEventListener("click", func);
                            board[boardPosition - fagg].func = func;
                        }
                    }
                }
                if ((boardPosition - fak) >= 0) {
                    if (board[boardPosition - fak].div.hasChildNodes() == true  && fak != null) {
                        if (boardPosition - fak - 7 >= 0 && getComputedStyle(board[boardPosition - fak - 7].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition - fak - 7].div.hasChildNodes() == false && board[boardPosition - fak].div.firstChild.className != "white_checker" && board[boardPosition - fak].div.firstChild.className != "white_s" ) {
                                board[boardPosition - fak - 7].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition - fak - 7;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, 7,count);
                                }
                                board[boardPosition - fak - 7].div.addEventListener("click", func);
                                board[boardPosition - fak - 7].func = func;
                                check = true;
                            }
                        }
                        fak = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition - fak].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - fak].div).backgroundColor != "rgb(68, 26, 3)" && fak != null) {
                            board[boardPosition - fak].div.style.backgroundColor = "red"
                            let nextPos = boardPosition - fak;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, -7, count);
                            }
                            board[boardPosition - fak].div.addEventListener("click", func);
                            board[boardPosition - fak].func = func;
                        }
                    }
                }  
                if (i == 6) {
                    faggot = 0;
                    fgt = 0;
                    fagg = 0;
                    fak = 0;
                }
            }
        }
        if (color == "black_s") {
            for (let i = 1; i <= 6; i++) {
                if (faggot != null)
                    faggot = 9 * i;
                if (fgt != null)
                    fgt = 7 * i;
                if (fagg != null)
                    fagg = 9 * i;
                if (fak != null)
                    fak = 7 * i;
                if ((boardPosition + faggot) <= 63) {
                    if (board[boardPosition + faggot].div.hasChildNodes() == true && faggot != null ) {
                        if ((boardPosition + faggot + 9) <= 63 && getComputedStyle(board[boardPosition + faggot + 9].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition + faggot + 9].div.hasChildNodes() == false && board[boardPosition + faggot].div.firstChild.className != "black_checker" && board[boardPosition + faggot].div.firstChild.className != "black_s") {
                                board[boardPosition + faggot + 9].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition + faggot + 9;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, -9,count);
                                }
                                board[boardPosition + faggot + 9].div.addEventListener("click", func);
                                board[boardPosition + faggot + 9].func = func;
                                check = true;
                            }
                        }
                        faggot = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition + faggot].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + faggot].div).backgroundColor != "rgb(68, 26, 3)" && faggot != null) {
                            board[boardPosition + faggot].div.style.backgroundColor = "red"
                            let nextPos = boardPosition + faggot;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, 9, count);
                            }
                            board[boardPosition + faggot].div.addEventListener("click", func);
                            board[boardPosition + faggot].func = func;
                        }
                    }
                }
                if ((boardPosition + fgt) <= 63) {
                    if (board[boardPosition + fgt].div.hasChildNodes() == true && fgt != null ) {
                        if ((boardPosition + fgt + 7) <= 63 && getComputedStyle(board[boardPosition + fgt + 7].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition + fgt + 7].div.hasChildNodes() == false && board[boardPosition + fgt].div.firstChild.className != "black_checker" && board[boardPosition + fgt].div.firstChild.className != "black_s") {
                                board[boardPosition + fgt + 7].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition + fgt + 7;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, -7,count);
                                }
                                board[boardPosition + fgt + 7].div.addEventListener("click", func);
                                board[boardPosition + fgt + 7].func = func;
                                check = true;
                            }
                        }
                        fgt = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition + fgt].div.hasChildNodes() == false && getComputedStyle(board[boardPosition + fgt].div).backgroundColor != "rgb(68, 26, 3)" && fgt != null) {
                            board[boardPosition + fgt].div.style.backgroundColor = "red"
                            let nextPos = boardPosition + fgt;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, 7, count);
                            }
                            board[boardPosition + fgt].div.addEventListener("click", func);
                            board[boardPosition + fgt].func = func;
                        }
                    }
                }
                if ((boardPosition - fagg) >= 0) {
                    if (board[boardPosition - fagg].div.hasChildNodes() == true && fagg != null ) {
                        if ((boardPosition - fagg - 9) >= 0 && getComputedStyle(board[boardPosition - fagg - 9].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition - fagg - 9].div.hasChildNodes() == false && board[boardPosition - fagg].div.firstChild.className != "black_checker" && board[boardPosition - fagg].div.firstChild.className != "black_s") {
                                board[boardPosition - fagg - 9].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition - fagg - 9;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, 9,count);
                                }
                                board[boardPosition - fagg - 9].div.addEventListener("click", func);
                                board[boardPosition - fagg - 9].func = func;
                                check = true;
                            }
                        }
                        fagg = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition - fagg].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - fagg].div).backgroundColor != "rgb(68, 26, 3)" && fagg != null) {
                            board[boardPosition - fagg].div.style.backgroundColor = "red"
                            let nextPos = boardPosition - fagg;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, -9, count);
                            }
                            board[boardPosition - fagg].div.addEventListener("click", func);
                            board[boardPosition - fagg].func = func;
                        }
                    }
                }
                if ((boardPosition - fak) >= 0) {
                    if (board[boardPosition - fak].div.hasChildNodes() == true && fak != null ) {
                        if (boardPosition - fak - 7 >= 0 && getComputedStyle(board[boardPosition - fak - 7].div).backgroundColor != "rgb(68, 26, 3)") {
                            if (board[boardPosition - fak - 7].div.hasChildNodes() == false && board[boardPosition - fak].div.firstChild.className != "black_checker" && board[boardPosition - fak].div.firstChild.className != "black_s") {
                                board[boardPosition - fak - 7].div.style.backgroundColor = "red"
                                if (combo != false)
                                    count++;
                                let nextPos = boardPosition - fak - 7;
                                let func = function () {
                                    connection.invoke("SendMove", roomName, boardPosition, nextPos, color, true, 7,count);
                                }
                                board[boardPosition - fak - 7].div.addEventListener("click", func);
                                board[boardPosition - fak - 7].func = func;
                                check = true;
                            }
                        }
                        fak = null;
                    }
                    if (combo!=true) {
                        if (board[boardPosition - fak].div.hasChildNodes() == false && getComputedStyle(board[boardPosition - fak].div).backgroundColor != "rgb(68, 26, 3)" && fak != null) {
                            board[boardPosition - fak].div.style.backgroundColor = "red"
                            let nextPos = boardPosition - fak;
                            let func = function () {
                                connection.invoke("SendMove", roomName, boardPosition, nextPos, color, false, -7, count);
                            }
                            board[boardPosition - fak].div.addEventListener("click", func);
                            board[boardPosition - fak].func = func;
                        }
                    }
                }
                if (i == 6) {
                    faggot = 0;
                    fgt = 0;
                    fagg = 0;
                    fak = 0;
                }
            }
        }
        if (count == 0) {
            return false;
        }
        if (count != 0) {
            count = 0;
            return true;
        }
    }
}
connection.on("attack", (firstPosition, nextPosition, color, kill, connectionID,diff,attackCount) => {  
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == connectionID && players[i].colors.includes(color)) { 
            for (let i = 0; i < board.length; i++) {
                if (board[i].div.hasChildNodes() == false && board[i].func != null) {
                    RemoveFunc(board[i]);
                }
            }
            let child = board[firstPosition].div.childNodes[0];
            board[firstPosition].div.removeChild(board[firstPosition].div.childNodes[0])
            board[nextPosition].div.appendChild(child)
            let func = function () {
                showMoves(nextPosition, color);
            }
            RemoveFunc(board[firstPosition]);
            board[nextPosition].func = func;
            let ch = null;
            for (let i = 0; i < board.length; i++) {
                if (board[i].div.style.backgroundColor == "red") {
                    board[i].div.style.backgroundColor = "";
                }
            }
            if (kill == true) {
                if (color == "white" || color == "white_s") {
                    let child = board[nextPosition + diff].div.childNodes[0];
                    board[nextPosition + diff].div.removeChild(child);
                }
                if (color == "black" || color == "black_s") {
                    let child = board[nextPosition + diff].div.childNodes[0];
                    board[nextPosition + diff].div.removeChild(child);
                }
                ch=showMoves(nextPosition, color, true);
            }
            if (ch == true) {
                SelectFigurine(nextPosition);
            }
            if (ch == false) {
                ReturnTurn(color);
                check = false;
            }
            board[firstPosition].hasFunc = null;
            board[nextPosition].hasFunc = true;
            if ((color == "white" && nextPosition == 0) || (color == "white" && nextPosition == 2) || (color == "white" && nextPosition == 4) || (color == "white" && nextPosition == 6)) {
                board[nextPosition].div.childNodes[0].className = "white_s";
                let neco = function () {
                    showMoves(nextPosition, "white_s", false);
                }
                ReplaceFunc(board[nextPosition], neco);
            }
            if (color == "black" && nextPosition == 57 || color == "black" && nextPosition == 59 || color == "black" && nextPosition == 61 || color == "black" && nextPosition == 63) {
                board[nextPosition].div.childNodes[0].className = "black_s";
                let neco = function () {
                    showMoves(nextPosition, "black_s", false);
                }
                ReplaceFunc(board[nextPosition], neco);
            }
            if (check == false) {
                Turn();
                GameOver();
            }
        }
    }
});
function GameOver() {
    let whites = 0;
    let blacks = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i].div.hasChildNodes() ==true && board[i].div.childNodes[0].className == "white_checker") {
            whites++;
        }
        if (board[i].div.hasChildNodes() ==true && board[i].div.childNodes[0].className == "black_checker") {
            blacks++;
        }
    }
    if (whites == 0) {
        alert("černý vyhrává");
        location.reload();
    }
    if (blacks == 0) {
        alert("bílý vyhrává");
        location.reload();
    }
}