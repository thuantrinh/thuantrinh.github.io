var MultiplicationHelper = React.createClass({
    getInitialState: function() {
        return {
            questionCounter: 1,
            totalQustionsCount: 0,
            userDesiredTable: 1,
            showUserDesiredTable: true,
            showQuestion: false,
            showResults: false,
            questions: this.getQuestions(1),
            answers: [],
            buttonStyles: {
                fontSize: '2em',
                height: '3em',
                padding: '0 1em'
            }
        };
    },
    getUserDesiredTable: function() {
        const self = this;
        return (
            <div>
                <h4>Which Multiplication Table You Want To Test against?</h4>
                <h5>Insert a number from 1 - 10 for 2nd grade</h5>
                <input ref='userDesiredMultiplicationTable' pattern="\d*" className="u-full-width" style={{height: '2em',fontSize: '5em'}} type="number" min="1" max="3"  onChange={self.onUserDesiredTableInputChange} />
                <br></br>
                <button  type="button" style={self.state.buttonStyles} onClick={self.onUserDesiredTableInputSubmit}> Submit</button>
            </div>
        );
    },

    getQuestionPage: function() {
        const self = this;
        var random = Math.floor((Math.random() * this.state.questions.length) + 0);

        var extractedQuestion = this.state.questions[random];
        var questionBlock;

        if (this.state.questions.length > 0){
            questionBlock = (
                <div>
                    <div style={{fontSize: '7em'}}>{'' + extractedQuestion.multiplicand + ' x ' +  extractedQuestion.multiplier + ' = '}</div>
                    <input ref='userAnswerInput' pattern="\d*" className="u-full-width" style={{height: '2em',fontSize: '5em'}} type="number" min='1' max='2' key={new Date().getTime()} />
                    <br></br>
                    <div>
                        <button className="five columns" style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertSubmit.bind(this, extractedQuestion, random)}> Answer</button>
                        <button className="four columns" style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertEnd}> End</button>
                    </div>
                </div>
            )
        } else {
            questionBlock = (
                <div>
                    <button style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertEnd}> End</button>
                </div>
            )
        }
        return (
            <div>
                <h4>Question# {this.state.questionCounter}  ({this.state.questions.length} questions remaining)</h4>
                {questionBlock}
            </div>
        );
    },
    getResultsPage: function() {
        const self = this;

        var answerList = []
        var answers = self.state.answers;
        var errorStyle;
        var errorCount = 0;
        
        for (var answerIndex = 0; answerIndex < answers.length; answerIndex++){
            var answer = answers[answerIndex]
            if (parseInt(answer.userAnswer) !== parseInt(answer.answer)) {
                errorStyle = {paddingLeft: '5%', color: 'red'}
                errorCount++;
            } else {
                errorStyle = {paddingLeft: '5%'};
            }
            answerList.push(<li style={{fontSize: '2em'}} key={answerIndex}> <span style={errorStyle}>{answer.multiplicand} x {answer.multiplier} = {answer.userAnswer}</span> </li>)
        }

        var results = Math.round((answerList.length - errorCount) / answerList.length * 100)

        return (
            <div>
                <h4>Results</h4>
                <ol type="1">{answerList}</ol>
            </div>
        );
    },
    getQuestions: function(input){
        var questions = [];

        for (var multiplicand = 2; multiplicand < input; multiplicand++ ){
            for (var multiplier = 1; multiplier < 11; multiplier++){
                questions.push({
                    multiplicand: multiplicand,
                    multiplier: multiplier,
                    answer: multiplicand * multiplier
                });
            }
        }
        return questions;
    },
    onUserDesiredTableInputChange: function(event){
        var questions = this.getQuestions((parseInt(event.target.value) + 1));

        this.setState({
            userDesiredTable: (parseInt(event.target.value) + 1),
            questions: questions,
            totalQustionsCount: questions.length
        });
    },
    onUserDesiredTableInputSubmit: function(){
        var userDesiredMultiplicationTable = ReactDOM.findDOMNode(this.refs.userDesiredMultiplicationTable).value;

        if (userDesiredMultiplicationTable !== ''){
            this.setState({
                showUserDesiredTable: false,
                showQuestion: true
            });
        }
    },
    onUserAnswertSubmit: function(extractedQuestion, random, event){
        var currentAnswer = ReactDOM.findDOMNode(this.refs.userAnswerInput).value;

        if (currentAnswer !== ''){
            this.state.questions.splice(random, 1)
            var answers = this.state.answers.slice()
            answers.push({
                multiplicand: extractedQuestion.multiplicand,
                multiplier: extractedQuestion.multiplier,
                userAnswer: parseInt(ReactDOM.findDOMNode(this.refs.userAnswerInput).value),
                answer: extractedQuestion.answer
            })
            this.setState({
                    answers: answers,
                    questionCounter: parseInt(this.state.questionCounter) + 1
                }
            )
        }
    },
    onUserAnswertEnd: function(event){
        this.setState({
            showUserDesiredTable: false,
            showQuestion: false,
            showResults: true
        });
    },
    render: function() {
        return (
            <div >
                { this.state.showUserDesiredTable ? this.getUserDesiredTable(): null }

                { this.state.showQuestion ? this.getQuestionPage(): null }

                {this.state.showResults ? this.getResultsPage() : null}
            </div>
        );
      }
});

ReactDOM.render(
    <MultiplicationHelper/>,
    document.getElementById('multiplicationApp')
);