const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    const body = await req.text();
    const jsonBody = JSON.parse(body);
    const USER_MESSAGE = jsonBody.text;
    const modelStreamingUrl = jsonBody.modelStreamingUrl; // Get the model streaming URL from the request body

    const COLAB_URL = modelStreamingUrl; // Use the model streaming URL from the request

    const response = await fetch(`${COLAB_URL}/inference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: USER_MESSAGE }),
    });

    const data = await response.json();

    return NextResponse.json({ output: data.output });
  } catch (error) {
    console.error(error);
    return new Response("Error processing request", { status: 500 });
  }
}
