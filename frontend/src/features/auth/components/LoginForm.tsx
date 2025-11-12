import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth.context';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, isLoading, error, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Redirect based on role after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'STORE':
          navigate('/menu');
          break;
        case 'FACTORY_STAFF':
          navigate('/menu');
          break;
        default:
          navigate('/menu');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <img src="/assets/images/beams-logo.svg" alt="BEAMS" className="h-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">システムログイン</h2>
          <p className="mt-2 text-center text-sm text-gray-600">ユーザー名とパスワードを入力してください</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                ユーザー名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ユーザー名を入力"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワードを入力"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '認証中...' : 'ログイン'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">デモアカウント</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-2">
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-semibold text-blue-700 mb-1">管理者</div>
                <div>
                  ユーザー名: <code className="bg-white px-2 py-0.5 rounded">admin</code>
                </div>
                <div>
                  パスワード: <code className="bg-white px-2 py-0.5 rounded">ADMIN</code>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="font-semibold text-green-700 mb-1">店舗スタッフ</div>
                <div>
                  ユーザー名: <code className="bg-white px-2 py-0.5 rounded">store001</code>
                </div>
                <div>
                  パスワード: <code className="bg-white px-2 py-0.5 rounded">1111</code>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="font-semibold text-purple-700 mb-1">工場スタッフ</div>
                <div>
                  ユーザー名: <code className="bg-white px-2 py-0.5 rounded">factory001</code>
                </div>
                <div>
                  パスワード: <code className="bg-white px-2 py-0.5 rounded">1111</code>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
