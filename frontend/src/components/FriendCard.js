import React from 'react';
import { Button } from './ui/button';
import { UserMinus, Trophy, Code, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const FriendCard = ({ friend, onRemove, theme }) => {
    const handleRemove = async () => {
        const confirmed = window.confirm(`Remove ${friend.name} from your friends?`);
        if (confirmed) {
            try {
                await onRemove(friend.id);
                toast.info(`${friend.name} removed from friends`);
            } catch (error) {
                toast.error('Failed to remove friend');
            }
        }
    };

    return (
        <div className={`rounded-xl p-4 transition-all duration-300 ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
                : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-xl'
            }`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${theme === 'dark'
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                            : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                        }`}>
                        <span className="text-white font-bold text-xl">
                            {friend.name?.charAt(0).toUpperCase() || '?'}
                        </span>
                    </div>

                    <div>
                        <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {friend.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                {friend.batch || 'Unknown Batch'}
                            </span>
                            <span className={theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}>•</span>
                            <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                {friend.skill_level || 'No level'}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleRemove}
                    size="sm"
                    variant="ghost"
                    className={`${theme === 'dark'
                            ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                >
                    <UserMinus className="w-4 h-4" />
                </Button>
            </div>

            {/* Friend Stats - Only visible because they're friends */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-800">
                <div className={`flex flex-col items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-50'
                    }`}>
                    <Trophy className={`w-5 h-5 mb-1 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {friend.points || 0}
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                        Points
                    </span>
                </div>

                <div className={`flex flex-col items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'
                    }`}>
                    <TrendingUp className={`w-5 h-5 mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {Math.min(Math.round((friend.points || 0) / 10), 100)}%
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                        Progress
                    </span>
                </div>

                <div className={`flex flex-col items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-50'
                    }`}>
                    <Code className={`w-5 h-5 mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {friend.selected_track || 'N/A'}
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                        Track
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;
