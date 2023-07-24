const https = require('https');

const apiKey = process.env.API_KEY;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const requestData = req.body;
        const postData = JSON.stringify({
            prompt: `You selected ${requestData.daysPerWeek} days per week for training. Your weekly mileage goal is ${requestData.weeklyMileage} miles, and your race goal is to run a ${requestData.raceGoals} in ${requestData.racingGoalTime}. Your training plan should be ${requestData.trainingPlanLength} weeks long.`,
            max_tokens: 200,
        });

        const options = {
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/engines/davinci-codex/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
                'Authorization': `Bearer ${apiKey}`,
            },
        };

        const reqHttps = https.request(options, (response) => {
            let responseData = '';

            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                console.log('Response Data:', responseData);

                try {
                    const parsedResponse = JSON.parse(responseData);
                    const trainingPlan = parsedResponse.choices[0].text;
                    res.status(200).json({ trainingPlan });
                } catch (error) {
                    console.error('Error:', error.message);
                    res.status(500).json({ error: 'An error occurred while generating the training plan.' });
                }
            });
        });

        reqHttps.on('error', (error) => {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'An error occurred while generating the training plan.' });
        });

        reqHttps.write(postData);
        reqHttps.end();
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}