var ExampleApplication = React.createClass({
    getInitialState: function() {
        return {
            questionCounter: 1,
            userDesiredTable: 1,
            showUserDesiredTable: true,
            showQuestion: false,
            showResults: false,
            questions: this.getQuestions(1),
            answers: [],
            currentAnswer: null,
            buttonStyles: {
                borderRadius: '6px',
                border: '1px solid black',
                display: 'inline-block',
                color: 'black',
                backgroundColor: 'white',
                fontSize: '2em',
                fontW: 'bold',
                padding: '6px 24px',
                textDecoration: 'none',
                textShadow:'0px 1px 0px #ffffff'
            }
        };
    },
    getUserDesiredTable: function() {
        const self = this;
        return (
            <div>

                <h1>Enter Multiplication table</h1>

                <form>
                    <input style={{height: '1em',fontSize: '7em', border: '1px solid black'}} type="number" min='1' max='100'  onChange={self.onUserDesiredTableInputChange} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <button style={self.state.buttonStyles} type="button" onClick={self.onUserDesiredTableInputSubmit}> Submit</button>
                </form>

            </div>
        );
    },

    getQuestionPage: function() {
        const self = this;
        var random = Math.floor((Math.random() * this.state.questions.length) + 0);
        console.log('random ',random);

        var extractedQuestion = this.state.questions[random];


        //style={{display: 'flex',justifyContent: 'space-between'}
        return (
            <div>
                <h1>Answer The question</h1>

                <div style={{fontSize: '7em'}}>{'' + extractedQuestion.multiplicand + ' x ' +  extractedQuestion.multiplier + ' = '}</div>
                <form>
                    <input style={{height: '1em',fontSize: '7em', border: '1px solid black'}} type="number" min='1' max='2' key={new Date().getTime()} onChange={self.onUserAnswertChange.bind(this, extractedQuestion)} />

                    <br></br>
                    <br></br>
                    <br></br>

                    <div>
                        <button style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertSubmit.bind(this, extractedQuestion)}> Submit</button>
                        <button style={self.state.buttonStyles} type="button" onClick={self.onUserAnswertEnd}> End</button>
                    </div>
                </form>
            </div>
        );
    },
    getResultsPage: function() {
        const self = this;

        var answerList = []

        //answerList.push(<label>{answer.multiplicand} x {answer.multiplier} = {answer.userAnswer} </label>)

        var answers = self.state.answers;
        var errorStyle;
        
        
        for (var answerIndex = 0; answerIndex < answers.length; answerIndex++){
            var answer = answers[answerIndex]
            console.log(answer.userAnswer, answer.answer);
            console.log();
            if (answer.userAnswer !== answer.answer.toString()) {
                errorStyle = {color: 'red'}
            }
            console.log(errorStyle);
            answerList.push(<li key={answerIndex} style={errorStyle}> {answer.multiplicand} x {answer.multiplier} = {answer.userAnswer} </li>)
        }

        return (
            <div>
                <h1>Results</h1>
                <ul>{answerList}</ul>
            </div>
        );
    },
    getQuestions: function(input){
        var questions = [];

        for (var multiplicand = 0; multiplicand < input; multiplicand++ ){
            for (var multiplier = 0; multiplier < 11; multiplier++){
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

        this.setState({
            userDesiredTable: (parseInt(event.target.value) + 1),
            questions: this.getQuestions((parseInt(event.target.value) + 1))
        });
    },
    onUserDesiredTableInputSubmit: function(){
        this.setState({
            showUserDesiredTable: false,
            showQuestion: true
        });
    },
    onUserAnswertChange: function(extractedQuestion, event){
        this.state.currentAnswer =  event.target.value
    },
    onUserAnswertSubmit: function(extractedQuestion, event){
        console.log('onUserAnswertSubmit state', this.state)

        var answers = this.state.answers.slice()
        answers.push({
            multiplicand: extractedQuestion.multiplicand,
            multiplier: extractedQuestion.multiplier,
            userAnswer: this.state.currentAnswer,
            answer: extractedQuestion.answer
        })
        this.setState({ answers: answers })

        console.log('onUserAnswertSubmit state2', this.state)
    },
    onUserAnswertEnd: function(event){
        this.setState({
            showUserDesiredTable: false,
            showQuestion: false,
            showResults: true
        });
    },
    render: function() {
        console.log('state1', this.state);
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

    <ExampleApplication/>,
    document.getElementById('container')
);