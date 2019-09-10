import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const app = new Clarifai.App({apiKey: '7655ed0b17e54f5cb4159492aefc01bc'});

const particlesOption = {
                    particles: {
                        number: {
                          value: 200,
                          density: {
                            enable: true,
                            value_area: 800
                            }
                        }
                    }          
                }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false,
      userProfile: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = (data) => {
    this.setState({ userProfile : data });
  }

  onInputChange = (event) => {
     this.setState({ input: event.target.value });
  }

  calculateFaceLocation = (imageData) => {
    const clarifaiFace = imageData.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      "leftCol": clarifaiFace.left_col * width,
      "topRow": clarifaiFace.top_row * height,
      "bottomRow": height - (clarifaiFace.bottom_row * height),
      "rightCol": width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box});
  }

  onButtonSubmit = () => {
     this.setState({ imageUrl: this.state.input })
     app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          if(response){
            fetch('http://localhost:4000/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id : this.state.userProfile.id
              })
            })
            .then(res => res.json())
            .then(count => {
              let obj = this.state.userProfile;
              obj.entries = count;
              this.setState({ userProfile: obj });
            })
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => {
          console.log(err);
        });
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({ isSignedIn : false })
    } else if (route === 'home'){
      this.setState({ isSignedIn : true })
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} />
        {this.state.route === 'home'? 
          <div>
            <Logo />
            <Rank userProfile = { this.state.userProfile } />
            <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
            <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>: this.state.route ==='signin'?
                      <Signin onRouteChange = {this.onRouteChange}/> :
                         <Register onRouteChange = {this.onRouteChange} loadUser = { this.loadUser }/> 
        }
      </div>
    );
  }
}

export default App;
