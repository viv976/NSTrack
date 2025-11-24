import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Users, Search, UserPlus, UserMinus, Flame } from 'lucide-react';
import { toast } from 'sonner';

const FriendsPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, following, followers
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        fetchCurrentUser();
        fetchUsers();
        fetchFriends();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, selectedBatch, searchQuery, activeTab, following, followers]);

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.users || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            setLoading(false);
        }
    };

    const fetchFriends = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/friends`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFollowing(response.data.following || []);
            setFollowers(response.data.followers || []);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const filterUsers = () => {
        let filtered = users;

        // Filter by tab
        if (activeTab === 'following') {
            const followingIds = following.map(u => u.id);
            filtered = users.filter(u => followingIds.includes(u.id));
        } else if (activeTab === 'followers') {
            const followerIds = followers.map(u => u.id);
            filtered = users.filter(u => followerIds.includes(u.id));
        }

        // Filter by batch
        if (selectedBatch !== 'All') {
            filtered = filtered.filter(u => u.batch === selectedBatch);
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Remove current user
        if (currentUser) {
            filtered = filtered.filter(u => u.id !== currentUser.id);
        }

        setFilteredUsers(filtered);
    };

    const handleFollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const user = users.find(u => u.id === userId);

            await axios.post(`${API}/follow/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`You are now following ${user?.name || 'this user'}! 🎉`, {
                description: user?.batch ? `Batch: ${user.batch}` : undefined
            });

            fetchFriends();
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to follow user');
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const user = users.find(u => u.id === userId);

            await axios.delete(`${API}/unfollow/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`You unfollowed ${user?.name || 'this user'}`, {
                description: 'You can follow them again anytime'
            });

            fetchFriends();
            fetchUsers();
        } catch (error) {
            toast.error('Failed to unfollow user');
        }
    };

    const isFollowing = (userId) => {
        return following.some(u => u.id === userId);
    };

    const getBatchColor = (batch) => {
        const colors = {
            'Turing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Hopper': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Neumann': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Ramanujan': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
        };
        return colors[batch] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-10 h-10 text-cyan-400" />
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Friends & Community
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Connect with your batchmates and fellow learners
                    </p>
                </div>

                {/* Filters */}
                <div className="glass-effect rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Batch Filter */}
                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Filter by Batch</label>
                            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="All Batches" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="All">All Batches</SelectItem>
                                    <SelectItem value="Turing">Turing</SelectItem>
                                    <SelectItem value="Hopper">Hopper</SelectItem>
                                    <SelectItem value="Neumann">Neumann</SelectItem>
                                    <SelectItem value="Ramanujan">Ramanujan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Search Users</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        onClick={() => setActiveTab('all')}
                        variant={activeTab === 'all' ? 'default' : 'ghost'}
                        className={activeTab === 'all' ? 'bg-cyan-600' : 'text-slate-400'}
                    >
                        All Users ({users.length})
                    </Button>
                    <Button
                        onClick={() => setActiveTab('following')}
                        variant={activeTab === 'following' ? 'default' : 'ghost'}
                        className={activeTab === 'following' ? 'bg-cyan-600' : 'text-slate-400'}
                    >
                        Following ({following.length})
                    </Button>
                    <Button
                        onClick={() => setActiveTab('followers')}
                        variant={activeTab === 'followers' ? 'default' : 'ghost'}
                        className={activeTab === 'followers' ? 'bg-cyan-600' : 'text-slate-400'}
                    >
                        Followers ({followers.length})
                    </Button>
                </div>

                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div className="glass-effect rounded-xl p-12 text-center">
                        <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No users found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="glass-effect rounded-xl p-6 hover:border-cyan-500/30 transition-all"
                            >
                                {/* User Avatar */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{user.name}</h3>
                                            {user.batch && (
                                                <Badge className={`${getBatchColor(user.batch)} text-xs mt-1`}>
                                                    {user.batch}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* User Stats */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-4 h-4 text-orange-500" />
                                        <span className="text-slate-300">{user.points || 0} points</span>
                                    </div>
                                </div>

                                {/* Follow Button */}
                                {isFollowing(user.id) ? (
                                    <Button
                                        onClick={() => handleUnfollow(user.id)}
                                        variant="outline"
                                        className="w-full border-gray-700 text-slate-300 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
                                    >
                                        <UserMinus className="w-4 h-4 mr-2" />
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleFollow(user.id)}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Follow
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage;
