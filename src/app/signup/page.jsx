"use client"
import { useState, useEffect } from "react";
import {redirect, useRouter} from 'next/navigation'

const page = () => {

    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
	const router = useRouter();

	useEffect(() => {
        validateForm();
    }, [name, email, password]);
    // Validate form
	const validateForm = () => {
        let errors = {};
        if (!name) {
            errors.name = 'Name is required.';
        }
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

	const handleForm = async (event) => {
		if (isFormValid) {
			event.preventDefault();
			try {
				await fetch(`/api/email`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({name, email}),
				})
				.then(async (response) => {
					await response.json().then((result) => {
						if (result.success){
							redirect('/');
						}
					});
				})
				.catch((err) => {
					return err;
				});
			}catch (e) {
				console.log(e);
			}
		} else {
            console.log('Form has errors. Please correct them.');
        }
	}

    return (
        <div className="w-full p-26 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
			<h1 className="text-3xl font-semibold text-center text-gray-700 py-2">Sign Up/Registration</h1>
			<hr/>
			<form onSubmit={handleForm} className="space-y-4 px-3 text-black">
				<div>
					<label className="label">
						<span className="text-black label-text">Name</span>
					</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" className="w-full input input-bordered bg-white" /><br/>
					{errors.name && <p className="text-red-600">{errors.name}</p>}
				</div>
				<div>
					<label className="label">
						<span className="text-black label-text">Email</span>
					</label>
					<input type="email"
						   value={email}
						   onChange={(e) => setEmail(e.target.value)}
						   required placeholder="Email Address" className="w-full input input-bordered bg-white" /><br/>
					{errors.email && <p className="text-red-600">{errors.email}</p>}
				</div>
				<div>
					<label className="label">
						<span className="text-black label-text">Password</span>
					</label>
					<input type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Password" className="w-full input input-bordered bg-white" /><br/>
					{errors.password && <p className="text-red-600">{errors.password}</p>}
				</div>
				<div className="pb-3">
					<button type="submit" className="btn btn-block text-white hover:bg-blue-800">Sign Up</button>
				</div>
			</form>
		</div>
    )
}

export default page
