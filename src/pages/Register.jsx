import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../features/auth/authAction';
import Swal from 'sweetalert2';
import { useRef } from 'react';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Silakan Login',
    });
    reset({ data: null });
  };

  const lowercasePattern = /^(?=.*[a-z])/;
  const uppercasePattern = /^(?=.*[A-Z])/;
  const numericPattern = /^(?=.*\d)/;
  const specialCharPattern = /^(?=.*[!@#$%^&*()-+])/;
  const minLength = 8;
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="rounded-lg p-4 border bg-white sm:p-6 lg:p-8">
          <h1 className="mb-2 text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Business Unit App
          </h1>

          <p className="mb-4 mx-auto max-w-md text-center text-gray-500">
            Selamat Datang Di Aplikasi Business Unit
          </p>

          <span className="flex items-center">
            <span className="h-px flex-1 bg-slate-300"></span>
            <span className="shrink-0 px-6">Register</span>
            <span className="h-px flex-1 bg-slate-300"></span>
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid grid-cols-6 gap-3"
            autoComplete="off">
            <div className="col-span-6">
              <label
                htmlFor="UserName"
                className="block text-sm font-medium text-gray-700">
                {' '}
                Username{' '}
              </label>
              <input
                {...register('username', { required: true })}
                type="text"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.username && (
                <span className="text-xs text-red-700">
                  Username is required
                </span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register('firstname', { required: true })}
                type="text"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />{' '}
              {errors.firstname && (
                <span className="text-xs text-red-700">
                  First Name is required
                </span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register('lastname', { required: true })}
                type="text"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.lastname && (
                <span className="text-xs text-red-700">
                  Last Name is required
                </span>
              )}
            </div>
            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700">
                {' '}
                Email{' '}
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />{' '}
              {errors.email && (
                <span className="text-xs text-red-700">Email is required</span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700">
                {' '}
                Password{' '}
              </label>
              <input
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: `Password must be at least ${minLength} characters long`,
                  },
                  validate: {
                    lowercase: (value) =>
                      lowercasePattern.test(value) ||
                      'Password must contain at least one lowercase letter',
                    uppercase: (value) =>
                      uppercasePattern.test(value) ||
                      'Password must contain at least one uppercase letter',
                    numeric: (value) =>
                      numericPattern.test(value) ||
                      'Password must contain at least one numeric digit',
                    specialChar: (value) =>
                      specialCharPattern.test(value) ||
                      'Password must contain at least one special character: !@#$%^&*()-+',
                  },
                })}
                type="password"
                id="Password"
                name="password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />{' '}
              {errors.password && (
                <span className="text-xs text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700">
                Password Confirmation
              </label>
              <input
                {...register('confirm_password', {
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
                type="password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.confirm_password && (
                <span className="text-xs text-red-700">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline">
                  {' '}
                  terms and conditions{' '}
                </a>
                and{' '}
                <a href="#" className="text-gray-700 underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                Create an account
              </button>
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?{' '}
                <Link to={'/login'} className="text-gray-700 underline">
                  Log in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
