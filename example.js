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
                borderRadius: '6px',
                border: '1px solid black',
                display: 'inline-block',
                color: 'black',
                backgroundColor: 'white',
                fontSize: '2em',
                fontW: 'bold',
                padding: '1em 1em',
                textDecoration: 'none',
                textShadow:'0px 1px 0px #ffffff'
            }
        };
    },
    getUserDesiredTable: function() {
        const self = this;
        return (
            <div>
                <h1>Which Multiplication Table You Want To Test against?</h1>
                <h2>Insert a number from 1 - 10 for 2nd grade</h2>
                <input pattern="\d*" style={{height: '1em',fontSize: '7em', border: '1px solid black', width: '30%'}} type="number" min='1' max='100'  onChange={self.onUserDesiredTableInputChange} />
                <br></br>
                <br></br>
                <br></br>
                <button style={self.state.buttonStyles} type="button" onClick={self.onUserDesiredTableInputSubmit}> Submit</button>
            </div>
        );
    },

    getQuestionPage: function() {
        const self = this;
        var random = Math.floor((Math.random() * this.state.questions.length) + 0);

        var extractedQuestion = this.state.questions[random];
        //
        var questionBlock;

        if (this.state.questions.length > 0){
            questionBlock = (
                <div>
                    <div style={{fontSize: '7em'}}>{'' + extractedQuestion.multiplicand + ' x ' +  extractedQuestion.multiplier + ' = '}</div>
                    <input ref='userAnswerInput' pattern="\d*" style={{height: '1em',fontSize: '7em', border: '1px solid black', width: '30%'}} type="number" min='1' max='2' key={new Date().getTime()} />

                    <br></br>
                    <br></br>
                    <br></br>

                    <div>
                        <button style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertSubmit.bind(this, extractedQuestion, random)}> Answer</button>
                        <button style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertEnd}> End</button>
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
                <h1>Question# {this.state.questionCounter}  ({this.state.questions.length} questions remaining)</h1>
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
                errorStyle = {paddingLeft: '2%', color: 'red'}
                errorCount++;
            } else {
                errorStyle = {paddingLeft: '2%'};
            }
            answerList.push(<li key={answerIndex} style={errorStyle}>{answer.multiplicand} x {answer.multiplier} = {answer.userAnswer} </li>)
        }

        var results = (answerList.length - errorCount) / answerList.length * 100

        return (
            <div>
                <h1>Results: {results}%    ( {errorCount} incorrect out of {answerList.length} )</h1>
                <ol type='1' style={{fontSize: '2em'}}>{answerList}</ol>
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
        this.setState({
            showUserDesiredTable: false,
            showQuestion: true
        });
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
            <div style={{width: window.innerWidth}}>
                { this.state.showUserDesiredTable ? this.getUserDesiredTable(): null }

                { this.state.showQuestion ? this.getQuestionPage(): null }

                {this.state.showResults ? this.getResultsPage() : null}
            </div>
        );
      }
});

ReactDOM.render(
    <MultiplicationHelper/>,
    document.getElementById('container')
);