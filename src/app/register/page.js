'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios'; // <-- Make sure axios is installed

const RegisterPage = () => {
  const router = useRouter();
  const { googleLogin, register } = useAuth();
  const [error, setError] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const saveUserToDatabase = async (name, email) => {
    try {
      await axios.post('http://localhost:5000/users', { name, email });
    } catch (err) {
      console.error("User save failed", err);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      const userCredential = await register(values.email, values.password);

      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      await saveUserToDatabase(values.name, values.email);

      router.push('/');
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  const handleGoogleSignup = async () => {
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-sm hover:shadow-md transition duration-300 hover:bg-gray-50"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.6 7.5-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.8l6-6C33.9 6.3 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.2-.1-2.5-.4-3.5z"
            />
            <path
              fill="#e53935"
              d="M6.3 14.1l6.6 4.8C14.2 15.1 18.7 12 24 12c2.8 0 5.3 1 7.2 2.8l6-6C33.9 6.3 29.2 4 24 4 16 4 9.1 8.5 6.3 14.1z"
            />
            <path
              fill="#4caf50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.9 26.8 37 24 37c-4.9 0-9-3.1-10.6-7.5l-6.6 5.1C9.1 39.5 16 44 24 44z"
            />
            <path
              fill="#1565c0"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.2 5.7.1-.1 6.5 5.3 6.5 5.3 3.8-3.5 6.3-8.6 6.3-14.5 0-1.2-.1-2.5-.3-3.5z"
            />
          </svg>
          <span className="text-sm font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
