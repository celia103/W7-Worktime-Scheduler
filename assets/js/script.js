const today = dayjs().format('DD-MM-YYYY');

let localStorageData = JSON.parse(localStorage.getItem('scheduleData')) || [{
    date: today,
    data: {
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
    }
}];

const todayDataIndex = localStorageData.findIndex(function (element) {
    return element.date === today;
});


//Current date
var currentDay = document.getElementById('currentDay');
currentDay.textContent = dayjs().format('DD/MM/YYYY, dddd')

//Timeblocks for working hours
var timeBlocksContainer = document.getElementById('timeblocks');

for (var hour = 9; hour < 19; hour++) {

    var row = document.createElement('div');
    row.classList.add('row');
  
    var hourCol = document.createElement('div');
    hourCol.classList.add('col-1', 'hour');
    hourCol.textContent = dayjs().hour(hour).format('h A');
    hourCol.setAttribute('data-hour', hour);
  
    var descriptionCol = document.createElement('div');
    descriptionCol.classList.add('col-10', 'description');

    var textarea = document.createElement('textarea');
    descriptionCol.appendChild(textarea);
    textarea.value = localStorageData[todayDataIndex].data[hour];

    var saveBtnCol = document.createElement('div');
    saveBtnCol.classList.add('col-1', 'saveBtn');
    saveBtnCol.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';

    (function (capturedHour) {
        $(saveBtnCol).on("click", function () {
            var clickedRow = $(this).closest('.row');
            var clickedTextarea = clickedRow.find('.description textarea');
            localStorageData[todayDataIndex].data[capturedHour] = clickedTextarea.val();
            localStorage.setItem('scheduleData', JSON.stringify(localStorageData));
    
            // Show save message
            var saveMessage = $('#saveMessage');
            saveMessage.text('Saved successfully!');
    
            // Clear message after 2 seconds
            setTimeout(function () {
                saveMessage.text('');
            }, 2000); 
        });
    })(hour);
  
    row.appendChild(hourCol);
    row.appendChild(descriptionCol);
    row.appendChild(saveBtnCol);
  
    timeBlocksContainer.appendChild(row);
}

// Check current time and apply related class
const nowHour = dayjs().hour(); 
$('.row').each(function () {
    const elementHour = parseInt($(this).find('.hour').attr('data-hour'), 10);

    const descriptionElement = $(this).find('.description');

    if (elementHour < nowHour) {
        descriptionElement.addClass('past');
    } else if (elementHour === nowHour) {
        descriptionElement.addClass('present');
    } else {
        descriptionElement.addClass('future');
    }
});