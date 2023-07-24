
const axios = require('../../node_modules/axios');

const apiKey = "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";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const requestData = req.body;

        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: `You selected ${requestData.daysPerWeek} days per week for training. Your weekly mileage goal is ${requestData.weeklyMileage} miles, and your race goal is to run a ${requestData.raceGoals} in ${requestData.racingGoalTime}. Your training plan should be ${requestData.trainingPlanLength} weeks long.`,
                max_tokens: 200,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            const trainingPlan = response.data.choices[0].text;

            // Send the generated training plan back to the frontend
            res.status(200).json({ trainingPlan });
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error (send an error response to the frontend, etc.)
            res.status(500).json({ error: 'An error occurred while generating the training plan.' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}