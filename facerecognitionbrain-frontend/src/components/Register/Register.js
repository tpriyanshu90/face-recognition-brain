import React from 'react';
import './Register.css';

class Register extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	onNameChange = (e) => {
		this.setState({ name : e.target.value });
	};

	onEmailChange = (e) => {
		this.setState({ email : e.target.value });
	};
	
	onPasswordChange = (e) => {
		this.setState({ password : e.target.value });
	};

	onSubmitRegister = (e) => {
		e.preventDefault();
		fetch('http://localhost:4000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(res => res.json())
		.then(data => {
			this.props.loadUser(data);
			this.props.onRouteChange('home');
		});
	}
	

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className="">
				<main className="pa4 black-80">
				  <form className="measure center shadow-2 pa2">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input value = { this.state.name }
				        	   onChange= { this.onNameChange }
				        	   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input value = { this.state.email }
				        	   onChange= { this.onEmailChange }
				        	   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input value = { this.state.password }
				        	   onChange= { this.onPasswordChange }
				        	   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				      <div className="">
				      	<input 
				      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		type="button"
				      		value="Register"
				      		onClick={ this.onSubmitRegister } />
				      </div>
				      <div className="lh-copy mt3">
				      	<p onClick={ () => onRouteChange('signin') } className="f6 link dim black db pointer">Sign in</p>
				      </div>
				    </fieldset>
				  </form>
				</main> 
			</div>
		);
	}
}

export default Register;