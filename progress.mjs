import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = 3002;
const app = express();
app.use(express.json())

/**
 * Ensures 1) that body.items is an array, and 2) that each item object has a name property with
 * a string value, and 3) each item has a completed property, which must have a boolean value.
 */
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

/**
 * Returns percent complete rounded to the nearest integer
 * @param {*} items a list of objects in the form { name: "name", complete: bool }
 */
function getPercentComplete(items) {
    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    return percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
}

function selectMessage(percent) {
    let statusMessage;
    if (percentage === 100) statusMessage = "You did it! All tasks complete!";
    else if (percentage >= 75) statusMessage = "Almost there, keep pushing!";
    else if (percentage >= 50) statusMessage = "Nice, you're over halfway there!";
    else statusMessage = "Good start. Build momentum!";
    return statusMessage;
}

/** Given a list of items with completion statuses, returns the percent complete and 
 *  an appropriate motivational message
 */
app.post("/progress", asyncHandler(async (req, res) => {
    const error = validateInput(req.body);
    if (error) {
        return res.status(400).json(error);
    }

    const percentage = getPercentComplete(req.body.items)
    const statusMessage = selectMessage(percentage)

    return res.status(200).json({
        completed,
        total,
        percentage,
        message: `You have completed ${completed} of ${total} tasks (${percentage}%). ${statusMessage}`
    });
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})
