import fetch from "node-fetch";

async function test1() {
    const response = await fetch("http://localhost:3002/progress", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            items: [
                { name: "20 minute walk", completed: false },
                { name: "35 push-ups", completed: true }
            ]
        })
    })

    const data = await response.json()
    console.log(data);
}

async function test2() {
    const response = await fetch("http://localhost:3002/progress", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            items: [
                { name: "", completed: false },
                { name: "35 push-ups", completed: true }
            ]
        })
    })

    const data = await response.json()
    console.log(data);
}

test1();
test2();