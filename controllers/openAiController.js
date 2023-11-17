const {OpenAI} = require('openai');
require("dotenv").config();

exports.openAiResponse = async (req, res) => {

    let openAiKey = process.env.GPT_OPENAIKEY;
    console.log("vinit", openAiKey);

    const openai = new OpenAI({
        apiKey: openAiKey, // defaults to process.env["OPENAI_API_KEY"]
      });

      let prompt = req.params.prompt

      try{
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
          });
      
          res.status(200).send(chatCompletion.choices[0].message.content);
      }catch(error){
        res.status(400).json({
            err: error
        })
      }
      
        
}