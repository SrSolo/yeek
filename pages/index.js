document.getElementById('trainingForm').addEventListener('submit', async function (e) {
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
        apiKey: "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"
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
});