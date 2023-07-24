import React from 'react';

const IndexPage = () => {
  const handleSubmit = async (e) => {
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
  };

  
  return (
    <div>
      <h1>Training Plan Generator</h1>
      <div className="form-container">
        <form id="trainingForm" onSubmit={handleSubmit}>
          <label>What days do you want long runs:</label>
          <div className="checkbox-flex-container">
            <label>
              <input type="checkbox" name="daysPerWeek" value="Mo" />
              <span className="custom-checkbox">Mo</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="Tu" />
              <span className="custom-checkbox">Tu</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="We" />
              <span className="custom-checkbox">We</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="Th" />
              <span className="custom-checkbox">Th</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="Fr" />
              <span className="custom-checkbox">Fr</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="Sa" />
              <span className="custom-checkbox">Sa</span>
            </label>
            <label>
              <input type="checkbox" name="daysPerWeek" value="Su" />
              <span className="custom-checkbox">Su</span>
            </label>
          </div>
          <br />
          <label htmlFor="weeklyMileage">Weekly Mileage Goal:</label>
          <div className="input-wrapper">
            <input type="text" name="weeklyMileage" pattern="[0-9]*" />
          </div>
          <br />
          <label htmlFor="trainingPlanLength">Training Plan Length (weeks):</label>
          <div className="input-wrapper">
            <select name="trainingPlanLength">
              <option value="4">4 weeks</option>
              <option value="5">5 weeks</option>
              <option value="6">6 weeks</option>
              <option value="7">7 weeks</option>
              <option value="8">8 weeks</option>
              <option value="9">9 weeks</option>
              <option value="10">10 weeks</option>
              <option value="11">11 weeks</option>
              <option value="12">12 weeks</option>
              <option value="13">13 weeks</option>
              <option value="14">14 weeks</option>
              <option value="15">15 weeks</option>
              <option value="16">16 weeks</option>
              <option value="17">17 weeks</option>
              <option value="18">18 weeks</option>
            </select>
          </div>
          <br />
          <label htmlFor="raceGoals">Race Goals:</label>
          <div className="input-wrapper">
            <select name="raceGoals">
              <option value="1 mile">1 mile</option>
              <option value="5K">5K</option>
              <option value="10K">10K</option>
              <option value="Half Marathon">Half Marathon</option>
              <option value="Marathon">Marathon</option>
            </select>
          </div>
          <br />
          <label htmlFor="racingGoalTime">Racing Goal Time (hh:mm:ss):</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="racingGoalTime"
              placeholder="Enter racing goal time (hh:mm:ss)"
            />
          </div>
          <br />
          <input type="submit" value="Generate Training Plan" />
        </form>
      </div>
      <div id="output">
        {/* The generated training plan will be displayed here */}
      </div>
    </div>
  );
};

export default IndexPage;