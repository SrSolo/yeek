// Function to create a checkbox input element
function createCheckbox(name, value) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name;
    checkbox.value = value;
    const span = document.createElement('span');
    span.textContent = value;

    label.appendChild(checkbox);
    label.appendChild(span);

    return label;
}

// Function to create a select input element with options
function createSelect(name, options) {
    const select = document.createElement('select');
    select.name = name;

    for (const optionValue of options) {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue + ' weeks';
        select.appendChild(option);
    }

    return select;
}

// Function to create the form dynamically
function createForm() {
    const formContainer = document.getElementById('formContainer');
    const form = document.createElement('form');
    form.id = 'trainingForm';

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const weeklyMileageInput = document.createElement('input');
    weeklyMileageInput.type = 'text';
    weeklyMileageInput.name = 'weeklyMileage';
    weeklyMileageInput.pattern = '[0-9]*';

    const trainingPlanLengthSelect = createSelect('trainingPlanLength', ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']);

    const raceGoalsSelect = createSelect('raceGoals', ['1 mile', '5K', '10K', 'Half Marathon', 'Marathon']);

    const racingGoalTimeInput = document.createElement('input');
    racingGoalTimeInput.type = 'text';
    racingGoalTimeInput.name = 'racingGoalTime';
    racingGoalTimeInput.placeholder = 'Enter racing goal time (hh:mm:ss)';

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Generate Training Plan';

    form.appendChild(document.createTextNode('What days do you want long runs:'));
    const checkboxFlexContainer = document.createElement('div');
    checkboxFlexContainer.className = 'checkbox-flex-container';

    for (const day of daysOfWeek) {
        checkboxFlexContainer.appendChild(createCheckbox('daysPerWeek', day));
    }

    form.appendChild(checkboxFlexContainer);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Weekly Mileage Goal:'));
    const weeklyMileageWrapper = document.createElement('div');
    weeklyMileageWrapper.className = 'input-wrapper';
    weeklyMileageWrapper.appendChild(weeklyMileageInput);
    form.appendChild(weeklyMileageWrapper);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Training Plan Length (weeks):'));
    const trainingPlanLengthWrapper = document.createElement('div');
    trainingPlanLengthWrapper.className = 'input-wrapper';
    trainingPlanLengthWrapper.appendChild(trainingPlanLengthSelect);
    form.appendChild(trainingPlanLengthWrapper);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Race Goals:'));
    const raceGoalsWrapper = document.createElement('div');
    raceGoalsWrapper.className = 'input-wrapper';
    raceGoalsWrapper.appendChild(raceGoalsSelect);
    form.appendChild(raceGoalsWrapper);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Racing Goal Time (hh:mm:ss):'));
    const racingGoalTimeWrapper = document.createElement('div');
    racingGoalTimeWrapper.className = 'input-wrapper';
    racingGoalTimeWrapper.appendChild(racingGoalTimeInput);
    form.appendChild(racingGoalTimeWrapper);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);

    formContainer.appendChild(form);
}

// Function to handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const daysPerWeek = formData.getAll('daysPerWeek');
    const weeklyMileage = formData.get('weeklyMileage');
    const raceGoals = formData.get('raceGoals');
    const trainingPlanLength = formData.get('trainingPlanLength');
    const racingGoalTime = formData.get('racingGoalTime');

    const requestData = {
        daysPerWeek,
        weeklyMileage,
        raceGoals,
        trainingPlanLength,
        racingGoalTime,
    };

    try {
        const response = await fetch('/api/generate_plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Display the generated training plan in the output div
        document.getElementById('output').innerText = data.trainingPlan;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add form creation and submission event listener when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createForm();
    document.getElementById('trainingForm').addEventListener('submit', handleSubmit);
});