const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require ('fs')
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

// text to text
// async function run() {
//     const model = genAI.getGenerativeModel({model: "gemini-pro"})
//     const prompt = "Write a story about tortoise and rabbit"
//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     const text = response.text()
//     console.log(text); 

// }

// run()

// text/image to text 


// function fileToGenerativePart(path, mimeType) {
//     return {
//         inlineData: {
//             data: Buffer.from(fs.readFileSync(path)).toString('base64'),
//     //    read a file from the filesystem, convert its contents to a buffer, and then encode that buffer into a base64 string. This is particularly useful when you need to encode binary data (like images or other files) to be included in a JSON payload or used in contexts where base64 encoding is required.
//             mimeType
       
//         }

//     }
// }

// async function run () {
//     const model = genAI.getGenerativeModel({model: "gemini-pro-vision"})
//     const prompt = "What is the difference between the two pictures"
//     const imageParts = [
//         fileToGenerativePart("cat.jpg", "image/jpeg"),
//         fileToGenerativePart("dog.jpg", "image/jpeg") 
//     ]

//     const result = await model.generateContent([prompt, ...imageParts])
//     const response = await result.response
//     const text = response.text()
//     console.log(text);
// }

// run()


// testing history of chatbot


// async function run () {
//     const model = genAI.getGenerativeModel({model: "gemini-pro"})
//     const chat = model.startChat({
//         history:[
//             {
//                 role: "user",
//                 parts: "Hello. I have 2 cats in my house"
//             },
//             {
//                 role: "model",
//                 parts: "Great to meet you. What would you like to know?"
//             }
//         ]
//     })
//             const msg = "How many paws are in my house?"
//             const result = await chat.sendMessage(msg)
//             const response = await result.response
//             const text = response.text()
//             console.log(msg+"   "+text);
// }

// run()
 
// embeddings 

// conversational chatot