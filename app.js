class Exam {
    constructor(name,result,year){
        this.name = name;
        this.result = result;
        this.year = year;
    }
}
const numbers = [];
class UI {
    addExam(exam){
        const list = document.getElementById('exam-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${exam.name}</td>
        <td id="result">${exam.result}</td>
        <td>${exam.year}</td>
        <td><a href="#" class="delete">&#10006</a></td>
        `
        list.appendChild(row);

    }
    clearFields(){
        document.getElementById('exam-name').value = '';
        document.getElementById('exam-result').value = '';
        document.getElementById('exam-year').value = '';
    }
    alertShow(message,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const parent = document.getElementById('form-parent');
        const form = document.getElementById('exam-form');
        parent.insertBefore(div, form);
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 2000);
    }
    addToArray() {
        const result = document.getElementById('exam-result').value;
        numbers.push(Number(result));
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        let total = sum / numbers.length;
        // console.log(total);
        console.log(numbers);
        const arithmetic = document.getElementById('arithmetic');
        arithmetic.innerHTML = `Prosečna ocena je ${total}`;
    }
    deleteExam(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
            return true;
        }
    }
    // remove(number){
    //     for( var i = 0; i < numbers.length; i++){ 
    //         if ( numbers[i] === number) {
    //         numbers.splice(i, 1); 
    //         }
    //     }
    // }
}

document.getElementById('exam-form').addEventListener('submit',
function(e){
    const name = document.getElementById('exam-name').value;
    const result = document.getElementById('exam-result').value;
    const year = document.getElementById('exam-year').value;
    
    const exam = new Exam(name,result,year);

    console.log(exam);

    const ui = new UI();

    if(name === '' || result === '' || year === ''){
        ui.alertShow('You need to fill all field', 'error');
    } else {
        ui.addExam(exam);
        ui.alertShow('Exam added', 'success');
        ui.addToArray();
    }
    ui.clearFields();
    e.preventDefault();
});

document.getElementById('exam-list').addEventListener('click', 
function(e){
    const ui = new UI();
    if((ui.deleteExam(e.target)) === true) {
        ui.deleteExam(e.target);
        ui.alertShow('Deleted exam', 'success');
    }
    console.log(numbers);
    e.preventDefault();
});

