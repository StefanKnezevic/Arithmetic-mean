class Exam {
    constructor(name, result, year) {
        this.name = name;
        this.result = result;
        this.year = year;
    }

}
const numbers = [];
class UI {
    addExam(exam) {
        const list = document.getElementById('exam-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${exam.name}</td>
        <td id="result">${exam.result}</td>
        <td>${exam.year}</td>
        <td><a id="result" href="#" class="delete">&#10006</a></td>
        `
        list.appendChild(row);

    }
    clearFields() {
        document.getElementById('exam-name').value = '';
        document.getElementById('exam-result').value = '';
        document.getElementById('exam-year').value = '';
    }
    alertShow(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const parent = document.getElementById('form-parent');
        const form = document.getElementById('exam-form');
        parent.insertBefore(div, form);
        setTimeout(function () {
            document.querySelector('.alert').remove()
        }, 2000);
    }
    addToArray(result) {
        numbers.push(Number(result));
        let total = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        console.log("numbers:", numbers);
        const arithmetic = document.getElementById('arithmetic');
        arithmetic.innerHTML = `Prosečna ocena je ${total}`;
    }
    deleteExam(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
            numbers.forEach(function (number, index) {
                if (target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.textContent == number) {
                    numbers.splice(index, 1)
                    console.log('Numbers', numbers);
                }
            });
        }
    }
}

document.getElementById('exam-form').addEventListener('submit',
    function (e) {
        const name = document.getElementById('exam-name').value;
        const result = document.getElementById('exam-result').value;
        const year = document.getElementById('exam-year').value;

        const exam = new Exam(name, result, year);
        const ui = new UI();


        if (name === '' || result === '') {
            ui.alertShow('You need to fill all field', 'error');
        } else {
            ui.addExam(exam);
            ui.alertShow('Exam added', 'success');
            ui.addToArray(result);
        }
        ui.clearFields();
        e.preventDefault();
    });

document.getElementById('exam-list').addEventListener('click',
    function (e) {
        const ui = new UI();
        ui.deleteExam(e.target);
        ui.alertShow('Deleted exam', 'success');
        console.log(numbers);
        e.preventDefault();
    });

