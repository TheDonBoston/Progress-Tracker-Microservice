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

    // If body is valid, calculate and report progress here:
    res.status(201).json({message: "No Errors are present"}); // This line is temporarily used to show validated input
}))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})