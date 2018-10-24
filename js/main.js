window.onload = function () {
    const tableRef = document.getElementsByClassName('table')[0];
    const tableRefRows = tableRef.rows;
    const plusBottom = document.getElementsByClassName('button-plus_bottom')[0];
    const plusRight = document.getElementsByClassName('button-plus_right')[0];
    const minusLeft = document.getElementsByClassName('button-minus_left')[0];
    const minusTop = document.getElementsByClassName('button-minus_top')[0];
    let TableMouseleave;
    const wrapperTable = document.getElementsByClassName('wrapper-table')[0];

    let targetIndexRow = -1;
    let targetIndexCell = -1;


    let tableborderSpacing = tableRef.style.borderSpacing
    let heightCell =  tableRefRows[0].cells[0].getBoundingClientRect().height + 2;
    let widthCell =  tableRefRows[0].cells[0].getBoundingClientRect().width + 2;

    plusBottom.addEventListener("click", AddRow);
    function AddRow(){
        let row = tableRef.insertRow(-1);
        for (let value of tableRefRows[0].cells) {
            row.insertCell();
        };

    };

    plusRight.addEventListener("click",AddCell);
    function AddCell(){
        for (let index of tableRefRows) {
            index.insertCell();
        };
    };


    minusLeft.addEventListener("click",deleteRow);
    function deleteRow(){
        let minusLeftPositionTop = parseInt(minusLeft.style.top, 10);


        if ((minusLeftPositionTop + heightCell) > tableRef.getBoundingClientRect().height && tableRefRows.length > 2) {
            minusLeft.style.top = minusLeftPositionTop - heightCell + 'px';
        }

        if(tableRefRows.length > 1) {
            if(targetIndexRow >= tableRefRows.length){
                targetIndexRow = targetIndexRow -1;
            }
            tableRef.deleteRow(targetIndexRow)
        }
        if(tableRefRows.length === 1) {
            minusLeft.classList.remove('button-minus_animation-opacity');
            setTimeout( () => {
                    minusLeft.classList.remove('button-minus_animation-display');
            }, 300);
        }
    }


    minusTop.addEventListener("click",deleteCells);
    function deleteCells() {
        let minusTopPositionLeft = parseInt( minusTop.style.left, 10);

        if ((minusTopPositionLeft + widthCell) > tableRef.getBoundingClientRect().width && tableRefRows[0].cells.length > 2) {
            minusTop.style.left = minusTopPositionLeft - widthCell + 'px';
        }

        if(tableRefRows[0].cells.length > 1) {
            if(targetIndexCell >= tableRefRows[0].cells.length){
                targetIndexCell = targetIndexCell -1;
            }
            for (let index of tableRefRows) {
                index.deleteCell(targetIndexCell)
            };
        }

        if(tableRefRows[0].cells.length === 1) {
             minusTop.classList.remove('button-minus_animation-opacity');
             setTimeout( () => {
                 minusTop.classList.remove('button-minus_animation-display');
             }, 300);
        }
    }


    wrapperTable.addEventListener("mouseover",mouseoverTable);
    function mouseoverTable(event) {
        let target = event.target;
        clearTimeout(TableMouseleave)
        if(tableRefRows[0].cells.length > 1) {
            minusTop.classList.add('button-minus_animation-display');
            setTimeout(() => {
                minusTop.classList.add('button-minus_animation-opacity');
            }, 10);
        }

        if (target.tagName === "TD") {
            targetIndexRow = target.parentElement.rowIndex;
            targetIndexCell = target.cellIndex;
            minusLeft.style.top = (target.parentNode.rowIndex * heightCell)+ 5 + "px";
            minusTop.style.left = (target.cellIndex * widthCell)+ 5 + "px";
            // minusLeft.dataset.row = target.parentElement.rowIndex;
            // minusTop.dataset.cell = target.cellIndex;
        }

        if(tableRefRows.length > 1) {
            minusLeft.classList.add('button-minus_animation-display');
            setTimeout(() => {
                minusLeft.classList.add('button-minus_animation-opacity');
            }, 10);
        }

    }


    wrapperTable.addEventListener("mouseleave",mouseleaveTable);
    function mouseleaveTable(){
        TableMouseleave = setTimeout(() => {
            minusLeft.classList.remove('button-minus_animation-opacity');
            minusTop.classList.remove('button-minus_animation-opacity');
            setTimeout(() => {
                minusLeft.classList.remove('button-minus_animation-display');
                minusTop.classList.remove('button-minus_animation-display');
            }, 3300);
        }, 3000);


    }
}






