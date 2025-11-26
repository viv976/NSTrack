import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Key, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = ({ setAuth }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: Choose Option, 3: Reset/Magic
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [recoveryOption, setRecoveryOption] = useState(null); // 'reset' or 'magic'

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API}/auth/forgot-password`, { email });
            toast.success('Recovery code sent! Please check your email.');
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API}/auth/reset-password`, {
                token,
                new_password: newPassword
            });
            toast.success('Password reset successfully! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    const handleMagicLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API}/auth/magic-login`, { token });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setAuth(true);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
            {/* Background Video */}
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none">
                <source src="/background-video.mp4" type="video/mp4" />
            </video>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="bg-gray-900/90 rounded-2xl p-8 border border-gray-800 shadow-2xl backdrop-blur-sm">
                    <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-cyan-400 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </Link>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Account Recovery</h1>
                        <p className="text-slate-400">
                            {step === 1 && "Enter your email to find your account"}
                            {step === 2 && "Choose how you want to access your account"}
                            {step === 3 && recoveryOption === 'reset' && "Create a new password"}
                            {step === 3 && recoveryOption === 'magic' && "Enter the login code"}
                        </p>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleRequestCode} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                                        placeholder="your.email@nst.edu"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg"
                            >
                                {loading ? 'Sending...' : 'Find Account'}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <button
                                onClick={() => { setRecoveryOption('reset'); setStep(3); }}
                                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-cyan-500 hover:bg-gray-800/80 transition-all group text-left flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <Key className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Reset Password</h3>
                                    <p className="text-sm text-slate-400">Create a new password for your account</p>
                                </div>
                            </button>

                            <button
                                onClick={() => { setRecoveryOption('magic'); setStep(3); }}
                                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-purple-500 hover:bg-gray-800/80 transition-all group text-left flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                    <LinkIcon className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Login with Code</h3>
                                    <p className="text-sm text-slate-400">One-time login without password</p>
                                </div>
                            </button>
                        </div>
                    )}

                    {step === 3 && recoveryOption === 'reset' && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
                                <p className="text-sm text-cyan-200 flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    Code sent to {email}. Please check your inbox.
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="token" className="text-slate-200">Recovery Code</Label>
                                <Input
                                    id="token"
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-cyan-500 font-mono"
                                    placeholder="Enter the code"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <Label htmlFor="newPassword" className="text-slate-200">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    )}

                    {step === 3 && recoveryOption === 'magic' && (
                        <form onSubmit={handleMagicLogin} className="space-y-6">
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                                <p className="text-sm text-purple-200 flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    Code sent to {email}. Please check your inbox.
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="token" className="text-slate-200">Login Code</Label>
                                <Input
                                    id="token"
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-purple-500 font-mono"
                                    placeholder="Enter the code"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-6 text-lg"
                            >
                                {loading ? 'Logging in...' : 'Login Now'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
