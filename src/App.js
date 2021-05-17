import React, {Component} from "react"

import './App.css';

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1ihzfe.jpg",
            allMemeImgs: []
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeImg = this.changeImg.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes)
                this.setState({allMemeImgs: memes})
            })
    }

    changeHandler(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        console.log(value)
    }

    changeImg(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {

        return (
            <div>
                <form className="meme-form">
                    <input name="topText" placeholder="Top Text" value={this.state.topText}
                           onChange={this.changeHandler}/>
                    <input name="bottomText" placeholder="Bottom Text" value={this.state.bottomText}
                           onChange={this.changeHandler}/>

                    <button type="submit" onClick={this.changeImg}>New Image</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg}/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;
