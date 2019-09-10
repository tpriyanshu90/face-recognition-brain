import React from 'react';
import './Signin.css';

class Signin extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail : "",
			signInPassword: ""
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	onSubmitSignIn = (e) => {
		e.preventDefault();
		fetch('http://localhost:4000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(res => res.json())
		.then((data) => {
			if(data === "Success"){
				this.props.onRouteChange('home');
			} else {
				this.props.onRouteChange('register');
			}
		})
	}

	render(){
		const { onRouteChange } = this.props;
		return (
			<div className="">
				<main className="pa4 black-80">
				  <form className="measure center shadow-2 pa2">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="emailAddress">Email</label>
				        <input onChange={ this.onEmailChange }
				        	   value ={ this.state.signInEmail }	
				        	   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="emailAddress"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input  value ={ this.state.signInPassword }
				        		onChange={ this.onPasswordChange }
				        		className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				      <div className="">
				      	<input 
				      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		type="button"
				      		value="Sign in"
				      		onClick={ this.onSubmitSignIn } />
				      </div>
				      <div className="lh-copy mt3">
				      	<p onClick={ () => onRouteChange('register') } className="f6 link dim black db pointer">Register</p>
				      </div>
				    </fieldset>
				  </form>
				</main> 
			</div>
		);
	}
	
}

export default Signin;