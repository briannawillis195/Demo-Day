
const Books = require("../models/book")



 const { Configuration, OpenAIApi } = require("openai")





module.exports = {
    getBookRecs: (req, res) => {
        res.render("bookrecs.ejs");
    },
    aiBookRecs: async (req, res) => {
      try {
        const newConfig = new Configuration({
          apiKey: process.env.CHATGPT_KEY,
        });
        const filter = { user: req.user.id }
          if(req.query.status){
            filter.status = req.query.status
          }
          console.log(filter)
          const books = await Books.find(filter)
          let prompt = 'Give me book recommendations based on the following books by authors of color:'
          for(let i=0; i < books.length; i++){
            console.log(books[i])
            prompt += `${books[i].title} by ${books[i].author}, `
          }
          console.log(prompt)
        const openai = new OpenAIApi(newConfig);
        const GPTOutput = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
  
        const output_text = GPTOutput.data.choices[0].message.content;
        const stringRecsArray = output_text.split('\n\n').filter(line => line[0] >= '1' && line[0] <= '9' )
        const recsArray = stringRecsArray.map(strRec => {
          const titleStart = strRec.indexOf('"')
          const titleEnd = strRec.indexOf('"', titleStart + 1)
          const title = strRec.slice(titleStart+1, titleEnd)
          console.log(title)
          const authorStart = strRec.indexOf('" by ')
          const authorEnd = strRec.indexOf(': ', titleEnd)
          const author = strRec.slice(authorStart + 5, authorEnd)
          console.log(author)
          const description = strRec.slice(authorEnd +2)
          return {title, author, description}
        }) 
        res.render('aiBookRecs.ejs', {user: req.user, recsArray: recsArray})
        console.log(recsArray);
  

      } catch (error) {
        console.error("Error in testChat:", error);

      }
    },

    };


