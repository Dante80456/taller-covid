document.addEventListener('DOMContentLoaded', function() {
    const userId = generateUserId();
    document.getElementById('user-id').textContent = userId;

    let currentQuestion = 1;
    let answers = {};

    showQuestion(currentQuestion);

    function generateUserId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    function showQuestion(questionNumber) {
        const container = document.getElementById('question-container');
        container.innerHTML = '';

        let questionText = '';
        switch (questionNumber) {
            case 1:
                questionText = '¿Tuvo usted algún contacto a menos de 2 metros durante un mínimo de 15 minutos o convive/cuida a alguna persona con COVID-19 sin medidas de protección?';
                break;
            case 2:
                questionText = '¿Presenta usted algún síntoma?';
                break;
            case 3:
                questionText = '¿Hace más de 14 días que comenzaron los síntomas?';
                break;
            case 4:
                questionText = '¿Tiene dificultad repentina para respirar o nota falta de aire?';
                break;
        }

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${questionText}</p>
            <button onclick="answerQuestion(${questionNumber}, 'SI')">SI</button>
            <button onclick="answerQuestion(${questionNumber}, 'NO')">NO</button>
        `;
        container.appendChild(questionDiv);
    }

    window.answerQuestion = function(questionNumber, answer) {
        answers[questionNumber] = answer;
        const nextQuestion = getNextQuestion(questionNumber, answer);
        if (nextQuestion) {
            currentQuestion = nextQuestion;
            showQuestion(currentQuestion);
        } else {
            showDiagnosis();
        }
    };

    function getNextQuestion(current, answer) {
        if (current === 1) {
            if (answer === 'NO') {
                return null; // Diagnosis 1
            } else {
                return 2;
            }
        } else if (current === 2) {
            if (answer === 'NO') {
                return null; // Diagnosis 1
            } else {
                return 3;
            }
        } else if (current === 3) {
            if (answer === 'SI') {
                return null; // Diagnosis 2
            } else {
                return 4;
            }
        } else if (current === 4) {
            return null; // Diagnosis based on answer
        }
    }

    function showDiagnosis() {
        let diagnosis = '';
        if (answers[1] === 'NO' || answers[2] === 'NO') {
            diagnosis = 'En este momento su situación no requiere asistencia médica.';
        } else if (answers[3] === 'SI') {
            diagnosis = 'La COVID-19 se presenta como una enfermedad aguda, por lo tanto, los síntomas que presenta en este momento podrían deberse a otra causa diferente del nuevo coronavirus.';
        } else if (answers[4] === 'SI') {
            diagnosis = 'Sus síntomas parecen indicar gravedad.';
        } else if (answers[4] === 'NO') {
            diagnosis = 'Llame al número 01-8000-66666 pida una consulta telefónica con su centro de salud, indicando los síntomas que presenta y que tuvo un contacto estrecho con un caso de COVID-19.';
        }

        document.getElementById('diagnosis').textContent = diagnosis;
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';

        // Enviar a backend
        submitToBackend(userId, diagnosis);
    }

    function submitToBackend(id, diag) {
        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: id, diagnosis: diag })
        })
        .then(response => response.json())
        .then(data => console.log('Enviado:', data))
        .catch(error => console.error('Error:', error));
    }
});