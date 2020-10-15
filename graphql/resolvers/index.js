const Article = require("../../models/article");

module.exports = {
    articles: async() => {
        try {
            const articlesFetched = await Article.find();
            return articlesFetched.map(article => {
                return {
                    ...article._doc,
                    _id: article.id,
                    createdAt: new Date(article._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error;
        }
    },

    createdArticle: async args => {
        try {
            const { title, body } = args.article;
            const article = new Article({
                title,
                body,
            })
            const newArticle = await article.save();
            return { ...newArticle._doc, _id: newArticle._id }
        } catch (error) {
            throw error;
        }
    },
}