const {OpenAI} = require('openai');


exports.openAiResponse = async (req, res) => {
    const openai = new OpenAI({
        apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
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