import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = 3002;
const app = express();
app.use(express.json())

function validateInput(body) {
    const items = body.items;

    if (!Array.isArray(items)) {
            return {Error: "items must be listed as an array."};
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (typeof item !== "object" || item === null || Array.isArray(item)) {
            return {Error: `Item ${i+1} must be an object that is not an array.`}
        } if (typeof item.name !== "string") {
            return {Error: `Item ${i+1} has an invalid type for name.  Item names must be a string.`}
        } if (item.name.trim().length === 0) {
            return {Error: `Item ${i+1} cannot have an empty item name.`}
        } if (typeof item.completed !== "boolean") {
            return {Error: `Item ${i+1} must be listed with a boolean status of either true or false.`}
        }
    }

    return null;
}

app.post("/progress", asyncHandler(async (req, res) => {
    // Validate request body
    const error = validateInput(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    /**
     * User story #3: Message with Results
     * - Total number of tasks
     * - Number of completed tasks
     * - Percentage completion
     * 
     * It then returns a structured JSON response containing progress
     * metrics and a summary message of that progress for the user so they
     * can clearly see their progress.
     */
    const items = req.body.items;

    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    let statusMessage;
    if (percentage === 100) statusMessage = "You did it! All tasks complete!";
    else if (percentage >= 75) statusMessage = "Almost there, keep pushing!";
    else if (percentage >= 50) statusMessage = "Nice, you're over halfway there!";
    else statusMessage = "Good start. Build momentum!";

    /**
     * Updated success response to implement User Story #3.
     * Replaces temporary validation confirmation message
     * with calculated progress metrics and formatted summary.
     */
    return res.status(200).json({
        completed,
        total,
        percentage,
        message: `You have completed ${completed} of ${total} tasks (${percentage}%). ${statusMessage}`
    });
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
