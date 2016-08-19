var MultiplicationHelper = React.createClass({
    getInitialState: function() {
        return {
            questionCounter: 1,
            totalQustionsCount: 0,
            userDesiredTable: 1,
            currentQuestionIndex: -1,
            showUserDesiredTable: true,
            showQuestion: false,
            showResults: false,
            showConfirmationModal: false,
            questions: this.getQuestions(2, 9),
            answers: [],
            buttonStyles: {
                fontSize: '2em',
                height: '3em',
                padding: '0 1em'
            }
        };
    },
    closeConfirmationModal: function() {
        this.setState({
            showConfirmationModal: false
        });
    },
    showConfirmationModal: function() {
        this.setState({
            showConfirmationModal: true
        });
    },
    getConfirmationModal: function() {
        const self = this;
        return (
            <div id="myModal" className="twelve columns modal">
                <div className="ten columns offset-by-one modal-content">
                    <h5 style={{textAlign: 'center'}} className="ten columns offset-by-one">Are you sure you want to end the test?</h5>
                    <button className="ten columns offset-by-one" style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertEnd}> Yes</button>
                    <button className="ten columns offset-by-one" style={self.state.buttonStyles} type="button" onClick={self.closeConfirmationModal}> No</button>
                </div>
            </div>
        )
    },
    getUserDesiredTable: function() {
        const self = this;

        var questionsList = []
        var questions = self.state.questions;

        for (var questionIndex = 0; questionIndex < questions.length; questionIndex++){
            var question = questions[questionIndex]
            questionsList.push(<li style={{fontSize: '2em'}} key={questionIndex}> <span style={{paddingLeft: '5%'}}>{question.multiplicand} x {question.multiplier} = {question.answer}</span> </li>)
        }

        return (
            <div>
                <div>
                    <h4 style={{textAlign: 'center'}}>GENERATION QUESTIONSs</h4>
                    <h5 style={{textAlign: 'center'}}>Please select a range of times table to generate the multiplication questions</h5>
                <span>
                    <h5 className="two columns">From:&nbsp;&nbsp;&nbsp;</h5>
                    <select ref="fromDropdown" className="three columns" onChange={self.onUserDesiredTableInputChange}>
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                    <h5 className="two columns"></h5>

                    <h5 className="two columns">To:</h5>
                    <select ref="toDropdown" className="three columns" onChange={self.onUserDesiredTableInputChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9" selected>9</option>
                        <option value="10">10</option>
                    </select>
                </span>
                    <button className="twelve columns" type="button" style={self.state.buttonStyles} onClick={self.onUserDesiredTableInputSubmit}> GO</button>
                    <br></br>
                    <h5 className="twelve columns" style={{paddingTop: '1em'}}>The following questions will be asked (in random order)</h5>
                    <ul className="twelve columns">
                        {questionsList}
                    </ul>
                </div>
            </div>
        );
    },

    getQuestionPage: function() {
        const self = this;

        if (self.state.currentQuestionIndex === -1){
             self.state.currentQuestionIndex = Math.floor((Math.random() * this.state.questions.length) + 0);
        }

        var extractedQuestion = this.state.questions[self.state.currentQuestionIndex];
        var questionBlock;

        if (this.state.questions.length > 0){
            questionBlock = (
                <div>
                    <div style={{fontSize: '7em', textAlign: 'center'}}>{'' + extractedQuestion.multiplicand + ' x ' +  extractedQuestion.multiplier + ' = '}</div>
                    <input ref='userAnswerInput' pattern="\d*" className="u-full-width" style={{height: '2em',fontSize: '5em'}} type="number" min='1' max='2' key={new Date().getTime()} />
                    <br></br>
                    <div>
                        <button className="twelve columns" style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertSubmit.bind(this, extractedQuestion, self.state.currentQuestionIndex)}> Answer</button>
                        <button className="twelve columns" style={self.state.buttonStyles} type="button" onClick={self.showConfirmationModal}> End</button>
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
                <h4 style={{textAlign: 'center'}}>Question# {this.state.questionCounter}  ({this.state.questions.length} questions remaining)</h4>
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
                <h4>Score: {results}%</h4>
                <ol type="1">{answerList}</ol>
            </div>
        );
    },
    getQuestions: function(from, to){
        var questions = [];

        var realToValue = to + 1;

        for (var multiplicand = from; multiplicand < realToValue; multiplicand++ ){
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
        var fromDropdown = parseInt(ReactDOM.findDOMNode(this.refs.fromDropdown).value);
        var toDropdown = parseInt(ReactDOM.findDOMNode(this.refs.toDropdown).value);

        if (fromDropdown != null & toDropdown != null){
            if (fromDropdown > toDropdown){
                return;
            }
            var questions = this.getQuestions(fromDropdown, toDropdown);

            this.setState({
                userDesiredTable: (parseInt(event.target.value) + 1),
                questions: questions,
                totalQustionsCount: questions.length
            });
        }
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
                    currentQuestionIndex: -1,
                    answers: answers,
                    questionCounter: parseInt(this.state.questionCounter) + 1
                }
            )
        }
    },
    onUserAnswertEnd: function(event){
        this.setState({
            showUserDesiredTable: false,
            showConfirmationModal: false,
            showQuestion: false,
            showResults: true
        });
    },
    render: function() {
        return (
            <div >
                { this.state.showConfirmationModal ? this.getConfirmationModal(): null }

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