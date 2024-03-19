import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/auth/authAction';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const { loginLoading, loginSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = '/';
    }
  }, [navigate, loginSuccess]);

  const onSubmit = async (data) => {
    dispatch(userLogin(data));
    setSubmitted(true);
  };

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
            <span className="shrink-0 px-6">Login</span>
            <span className="h-px flex-1 bg-slate-300"></span>
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-4 space-y-4"
            autoComplete="off">
            {submitted && !loginSuccess && !loginLoading && (
              <div className="alertlogin flex rounded-md bg-red-50 p-4 text-sm text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-3 h-5 w-5 flex-shrink-0">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>
                  <b>Error</b>
                  <p>
                    Username atau password yang anda masukkan salah. Harap
                    Periksa Kembali
                  </p>
                </div>
                <button
                  type="button"
                  className="flex justify-end items-center"
                  onClick={() => {
                    document
                      .querySelector('.alertlogin')
                      .classList.toggle('hidden');
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            )}
            <div>
              <label htmlFor="Username" className="sr-only">
                Username
              </label>

              <div className="relative">
                <input
                  {...register('username', { required: true })}
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Username"
                />
                {errors.username && (
                  <span className="text-xs text-red-700">
                    Username is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  {...register('password', { required: true })}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className="text-xs text-red-700">
                    Password is required
                  </span>
                )}

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className={
                loginLoading
                  ? 'btn-loading'
                  : `inline-block shrink-0 rounded-md border border-indigo-600 
            bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition 
            hover:bg-transparent hover:text-indigo-600 focus:outline-none 
            focus:ring active:text-indigo-500`
              }>
              Login
            </button>
            <p className="text-center text-sm text-gray-500">
              No account? &nbsp;
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
