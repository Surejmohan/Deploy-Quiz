var mongoose = require('mongoose');



var QuizSchema = mongoose.Schema({


	Quest_no: {
		type: String
	},
	Question: {
		type: String
	},
    Choices: [{option1: String,option2: String,option3: String,option4: String}],

    Type: {
		type: String
	}
	
	
	
});

var Quiz = module.exports = mongoose.model('Quiz', QuizSchema);


module.exports.getQuiz = function(callback)
{
    Quiz.find(callback);
}
    
    