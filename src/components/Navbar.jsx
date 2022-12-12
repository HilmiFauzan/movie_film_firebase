import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	// console.log(user.email)

	const handleLogout = async () => {
		try {
			await logOut()
			navigate('/');
		} catch (error) {
			// statements
			console.log(error);
		}
	};

	return (
		<div className="w-full flex items-center justify-between p-4 z-[100] absolute">
			<Link to='/'>
				<h1 className="text-red-600 text-4xl font-bold cursor-pointer">
					MOV-FI
				</h1>
			</Link>
			{/* <div className="flex justify-center">
				<div className="mb-3 xl:w-96">
					<div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
						<input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
							placeholder="Search" 
							aria-label="Search" 
							aria-describedby="button-addon2" 
						/>
							<button 
								className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" 
								type="button" 
								id="button-addon2"
							>
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
								</svg>
							</button>
					</div>
				</div>
			</div> */}

			{/* <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" /> */}
			<div className="max-w-2xl w-[450px] mx-auto">

				<form className="flex items-center">
					<label htmlFor="simple-search" 
						className="sr-only">
							Search
					</label>
					<div className="relative w-full">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" 
								fill="currentColor" 
								viewBox="0 0 20 20" 
								xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" 
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
										clipRule="evenodd">
									</path>
							</svg>
						</div>
						<input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
							placeholder="Search" 
							required 
						/>
					</div>
					<button 
						type="submit" 
						className="p-2.5 ml-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path 
									strokeLinecap="round" 
									strokeLinejoin="round" 
									strokeWidth="2" 
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
								</path>
							</svg>
					</button>
				</form>
			</div>
			{/* <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script> */}
			{
				user?.email ?
					<div>
						<Link to="/account">
							<button className="text-white pr-4">
								Account
							</button>
						</Link>
						<button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
							Log Out
						</button>
					</div>
					:
					<div>
						<Link to="/login">
							<button className="text-white pr-4">
								Sign In
							</button>
						</Link>
						<Link to="/signup">
							<button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
								Sign Up
							</button>
						</Link>
					</div>
			}
		</div>
	)
}

export default Navbar