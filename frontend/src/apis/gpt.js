import { GPT } from '../util/http-commons';
const axios = GPT();

export const askGpt = async (question) => {
  try {
    const response = await axios.post('', {
     model: "gpt-3.5-turbo",
     messages: [
      {role: "user",
        content: question
      },
    ],
    temperature: 0.5,
    max_tokens: 200,
      
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error asking GPT:', error);
    throw error;
  }
};


// import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-4o-mini",
//   });

//   console.log(completion.choices[0]);
// }