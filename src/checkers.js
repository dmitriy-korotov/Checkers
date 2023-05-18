


/*
    FUNCTIONS
*/



function resizeDesk(desk)
{
    const FIELD_SIZE = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

    desk.setAttribute("style", `width: ${FIELD_SIZE}px;
                                height: ${FIELD_SIZE}px;
                                margin-top: ${((window.innerHeight - FIELD_SIZE) / 2)}px;
                                margin-left: ${((window.innerWidth - FIELD_SIZE) / 2)}px;`);
}



function clearSelections(field)
{
    let row_num = 0;
    field.forEach(row => {
        let ceil_num = 0;
        row.forEach(ceil => {
            ceil.classList.remove("selected");
            (row_num + ceil_num) % 2 ? ceil.classList.add("white") : ceil.classList.add("black");
            ++ceil_num;
        });
        ++row_num;
    });
}



function selectBlackChecker(num_row, num_ceil, field)
{
    field[num_row][num_ceil].classList.add("selected");
    field[num_row][num_ceil].classList.remove("white");

    if (num_row + 1 < field.length && num_ceil + 1 < field[0].length)
    {
        if (!field[num_row + 1][num_ceil + 1].hasChildNodes())
        {
            field[num_row + 1][num_ceil + 1].classList.add("selected");
            field[num_row + 1][num_ceil + 1].classList.remove("white");
        }
    }
    if (num_row + 1 < field.length && num_ceil - 1 >= 0)
    {
        if (!field[num_row + 1][num_ceil - 1].hasChildNodes())
        {
            field[num_row + 1][num_ceil - 1].classList.add("selected");
            field[num_row + 1][num_ceil - 1].classList.remove("white");
        }
    }
}



function selectWhiteChecker(num_row, num_ceil, field)
{
    field[num_row][num_ceil].classList.add("selected");
    field[num_row][num_ceil].classList.remove("black");

    if (num_row - 1 >= 0 && num_ceil + 1 < field[0].length)
    {
        if (!field[num_row - 1][num_ceil + 1].hasChildNodes())
        {
            field[num_row - 1][num_ceil + 1].classList.add("selected");
            field[num_row - 1][num_ceil + 1].classList.remove("black");
        }
    }
    if (num_row - 1 >= 0 && num_ceil - 1 >= 0)
    {
        if (!field[num_row - 1][num_ceil - 1].hasChildNodes())
        {
            field[num_row - 1][num_ceil - 1].classList.add("selected");
            field[num_row - 1][num_ceil - 1].classList.remove("black");
        }
    }
}



function selectPermitedSteps(el, field)
{
    let div_index_in_ID = el.parentElement.id.indexOf(';');
    let num_row = Number(el.parentElement.id.substr(0, div_index_in_ID));
    let num_ceil = Number(el.parentElement.id.substr(div_index_in_ID + 1, el.parentElement.id.length));

    clearSelections(field);

    if (el.classList.contains("black-checker"))
    {
        selectBlackChecker(num_row, num_ceil, field);
    }  
    else
    {
        selectWhiteChecker(num_row, num_ceil, field);
    } 
}



/*
    GLOBAL VARIABLES
*/



const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 8;

var field_array = new Array();

const desk_ = document.getElementById("desk");
const field_ = document.getElementById("field");



/*
    MAIN
*/



resizeDesk(desk_);
window.addEventListener("resize", () => { resizeDesk(desk_); }, false);



for (let i = 0; i < FIELD_HEIGHT; ++i)
{
    let row_ = document.createElement('div');
    row_.className = "row";

    let row_array = new Array();

    for (let j = 0; j < FIELD_WIDTH; ++j)
    {
        let ceil = document.createElement("div");
        ceil.className = "ceil " + ((i + j) % 2 ? "white" : "black");
        ceil.id = i + ";" + j;

        if (i < 3 && (i + j) % 2 == 1)
        {
            let checker = document.createElement("div");
            checker.className = "checker black-checker";
            checker.addEventListener("click", () => { selectPermitedSteps(checker, field_array) }, false);
            ceil.appendChild(checker);
        }
        if (i > 4 && (i + j) % 2 == 0)
        {
            let checker = document.createElement("div");
            checker.className = "checker white-checker";
            checker.addEventListener("click", () => { selectPermitedSteps(checker, field_array) }, false);
            ceil.appendChild(checker);
        }
        
        row_array.push(ceil);
        row_.appendChild(ceil);
    }
    field_array.push(row_array);
    field_.appendChild(row_);
}