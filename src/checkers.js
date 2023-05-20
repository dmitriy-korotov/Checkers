


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



function selectPathOverChakers(num_row, num_ceil, field, class_outher_checker, prev_move)
{
    if (0 <= num_row && num_row < field.length && 0 <= num_ceil && num_ceil < field[0].length && !field[num_row][num_ceil].hasChildNodes())
    {
        let this_elem = field[num_row][num_ceil];

        this_elem.classList.add("selected");
        this_elem.classList.remove("white");

        // Right Bottom
        if (prev_move != DirectionMoves.LeftTop && 0 <= (num_row + 1) && (num_row + 1) < field.length && num_ceil + 1 < field[0].length)
        {
            let right_elem = field[num_row + 1][num_ceil + 1];
            if (right_elem.hasChildNodes() && right_elem.firstChild.classList.contains(class_outher_checker))
            {
                selectPathOverChakers(num_row + 2, num_ceil + 2, field, class_outher_checker, DirectionMoves.RightBottom);   
            }
        }
        // Left Bottom
        if (prev_move != DirectionMoves.RightTop && 0 <= (num_row + 1) && (num_row + 1) < field.length && num_ceil - 1 >= 0)
        {
            let left_elem = field[num_row + 1][num_ceil - 1];
            if (left_elem.hasChildNodes() && left_elem.firstChild.classList.contains(class_outher_checker))
            {
                selectPathOverChakers(num_row + 2, num_ceil - 2, field, class_outher_checker, DirectionMoves.LeftBottom);   
            }
        }
        // Right Top
        if (prev_move != DirectionMoves.LeftBottom && 0 <= (num_row - 1) && (num_row - 1) < field.length && num_ceil + 1 < field[0].length)
        {
            let right_elem = field[num_row - 1][num_ceil + 1];
            if (right_elem.hasChildNodes() && right_elem.firstChild.classList.contains(class_outher_checker))
            {
                selectPathOverChakers(num_row - 2, num_ceil + 2, field, class_outher_checker, DirectionMoves.RightTop);   
            }
        }
        // Left Top
        if (prev_move != DirectionMoves.RightBottom && 0 <= (num_row - 1) && (num_row - 1) < field.length && num_ceil - 1 >= 0)
        {
            let left_elem = field[num_row - 1][num_ceil - 1];
            if (left_elem.hasChildNodes() && left_elem.firstChild.classList.contains(class_outher_checker))
            {
                selectPathOverChakers(num_row - 2, num_ceil - 2, field, class_outher_checker, DirectionMoves.LeftTop);   
            }
        }
    }
}



function selectChecker(num_row, num_ceil, field, vertical_step, class_outher_checker)
{
    let this_elem = field[num_row][num_ceil];

    this_elem.classList.add("selected");
    this_elem.classList.remove("white");

    // Right forward
    if (0 <= (num_row + vertical_step) && (num_row + vertical_step) < field.length && num_ceil + 1 < field[0].length)
    {
        let right_elem = field[num_row + vertical_step][num_ceil + 1];

        if (!right_elem.hasChildNodes())
        {
            right_elem.classList.add("selected");
            right_elem.classList.remove("white");
        }
        else if (right_elem.firstChild.classList.contains(class_outher_checker)
                 &&
                 0 <= (num_row + 2*vertical_step) && (num_row + 2*vertical_step) < field.length && num_ceil + 2 < field[0].length)
        {
            selectPathOverChakers(num_row + 2*vertical_step, num_ceil + 2, field, class_outher_checker,
                                  (vertical_step > 0) ? DirectionMoves.RightBottom : DirectionMoves.RightTop);
        }
    }
    // Left forward
    if (0 <= (num_row + vertical_step) && (num_row + vertical_step) < field.length && num_ceil - 1 >= 0)
    {
        let left_elem = field[num_row + vertical_step][num_ceil - 1];

        if (!left_elem.hasChildNodes())
        {
            left_elem.classList.add("selected");
            left_elem.classList.remove("white");
        }
        else if (left_elem.firstChild.classList.contains(class_outher_checker)
                 &&
                 0 <= (num_row + 2*vertical_step) && (num_row + 2*vertical_step) < field.length && num_ceil - 2 >= 0)
        {
            selectPathOverChakers(num_row + 2*vertical_step, num_ceil - 2, field, class_outher_checker,
                                  (vertical_step > 0) ? DirectionMoves.LeftBottom : DirectionMoves.LeftTop);
        }
    }

    let reverse_vertival_step = -vertical_step;

    // Right back
    if (0 <= (num_row + reverse_vertival_step) && (num_row + reverse_vertival_step) < field.length && num_ceil + 1 < field[0].length)
    {
        let right_elem = field[num_row + reverse_vertival_step][num_ceil + 1];

        if (right_elem.hasChildNodes() && right_elem.firstChild.classList.contains(class_outher_checker))
        {
            selectPathOverChakers(num_row + 2*reverse_vertival_step, num_ceil + 2, field, class_outher_checker,
                                  (reverse_vertival_step > 0) ? DirectionMoves.RightBottom : DirectionMoves.RightTop);
        }

    }
    // Left back
    if (0 <= (num_row + reverse_vertival_step) && (num_row + reverse_vertival_step) < field.length && num_ceil - 1 >= 0)
    {
        let left_elem = field[num_row + reverse_vertival_step][num_ceil - 1];

        if (left_elem.hasChildNodes() && left_elem.firstChild.classList.contains(class_outher_checker))
        {
            selectPathOverChakers(num_row + 2*reverse_vertival_step, num_ceil - 2, field, class_outher_checker,
                                  (reverse_vertival_step > 0) ? DirectionMoves.LeftBottom : DirectionMoves.LeftTop);
        }
    }
}



function selectPermitedSteps(el, field)
{
    CURRENT_SELECTED_CHECKER = el.parentElement;

    let div_index_in_ID = el.parentElement.id.indexOf(';');
    let num_row = Number(el.parentElement.id.substr(0, div_index_in_ID));
    let num_ceil = Number(el.parentElement.id.substr(div_index_in_ID + 1, el.parentElement.id.length));

    clearSelections(field);

    if (el.classList.contains("black-checker"))
    {
        selectChecker(num_row, num_ceil, field, 1, "white-checker");
    }  
    else
    {
        selectChecker(num_row, num_ceil, field, -1, "black-checker");
    } 
}



function moveChecker(clickedEl)
{
    if (clickedEl.classList.contains("selected") && !clickedEl.hasChildNodes())
    {
        var children = CURRENT_SELECTED_CHECKER.childNodes;
        let clone = children[0].cloneNode();
        clone.addEventListener("click", () => { selectPermitedSteps(clone, field_array); });
        clickedEl.appendChild(clone);
        CURRENT_SELECTED_CHECKER.removeChild(children[0]);

        clearSelections(field_array);
    }
}



/*
    GLOBAL VARIABLES
*/



const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 8;
const desk_ = document.getElementById("desk");
const field_ = document.getElementById("field");
const field_array = new Array();

const DirectionMoves = { LeftTop : 0, LeftBottom : 1, RightTop : 2, RightBottom : 3 };

var CURRENT_SELECTED_CHECKER;





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
        ceil.addEventListener("click", () => { moveChecker(ceil); }, false);

        if (i < 3 && (i + j) % 2 == 1)
        {
            let checker = document.createElement("div");
            checker.className = "checker black-checker";
            checker.addEventListener("click", () => { selectPermitedSteps(checker, field_array) }, false);
            ceil.appendChild(checker);
        }
        if (i > 4 && (i + j) % 2 == 1)
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