import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Users, Search, UserPlus, Inbox, Send, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import FriendRequestCard from '../components/FriendRequestCard';
import FriendCard from '../components/FriendCard';
import * as friendsApi from '../services/friendsApi';

const FriendsPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('friends'); // friends, incoming, outgoing, search
    const [loading, setLoading] = useState(true);

    // Friends data
    const [friends, setFriends] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    // Search
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            await Promise.all([
                fetchFriends(),
                fetchIncomingRequests(),
                fetchOutgoingRequests()
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFriends = async () => {
        try {
            const data = await friendsApi.getFriendsList();
            setFriends(data.friends || []);
        } catch (error) {
            console.error('Error fetching friends:', error);
            toast.error('Failed to load friends');
        }
    };

    const fetchIncomingRequests = async () => {
        try {
            const data = await friendsApi.getIncomingRequests();
            setIncomingRequests(data.requests || []);
        } catch (error) {
            console.error('Error fetching incoming requests:', error);
        }
    };

    const fetchOutgoingRequests = async () => {
        try {
            const data = await friendsApi.getOutgoingRequests();
            setOutgoingRequests(data.requests || []);
        } catch (error) {
            console.error('Error fetching outgoing requests:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            toast.info('Please enter a name to search');
            return;
        }

        try {
            setSearchLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/search/users?q=${searchQuery}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            let results = response.data.users || [];

            // Filter by batch if selected
            if (selectedBatch !== 'All') {
                results = results.filter(u => u.batch === selectedBatch);
            }

            setSearchResults(results);
            setActiveTab('search');
        } catch (error) {
            console.error('Error searching users:', error);
            toast.error('Failed to search users');
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSendRequest = async (userId) => {
        try {
            await friendsApi.sendFriendRequest(userId);
            toast.success('Friend request sent!');
            // Refresh search results to update button state
            handleSearch();
            fetchOutgoingRequests();
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to send request');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await friendsApi.acceptRequest(requestId);
            fetchAllData(); // Refresh all data
        } catch (error) {
            toast.error('Failed to accept request');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await friendsApi.rejectRequest(requestId);
            fetchIncomingRequests();
        } catch (error) {
            toast.error('Failed to reject request');
        }
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await friendsApi.removeFriend(friendId);
            fetchFriends();
        } catch (error) {
            toast.error('Failed to remove friend');
        }
    };

    const checkUserStatus = (userId) => {
        // Check if already friends
        if (friends.some(f => f.id === userId)) {
            return 'friends';
        }
        // Check if request sent
        if (outgoingRequests.some(r => r.receiver?.id === userId)) {
            return 'pending';
        }
        // Check if request received
        if (incomingRequests.some(r => r.sender?.id === userId)) {
            return 'received';
        }
        return 'none';
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'
                }`}>
                <div className="text-cyan-400 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-10 h-10 text-cyan-400" />
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Friends
                        </h1>
                    </div>
                    <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                        Manage your friend requests and connections
                    </p>
                </div>

                {/* Search Section */}
                <div className={`rounded-xl p-6 mb-6 ${theme === 'dark' ? 'glass-effect' : 'bg-gray-50 border-2 border-gray-200'
                    }`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                                }`}>
                                Search Users
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
                                        }`} />
                                    <Input
                                        type="text"
                                        placeholder="Enter name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className={`pl-10 ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-300'
                                            }`}
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={searchLoading}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    {searchLoading ? 'Searching...' : 'Search'}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                                }`}>
                                Filter by Batch
                            </label>
                            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                                <SelectTrigger className={
                                    theme === 'dark'
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-300'
                                }>
                                    <SelectValue placeholder="All Batches" />
                                </SelectTrigger>
                                <SelectContent className={
                                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                                }>
                                    <SelectItem value="All">All Batches</SelectItem>
                                    <SelectItem value="Turing">Turing</SelectItem>
                                    <SelectItem value="Hopper">Hopper</SelectItem>
                                    <SelectItem value="Neumann">Neumann</SelectItem>
                                    <SelectItem value="Ramanujan">Ramanujan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    <Button
                        onClick={() => setActiveTab('friends')}
                        variant={activeTab === 'friends' ? 'default' : 'ghost'}
                        className={activeTab === 'friends'
                            ? 'bg-cyan-600 text-white'
                            : theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                        }
                    >
                        <Heart className="w-4 h-4 mr-2" />
                        Friends ({friends.length})
                    </Button>
                    <Button
                        onClick={() => setActiveTab('incoming')}
                        variant={activeTab === 'incoming' ? 'default' : 'ghost'}
                        className={activeTab === 'incoming'
                            ? 'bg-cyan-600 text-white'
                            : theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                        }
                    >
                        <Inbox className="w-4 h-4 mr-2" />
                        Requests ({incomingRequests.length})
                    </Button>
                    <Button
                        onClick={() => setActiveTab('outgoing')}
                        variant={activeTab === 'outgoing' ? 'default' : 'ghost'}
                        className={activeTab === 'outgoing'
                            ? 'bg-cyan-600 text-white'
                            : theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                        }
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Sent ({outgoingRequests.length})
                    </Button>
                </div>

                {/* Content Sections */}
                {activeTab === 'friends' && (
                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Your Friends
                        </h2>
                        {friends.length === 0 ? (
                            <div className={`rounded-xl p-12 text-center ${theme === 'dark' ? 'glass-effect' : 'bg-gray-50 border-2 border-gray-200'
                                }`}>
                                <Users className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'
                                    }`} />
                                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                    No friends yet. Search for users to send friend requests!
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {friends.map(friend => (
                                    <FriendCard
                                        key={friend.id}
                                        friend={friend}
                                        onRemove={handleRemoveFriend}
                                        theme={theme}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'incoming' && (
                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Friend Requests
                        </h2>
                        {incomingRequests.length === 0 ? (
                            <div className={`rounded-xl p-12 text-center ${theme === 'dark' ? 'glass-effect' : 'bg-gray-50 border-2 border-gray-200'
                                }`}>
                                <Inbox className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'
                                    }`} />
                                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                    No pending friend requests
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {incomingRequests.map(request => (
                                    <FriendRequestCard
                                        key={request.id}
                                        request={request}
                                        onAccept={handleAcceptRequest}
                                        onReject={handleRejectRequest}
                                        theme={theme}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'outgoing' && (
                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Sent Requests
                        </h2>
                        {outgoingRequests.length === 0 ? (
                            <div className={`rounded-xl p-12 text-center ${theme === 'dark' ? 'glass-effect' : 'bg-gray-50 border-2 border-gray-200'
                                }`}>
                                <Send className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'
                                    }`} />
                                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                    No sent requests
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {outgoingRequests.map(request => (
                                    <div
                                        key={request.id}
                                        className={`rounded-xl p-4 flex items-center justify-between ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800'
                                            : 'bg-white border-2 border-gray-200 shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark'
                                                ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                                : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                                                }`}>
                                                <span className="text-white font-bold text-lg">
                                                    {request.receiver?.name?.charAt(0).toUpperCase() || '?'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                    {request.receiver?.name}
                                                </h3>
                                                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                                                    }`}>
                                                    {request.receiver?.batch || 'Unknown Batch'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`text-sm px-3 py-1 rounded-full ${theme === 'dark'
                                            ? 'bg-yellow-500/20 text-yellow-400'
                                            : 'bg-yellow-50 text-yellow-600'
                                            }`}>
                                            Pending
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'search' && (
                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Search Results
                        </h2>
                        {searchResults.length === 0 ? (
                            <div className={`rounded-xl p-12 text-center ${theme === 'dark' ? 'glass-effect' : 'bg-gray-50 border-2 border-gray-200'
                                }`}>
                                <Search className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'
                                    }`} />
                                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                                    No users found. Try a different search.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {searchResults.map(user => {
                                    const status = checkUserStatus(user.id);
                                    return (
                                        <div
                                            key={user.id}
                                            className={`rounded-xl p-4 ${theme === 'dark'
                                                ? 'glass-effect hover:border-cyan-500/30'
                                                : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
                                                } transition-all`}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark'
                                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                                    : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                                                    }`}>
                                                    <span className="text-white font-bold text-lg">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                        {user.name}
                                                    </h3>
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                                                        }`}>
                                                        {user.batch || 'No batch'} • {user.skill_level}
                                                    </span>
                                                </div>
                                            </div>

                                            {status === 'friends' && (
                                                <Button disabled className="w-full bg-green-600 text-white">
                                                    ✓ Friends
                                                </Button>
                                            )}
                                            {status === 'pending' && (
                                                <Button disabled className="w-full bg-yellow-600 text-white">
                                                    Request Sent
                                                </Button>
                                            )}
                                            {status === 'received' && (
                                                <Button
                                                    onClick={() => setActiveTab('incoming')}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                >
                                                    View Request
                                                </Button>
                                            )}
                                            {status === 'none' && (
                                                <Button
                                                    onClick={() => handleSendRequest(user.id)}
                                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                                                >
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Send Request
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage;
