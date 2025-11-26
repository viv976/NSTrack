import React from 'react';
import { Button } from './ui/button';
import { Check, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

const FriendRequestCard = ({ request, onAccept, onReject, theme }) => {
    const sender = request.sender || {};

    const handleAccept = async () => {
        try {
            await onAccept(request.id);
            toast.success(`You are now friends with ${sender.name}!`);
        } catch (error) {
            toast.error('Failed to accept request');
        }
    };

    const handleReject = async () => {
        try {
            await onReject(request.id);
            toast.info(`Friend request from ${sender.name} rejected`);
        } catch (error) {
            toast.error('Failed to reject request');
        }
    };

    return (
        <div className={`rounded-xl p-4 transition-all duration-300 ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-cyan-500/50'
                : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark'
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                            : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                        }`}>
                        <span className="text-white font-bold text-lg">
                            {sender.name?.charAt(0).toUpperCase() || '?'}
                        </span>
                    </div>

                    <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {sender.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                {sender.batch || 'Unknown Batch'}
                            </span>
                            <span className={theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}>•</span>
                            <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                {sender.skill_level || 'No level'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleAccept}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                    </Button>
                    <Button
                        onClick={handleReject}
                        size="sm"
                        variant="outline"
                        className={`${theme === 'dark'
                                ? 'border-red-500 text-red-400 hover:bg-red-500/10'
                                : 'border-red-500 text-red-600 hover:bg-red-50'
                            }`}
                    >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                    </Button>
                </div>
            </div>

            {request.created_at && (
                <div className={`flex items-center gap-1 mt-2 text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                    <Clock className="w-3 h-3" />
                    <span>
                        {new Date(request.created_at).toLocaleDateString()}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FriendRequestCard;
