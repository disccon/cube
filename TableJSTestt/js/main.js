window.onload = function () {
    const tableRef = document.getElementsByClassName('table')[0];

    const plusBottom = document.getElementsByClassName('button-plus_bottom')[0];
    plusBottom.addEventListener("click", AddRow);
    function AddRow() {
        let row = tableRef.insertRow(-1);
        if(tableRef.rows[0].cells.length !== 0){
            let colCount = tableRef.rows[0].cells.length;
            for (let i = 0; i < colCount; i++) {
                row.insertCell(-1);
            }
        }
        if(tableRef.rows[0].cells.length === 0){
            let colCount = 0;
            for (let i = 0; i <= colCount; i++) {
                row.insertCell(-1);
            }
        }
    };

    const plusRight = document.getElementsByClassName('button-plus_right')[0];
    plusRight.addEventListener("click",AddCell);
    function AddCell() {
        if(tableRef.rows.length !== 0) {
            let trArr = tableRef.getElementsByTagName("tr");
            for (let i = 0, l = trArr.length; i < l; i++) {
                trArr[i].insertCell(-1);
            }
        }
        if(tableRef.rows.length === 0 ){
            let row = tableRef.insertRow(-1);
            let colCount = 0;
            for (let i = 0; i <= colCount; i++) {
                row.insertCell(-1);
            }
        }
    };

    const minusLeft = document.getElementsByClassName('button-minus_left')[0];
    minusLeft.addEventListener("click",deleteRow);
    function deleteRow(){
        let minusLeftPositionTop = parseInt(minusLeft.style.top, 10);

        if ((minusLeftPositionTop + 52) > tableRef.getBoundingClientRect().height && tableRef.rows.length > 2) {
            minusLeft.style.top = minusLeftPositionTop - 52 + 'px';
        }

        if(tableRef.rows.length > 1) {
            let IndexRow = (minusLeftPositionTop - 5) / 52;
            tableRef.deleteRow(IndexRow)
        }
        if(tableRef.rows.length === 1) {
            setTimeout(function() {
                minusLeft.classList.remove('button-minus_animation-opacity');
                setTimeout(function() {
                    minusLeft.classList.remove('button-minus_animation-display');
                }, 100);
            }, 10);
        }
    }

    const minusTop = document.getElementsByClassName('button-minus_top')[0];
    minusTop.addEventListener("click",deleteCells);
    function deleteCells() {
        let minusTopPositionLeft = parseInt( minusTop.style.left, 10);
        const IndexSells = (minusTopPositionLeft - 5) / 52;

        if ((minusTopPositionLeft + 52) > tableRef.getBoundingClientRect().width && tableRef.rows[0].cells.length > 2) {
            minusTop.style.left = minusTopPositionLeft - 52 + 'px';
        }

        let trArr = tableRef.rows;
        if(tableRef.rows[0].cells.length > 1) {
            for (let i = 0; i < trArr.length; i++) {
                trArr[i].deleteCell(IndexSells)
            }
        }

        if(tableRef.rows[0].cells.length === 1) {
            setTimeout(function() {
                minusTop.classList.remove('button-minus_animation-opacity');
                setTimeout(function() {
                    minusTop.classList.remove('button-minus_animation-display');
                }, 100);
            }, 10);
        }
    }



    let TableMouseleave;
    const wrapperTable = document.getElementsByClassName('wrapper-table')[0];

    wrapperTable.addEventListener("mouseover",mouseoverTable);
    function mouseoverTable(event) {
        let target = event.target;
        clearTimeout(TableMouseleave)
        if(tableRef.rows[0].cells.length > 1) {
            minusTop.classList.add('button-minus_animation-display');
            setTimeout(function() {
                minusTop.classList.add('button-minus_animation-opacity');
            }, 10);
        }

        if(tableRef.rows.length > 1) {
            minusLeft.classList.add('button-minus_animation-display');
            setTimeout(function() {
                minusLeft.classList.add('button-minus_animation-opacity');
            }, 10);
        }

        setTimeout(function() {
            minusLeft.classList.add('button-minus_animation-opacity');
        }, 10);
            minusLeft.style.top = (target.parentNode.rowIndex * 52)+ 5 + "px";
            minusTop.style.left = (target.cellIndex * 52)+ 5 + "px";

    }


    wrapperTable.addEventListener("mouseleave",mouseleaveTable);
    function mouseleaveTable(){
        TableMouseleave = setTimeout(function() {
            minusLeft.classList.remove('button-minus_animation-opacity');
            minusTop.classList.remove('button-minus_animation-opacity');
            setTimeout(function() {
                minusLeft.classList.remove('button-minus_animation-display');
                minusTop.classList.remove('button-minus_animation-display');
            }, 200);
        }, 900);


    }
}






