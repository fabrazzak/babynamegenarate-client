'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const { login, googleLogin } = useAuth();
    const [error, setError] = useState('');
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    });

    const saveUserToDatabase = async (name, email) => {
        try {
            await axios.post('http://localhost:5000/users', { name, email });
        } catch (err) {
            console.error("User save failed", err);
        }
    };
    const handleSubmit = async (values) => {
        console.log('Form data:', values);
        e.preventDefault();
        try {
            await login(values.email, values.password);
            alert("Login successful");
        } catch (error) {
            console.error(error);
        }
        // Add your login logic here
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const userCredential = await googleLogin();

            const user = userCredential.user;
            await saveUserToDatabase(user.displayName || "Google User", user.email);

            router.push('/');
        } catch (err) {
            setError(err.message);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-500">or</span>
                    </div>
                </div>

                <button
                    onClick={() => handleGoogleLogin()}
                    className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-50"
                >
                    <FcGoogle className="w-5 h-5 mr-2" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
